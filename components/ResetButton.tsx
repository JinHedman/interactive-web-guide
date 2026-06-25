"use client";

import { useEffect, useRef, useState } from "react";

interface Props {
  // Label shown in the resting state.
  label: string;
  // Called when the user confirms. Should perform the reset.
  onConfirm: () => void;
  // Message announced (aria-live) after a successful reset.
  doneMessage: string;
  // Visual emphasis: "subtle" (per-section) or "danger" (global).
  variant?: "subtle" | "danger";
}

// Inline two-step confirmation control: "Reset" → "Confirm / Cancel".
// No window.confirm/alert — fully inline, keyboard operable, screen-reader
// friendly (aria-live announcements, focus moved to the confirm button).
export default function ResetButton({
  label,
  onConfirm,
  doneMessage,
  variant = "subtle",
}: Props) {
  const [phase, setPhase] = useState<"idle" | "confirming" | "done">("idle");
  const confirmRef = useRef<HTMLButtonElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  // Move focus to the confirm button when entering the confirming phase.
  useEffect(() => {
    if (phase === "confirming") confirmRef.current?.focus();
  }, [phase]);

  // Auto-clear the "done" announcement after a moment, back to idle.
  useEffect(() => {
    if (phase !== "done") return;
    const t = setTimeout(() => setPhase("idle"), 2500);
    return () => clearTimeout(t);
  }, [phase]);

  const danger = variant === "danger";
  const accent = danger ? "#dc2626" : "var(--brand)";

  function handleConfirm() {
    onConfirm();
    setPhase("done");
  }

  function handleCancel() {
    setPhase("idle");
    triggerRef.current?.focus();
  }

  return (
    <span
      style={{ display: "inline-flex", alignItems: "center", gap: "8px", flexWrap: "wrap" }}
    >
      {phase === "idle" && (
        <button
          ref={triggerRef}
          type="button"
          onClick={() => setPhase("confirming")}
          style={resetTriggerStyle(accent)}
        >
          {label}
        </button>
      )}

      {phase === "confirming" && (
        <span
          role="group"
          aria-label="Confirm reset"
          style={{ display: "inline-flex", alignItems: "center", gap: "8px", flexWrap: "wrap" }}
        >
          <span style={{ fontSize: "0.85rem", color: "var(--fg-muted)" }}>
            Are you sure?
          </span>
          <button
            ref={confirmRef}
            type="button"
            onClick={handleConfirm}
            onKeyDown={(e) => {
              if (e.key === "Escape") handleCancel();
            }}
            style={{
              ...confirmStyle,
              background: accent,
            }}
          >
            Confirm
          </button>
          <button
            type="button"
            onClick={handleCancel}
            onKeyDown={(e) => {
              if (e.key === "Escape") handleCancel();
            }}
            style={cancelStyle}
          >
            Cancel
          </button>
        </span>
      )}

      {phase === "done" && (
        <span style={{ fontSize: "0.85rem", fontWeight: 600, color: "var(--progress-read)" }}>
          {doneMessage}
        </span>
      )}

      {/* Polite announcement for screen readers regardless of visual phase. */}
      <span
        aria-live="polite"
        aria-atomic="true"
        style={{
          position: "absolute",
          width: 1,
          height: 1,
          padding: 0,
          margin: -1,
          overflow: "hidden",
          clip: "rect(0 0 0 0)",
          whiteSpace: "nowrap",
          border: 0,
        }}
      >
        {phase === "confirming" ? "Confirm to reset, or cancel." : ""}
        {phase === "done" ? doneMessage : ""}
      </span>
    </span>
  );
}

function resetTriggerStyle(accent: string): React.CSSProperties {
  return {
    padding: "6px 12px",
    background: "none",
    color: accent,
    border: `1px solid ${accent}`,
    borderRadius: "6px",
    fontWeight: 500,
    fontSize: "0.8rem",
    cursor: "pointer",
  };
}

const confirmStyle: React.CSSProperties = {
  padding: "6px 14px",
  color: "#fff",
  border: "none",
  borderRadius: "6px",
  fontWeight: 600,
  fontSize: "0.8rem",
  cursor: "pointer",
};

const cancelStyle: React.CSSProperties = {
  padding: "6px 12px",
  background: "none",
  color: "var(--fg-muted)",
  border: "1px solid var(--border)",
  borderRadius: "6px",
  fontWeight: 500,
  fontSize: "0.8rem",
  cursor: "pointer",
};
