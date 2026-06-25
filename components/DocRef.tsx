"use client";

import { useId, useRef, useState } from "react";
import type { DocReference } from "@/lib/references";

// Inline code token that auto-links to documentation. Renders the original code
// text styled like normal inline `code` (plus a dotted underline to signal it's
// interactive); on hover, focus, or tap it reveals a small card with links to
// MDN and (when available) W3Schools.
//
// Accessibility: the token is a disclosure button (role=button, aria-expanded)
// controlling the card. It opens on hover (mouse) and toggles on click/Enter/
// Space (keyboard + touch); Escape closes it and the card auto-closes when focus
// or the pointer leaves. The doc links inside are real anchors, focusable in tab
// order once the card is open.
export default function DocRef({
  text,
  reference,
}: {
  text: string;
  reference: DocReference;
}) {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLSpanElement>(null);
  const tokenRef = useRef<HTMLSpanElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const cardId = useId();

  function cancelClose() {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  }
  function openNow() {
    cancelClose();
    setOpen(true);
  }
  // Close shortly after the pointer leaves — but not if focus is still inside
  // (keyboard users), and the delay lets the pointer travel into the card.
  function closeSoon() {
    cancelClose();
    closeTimer.current = setTimeout(() => {
      if (!wrapRef.current?.contains(document.activeElement)) setOpen(false);
    }, 140);
  }

  function onKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Escape" && open) {
      e.stopPropagation();
      setOpen(false);
      tokenRef.current?.focus();
    } else if ((e.key === "Enter" || e.key === " ") && e.target === tokenRef.current) {
      e.preventDefault();
      setOpen((o) => !o);
    }
  }

  // Close when focus leaves the whole component (token + card).
  function onBlur(e: React.FocusEvent) {
    if (!wrapRef.current?.contains(e.relatedTarget as Node | null)) setOpen(false);
  }

  return (
    <span
      ref={wrapRef}
      style={{ position: "relative", display: "inline-block" }}
      onMouseEnter={openNow}
      onMouseLeave={closeSoon}
      onBlur={onBlur}
      onKeyDown={onKeyDown}
    >
      <span
        ref={tokenRef}
        role="button"
        tabIndex={0}
        aria-expanded={open}
        aria-haspopup="true"
        aria-label={`${reference.title} — documentation links`}
        onClick={() => setOpen((o) => !o)}
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "0.875em",
          background: "var(--bg-subtle)",
          border: "1px solid var(--border)",
          borderRadius: "4px",
          padding: "0.1em 0.35em",
          cursor: "help",
          textDecoration: "underline dotted",
          textDecorationColor: "var(--fg-subtle)",
          textUnderlineOffset: "2px",
          whiteSpace: "nowrap",
        }}
      >
        {text}
      </span>

      {open && (
        <span
          id={cardId}
          role="group"
          aria-label={reference.title}
          style={{
            position: "absolute",
            top: "calc(100% + 5px)",
            left: 0,
            zIndex: 60,
            display: "block",
            minWidth: "168px",
            maxWidth: "260px",
            padding: "9px 11px",
            background: "var(--bg-surface)",
            border: "1px solid var(--border-strong)",
            borderRadius: "8px",
            boxShadow: "0 4px 16px rgba(0,0,0,0.16)",
            fontFamily: "var(--font-sans)",
            whiteSpace: "normal",
            textAlign: "left",
            lineHeight: 1.4,
          }}
        >
          <span
            style={{
              display: "block",
              fontSize: "0.78rem",
              fontWeight: 600,
              color: "var(--fg-base)",
              marginBottom: "7px",
            }}
          >
            {reference.title}
          </span>
          <DocLink href={reference.mdn} label="MDN" />
          {reference.w3schools && (
            <DocLink href={reference.w3schools} label="W3Schools" />
          )}
        </span>
      )}
    </span>
  );
}

function DocLink({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        display: "flex",
        alignItems: "center",
        gap: "5px",
        padding: "3px 0",
        fontSize: "0.82rem",
        color: "var(--brand)",
        textDecoration: "none",
      }}
    >
      <span style={{ textDecoration: "underline", textUnderlineOffset: "2px" }}>
        {label}
      </span>
      <svg
        aria-hidden
        width="10"
        height="10"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ flexShrink: 0 }}
      >
        <path d="M7 17L17 7" />
        <path d="M8 7h9v9" />
      </svg>
      <span
        style={{
          position: "absolute",
          width: "1px",
          height: "1px",
          padding: 0,
          margin: "-1px",
          overflow: "hidden",
          clip: "rect(0,0,0,0)",
          whiteSpace: "nowrap",
          border: 0,
        }}
      >
        (opens in new tab)
      </span>
    </a>
  );
}
