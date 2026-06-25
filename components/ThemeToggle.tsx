"use client";

import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [dark, setDark] = useState(false);

  // Sync from DOM on mount (the inline script already applied the theme)
  useEffect(() => {
    const isDark = document.documentElement.getAttribute("data-theme") === "dark";
    setDark(isDark);
  }, []);

  function setTheme(next: boolean) {
    setDark(next);
    if (next) {
      document.documentElement.setAttribute("data-theme", "dark");
      localStorage.setItem("guide:theme", "dark");
    } else {
      document.documentElement.removeAttribute("data-theme");
      localStorage.setItem("guide:theme", "light");
    }
  }

  return (
    <div
      role="group"
      aria-label="Theme"
      style={{
        display: "flex",
        gap: "5px",
        background: "var(--bg-subtle)",
        borderRadius: "9px",
        padding: "4px",
      }}
    >
      <Segment
        active={!dark}
        label="Light"
        glyph="☀"
        onClick={() => setTheme(false)}
      />
      <Segment
        active={dark}
        label="Dark"
        glyph="☾"
        onClick={() => setTheme(true)}
      />
    </div>
  );
}

function Segment({
  active,
  label,
  glyph,
  onClick,
}: {
  active: boolean;
  label: string;
  glyph: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      aria-label={`Switch to ${label.toLowerCase()} theme`}
      title={`Switch to ${label.toLowerCase()} theme`}
      style={{
        flex: 1,
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "5px",
        minHeight: "30px",
        padding: "5px",
        border: "none",
        borderRadius: "6px",
        cursor: "pointer",
        fontFamily: "var(--font-sans)",
        fontSize: "12px",
        fontWeight: active ? 600 : 500,
        lineHeight: 1,
        color: active ? "var(--fg-base)" : "var(--fg-subtle)",
        background: active ? "var(--bg-surface)" : "transparent",
        boxShadow: active ? "0 1px 2px rgba(0, 0, 0, 0.07)" : "none",
        transition: "background 0.15s, color 0.15s, box-shadow 0.15s",
      }}
    >
      <span aria-hidden>{glyph}</span>
      <span>{label}</span>
    </button>
  );
}
