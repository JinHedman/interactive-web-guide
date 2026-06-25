import Link from "next/link";
import type { ChapterMeta } from "@/lib/types";

interface Props {
  prev: ChapterMeta | null;
  next: ChapterMeta | null;
}

export default function PrevNext({ prev, next }: Props) {
  return (
    <nav
      aria-label="Chapter navigation"
      style={{
        display: "flex",
        justifyContent: "space-between",
        gap: "16px",
        marginTop: "48px",
        paddingTop: "24px",
        borderTop: "1px solid var(--border)",
        flexWrap: "wrap",
      }}
    >
      <div style={{ flex: "0 0 auto" }}>
        {prev && (
          <Link
            href={prev.href}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "3px",
              textDecoration: "none",
              color: "var(--fg-base)",
              padding: "12px 16px",
              border: "1px solid var(--border)",
              borderRadius: "8px",
              transition: "border-color 0.15s",
              maxWidth: "220px",
            }}
          >
            <span style={{ fontSize: "0.75rem", color: "var(--fg-muted)" }}>
              ← Previous
            </span>
            <span style={{ fontSize: "0.9rem", fontWeight: 500 }}>
              {prev.frontmatter.title}
            </span>
          </Link>
        )}
      </div>
      <div style={{ flex: "0 0 auto", marginLeft: "auto" }}>
        {next && (
          <Link
            href={next.href}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "3px",
              textDecoration: "none",
              color: "var(--fg-base)",
              padding: "12px 16px",
              border: "1px solid var(--border)",
              borderRadius: "8px",
              transition: "border-color 0.15s",
              textAlign: "right",
              maxWidth: "220px",
            }}
          >
            <span style={{ fontSize: "0.75rem", color: "var(--fg-muted)" }}>
              Next →
            </span>
            <span style={{ fontSize: "0.9rem", fontWeight: 500 }}>
              {next.frontmatter.title}
            </span>
          </Link>
        )}
      </div>
    </nav>
  );
}
