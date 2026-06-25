"use client";

import { useSyncExternalStore } from "react";
import Link from "next/link";
import {
  clearAllProgress,
  getProgress,
  getVersion,
  getServerVersion,
  subscribe,
} from "@/lib/progress";
import { useHasMounted, useLastVisited } from "@/lib/useProgress";
import ResetButton from "./ResetButton";

// ─── Resume button (top bar) ─────────────────────────────────────────────────
// Wired to the existing resume-last-chapter logic: most recently visited
// chapter from the progress store, falling back to the first chapter. Always
// renders a link (so the top bar is stable across SSR/CSR); only the *target*
// upgrades from the fallback to lastVisited once mounted.
export function ResumeButton({ firstChapterHref }: { firstChapterHref: string | null }) {
  const mounted = useHasMounted();
  const lastVisited = useLastVisited();

  const resumeHref =
    mounted && lastVisited != null
      ? `/learn/${lastVisited}`
      : firstChapterHref ?? "#curriculum";

  return (
    <Link href={resumeHref} style={resumeBtnStyle}>
      Resume →
    </Link>
  );
}

const resumeBtnStyle: React.CSSProperties = {
  border: "1px solid var(--border-strong)",
  padding: "7px 16px",
  borderRadius: 9,
  color: "var(--fg-base)",
  fontWeight: 500,
  fontSize: 13,
  textDecoration: "none",
  lineHeight: 1,
  display: "inline-flex",
  alignItems: "center",
};

// ─── Module progress bar (curriculum cards) ──────────────────────────────────
// SSR-safe completion fill for one module's card. The chapter ids in this
// module are computed server-side and passed in; the *read* state is read live
// from the progress store. On the server / first paint the bar is 0% (mounted
// is false), then it hydrates to the real percentage with no markup mismatch
// because every chapter's progress also starts empty on first paint.
export function ModuleProgressBar({ chapterIds }: { chapterIds: string[] }) {
  const mounted = useHasMounted();
  const pct = useModuleCompletion(chapterIds);
  const width = mounted ? pct : 0;

  return (
    <div
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={width}
      aria-label={`Module ${width}% complete`}
      style={{
        height: 5,
        borderRadius: 3,
        background: "var(--bg-subtle)",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          width: `${width}%`,
          height: "100%",
          background: "var(--brand)",
          borderRadius: 3,
          transition: "width 0.4s ease",
        }}
      />
    </div>
  );
}

// Percent of this module's chapters marked READ. A single useSyncExternalStore
// subscription tracks the progress version; on each version bump we re-read
// every chapter's stored progress directly (no per-item hook), which keeps this
// rules-of-hooks-safe regardless of how many chapters a module has. The server
// snapshot is the stable version 0, so SSR/first-paint reads are consistent.
function useModuleCompletion(chapterIds: string[]): number {
  // Subscribe once; `version` is read so the component re-renders on any write.
  const version = useSyncExternalStore(subscribe, getVersion, getServerVersion);
  void version;

  const total = chapterIds.length;
  if (total === 0) return 0;
  let read = 0;
  for (const id of chapterIds) {
    if (getProgress(id).read) read += 1;
  }
  return Math.round((read / total) * 100);
}

// ─── Reset-all link (subtle footer placement) ────────────────────────────────
// Keeps the existing global "Reset all progress" capability reachable. Only
// rendered once mounted (there is stored data to clear) to avoid SSR flicker.
export function ResetAllControl() {
  const mounted = useHasMounted();
  if (!mounted) return null;
  return (
    <ResetButton
      label="Reset all progress"
      onConfirm={clearAllProgress}
      doneMessage="All progress reset"
      variant="danger"
    />
  );
}
