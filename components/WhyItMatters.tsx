// An optional "Why this matters" disclosure — motivation/context a reader can
// open if they want it, collapsed by default so it never adds to the wall of
// text. Uses native <details>/<summary> so it works with no JavaScript. Server
// component. Styling: `.why-matters` in app/globals.css.
export default function WhyItMatters({ children }: { children: React.ReactNode }) {
  return (
    <details className="why-matters">
      <summary>Why this matters</summary>
      <div className="why-body">{children}</div>
    </details>
  );
}
