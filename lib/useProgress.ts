"use client";

import { useSyncExternalStore } from "react";
import {
  subscribe,
  getVersion,
  getServerVersion,
  getProgress,
  getLastVisited,
} from "./progress";
import type { ChapterProgress } from "./types";

// useSyncExternalStore gives us a hydration-safe live subscription:
// - getServerVersion() (always 0) is used on the server AND for the first
//   client render, so SSR and CSR markup match — no hydration mismatch.
// - subscribe() registers with the in-tab event channel + cross-tab `storage`
//   event (set up inside lib/progress.ts). Any write/reset bumps the version,
//   re-running every consumer's selector below.
function useProgressVersion(): number {
  return useSyncExternalStore(subscribe, getVersion, getServerVersion);
}

const EMPTY_PROGRESS: ChapterProgress = {
  read: false,
  exercisesDone: [],
  quizScore: null,
};

// Live per-chapter progress. CRITICAL for hydration: localStorage only exists on
// the client, so the server renders empty progress. We must return that SAME
// empty value on the first client render (during hydration) and only swap to the
// real stored value after mount — otherwise the first client paint reads real
// localStorage, diverges from the server markup, and React throws a hydration
// mismatch (and regenerates the tree). `useHasMounted()` is false on the server
// and the first client render, true thereafter; the version subscription then
// drives live updates on every write/reset (this tab or another).
export function useChapterProgress(chapterId: string): ChapterProgress {
  const v = useProgressVersion();
  void v;
  const mounted = useHasMounted();
  return mounted ? getProgress(chapterId) : EMPTY_PROGRESS;
}

// Live "continue where you left off" target. null on the server and first client
// render (hydration-safe, see useChapterProgress), real value once mounted.
export function useLastVisited(): string | null {
  const v = useProgressVersion();
  void v;
  const mounted = useHasMounted();
  return mounted ? getLastVisited() : null;
}

// True once the component has mounted on the client; false on the server and
// during the first client render (hydration). Lets SSR-sensitive UI (e.g. the
// home "Resume" button) render a stable fallback first, then upgrade on mount.
export function useHasMounted(): boolean {
  return useSyncExternalStore(
    noopSubscribe,
    () => true, // client snapshot
    () => false // server / first-render snapshot
  );
}

function noopSubscribe(): () => void {
  return () => {};
}
