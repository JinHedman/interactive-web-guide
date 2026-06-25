// RSC — runs on server only; no 'use client'
import { codeToHtml } from "shiki";
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
    themes: {
      light: "github-light",
      dark: "github-dark",
    },
    defaultColor: false,
  });

  const canPreview = preview && ["html", "css", "js", "jsx"].includes(language);

  return (
    <div
      style={{
        margin: "1.25rem 0",
        borderRadius: "8px",
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
          padding: "8px 14px",
          background: "var(--bg-subtle)",
          borderBottom: "1px solid var(--border)",
        }}
      >
        <span
          style={{
            fontSize: "0.7rem",
            fontWeight: 600,
            letterSpacing: "0.07em",
            textTransform: "uppercase",
            color: "var(--fg-muted)",
            fontFamily: "var(--font-mono)",
          }}
        >
          {language}
        </span>
        <CopyButton code={code} />
      </div>

      {/* Pane layout */}
      <div
        style={
          canPreview
            ? {
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
              }
            : undefined
        }
      >
        {/* Code pane */}
        <div style={{ position: "relative" }}>
          {canPreview && (
            <div
              style={{
                padding: "4px 14px",
                fontSize: "0.7rem",
                fontWeight: 600,
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                color: "var(--fg-muted)",
                background: "var(--bg-subtle)",
                borderBottom: "1px solid var(--border)",
              }}
            >
              Code
            </div>
          )}
          <div
            style={{ overflowX: "auto" }}
            dangerouslySetInnerHTML={{ __html: html }}
          />
        </div>

        {/* Preview pane */}
        {canPreview && (
          <div
            style={{
              borderLeft: "1px solid var(--border)",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div
              style={{
                padding: "4px 14px",
                fontSize: "0.7rem",
                fontWeight: 600,
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                color: "var(--fg-muted)",
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
