import type { Metadata } from "next";
import Link from "next/link";
import Logo from "@/components/Logo";
import ReviewQueue from "@/components/ReviewQueue";

export const metadata: Metadata = {
  title: "Review",
  description: "Re-attempt the quiz questions you've missed.",
};

// Standalone review surface (outside the /learn reading shell). Renders the
// client <ReviewQueue>, which reads the localStorage review store and re-asks
// missed questions one at a time. Hydration-safe: the queue shows a stable
// placeholder until mounted, so this server page can stay static.
export default function ReviewPage() {
  return (
    <div style={{ minHeight: "100vh", background: "var(--bg-base)" }}>
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
        <Link
          href="/"
          style={{
            color: "var(--fg-muted)",
            textDecoration: "none",
            fontSize: 13,
            fontWeight: 500,
          }}
        >
          ← Curriculum
        </Link>
      </header>

      <main id="main-content" className="review-page">
        <div className="review-page-head">
          <span className="review-eyebrow">Retrieval practice</span>
          <h1 className="review-title">Review your misses</h1>
          <p className="review-intro">
            Questions you got wrong in chapter quizzes collect here. Answer one
            correctly and it leaves the queue; miss it and it stays for next
            time.
          </p>
        </div>

        <ReviewQueue />
      </main>
    </div>
  );
}
