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

// Live per-chapter progress. Returns empty progress on the server and the first
// client paint, then the real stored value once mounted/subscribed.
export function useChapterProgress(chapterId: string): ChapterProgress {
  const v = useProgressVersion();
  // `v` participates in the dependency by being read each render; recompute
  // directly so a version bump (any write/reset/storage event) re-reads.
  void v;
  return getProgress(chapterId);
}

// Live "continue where you left off" target. null until mounted or if no history.
export function useLastVisited(): string | null {
  const v = useProgressVersion();
  void v;
  return getLastVisited();
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
