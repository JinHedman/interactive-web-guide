import Link from "next/link";
import Logo from "@/components/Logo";
import CodeWindow from "@/components/CodeWindow";
import {
  ResumeButton,
  ModuleProgressBar,
  ResetAllControl,
} from "@/components/HomeProgressControls";
import { getAllChapters } from "@/lib/content";
import { MODULE_ORDER } from "@/lib/types";
import type { ChapterMeta } from "@/lib/types";

// Module display names (mirrors components/SidebarClient.tsx MODULE_LABELS, but
// uses the shorter card titles from the design — Setup/HTML/CSS/… ).
const MODULE_NAMES: Record<string, string> = {
  setup: "Setup",
  html: "HTML",
  css: "CSS",
  javascript: "JavaScript",
  integration: "Integration",
  workflow: "Workflow",
};

// One-line module descriptions (from the handoff README).
const MODULE_DESCRIPTIONS: Record<string, string> = {
  setup: "Tools, the document skeleton, your first page in the browser.",
  html: "Elements, text, links, media, semantics, forms, tables.",
  css: "Selectors, the box model, flexbox, responsive, and grid.",
  javascript: "Variables to functions, then the DOM, conceptually.",
  integration: "Selecting, events, form input, a capstone app, fetch.",
  workflow: "Branches, pull requests, and resolving merge conflicts.",
};

export default function Home() {
  const chapters = getAllChapters();
  const firstChapter = chapters[0] ?? null;

  // Group chapters by module, preserving the canonical MODULE_ORDER and only
  // including modules that actually have content.
  const byModule = new Map<string, ChapterMeta[]>();
  for (const ch of chapters) {
    const list = byModule.get(ch.module) ?? [];
    list.push(ch);
    byModule.set(ch.module, list);
  }
  const modules = MODULE_ORDER.filter((m) => (byModule.get(m)?.length ?? 0) > 0);

  // Derived hero stats — counts from the data, not hardcoded.
  const totalChapters = chapters.length;
  const totalModules = modules.length;
  const totalMinutes = chapters.reduce(
    (sum, ch) => sum + (ch.frontmatter.estMinutes ?? 0),
    0
  );
  const totalHours = Math.round(totalMinutes / 60);

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg-base)" }}>
      {/* Page-scoped CSS: media queries + hover/focus states that inline styles
          cannot express. Kept here (not globals.css) to avoid touching the
          concurrently-edited stylesheet. */}
      <style>{HOME_CSS}</style>

      {/* ─── Top bar ─────────────────────────────────────────────────────── */}
      <header
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: 60,
          padding: "0 34px",
          background: "var(--bg-surface)",
          borderBottom: "1px solid var(--border)",
        }}
      >
        <Link href="/" style={{ textDecoration: "none", display: "inline-flex" }}>
          <Logo />
        </Link>
        <nav
          aria-label="Primary"
          className="home-topnav"
          style={{
            display: "flex",
            gap: 24,
            alignItems: "center",
            fontSize: 13,
            color: "var(--fg-muted)",
          }}
        >
          <a href="#curriculum" className="home-topnav-link" style={topLinkStyle}>
            Modules
          </a>
          <a href="#curriculum" className="home-topnav-link" style={topLinkStyle}>
            Exercises
          </a>
          {firstChapter ? (
            <Link href={firstChapter.href} className="home-topnav-link" style={topLinkStyle}>
              Cheatsheet
            </Link>
          ) : (
            <span style={topLinkStyle}>Cheatsheet</span>
          )}
          <ResumeButton firstChapterHref={firstChapter?.href ?? null} />
        </nav>
      </header>

      <main id="main-content">
        {/* ─── Hero ──────────────────────────────────────────────────────── */}
        <section className="home-hero">
          <div>
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                background: "var(--brand-light)",
                color: "var(--brand)",
                fontSize: 12,
                fontWeight: 600,
                padding: "6px 13px",
                borderRadius: 20,
                letterSpacing: "0.01em",
              }}
            >
              <span aria-hidden>●</span> Self-paced · beginner-friendly
            </span>

            <h1
              style={{
                fontSize: 52,
                lineHeight: 1.07,
                letterSpacing: "-0.03em",
                fontWeight: 700,
                color: "var(--fg-base)",
                margin: "20px 0 16px",
              }}
            >
              The whole path,
              <br />
              in one place.
            </h1>

            <p
              style={{
                fontSize: 18,
                lineHeight: 1.55,
                color: "var(--fg-muted)",
                maxWidth: 440,
                margin: "0 0 26px",
              }}
            >
              Thirty-three chapters across six modules — structure, styling,
              language, and the DOM — each building on the last.
            </p>

            <div style={{ display: "flex", gap: 14, marginBottom: 28, flexWrap: "wrap" }}>
              {firstChapter && (
                <Link href={firstChapter.href} className="home-cta-primary">
                  Start module 1
                </Link>
              )}
              <a href="#curriculum" className="home-cta-secondary">
                See curriculum
              </a>
            </div>

            <div
              style={{
                display: "flex",
                gap: 30,
                flexWrap: "wrap",
                fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)",
                fontSize: 12,
                color: "var(--fg-muted)",
              }}
            >
              <Stat value={String(totalChapters)} label="chapters" />
              <Stat value={String(totalModules)} label="modules" />
              <Stat value={`~${totalHours}h`} label="total" />
            </div>
          </div>

          <CodeWindow />
        </section>

        {/* ─── The curriculum ────────────────────────────────────────────── */}
        <section id="curriculum" style={{ padding: "6px 40px 40px" }}>
          <h2
            style={{
              fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)",
              fontSize: 12,
              fontWeight: 600,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "var(--fg-subtle)",
              margin: "0 0 16px",
            }}
          >
            The curriculum
          </h2>

          <div className="home-curriculum-grid">
            {modules.map((mod, i) => {
              const modChapters = byModule.get(mod) ?? [];
              const count = modChapters.length;
              const num = String(i + 1).padStart(2, "0");
              const chapterIds = modChapters.map(
                (c) => `${c.module}/${c.slug}`
              );

              return (
                <article
                  key={mod}
                  style={{
                    background: "var(--bg-surface)",
                    border: "1px solid var(--border)",
                    borderRadius: 14,
                    padding: 18,
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <span
                      style={{
                        fontFamily:
                          "var(--font-mono, 'JetBrains Mono', monospace)",
                        fontSize: 12,
                        color: "var(--brand)",
                        fontWeight: 600,
                      }}
                    >
                      {num}
                    </span>
                    <span style={{ fontSize: 11, color: "var(--fg-subtle)" }}>
                      {count} chapter{count !== 1 ? "s" : ""}
                    </span>
                  </div>

                  <h3
                    style={{
                      fontSize: 16,
                      fontWeight: 600,
                      color: "var(--fg-base)",
                      margin: "11px 0 4px",
                      letterSpacing: "-0.01em",
                    }}
                  >
                    {MODULE_NAMES[mod] ??
                      mod.charAt(0).toUpperCase() + mod.slice(1)}
                  </h3>
                  <p
                    style={{
                      fontSize: 12.5,
                      color: "var(--fg-muted)",
                      lineHeight: 1.45,
                      margin: "0 0 14px",
                    }}
                  >
                    {MODULE_DESCRIPTIONS[mod] ?? ""}
                  </p>

                  <ModuleProgressBar chapterIds={chapterIds} />
                </article>
              );
            })}
          </div>

          {/* Keep the global reset capability reachable, placed subtly. */}
          <div
            style={{
              marginTop: 28,
              paddingTop: 20,
              borderTop: "1px solid var(--border)",
              display: "flex",
              alignItems: "center",
              gap: 14,
              flexWrap: "wrap",
              fontSize: 12,
              color: "var(--fg-subtle)",
            }}
          >
            <span>
              {totalChapters} chapter{totalChapters !== 1 ? "s" : ""} ·{" "}
              {totalModules} module{totalModules !== 1 ? "s" : ""}
            </span>
            <ResetAllControl />
          </div>
        </section>
      </main>
    </div>
  );
}

const topLinkStyle: React.CSSProperties = {
  color: "var(--fg-muted)",
  textDecoration: "none",
};

// Page-scoped styles. The hero is a 2-col grid that collapses to 1 col under
// 760px; the curriculum grid is 3 cols → 2 → 1. CTA buttons get hover + focus.
const HOME_CSS = `
.home-hero {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 44px;
  padding: 54px 40px 40px;
  align-items: center;
}
.home-curriculum-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 14px;
}
.home-topnav-link:hover {
  color: var(--brand);
}
.home-cta-primary,
.home-cta-secondary {
  display: inline-flex;
  align-items: center;
  text-decoration: none;
  font-size: 15px;
  border-radius: 10px;
  padding: 12px 22px;
  transition: background 0.15s, border-color 0.15s, color 0.15s;
}
.home-cta-primary {
  background: var(--brand-solid);
  color: #fff;
  font-weight: 600;
}
.home-cta-primary:hover {
  background: var(--brand-hover);
}
.home-cta-secondary {
  border: 1px solid var(--border-strong);
  color: var(--fg-base);
  font-weight: 500;
}
.home-cta-secondary:hover {
  border-color: var(--brand);
  color: var(--brand);
}
@media (max-width: 980px) {
  .home-curriculum-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
@media (max-width: 760px) {
  .home-hero {
    grid-template-columns: 1fr;
    padding: 36px 24px 28px;
  }
  .home-hero h1 {
    font-size: 40px;
  }
  .home-curriculum-grid {
    grid-template-columns: 1fr;
  }
  /* Collapse the bar to logo + Resume; hide the text links to avoid overflow. */
  .home-topnav-link {
    display: none;
  }
}
`;

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <span>
      <b style={{ color: "var(--fg-base)", fontSize: 19 }}>{value}</b>
      &nbsp;&nbsp;{label}
    </span>
  );
}
