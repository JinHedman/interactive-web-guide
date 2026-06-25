"use client";

import { useEffect, useState } from "react";
import { getProgress, markExerciseDone } from "@/lib/progress";

export interface ExerciseProps {
  title: string;
  goal: string;
  steps: string[];
  expected: string;
  solution: string;
  chapterId?: string; // e.g. "html/1-structure"
}

export default function Exercise({
  title,
  goal,
  steps = [],
  expected,
  solution,
  chapterId,
}: ExerciseProps) {
  const [showSolution, setShowSolution] = useState(false);
  const [done, setDone] = useState(false);

  // Hydration-safe: read localStorage after mount
  useEffect(() => {
    if (chapterId) {
      setDone(getProgress(chapterId).exerciseDone);
    }

    function onProgress(e: Event) {
      const detail = (e as CustomEvent).detail;
      if (detail?.chapterId === chapterId) {
        setDone(detail.progress.exerciseDone);
      }
    }

    window.addEventListener("guide:progress", onProgress);
    return () => window.removeEventListener("guide:progress", onProgress);
  }, [chapterId]);

  function handleMarkDone() {
    if (chapterId) markExerciseDone(chapterId);
    setDone(true);
  }

  return (
    <section
      aria-label={`Exercise: ${title}`}
      style={{
        margin: "2rem 0",
        border: "1px solid var(--border)",
        borderRadius: "10px",
        overflow: "hidden",
        background: "var(--bg-surface)",
      }}
    >
      {/* Header */}
      <div
        style={{
          padding: "14px 20px",
          background: "color-mix(in srgb, var(--progress-exercise) 12%, var(--bg-subtle))",
          borderBottom: "1px solid var(--border)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "12px",
          flexWrap: "wrap",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <span aria-hidden style={{ fontSize: "1.1rem" }}>&#x1F4BB;</span>
          <span style={{ fontWeight: 600, fontSize: "0.95rem", color: "var(--fg-base)" }}>
            Exercise: {title}
          </span>
        </div>
        {done && (
          <span
            style={{
              fontSize: "0.8rem",
              fontWeight: 600,
              color: "var(--progress-read)",
              background: "color-mix(in srgb, var(--progress-read) 12%, transparent)",
              padding: "3px 10px",
              borderRadius: "20px",
              border: "1px solid var(--progress-read)",
            }}
          >
            Completed
          </span>
        )}
      </div>

      {/* Body */}
      <div style={{ padding: "20px" }}>
        {/* Goal */}
        <div
          style={{
            marginBottom: "16px",
            padding: "12px 16px",
            background: "var(--bg-accent)",
            border: "1px solid var(--border)",
            borderRadius: "6px",
          }}
        >
          <strong style={{ display: "block", fontSize: "0.8rem", letterSpacing: "0.05em", textTransform: "uppercase", color: "var(--fg-muted)", marginBottom: "4px" }}>
            Goal
          </strong>
          <p style={{ margin: 0, fontSize: "0.95rem" }}>{goal}</p>
        </div>

        {/* Steps */}
        <div style={{ marginBottom: "16px" }}>
          <strong style={{ display: "block", fontSize: "0.8rem", letterSpacing: "0.05em", textTransform: "uppercase", color: "var(--fg-muted)", marginBottom: "8px" }}>
            Steps
          </strong>
          <ol style={{ margin: 0, paddingLeft: "1.4rem", display: "flex", flexDirection: "column", gap: "8px" }}>
            {steps.map((step, i) => (
              <li key={i} style={{ fontSize: "0.9rem", lineHeight: 1.6 }}>
                {step}
              </li>
            ))}
          </ol>
        </div>

        {/* Expected result */}
        <div
          style={{
            marginBottom: "20px",
            padding: "10px 16px",
            background: "var(--bg-subtle)",
            borderRadius: "6px",
            border: "1px solid var(--border)",
          }}
        >
          <strong style={{ display: "block", fontSize: "0.8rem", letterSpacing: "0.05em", textTransform: "uppercase", color: "var(--fg-muted)", marginBottom: "4px" }}>
            Expected result
          </strong>
          <p style={{ margin: 0, fontSize: "0.875rem", color: "var(--fg-muted)" }}>
            {expected}
          </p>
        </div>

        {/* Action buttons */}
        <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", alignItems: "center" }}>
          <button
            onClick={() => setShowSolution((s) => !s)}
            style={{
              padding: "7px 14px",
              background: "none",
              color: "var(--fg-muted)",
              border: "1px solid var(--border)",
              borderRadius: "6px",
              fontWeight: 500,
              fontSize: "0.875rem",
              cursor: "pointer",
            }}
            aria-expanded={showSolution}
          >
            {showSolution ? "Hide solution" : "Reveal solution"}
          </button>

          {!done && (
            <button
              onClick={handleMarkDone}
              style={{
                padding: "7px 14px",
                background: "var(--progress-read)",
                color: "#fff",
                border: "none",
                borderRadius: "6px",
                fontWeight: 600,
                fontSize: "0.875rem",
                cursor: "pointer",
              }}
            >
              Mark complete
            </button>
          )}
        </div>

        {/* Solution (revealed on demand) */}
        {showSolution && (
          <div style={{ marginTop: "16px" }}>
            <pre
              style={{
                background: "var(--code-bg)",
                color: "var(--code-fg)",
                borderRadius: "6px",
                padding: "1rem 1.25rem",
                overflowX: "auto",
                fontFamily: "var(--font-mono)",
                fontSize: "0.875rem",
                lineHeight: 1.65,
                margin: 0,
              }}
            >
              <code>{solution}</code>
            </pre>
          </div>
        )}
      </div>
    </section>
  );
}
