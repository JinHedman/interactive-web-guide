"use client";

import { useChapterProgress } from "@/lib/useProgress";

interface Props {
  chapterId: string; // "module/slug"
}

export default function ProgressDots({ chapterId }: Props) {
  // Live, hydration-safe: empty on the server / first paint, then real values,
  // and re-renders on any write or reset (same tab or another tab).
  const progress = useChapterProgress(chapterId);

  return (
    <span
      aria-label={`Progress: read=${progress.read}, exercise=${progress.exerciseDone}, quiz score=${progress.quizScore ?? "none"}`}
      style={{ display: "inline-flex", gap: "4px", alignItems: "center" }}
    >
      <Dot
        filled={progress.read}
        color="var(--progress-read)"
        title="Read"
      />
      <Dot
        filled={progress.exerciseDone}
        color="var(--progress-exercise)"
        title="Exercise done"
      />
      <Dot
        filled={progress.quizScore !== null}
        color="var(--progress-quiz)"
        title={progress.quizScore !== null ? `Quiz: ${progress.quizScore}%` : "Quiz not taken"}
      />
    </span>
  );
}

function Dot({
  filled,
  color,
  title,
}: {
  filled: boolean;
  color: string;
  title: string;
}) {
  return (
    <span
      title={title}
      style={{
        display: "inline-block",
        width: "8px",
        height: "8px",
        borderRadius: "50%",
        // Distinguish by shape (filled disc vs. hollow ring), not color alone,
        // so colorblind sighted users can tell done from not-done.
        background: filled ? color : "transparent",
        border: filled ? `1px solid ${color}` : "1px solid var(--dot-incomplete)",
        boxSizing: "border-box",
        transition: "background 0.2s, border-color 0.2s",
      }}
    />
  );
}
