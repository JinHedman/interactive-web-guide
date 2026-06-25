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
        minHeight: "26px",
        background: "none",
        border: "1px solid var(--border)",
        borderRadius: "4px",
        padding: "4px 10px",
        cursor: "pointer",
        fontSize: "0.72rem",
        color: copied ? "var(--progress-read)" : "var(--fg-muted)",
        fontFamily: "var(--font-sans)",
        transition: "color 0.15s, border-color 0.15s",
        whiteSpace: "nowrap",
      }}
    >
      {copied ? "Copied!" : "Copy"}
    </button>
  );
}
