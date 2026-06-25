// DocsLinks: a lightweight "Further reading" callout listing official-docs links.
// All links are external (open in a new tab). Server component — no client state.
// Intentionally a lighter affordance than <ReadMore>: a soft surface with a full
// thin border rather than ReadMore's accented panel + strong left bar.

export interface DocsLinksProps {
  title?: string;
  links: { label: string; href: string }[];
}

export default function DocsLinks({
  title = "Further reading",
  links = [],
}: DocsLinksProps) {
  if (!links.length) return null;
  return (
    <aside
      aria-label={title}
      style={{
        margin: "1.75rem 0",
        padding: "16px 20px",
        background: "var(--bg-subtle)",
        border: "1px solid var(--border)",
        borderRadius: "8px",
        fontSize: "0.9rem",
        lineHeight: 1.6,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          marginBottom: "10px",
        }}
      >
        <span aria-hidden style={{ fontSize: "0.95rem" }}>
          &#x1F4DA;
        </span>
        <strong
          style={{
            fontSize: "0.75rem",
            letterSpacing: "0.07em",
            textTransform: "uppercase",
            color: "var(--fg-subtle)",
          }}
        >
          {title}
        </strong>
      </div>
      <ul
        style={{
          listStyle: "none",
          margin: 0,
          padding: 0,
          display: "flex",
          flexDirection: "column",
          gap: "6px",
        }}
      >
        {links.map((link) => (
          <li key={link.href}>
            <a
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "baseline",
                gap: "4px",
                color: "var(--brand)",
                textDecoration: "underline",
                textUnderlineOffset: "3px",
              }}
            >
              <span>{link.label}</span>
              <svg
                aria-hidden
                width="11"
                height="11"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ flexShrink: 0, alignSelf: "center" }}
              >
                <path d="M7 17L17 7" />
                <path d="M8 7h9v9" />
              </svg>
              <span
                style={{
                  position: "absolute",
                  width: "1px",
                  height: "1px",
                  padding: 0,
                  margin: "-1px",
                  overflow: "hidden",
                  clip: "rect(0,0,0,0)",
                  whiteSpace: "nowrap",
                  border: 0,
                }}
              >
                (opens in new tab)
              </span>
            </a>
          </li>
        ))}
      </ul>
    </aside>
  );
}
