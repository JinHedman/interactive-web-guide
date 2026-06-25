import Link from "next/link";
import { getAllChapters } from "@/lib/content";
import HomeProgressControls from "@/components/HomeProgressControls";

export default function Home() {
  const chapters = getAllChapters();
  const firstChapter = chapters[0];

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "var(--bg-base)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "48px 24px",
      }}
    >
      <main
        style={{
          maxWidth: "600px",
          width: "100%",
          textAlign: "center",
        }}
      >
        <div
          style={{
            display: "inline-block",
            fontSize: "0.75rem",
            fontWeight: 600,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: "var(--brand)",
            background: "var(--brand-light)",
            padding: "4px 12px",
            borderRadius: "20px",
            marginBottom: "24px",
          }}
        >
          Interactive Learning Guide
        </div>

        <h1
          style={{
            fontSize: "2.5rem",
            fontWeight: 700,
            letterSpacing: "-0.03em",
            lineHeight: 1.15,
            color: "var(--fg-base)",
            margin: "0 0 16px",
          }}
        >
          Build things with<br />HTML, CSS & JavaScript
        </h1>

        <p
          style={{
            fontSize: "1.1rem",
            color: "var(--fg-muted)",
            lineHeight: 1.7,
            margin: "0 0 36px",
          }}
        >
          A hands-on guide that teaches you how the web is built — from document
          structure to interactive pages. Code examples, exercises, and quizzes
          at every step.
        </p>

        {/* Resume + global reset (client-only, reflects localStorage live) */}
        <HomeProgressControls firstChapterHref={firstChapter?.href ?? null} />

        <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap", marginTop: "16px" }}>
          {firstChapter ? (
            <Link
              href={firstChapter.href}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "12px 28px",
                background: "var(--brand)",
                color: "#fff",
                borderRadius: "8px",
                textDecoration: "none",
                fontWeight: 600,
                fontSize: "0.95rem",
                transition: "background 0.15s",
              }}
            >
              Start learning →
            </Link>
          ) : null}
          <Link
            href="/learn/html/1-structure"
            style={{
              display: "inline-flex",
              alignItems: "center",
              padding: "12px 24px",
              background: "none",
              color: "var(--fg-base)",
              border: "1px solid var(--border)",
              borderRadius: "8px",
              textDecoration: "none",
              fontWeight: 500,
              fontSize: "0.95rem",
            }}
          >
            Browse chapters
          </Link>
        </div>

        {chapters.length > 0 && (
          <div
            style={{
              marginTop: "48px",
              fontSize: "0.8rem",
              color: "var(--fg-subtle)",
            }}
          >
            {chapters.length} chapter{chapters.length !== 1 ? "s" : ""} available
          </div>
        )}
      </main>
    </div>
  );
}
