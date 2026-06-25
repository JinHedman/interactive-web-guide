"use client";

import { useEffect, useId, useRef, useState } from "react";
import { usePathname } from "next/navigation";

interface Props {
  /** The server-rendered <Sidebar> tree (nav + theme toggle). */
  sidebar: React.ReactNode;
  children: React.ReactNode;
}

/**
 * Responsive shell for the /learn routes.
 *
 * Desktop (>768px): sidebar is a sticky column, drawer state is inert.
 * Mobile (<=768px): sidebar becomes an off-canvas drawer toggled by a
 * hamburger button in a sticky top bar. The drawer is Escape-closable,
 * closes on backdrop click and on navigation, traps focus while open,
 * and restores focus to the toggle on close.
 */
const COLLAPSE_KEY = "guide:sidebar-collapsed";

export default function LearnShell({ sidebar, children }: Props) {
  const [open, setOpen] = useState(false);
  // Desktop-only collapse (CSS hides/shows the column per the data attribute;
  // on mobile the drawer is driven by `open` instead). Starts expanded so SSR
  // and the first client paint match, then upgrades from the stored preference
  // on mount — a brief flash on a hard reload, never a hydration mismatch.
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();
  const drawerId = useId();
  const toggleRef = useRef<HTMLButtonElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);

  // Close the drawer whenever the route changes (e.g. tapping a nav link).
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Restore the persisted desktop collapse preference after mount.
  useEffect(() => {
    try {
      if (localStorage.getItem(COLLAPSE_KEY) === "true") setCollapsed(true);
    } catch {
      // ignore (private mode / disabled storage)
    }
  }, []);

  function setCollapsedPersisted(next: boolean) {
    setCollapsed(next);
    try {
      localStorage.setItem(COLLAPSE_KEY, next ? "true" : "false");
    } catch {
      // ignore
    }
  }

  // While open: lock body scroll, handle Escape, and trap focus in the drawer.
  useEffect(() => {
    if (!open) return;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // Move focus into the drawer.
    const drawer = drawerRef.current;
    const focusables = () =>
      drawer
        ? Array.from(
            drawer.querySelectorAll<HTMLElement>(
              'a[href], button:not([disabled]), input, [tabindex]:not([tabindex="-1"])'
            )
          ).filter((el) => el.offsetParent !== null)
        : [];

    focusables()[0]?.focus();

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        e.preventDefault();
        setOpen(false);
        return;
      }
      if (e.key === "Tab") {
        const items = focusables();
        if (items.length === 0) return;
        const first = items[0];
        const last = items[items.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    }

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [open]);

  function close() {
    setOpen(false);
    // Return focus to the toggle for keyboard users.
    toggleRef.current?.focus();
  }

  return (
    <div className="learn-shell" data-collapsed={collapsed ? "true" : undefined}>
      {/* Desktop-only: re-open the collapsed sidebar. Visible only while
          collapsed (CSS), floats over the top-left of the reading column. */}
      <button
        type="button"
        className="sidebar-expand"
        aria-label="Show navigation sidebar"
        aria-expanded={!collapsed}
        onClick={() => setCollapsedPersisted(false)}
      >
        <span aria-hidden="true">»</span>
      </button>

      {/* Mobile-only top bar with the drawer toggle. */}
      <div className="learn-topbar">
        <button
          ref={toggleRef}
          type="button"
          className="nav-toggle"
          aria-expanded={open}
          aria-controls={drawerId}
          aria-label={open ? "Close navigation menu" : "Open navigation menu"}
          onClick={() => setOpen((v) => !v)}
        >
          <span aria-hidden="true">☰</span>
          <span>Menu</span>
        </button>
        <span style={{ fontWeight: 700, fontSize: "0.95rem", letterSpacing: "-0.01em" }}>
          Programming Guide
        </span>
      </div>

      {/* Backdrop (mobile, only visible while open). */}
      <div
        className="sidebar-backdrop"
        data-open={open ? "true" : undefined}
        aria-hidden="true"
        onClick={close}
      />

      {/* Sidebar / drawer. The inner <nav> (from Sidebar) is the landmark. */}
      <div
        ref={drawerRef}
        id={drawerId}
        className="sidebar"
        data-open={open ? "true" : undefined}
      >
        <button
          type="button"
          className="sidebar-close"
          aria-label="Close navigation menu"
          onClick={close}
        >
          <span aria-hidden="true">✕</span>
        </button>
        {/* Desktop-only: collapse the sidebar to widen the reading column. */}
        <button
          type="button"
          className="sidebar-collapse"
          aria-label="Collapse navigation sidebar"
          aria-expanded={!collapsed}
          onClick={() => setCollapsedPersisted(true)}
        >
          <span aria-hidden="true">«</span>
        </button>
        {sidebar}
      </div>

      <main id="main-content" className="learn-main">
        {children}
      </main>
    </div>
  );
}
