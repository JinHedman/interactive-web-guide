"use client";

import { useChapterProgress } from "@/lib/useProgress";

interface Props {
  chapterId: string; // "module/slug"
  exerciseIds: string[]; // one dot per exercise in the chapter
  hasQuiz: boolean; // adds the trailing quiz dot
}

// One dot per trackable item in the chapter: a "read" dot, one dot per
// exercise, and (if present) a quiz dot. A dot is filled when that item is
// done. While the chapter is only partly done the filled dots are amber; once
// every item is complete they all turn green — so a glance down the sidebar
// shows both how much a chapter contains and how far through it you are.
export default function ProgressDots({ chapterId, exerciseIds, hasQuiz }: Props) {
  // Live, hydration-safe: empty on the server / first paint, then real values,
  // and re-renders on any write or reset (same tab or another tab).
  const progress = useChapterProgress(chapterId);

  const exerciseDone = exerciseIds.map((id) => progress.exercisesDone.includes(id));
  const quizDone = progress.quizScore !== null;

  const total = 1 + exerciseIds.length + (hasQuiz ? 1 : 0);
  const completed =
    (progress.read ? 1 : 0) +
    exerciseDone.filter(Boolean).length +
    (hasQuiz && quizDone ? 1 : 0);
  const allComplete = completed === total;

  // Amber while partial, green when fully complete (see lib/progress tokens).
  const fill = allComplete ? "var(--progress-read)" : "var(--progress-exercise)";

  const exerciseCount = exerciseIds.length;

  return (
    <span
      aria-label={`Progress: ${completed} of ${total} complete`}
      style={{ display: "inline-flex", gap: "4px", alignItems: "center", flexShrink: 0 }}
    >
      <Dot filled={progress.read} fill={fill} title={progress.read ? "Read" : "Not read yet"} />
      {exerciseIds.map((eid, i) => (
        <Dot
          key={eid}
          filled={exerciseDone[i]}
          fill={fill}
          title={`Exercise ${i + 1}${exerciseCount > 1 ? ` of ${exerciseCount}` : ""}${exerciseDone[i] ? " — done" : ""}`}
        />
      ))}
      {hasQuiz && (
        <Dot
          filled={quizDone}
          fill={fill}
          title={quizDone ? `Quiz: ${progress.quizScore}%` : "Quiz not taken"}
        />
      )}
    </span>
  );
}

function Dot({
  filled,
  fill,
  title,
}: {
  filled: boolean;
  fill: string;
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
        background: filled ? fill : "transparent",
        border: filled ? `1px solid ${fill}` : "1px solid var(--dot-incomplete)",
        boxSizing: "border-box",
        transition: "background 0.2s, border-color 0.2s",
      }}
    />
  );
}
