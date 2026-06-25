// Shared presentational "code window" used by both CodeExample (multi-file
// display) and the Exercise solution. Pure presentation + the existing Copy
// button; server-renderable (no hooks of its own — CopyButton is the only
// client island). Receives ALREADY-highlighted Shiki HTML so it can be used in
// any RSC context.
import CopyButton from "./CopyButton";

export interface CodeFileWindowProps {
  /** Filename shown in the title bar (monospace), e.g. "index.html". */
  name: string;
  /** Pre-rendered Shiki HTML for this file (from lib/highlight). */
  html: string;
  /** Raw source, used only for the Copy button. */
  code: string;
  /**
   * When true the window is part of a vertical stack and gets a small top
   * margin to separate it from the previous window. The first window passes
   * false so the stack hugs its container.
   */
  stacked?: boolean;
}

export default function CodeFileWindow({
  name,
  html,
  code,
  stacked = true,
}: CodeFileWindowProps) {
  return (
    <section
      aria-label={`File: ${name}`}
      style={{
        borderRadius: "10px",
        border: "1px solid var(--border)",
        overflow: "hidden",
        background: "var(--bg-surface)",
        marginTop: stacked ? "10px" : 0,
      }}
    >
      {/* Title bar: filename (monospace) + Copy */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "12px",
          padding: "7px 12px",
          background: "var(--bg-subtle)",
          borderBottom: "1px solid var(--border)",
        }}
      >
        <span
          style={{
            fontSize: "12px",
            fontWeight: 600,
            color: "var(--fg-muted)",
            fontFamily: "var(--font-mono)",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {name}
        </span>
        <CopyButton code={code} />
      </div>

      {/* Highlighted code surface (reuses the global .shiki chrome). */}
      <div
        className="code-pane-scroll"
        style={{ background: "var(--code-bg)" }}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </section>
  );
}
