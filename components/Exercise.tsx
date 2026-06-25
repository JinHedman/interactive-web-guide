"use client";

import { useState } from "react";
import { markExerciseDone } from "@/lib/progress";
import { useChapterProgress } from "@/lib/useProgress";

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

  // Live, hydration-safe completion state. Reflects "Mark complete" as well as
  // any per-chapter / global reset — no manual refresh needed.
  const done = useChapterProgress(chapterId ?? "").exerciseDone;

  function handleMarkDone() {
    if (chapterId) markExerciseDone(chapterId);
  }

  return (
    <section
      aria-label={`Exercise: ${title}`}
      style={{
        margin: "28px 0",
        border: "1px solid var(--border)",
        borderRadius: "12px",
        overflow: "hidden",
        background: "var(--bg-surface)",
      }}
    >
      {/* Header */}
      <div
        style={{
          padding: "13px 18px",
          background: "var(--bg-accent)",
          borderBottom: "1px solid var(--border)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "12px",
          flexWrap: "wrap",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "9px" }}>
          <span
            aria-hidden
            style={{
              width: "22px",
              height: "22px",
              borderRadius: "6px",
              background: "var(--progress-exercise)",
              color: "#fff",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "11px",
              flexShrink: 0,
            }}
          >
            &#x270E;
          </span>
          <span style={{ fontWeight: 600, fontSize: "14px", color: "var(--fg-base)" }}>
            Exercise — {title}
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
      <div style={{ padding: "18px" }}>
        {/* Goal */}
        <div
          style={{
            marginBottom: "14px",
            padding: "12px 15px",
            background: "var(--bg-base)",
            border: "1px solid var(--border)",
            borderRadius: "8px",
          }}
        >
          <strong style={{ display: "block", fontSize: "10.5px", letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--fg-subtle)", marginBottom: "4px" }}>
            Goal
          </strong>
          <p style={{ margin: 0, fontSize: "14px", lineHeight: 1.55 }}>{goal}</p>
        </div>

        {/* Steps */}
        <div style={{ marginBottom: "16px" }}>
          <strong style={{ display: "block", fontSize: "10.5px", letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--fg-subtle)", marginBottom: "8px" }}>
            Steps
          </strong>
          <ol
            style={{
              margin: 0,
              paddingLeft: "20px",
              listStyle: "decimal",
              listStylePosition: "outside",
            }}
          >
            {steps.map((step, i) => (
              <li
                key={i}
                style={{
                  fontSize: "14px",
                  lineHeight: 1.55,
                  marginBottom: i < steps.length - 1 ? "6px" : 0,
                }}
              >
                {step}
              </li>
            ))}
          </ol>
        </div>

        {/* Expected result */}
        <div
          style={{
            marginBottom: "18px",
            padding: "10px 15px",
            background: "var(--bg-subtle)",
            borderRadius: "8px",
            border: "1px solid var(--border)",
          }}
        >
          <strong style={{ display: "block", fontSize: "10.5px", letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--fg-subtle)", marginBottom: "4px" }}>
            Expected result
          </strong>
          <p style={{ margin: 0, fontSize: "13px", color: "var(--fg-muted)" }}>
            {expected}
          </p>
        </div>

        {/* Action buttons */}
        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", alignItems: "center" }}>
          <button
            onClick={() => setShowSolution((s) => !s)}
            style={{
              padding: "8px 16px",
              background: "none",
              color: "var(--fg-muted)",
              border: "1px solid var(--border-strong)",
              borderRadius: "8px",
              fontWeight: 500,
              fontSize: "13px",
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
                padding: "8px 16px",
                background: "var(--progress-read)",
                color: "#fff",
                border: "none",
                borderRadius: "8px",
                fontWeight: 600,
                fontSize: "13px",
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
