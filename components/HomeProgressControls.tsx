"use client";

import Link from "next/link";
import { clearAllProgress } from "@/lib/progress";
import { useHasMounted, useLastVisited } from "@/lib/useProgress";
import ResetButton from "./ResetButton";

interface Props {
  // Href of the very first chapter — the fallback resume target. May be null
  // if no content exists yet.
  firstChapterHref: string | null;
}

// Client-only home controls: a "Continue where you left off" resume button and
// a global "Reset all progress" control. Both reflect localStorage live.
export default function HomeProgressControls({ firstChapterHref }: Props) {
  const mounted = useHasMounted();
  const lastVisited = useLastVisited();

  // Resume target: most recently visited chapter, else the first chapter.
  const resumeHref =
    lastVisited != null ? `/learn/${lastVisited}` : firstChapterHref;
  // We only "continue" (vs "start") when there's real history.
  const hasHistory = mounted && lastVisited != null;

  return (
    <div style={{ marginTop: "28px", display: "flex", flexDirection: "column", alignItems: "center", gap: "16px" }}>
      {/* Resume button — gated on mount to avoid SSR/CSR mismatch. Renders a
          stable placeholder height before mount so layout doesn't jump. */}
      <div aria-live="polite" style={{ minHeight: "44px", display: "flex", alignItems: "center" }}>
        {!mounted ? null : hasHistory && resumeHref ? (
          <Link href={resumeHref} style={resumeBtnStyle}>
            Continue where you left off →
          </Link>
        ) : null}
      </div>

      {/* Global reset — only meaningful once mounted (there is stored data). */}
      {mounted && (
        <ResetButton
          label="Reset all progress"
          onConfirm={clearAllProgress}
          doneMessage="All progress reset"
          variant="danger"
        />
      )}
    </div>
  );
}

const resumeBtnStyle: React.CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  gap: "8px",
  padding: "12px 28px",
  background: "var(--brand)",
  color: "#fff",
  borderRadius: "8px",
  textDecoration: "none",
  fontWeight: 600,
  fontSize: "0.95rem",
};
