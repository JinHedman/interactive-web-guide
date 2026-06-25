// ReadMore: a visually distinct callout panel for contemporary/framework context.
// Can be used as a server component (no client state needed).

export interface ReadMoreProps {
  title: string;
  children: React.ReactNode;
}

export default function ReadMore({ title, children }: ReadMoreProps) {
  return (
    <aside
      aria-label={`Read more: ${title}`}
      style={{
        margin: "2rem 0",
        padding: "20px 24px",
        background: "var(--bg-accent)",
        border: "1px solid var(--border-strong)",
        borderLeft: "4px solid var(--brand)",
        borderRadius: "6px",
        fontSize: "0.9rem",
        lineHeight: 1.7,
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
        <span aria-hidden style={{ fontSize: "1rem" }}>
          &#x1F4D6;
        </span>
        <strong
          style={{
            fontSize: "0.8rem",
            letterSpacing: "0.07em",
            textTransform: "uppercase",
            color: "var(--brand)",
          }}
        >
          {title}
        </strong>
      </div>
      <div style={{ color: "var(--fg-muted)" }}>{children}</div>
    </aside>
  );
}
