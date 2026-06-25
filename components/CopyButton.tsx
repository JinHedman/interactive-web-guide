"use client";

import { useState } from "react";

export default function CopyButton({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard API not available
    }
  }

  return (
    <button
      onClick={handleCopy}
      aria-label={copied ? "Copied!" : "Copy code"}
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "5px",
        minHeight: "26px",
        background: "none",
        border: "none",
        borderRadius: "4px",
        padding: "2px 4px",
        cursor: "pointer",
        fontSize: "12px",
        color: copied ? "var(--progress-read)" : "var(--fg-subtle)",
        fontFamily: "var(--font-sans)",
        transition: "color 0.15s",
        whiteSpace: "nowrap",
      }}
    >
      {copied ? (
        "Copied!"
      ) : (
        <>
          <span aria-hidden>&#x29C9;</span>
          <span>Copy</span>
        </>
      )}
    </button>
  );
}
