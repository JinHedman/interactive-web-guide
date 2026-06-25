// Decorative code-window mock for the home hero. Pure presentation — no
// behavior, no hooks, server-renderable. The snippet is hand-set with colored
// spans matching the Webcraft syntax palette (tags #f472b6, attrs #c4b5fd,
// strings #fcd34d, keywords/arrows #818cf8, identifiers/functions #7dd3fc,
// plain text #c9cdd6). Marked aria-hidden because it is illustrative only.

// Syntax palette (kept literal — this card is intentionally always "dark"
// chrome, independent of the page theme, mirroring the design handoff).
const TAG = "#f472b6"; // tags / punctuation
const ATTR = "#c4b5fd"; // attribute names
const STR = "#fcd34d"; // strings
const KW = "#818cf8"; // keywords / arrows
const ID = "#7dd3fc"; // identifiers / functions
const PLAIN = "#c9cdd6"; // plain text

export default function CodeWindow() {
  return (
    <div
      aria-hidden
      style={{
        background: "#16181f",
        borderRadius: 14,
        overflow: "hidden",
        boxShadow: "0 34px 64px -34px rgba(20,21,26,.55)",
        fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)",
      }}
    >
      {/* Title bar: traffic lights + filename */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 7,
          padding: "13px 16px",
          borderBottom: "1px solid #262a36",
        }}
      >
        <Dot color="#ff5f57" />
        <Dot color="#febc2e" />
        <Dot color="#28c840" />
        <span style={{ marginLeft: 10, fontSize: 12, color: "#6b7280" }}>
          index.html
        </span>
      </div>

      {/* Snippet */}
      <div
        style={{
          padding: "18px 20px",
          fontSize: 13,
          lineHeight: 1.95,
          color: PLAIN,
          whiteSpace: "pre",
          overflowX: "auto",
        }}
      >
        <div>
          <span style={{ color: TAG }}>&lt;button</span>{" "}
          <span style={{ color: ATTR }}>id</span>=
          <span style={{ color: STR }}>&quot;cta&quot;</span>
          <span style={{ color: TAG }}>&gt;</span>Start
          <span style={{ color: TAG }}>&lt;/button&gt;</span>
        </div>
        <div style={{ height: 8 }} />
        <div>
          <span style={{ color: TAG }}>&lt;script&gt;</span>
        </div>
        <div>
          {"  "}
          <span style={{ color: KW }}>const</span> btn ={" "}
          <span style={{ color: ID }}>document</span>.
          <span style={{ color: ID }}>querySelector</span>(
          <span style={{ color: STR }}>&quot;#cta&quot;</span>);
        </div>
        <div>
          {"  "}btn.
          <span style={{ color: ID }}>addEventListener</span>(
          <span style={{ color: STR }}>&quot;click&quot;</span>, (){" "}
          <span style={{ color: KW }}>=&gt;</span> {"{"}
        </div>
        <div>
          {"    "}btn.
          <span style={{ color: ID }}>textContent</span> ={" "}
          <span style={{ color: STR }}>&quot;Let&apos;s go →&quot;</span>;
        </div>
        <div>{"  }"});</div>
        <div>
          <span style={{ color: TAG }}>&lt;/script&gt;</span>
        </div>
      </div>
    </div>
  );
}

function Dot({ color }: { color: string }) {
  return (
    <span
      style={{
        width: 11,
        height: 11,
        borderRadius: "50%",
        background: color,
        display: "inline-block",
      }}
    />
  );
}
