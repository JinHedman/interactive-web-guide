"use client";

import { useEffect, useState } from "react";
import { markExerciseDone, type ProgressEventDetail } from "@/lib/progress";
import { useChapterProgress } from "@/lib/useProgress";
import { exerciseId } from "@/lib/ids";
import BlurReveal from "./BlurReveal";
import CodeFileWindow from "./CodeFileWindow";

/**
 * One pre-highlighted solution file. The server-side Exercise wrapper (in
 * mdx-components) runs Shiki and hands these down so the client component can
 * render them inside BlurReveal without re-highlighting.
 */
export interface HighlightedSolutionFile {
  name: string;
  code: string;
  html: string;
}

export interface ExerciseProps {
  title: string;
  goal: string;
  steps: string[];
  expected: string;
  /**
   * Pre-highlighted solution windows, supplied by the RSC wrapper. Single- and
   * multi-file CODE solutions both normalize to this array (one entry per
   * window). Empty when the solution is explanatory prose.
   */
  solutionFiles?: HighlightedSolutionFile[];
  /**
   * Explanatory PROSE solution (set by the RSC wrapper when
   * solutionLang="text"). Rendered as normal body text — no code window, no
   * filename bar, no Shiki — but still behind the BlurReveal gate. Mutually
   * exclusive with solutionFiles.
   */
  solutionProse?: string;
  chapterId?: string; // e.g. "html/1-structure"
}

export default function Exercise({
  title,
  goal,
  steps = [],
  expected,
  solutionFiles = [],
  solutionProse,
  chapterId,
}: ExerciseProps) {
  const [showSolution, setShowSolution] = useState(false);

  // This exercise's stable id within its chapter (slug of its title). Tracked
  // independently so chapters with several exercises don't share one flag.
  const id = exerciseId(title);

  // Live, hydration-safe completion state. Reflects "Mark complete" as well as
  // any per-chapter / global reset — no manual refresh needed.
  const done = useChapterProgress(chapterId ?? "").exercisesDone.includes(id);

  function handleMarkDone() {
    if (chapterId) markExerciseDone(chapterId, id);
  }

  // Re-blur the solution when this chapter is reset (per-chapter "Reset this
  // section" or the global "Reset all progress"), matching how the Quiz resets
  // itself on the same `guide:progress` event channel.
  useEffect(() => {
    function onProgress(e: Event) {
      const detail = (e as CustomEvent<ProgressEventDetail>).detail;
      if (!detail) return;
      const affectsUs =
        detail.kind === "clear-all" ||
        (detail.kind === "reset-chapter" && detail.chapterId === chapterId);
      if (affectsUs) setShowSolution(false);
    }
    window.addEventListener("guide:progress", onProgress);
    return () => window.removeEventListener("guide:progress", onProgress);
  }, [chapterId]);

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
          {showSolution && (
            <button
              type="button"
              onClick={() => setShowSolution(false)}
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
              Hide solution
            </button>
          )}

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

        {/* Solution — always rendered, but spoiler-safe: heavily blurred,
            non-selectable and hidden from assistive tech until the learner
            deliberately presses "Reveal solution" (a real button overlay). */}
        <div style={{ marginTop: "16px" }}>
          <strong
            style={{
              display: "block",
              fontSize: "10.5px",
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              color: "var(--fg-subtle)",
              marginBottom: "8px",
            }}
          >
            Solution
          </strong>
          <BlurReveal
            revealed={showSolution}
            onReveal={() => setShowSolution(true)}
            revealLabel="Reveal solution"
            hiddenLabel={`Solution for ${title}`}
          >
            {solutionProse !== undefined ? (
              /* Prose solution (solutionLang="text"): readable body text, no
                 code-window chrome / filename bar / Shiki. Matches the in-card
                 body typography used by Goal / Expected. */
              <div
                style={{
                  padding: "12px 15px",
                  background: "var(--bg-base)",
                  border: "1px solid var(--border)",
                  borderRadius: "8px",
                }}
              >
                <p
                  style={{
                    margin: 0,
                    fontSize: "14px",
                    lineHeight: 1.6,
                    color: "var(--fg-base)",
                    whiteSpace: "pre-wrap",
                  }}
                >
                  {solutionProse}
                </p>
              </div>
            ) : (
              /* Each solution file is its own labeled, highlighted window —
                 matching CodeExample's multi-file styling. */
              <div>
                {solutionFiles.map((f, i) => (
                  <CodeFileWindow
                    key={`${f.name}-${i}`}
                    name={f.name}
                    html={f.html}
                    code={f.code}
                    stacked={i > 0}
                  />
                ))}
              </div>
            )}
          </BlurReveal>
        </div>
      </div>
    </section>
  );
}
