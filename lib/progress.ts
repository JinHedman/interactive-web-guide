"use client";

import type { ChapterProgress } from "./types";

// Namespace for all progress data in localStorage
const NS = "guide:progress:v1";

function storageKey(chapterId: string): string {
  return `${NS}:${chapterId}`;
}

// SSR guard
function isClient(): boolean {
  return typeof window !== "undefined";
}

function parse(raw: string | null): ChapterProgress | null {
  if (!raw) return null;
  try {
    const val = JSON.parse(raw);
    if (
      typeof val === "object" &&
      val !== null &&
      typeof val.read === "boolean" &&
      typeof val.exerciseDone === "boolean" &&
      (val.quizScore === null || typeof val.quizScore === "number")
    ) {
      return val as ChapterProgress;
    }
    return null;
  } catch {
    return null;
  }
}

const EMPTY: ChapterProgress = { read: false, exerciseDone: false, quizScore: null };

export function getProgress(chapterId: string): ChapterProgress {
  if (!isClient()) return { ...EMPTY };
  try {
    const raw = localStorage.getItem(storageKey(chapterId));
    return parse(raw) ?? { ...EMPTY };
  } catch {
    return { ...EMPTY };
  }
}

export function setProgress(chapterId: string, update: Partial<ChapterProgress>): void {
  if (!isClient()) return;
  try {
    const current = getProgress(chapterId);
    const next = { ...current, ...update };
    localStorage.setItem(storageKey(chapterId), JSON.stringify(next));
    // Dispatch custom event so other components on same page can react
    window.dispatchEvent(new CustomEvent("guide:progress", { detail: { chapterId, progress: next } }));
  } catch {
    // ignore quota errors etc.
  }
}

export function markRead(chapterId: string): void {
  setProgress(chapterId, { read: true });
}

export function markExerciseDone(chapterId: string): void {
  setProgress(chapterId, { exerciseDone: true });
}

export function setQuizScore(chapterId: string, score: number): void {
  setProgress(chapterId, { quizScore: score });
}
