"use client";

import { type ReactNode } from "react";

export interface BlurRevealProps {
  /** Whether the content is currently revealed (controlled by the parent). */
  revealed: boolean;
  /** Reveal the content — called when the overlay button is pressed. */
  onReveal: () => void;
  /** Label for the reveal button, e.g. "Reveal solution". */
  revealLabel: string;
  /**
   * Optional accessible label for the revealed region, applied only after
   * reveal so AT never announces the spoiler early. Omit to leave the region
   * unlabeled.
   */
  hiddenLabel?: string;
  children: ReactNode;
}

/**
 * Spoiler-safe blur-to-reveal wrapper.
 *
 * Before reveal:
 *  - children are heavily blurred (filter: blur(6px)) so nothing is legible,
 *  - non-selectable (user-select:none) and not interactive (pointer-events:none),
 *  - hidden from assistive tech (`aria-hidden` + `inert`) and the tab order,
 *  - covered by a real <button> overlay that is the only way to reveal.
 *
 * After reveal:
 *  - the blur is removed, content is selectable, interactive, and exposed to
 *    assistive tech; the overlay button is gone.
 *
 * Transitions are skipped under prefers-reduced-motion via the CSS class below
 * (globals.css already neutralizes transition-duration for reduced motion).
 */
export default function BlurReveal({
  revealed,
  onReveal,
  revealLabel,
  hiddenLabel,
  children,
}: BlurRevealProps) {
  return (
    <div style={{ position: "relative" }}>
      <div
        // Hidden from AT + removed from tab order until deliberately revealed,
        // so screen readers don't announce the spoiler early. `inert` blocks
        // focus/interaction on any focusable descendants too.
        aria-hidden={revealed ? undefined : true}
        // React 19 supports `inert` as a real boolean prop. While inert the
        // subtree is fully removed from focus order and pointer interaction.
        inert={!revealed}
        aria-label={revealed ? hiddenLabel : undefined}
        style={{
          filter: revealed ? "none" : "blur(6px)",
          userSelect: revealed ? "auto" : "none",
          WebkitUserSelect: revealed ? "auto" : "none",
          pointerEvents: revealed ? "auto" : "none",
          transition: "filter 0.18s ease",
          // Slight clip so the blur halo doesn't bleed past the rounded box.
          borderRadius: "6px",
          overflow: "hidden",
        }}
      >
        {children}
      </div>

      {!revealed && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            // Faint scrim so the blurred text reads as "intentionally hidden".
            background: "color-mix(in srgb, var(--bg-surface) 30%, transparent)",
            borderRadius: "6px",
          }}
        >
          <button
            type="button"
            onClick={onReveal}
            style={{
              padding: "9px 18px",
              background: "var(--bg-surface)",
              color: "var(--fg-base)",
              border: "1px solid var(--border-strong)",
              borderRadius: "8px",
              fontWeight: 600,
              fontSize: "13px",
              cursor: "pointer",
              boxShadow: "0 1px 4px color-mix(in srgb, var(--fg-base) 18%, transparent)",
            }}
          >
            {revealLabel}
          </button>
        </div>
      )}
    </div>
  );
}
