"use client";

import { resetChapter } from "@/lib/progress";
import ResetButton from "./ResetButton";

// Per-chapter "Reset this section" control. Clears this chapter's stored
// progress (read / exerciseDone / quizScore); the Quiz, Exercise, and
// ProgressDots all update live via the progress event channel.
export default function ChapterReset({ chapterId }: { chapterId: string }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "flex-end",
        marginTop: "16px",
      }}
    >
      <ResetButton
        label="Reset this section"
        onConfirm={() => resetChapter(chapterId)}
        doneMessage="Section reset"
        variant="subtle"
      />
    </div>
  );
}
