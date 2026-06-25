"use client";

import type { ChapterProgress, ProgressMeta } from "./types";

// Namespace for all progress data in localStorage
const NS = "guide:progress:v1";
// Meta (non-chapter) data lives under a reserved sub-key inside the namespace.
const META_KEY = `${NS}:__meta__`;

function storageKey(chapterId: string): string {
  return `${NS}:${chapterId}`;
}

// SSR guard
function isClient(): boolean {
  return typeof window !== "undefined";
}

// ─── Defaults ───────────────────────────────────────────────────────────────
const EMPTY: ChapterProgress = { read: false, exercisesDone: [], quizScore: null };
const EMPTY_META: ProgressMeta = { lastVisited: null };

// ─── Parsing (tolerant of missing / corrupt data) ────────────────────────────
// Normalizes any stored object into a valid ChapterProgress, defaulting missing
// or malformed fields. This also transparently migrates the old shape, where a
// single `exerciseDone: boolean` tracked the (then) single exercise: that field
// is simply ignored, so a previously-completed exercise resets to not-done —
// acceptable for resettable learning progress.
function parse(raw: string | null): ChapterProgress | null {
  if (!raw) return null;
  try {
    const val = JSON.parse(raw);
    if (typeof val !== "object" || val === null) return null;
    return {
      read: val.read === true,
      exercisesDone: Array.isArray(val.exercisesDone)
        ? val.exercisesDone.filter((x: unknown): x is string => typeof x === "string")
        : [],
      quizScore: typeof val.quizScore === "number" ? val.quizScore : null,
    };
  } catch {
    return null;
  }
}

function parseMeta(raw: string | null): ProgressMeta | null {
  if (!raw) return null;
  try {
    const val = JSON.parse(raw);
    if (
      typeof val === "object" &&
      val !== null &&
      (val.lastVisited === null || typeof val.lastVisited === "string")
    ) {
      return val as ProgressMeta;
    }
    return null;
  } catch {
    return null;
  }
}

// ─── Live-update store ────────────────────────────────────────────────────────
// A single monotonically increasing version number is the snapshot for
// useSyncExternalStore. Any progress write/reset bumps it, which forces every
// subscribed component to re-read its slice of localStorage. This is the
// in-tab propagation mechanism; cross-tab changes arrive via the `storage`
// event and bump the same version.

export type ProgressEventDetail =
  | { kind: "chapter"; chapterId: string; progress: ChapterProgress }
  | { kind: "last-visited"; lastVisited: string | null }
  | { kind: "reset-chapter"; chapterId: string }
  | { kind: "clear-all" };

const EVENT = "guide:progress";

let version = 0;
const listeners = new Set<() => void>();
let storageBound = false;

function notify(): void {
  version += 1;
  for (const l of listeners) l();
}

// Centralized broadcast: bump local version, notify in-tab subscribers, and
// dispatch a DOM CustomEvent (lets non-hook listeners — e.g. Quiz reset — react).
function emit(detail: ProgressEventDetail): void {
  notify();
  if (isClient()) {
    window.dispatchEvent(new CustomEvent<ProgressEventDetail>(EVENT, { detail }));
  }
}

function ensureStorageListener(): void {
  if (storageBound || !isClient()) return;
  storageBound = true;
  // Another tab mutated our namespace — re-render everything here too.
  window.addEventListener("storage", (e: StorageEvent) => {
    if (e.key === null || e.key.startsWith(NS)) {
      notify();
    }
  });
}

// Subscribe/getSnapshot for useSyncExternalStore (see lib/useProgress.ts).
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
export function getProgress(chapterId: string): ChapterProgress {
  if (!isClient()) return { ...EMPTY };
  try {
    const raw = localStorage.getItem(storageKey(chapterId));
    return parse(raw) ?? { ...EMPTY };
  } catch {
    return { ...EMPTY };
  }
}

export function getMeta(): ProgressMeta {
  if (!isClient()) return { ...EMPTY_META };
  try {
    const raw = localStorage.getItem(META_KEY);
    return parseMeta(raw) ?? { ...EMPTY_META };
  } catch {
    return { ...EMPTY_META };
  }
}

export function getLastVisited(): string | null {
  return getMeta().lastVisited;
}

// ─── Writes ─────────────────────────────────────────────────────────────────
export function setProgress(chapterId: string, update: Partial<ChapterProgress>): void {
  if (!isClient()) return;
  try {
    const current = getProgress(chapterId);
    const next = { ...current, ...update };
    localStorage.setItem(storageKey(chapterId), JSON.stringify(next));
    emit({ kind: "chapter", chapterId, progress: next });
  } catch {
    // ignore quota errors etc.
  }
}

export function markRead(chapterId: string): void {
  setProgress(chapterId, { read: true });
}

// Mark one exercise (by its title-slug id) complete within a chapter. Adds the
// id to the chapter's set; other exercises in the same chapter are untouched.
export function markExerciseDone(chapterId: string, exerciseId: string): void {
  const current = getProgress(chapterId);
  if (current.exercisesDone.includes(exerciseId)) return;
  setProgress(chapterId, { exercisesDone: [...current.exercisesDone, exerciseId] });
}

export function setQuizScore(chapterId: string, score: number): void {
  setProgress(chapterId, { quizScore: score });
}

export function setLastVisited(chapterId: string): void {
  if (!isClient()) return;
  try {
    const current = getMeta();
    if (current.lastVisited === chapterId) return; // no-op, avoid churn
    const next: ProgressMeta = { ...current, lastVisited: chapterId };
    localStorage.setItem(META_KEY, JSON.stringify(next));
    emit({ kind: "last-visited", lastVisited: chapterId });
  } catch {
    // ignore
  }
}

// ─── Resets ───────────────────────────────────────────────────────────────────
// Clear a single chapter's progress (read / exercisesDone / quizScore).
export function resetChapter(chapterId: string): void {
  if (!isClient()) return;
  try {
    localStorage.removeItem(storageKey(chapterId));
  } catch {
    // ignore
  }
  // Emit even if removeItem threw, so listening UI still resets to empty state.
  emit({ kind: "reset-chapter", chapterId });
}

// Clear the entire guide:progress:v1 namespace (all chapters + meta).
export function clearAllProgress(): void {
  if (isClient()) {
    try {
      const toRemove: string[] = [];
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith(NS)) toRemove.push(key);
      }
      for (const key of toRemove) localStorage.removeItem(key);
    } catch {
      // ignore
    }
  }
  emit({ kind: "clear-all" });
}
