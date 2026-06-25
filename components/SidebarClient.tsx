"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import ThemeToggle from "./ThemeToggle";
import ProgressDots from "./ProgressDots";
import Logo from "@/components/Logo";
import type { ChapterMeta } from "@/lib/types";

const MODULE_LABELS: Record<string, string> = {
  setup: "Getting Started",
  html: "HTML",
  css: "CSS",
  javascript: "JavaScript",
  integration: "Putting It Together",
  workflow: "Git & Collaboration",
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
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        flex: 1,
        minHeight: 0,
      }}
    >
      {/* Header / logo */}
      <div
        style={{
          padding: "18px 18px 15px",
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
          <Logo subtitle="HTML · CSS · JavaScript" />
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
                  padding: "12px 18px 4px",
                  fontSize: "10.5px",
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
                          padding: "7px 18px",
                          fontSize: "13px",
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
    </div>
  );
}
