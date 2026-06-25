"use client";

import { useEffect, useState } from "react";
import { getProgress } from "@/lib/progress";
import type { ChapterProgress } from "@/lib/types";

interface Props {
  chapterId: string; // "module/slug"
}

export default function ProgressDots({ chapterId }: Props) {
  const [progress, setProgress] = useState<ChapterProgress>({
    read: false,
    exerciseDone: false,
    quizScore: null,
  });

  useEffect(() => {
    setProgress(getProgress(chapterId));

    function onProgress(e: Event) {
      const detail = (e as CustomEvent).detail;
      if (detail?.chapterId === chapterId) {
        setProgress(detail.progress);
      }
    }

    window.addEventListener("guide:progress", onProgress);
    return () => window.removeEventListener("guide:progress", onProgress);
  }, [chapterId]);

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
        width: "7px",
        height: "7px",
        borderRadius: "50%",
        background: filled ? color : "var(--border-strong)",
        transition: "background 0.2s",
      }}
    />
  );
}
