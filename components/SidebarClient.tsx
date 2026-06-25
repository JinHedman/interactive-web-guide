"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import ThemeToggle from "./ThemeToggle";
import ProgressDots from "./ProgressDots";
import type { ChapterMeta } from "@/lib/types";

const MODULE_LABELS: Record<string, string> = {
  setup: "Getting Started",
  html: "HTML",
  css: "CSS",
  javascript: "JavaScript",
  integration: "Putting It Together",
};

interface Props {
  chapters: ChapterMeta[];
  modules: string[];
}

export default function SidebarClient({ chapters, modules }: Props) {
  const pathname = usePathname();

  // Group chapters by module
  const byModule = new Map<string, ChapterMeta[]>();
  for (const ch of chapters) {
    const list = byModule.get(ch.module) ?? [];
    list.push(ch);
    byModule.set(ch.module, list);
  }

  return (
    <aside
      style={{
        width: "260px",
        minWidth: "260px",
        maxWidth: "260px",
        background: "var(--bg-surface)",
        borderRight: "1px solid var(--border)",
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        position: "sticky",
        top: 0,
        overflowY: "auto",
      }}
    >
      {/* Header / logo */}
      <div
        style={{
          padding: "20px 20px 16px",
          borderBottom: "1px solid var(--border)",
        }}
      >
        <Link
          href="/"
          style={{
            display: "block",
            textDecoration: "none",
            color: "var(--fg-base)",
          }}
        >
          <div
            style={{
              fontWeight: 700,
              fontSize: "1.05rem",
              letterSpacing: "-0.01em",
            }}
          >
            Programming Guide
          </div>
          <div
            style={{
              fontSize: "0.75rem",
              color: "var(--fg-muted)",
              marginTop: "2px",
            }}
          >
            HTML · CSS · JavaScript
          </div>
        </Link>
      </div>

      {/* Nav */}
      <nav
        style={{ flex: 1, padding: "12px 0", overflowY: "auto" }}
        aria-label="Course navigation"
      >
        {modules.map((mod) => {
          const modChapters = byModule.get(mod) ?? [];
          if (modChapters.length === 0) return null;
          const label =
            MODULE_LABELS[mod] ??
            mod.charAt(0).toUpperCase() + mod.slice(1);

          return (
            <div key={mod} style={{ marginBottom: "8px" }}>
              <div
                style={{
                  padding: "6px 20px 4px",
                  fontSize: "0.7rem",
                  fontWeight: 700,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  color: "var(--fg-subtle)",
                }}
              >
                {label}
              </div>
              <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
                {modChapters.map((chapter) => {
                  const isActive = pathname === chapter.href;
                  const chapterId = `${chapter.module}/${chapter.slug}`;

                  return (
                    <li key={chapter.slug}>
                      <Link
                        href={chapter.href}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          padding: "7px 20px",
                          fontSize: "0.875rem",
                          textDecoration: "none",
                          color: isActive
                            ? "var(--brand)"
                            : "var(--fg-base)",
                          background: isActive
                            ? "var(--brand-light)"
                            : "transparent",
                          borderLeft: isActive
                            ? "2px solid var(--brand)"
                            : "2px solid transparent",
                          fontWeight: isActive ? 500 : 400,
                          transition:
                            "background 0.12s, color 0.12s, border-color 0.12s",
                        }}
                        aria-current={isActive ? "page" : undefined}
                      >
                        <span
                          style={{
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                            flex: 1,
                          }}
                        >
                          {chapter.frontmatter.title}
                        </span>
                        <ProgressDots chapterId={chapterId} />
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        })}
      </nav>

      {/* Footer: theme toggle */}
      <div
        style={{
          padding: "12px 20px",
          borderTop: "1px solid var(--border)",
        }}
      >
        <ThemeToggle />
      </div>
    </aside>
  );
}
