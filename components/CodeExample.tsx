// RSC — runs on server only; no 'use client'
import { codeToHtml, type ThemeRegistrationRaw } from "shiki";
import CopyButton from "./CopyButton";
import CodePreview from "./CodePreview";

export interface CodeExampleProps {
  language: "html" | "css" | "js" | "jsx" | "bash" | "ts" | "tsx" | "json" | string;
  preview?: boolean;
  children: string;
}

// Map our language aliases to Shiki language IDs
function toShikiLang(lang: string): string {
  const map: Record<string, string> = {
    js: "javascript",
    jsx: "jsx",
    ts: "typescript",
    tsx: "tsx",
    html: "html",
    css: "css",
    bash: "bash",
    json: "json",
  };
  return map[lang] ?? lang;
}

// ─── Webcraft syntax palette ──────────────────────────────────────────────────
// Custom TextMate theme matching the design handoff "Syntax highlight palette":
// tags/punctuation #f472b6, attribute names #c4b5fd, strings #fcd34d,
// keywords/arrows #818cf8, identifiers/functions #7dd3fc, comments #6b7280,
// plain text #c9cdd6.
//
// The code surface (--code-bg) is ALWAYS dark — #16181f on a light page,
// #07080b on a dark page — so we use ONE dark syntax palette in both modes.
// Using a single `theme` (not a light/dark pair with defaultColor:false) makes
// Shiki emit a direct, readable `color` on each span instead of per-page-theme
// CSS vars, which previously served the light theme's dark text onto our dark
// background (invisible in light page mode). The theme background is left
// transparent so the wrapper's --code-bg keeps the per-page-theme shade.
const WEBCRAFT_PALETTE = {
  plain: "#c9cdd6",
  comment: "#6b7280",
  string: "#fcd34d",
  keyword: "#818cf8",
  identifier: "#7dd3fc",
  tag: "#f472b6",
  attr: "#c4b5fd",
  number: "#7dd3fc",
} as const;

function makeWebcraftTheme(): ThemeRegistrationRaw {
  const p = WEBCRAFT_PALETTE;
  return {
    name: "webcraft-dark",
    type: "dark",
    colors: {
      "editor.background": "#00000000",
      "editor.foreground": p.plain,
    },
    settings: [
      { settings: { background: "#00000000", foreground: p.plain } },
      { scope: ["comment", "punctuation.definition.comment"], settings: { foreground: p.comment } },
      {
        scope: ["string", "string.quoted", "string.template", "constant.other.symbol"],
        settings: { foreground: p.string },
      },
      { scope: ["constant.numeric", "constant.language", "constant.character"], settings: { foreground: p.number } },
      {
        scope: [
          "keyword",
          "keyword.control",
          "keyword.operator",
          "storage",
          "storage.type",
          "storage.modifier",
          "keyword.operator.arrow",
        ],
        settings: { foreground: p.keyword },
      },
      {
        scope: [
          "entity.name.function",
          "support.function",
          "variable",
          "variable.other",
          "meta.function-call entity.name.function",
        ],
        settings: { foreground: p.identifier },
      },
      {
        scope: [
          "entity.name.tag",
          "punctuation.definition.tag",
          "punctuation",
          "meta.tag",
        ],
        settings: { foreground: p.tag },
      },
      {
        scope: [
          "entity.other.attribute-name",
          "support.type.property-name",
          "meta.attribute",
        ],
        settings: { foreground: p.attr },
      },
    ],
  };
}

const codeTheme = makeWebcraftTheme();

export default async function CodeExample({
  language,
  preview = false,
  children,
}: CodeExampleProps) {
  // children may be undefined if the MDX expression evaluates to nothing
  const code = (children ?? "").trimEnd();
  const shikiLang = toShikiLang(language);

  const html = await codeToHtml(code, {
    lang: shikiLang,
    theme: codeTheme,
  });

  const canPreview = preview && ["html", "css", "js", "jsx"].includes(language);

  return (
    <div
      style={{
        margin: "1.375rem 0",
        borderRadius: "12px",
        border: "1px solid var(--border)",
        overflow: "hidden",
        background: "var(--bg-surface)",
      }}
    >
      {/* Header bar */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "9px 14px",
          background: "var(--bg-subtle)",
          borderBottom: "1px solid var(--border)",
        }}
      >
        <span
          style={{
            fontSize: "11px",
            fontWeight: 600,
            letterSpacing: "0.07em",
            textTransform: "uppercase",
            color: "var(--fg-subtle)",
            fontFamily: "var(--font-mono)",
          }}
        >
          {language}
        </span>
        <CopyButton code={code} />
      </div>

      {/* Pane layout */}
      <div className={canPreview ? "code-example-panes" : undefined}>
        {/* Code pane */}
        <div style={{ position: "relative", minWidth: 0, background: "var(--code-bg)" }}>
          {canPreview && (
            <div
              style={{
                padding: "5px 14px",
                fontSize: "10.5px",
                fontWeight: 600,
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                color: "var(--fg-subtle)",
                background: "var(--bg-subtle)",
                borderBottom: "1px solid var(--border)",
              }}
            >
              Code
            </div>
          )}
          <div
            className="code-pane-scroll"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        </div>

        {/* Preview pane */}
        {canPreview && (
          <div
            className="preview-pane"
            style={{
              borderLeft: "1px solid var(--border)",
              display: "flex",
              flexDirection: "column",
              minWidth: 0,
              background: "var(--bg-surface)",
            }}
          >
            <div
              style={{
                padding: "5px 14px",
                fontSize: "10.5px",
                fontWeight: 600,
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                color: "var(--fg-subtle)",
                background: "var(--bg-subtle)",
                borderBottom: "1px solid var(--border)",
              }}
            >
              Result
            </div>
            <CodePreview code={code} language={language} />
          </div>
        )}
      </div>
    </div>
  );
}
