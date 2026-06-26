// A one-line "skim" summary placed above a long block of prose. The full text
// stays in place below it — this is purely an additive affordance for readers
// who want the takeaway and to move on. Server component (no interactivity).
// Styling: `.in-short` in app/globals.css.
export default function InShort({ children }: { children: React.ReactNode }) {
  return (
    <aside className="in-short" aria-label="In short">
      <span className="in-short-label">In short</span>
      <p>{children}</p>
    </aside>
  );
}
