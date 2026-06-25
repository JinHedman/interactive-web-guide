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
        alignItems: "center",
        gap: "14px",
        marginTop: "32px",
        paddingTop: "22px",
        borderTop: "1px solid var(--border)",
        flexWrap: "wrap",
      }}
    >
      <div style={{ flex: "0 1 auto", minWidth: 0 }}>
        {prev && (
          <Link
            href={prev.href}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              textDecoration: "none",
              color: "var(--fg-subtle)",
              fontSize: "13px",
              transition: "color 0.15s",
            }}
          >
            <span aria-hidden>←</span>
            <span
              style={{
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
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
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              textDecoration: "none",
              background: "var(--brand-solid)",
              color: "#fff",
              padding: "10px 18px",
              borderRadius: "9px",
              fontSize: "13px",
              fontWeight: 600,
            }}
          >
            <span>Next: {next.frontmatter.title}</span>
            <span aria-hidden>→</span>
          </Link>
        )}
      </div>
    </nav>
  );
}
