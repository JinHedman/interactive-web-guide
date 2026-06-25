// Shared Webcraft brand mark: a plain CSS rounded square in --brand + wordmark.
// Used in both the home top bar and the lesson sidebar header. Pure
// presentational (no hooks / server-only APIs) so it is safe to render inside
// server or client components.

interface LogoProps {
  /** Optional second line, e.g. "HTML · CSS · JavaScript" in the sidebar. */
  subtitle?: string;
  /** Mark size in px (default 22). */
  size?: number;
}

export default function Logo({ subtitle, size = 22 }: LogoProps) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
      <span
        aria-hidden
        style={{
          width: size,
          height: size,
          borderRadius: 7,
          background: "var(--brand)",
          flexShrink: 0,
          display: "inline-block",
        }}
      />
      <div style={{ display: "flex", flexDirection: "column", lineHeight: 1.15 }}>
        <span
          style={{
            fontWeight: 600,
            fontSize: 16,
            letterSpacing: "-0.01em",
            color: "var(--fg-base)",
          }}
        >
          Webcraft
        </span>
        {subtitle && (
          <span style={{ fontSize: 11, color: "var(--fg-subtle)" }}>{subtitle}</span>
        )}
      </div>
    </div>
  );
}
