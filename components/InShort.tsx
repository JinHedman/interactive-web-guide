// A one-line "skim" summary placed above a long block of prose. The full text
// stays in place below it — this is purely an additive affordance for readers
// who want the takeaway and to move on. Server component (no interactivity).
//
// role="note" (not <aside>): a one-liner embedded mid-section is a parenthetical
// note, not a page-level landmark. <aside> would add a `complementary` landmark
// per instance (40+ per long chapter), flooding the screen-reader landmark menu.
// The visible "In short" label names it, so no aria-label is needed.
//
// Children are inline content only (one sentence; inline `code`/**bold** ok) —
// see the lesson-authoring skill. Styling: `.in-short` in app/globals.css.
export default function InShort({ children }: { children: React.ReactNode }) {
  return (
    <div className="in-short" role="note">
      <span className="in-short-label">In short</span>
      <p>{children}</p>
    </div>
  );
}
