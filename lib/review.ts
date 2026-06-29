"use client";

import { useSyncExternalStore } from "react";
import type { QuizQuestion } from "./types";

// ─── Spaced-review store (separate from progress) ─────────────────────────────
// Captures quiz questions the learner got WRONG so they can re-attempt them
// later on /review. Kept in its own localStorage namespace, independent of
// guide:progress:v1, so resetting chapter progress doesn't wipe the review
// queue (and vice-versa). All access is window-guarded + try/catch-wrapped for
// SSR safety and quota errors, mirroring lib/progress.ts.
//
// PILOT SCOPE: no date-based spacing. Items are simply "questions you missed,
// re-try them"; a correct re-attempt removes the item. See the `// TODO:
// spacing schedule` marker below for where a real scheduler would live.

const NS = "guide:review:v1";

// One missed question, stored with enough context to re-ask it standalone
// (outside its original chapter page).
export interface ReviewItem {
  chapterId: string; // "<module>/<slug>" — the chapter it came from
  chapterTitle?: string; // human label for the review surface, if known
  question: QuizQuestion; // the full question object, re-rendered as-is
  // TODO: spacing schedule — a real algorithm would add fields like
  //   addedAt: number; nextReview: number; intervalDays: number; streak: number;
  // and getReviewItems() would filter to items whose nextReview <= Date.now().
}

function isClient(): boolean {
  return typeof window !== "undefined";
}

// ─── Parsing (tolerant of missing / corrupt data) ────────────────────────────
// Returns only well-formed items; anything malformed is dropped rather than
// throwing, so a corrupted store degrades to "fewer items" (worst case empty).
function isQuizQuestion(v: unknown): v is QuizQuestion {
  if (typeof v !== "object" || v === null) return false;
  const q = v as Record<string, unknown>;
  if (typeof q.id !== "string" || typeof q.prompt !== "string") return false;
  if (q.type === "multiple-choice") {
    return Array.isArray(q.options) && typeof q.answer === "number";
  }
  if (q.type === "fill-in") {
    return typeof q.answer === "string";
  }
  return false;
}

function parse(raw: string | null): ReviewItem[] {
  if (!raw) return [];
  try {
    const val = JSON.parse(raw);
    if (!Array.isArray(val)) return [];
    return val.filter(
      (item): item is ReviewItem =>
        typeof item === "object" &&
        item !== null &&
        typeof (item as ReviewItem).chapterId === "string" &&
        isQuizQuestion((item as ReviewItem).question)
    );
  } catch {
    return [];
  }
}

// ─── Live-update store ────────────────────────────────────────────────────────
// Mirrors lib/progress.ts: a monotonic version is the useSyncExternalStore
// snapshot; any write bumps it via notify(), and a `storage` listener bumps it
// on cross-tab changes. We reuse the SAME `guide:progress` event channel so a
// single DOM listener pattern covers both stores, but tag the detail with a
// distinct kind so progress consumers can ignore it.
export type ReviewEventDetail = { kind: "review"; count: number };

const EVENT = "guide:progress";

let version = 0;
const listeners = new Set<() => void>();
let storageBound = false;

function notify(): void {
  version += 1;
  for (const l of listeners) l();
}

function emit(): void {
  notify();
  if (isClient()) {
    const detail: ReviewEventDetail = { kind: "review", count: getReviewItems().length };
    window.dispatchEvent(new CustomEvent<ReviewEventDetail>(EVENT, { detail }));
  }
}

function ensureStorageListener(): void {
  if (storageBound || !isClient()) return;
  storageBound = true;
  window.addEventListener("storage", (e: StorageEvent) => {
    if (e.key === null || e.key.startsWith(NS)) notify();
  });
}

export function subscribe(callback: () => void): () => void {
  ensureStorageListener();
  listeners.add(callback);
  return () => {
    listeners.delete(callback);
  };
}

export function getVersion(): number {
  return version;
}

// Stable server snapshot — keeps SSR and the first client render identical.
export function getServerVersion(): number {
  return 0;
}

// ─── Reads ────────────────────────────────────────────────────────────────────
export function getReviewItems(): ReviewItem[] {
  if (!isClient()) return [];
  try {
    return parse(localStorage.getItem(NS));
  } catch {
    return [];
  }
}

// ─── Writes ─────────────────────────────────────────────────────────────────
function write(items: ReviewItem[]): void {
  try {
    localStorage.setItem(NS, JSON.stringify(items));
  } catch {
    // ignore quota errors etc.
  }
  emit();
}

// Add missed questions, de-duped by (chapterId + question.id) so re-taking a
// quiz never piles up duplicates. Existing entries are refreshed in place (the
// question object may have been re-authored), order otherwise preserved.
export function addMissed(newItems: ReviewItem[]): void {
  if (!isClient() || newItems.length === 0) return;
  const current = getReviewItems();
  const byKey = new Map<string, ReviewItem>();
  for (const item of current) byKey.set(key(item.chapterId, item.question.id), item);
  for (const item of newItems) byKey.set(key(item.chapterId, item.question.id), item);
  write([...byKey.values()]);
}

// Remove one item (e.g. answered correctly in the review queue, or stale).
export function removeReviewItem(chapterId: string, questionId: string): void {
  if (!isClient()) return;
  const k = key(chapterId, questionId);
  const next = getReviewItems().filter(
    (item) => key(item.chapterId, item.question.id) !== k
  );
  write(next);
}

// Clear the entire review queue. Wired into the global "Reset all progress"
// control so a full reset also empties the queue (the stores are otherwise
// independent — see the namespace note at the top).
export function clearReview(): void {
  if (!isClient()) return;
  try {
    localStorage.removeItem(NS);
  } catch {
    // ignore
  }
  emit();
}

// Remove every review item from one chapter, for the per-chapter "Reset this
// section" control.
export function clearChapterReview(chapterId: string): void {
  if (!isClient()) return;
  write(getReviewItems().filter((item) => item.chapterId !== chapterId));
}

function key(chapterId: string, questionId: string): string {
  return `${chapterId}::${questionId}`;
}

// ─── Hook ─────────────────────────────────────────────────────────────────────
// Live count of items in the review queue, hydration-safe: 0 on the server and
// the first client render (server snapshot), real value once mounted/after any
// write. Mirrors lib/useProgress.ts's useChapterProgress mount-gating.
export function useReviewCount(): number {
  const v = useSyncExternalStore(subscribe, getVersion, getServerVersion);
  void v;
  const mounted = useReviewMounted();
  return mounted ? getReviewItems().length : 0;
}

// Live snapshot of the review items themselves (for <ReviewQueue>). Same
// mount-gating contract as useReviewCount.
export function useReviewItems(): ReviewItem[] {
  const v = useSyncExternalStore(subscribe, getVersion, getServerVersion);
  void v;
  const mounted = useReviewMounted();
  return mounted ? getReviewItems() : EMPTY_ITEMS;
}

const EMPTY_ITEMS: ReviewItem[] = [];

function useReviewMounted(): boolean {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );
}
