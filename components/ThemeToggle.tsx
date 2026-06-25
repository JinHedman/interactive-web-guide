"use client";

import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [dark, setDark] = useState(false);

  // Sync from DOM on mount (the inline script already applied the theme)
  useEffect(() => {
    const isDark = document.documentElement.getAttribute("data-theme") === "dark";
    setDark(isDark);
  }, []);

  function toggle() {
    const next = !dark;
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
    <button
      onClick={toggle}
      aria-label={dark ? "Switch to light theme" : "Switch to dark theme"}
      title={dark ? "Switch to light theme" : "Switch to dark theme"}
      style={{
        background: "none",
        border: "1px solid var(--border)",
        borderRadius: "6px",
        padding: "8px 12px",
        minHeight: "36px",
        cursor: "pointer",
        color: "var(--fg-muted)",
        fontSize: "0.875rem",
        lineHeight: 1,
        display: "flex",
        alignItems: "center",
        gap: "6px",
        transition: "border-color 0.15s, color 0.15s",
      }}
    >
      {dark ? "☀" : "☾"}
      <span style={{ fontSize: "0.8rem" }}>{dark ? "Light" : "Dark"}</span>
    </button>
  );
}
