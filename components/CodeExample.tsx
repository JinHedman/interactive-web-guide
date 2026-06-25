// RSC — runs on server only; no 'use client'
import CopyButton from "./CopyButton";
import CodePreview from "./CodePreview";
import CodeFileWindow from "./CodeFileWindow";
import {
  highlightCode,
  highlightFiles,
  assembleProject,
  type CodeFile,
} from "@/lib/highlight";

// ─── Authoring API ────────────────────────────────────────────────────────────
// Two mutually-exclusive modes:
//
//  (1) SINGLE-FILE (unchanged, used by ~all existing chapters):
//      <CodeExample language="html" preview>{`…one file…`}</CodeExample>
//
//  (2) MULTI-FILE — teaches real file separation. Each file renders as its own
//      stacked, highlighted window (HTML, then CSS, then JS, in array order):
//      <CodeExample preview files={[
//        { name: "index.html",  lang: "html", code: `…` },
//        { name: "styles.css",  lang: "css",  code: `…` },
//        { name: "script.js",   lang: "js",   code: `…` },
//      ]} />
//      When `preview`, the files are assembled into ONE document for the
//      sandboxed iframe (CSS/JS inlined where index.html links them, otherwise
//      injected). Display = separate files; Result = the combined page.
export interface CodeExampleProps {
  /** Single-file mode: the language for `children`. Ignored in multi-file mode. */
  language?:
    | "html"
    | "css"
    | "js"
    | "jsx"
    | "bash"
    | "ts"
    | "tsx"
    | "json"
    | string;
  /** Multi-file mode: an ordered list of files, each its own window. */
  files?: CodeFile[];
  /** Show a live sandboxed preview (html/css/js only). */
  preview?: boolean;
  /** Single-file mode: the source code. */
  children?: string;
}

const PANE_LABEL_STYLE: React.CSSProperties = {
  padding: "5px 14px",
  fontSize: "10.5px",
  fontWeight: 600,
  letterSpacing: "0.06em",
  textTransform: "uppercase",
  color: "var(--fg-subtle)",
  background: "var(--bg-subtle)",
  borderBottom: "1px solid var(--border)",
};

export default async function CodeExample(props: CodeExampleProps) {
  if (props.files && props.files.length > 0) {
    return <MultiFileExample files={props.files} preview={props.preview} />;
  }
  return (
    <SingleFileExample
      language={props.language ?? "html"}
      preview={props.preview}
      code={props.children ?? ""}
    />
  );
}

// ─── Multi-file mode ──────────────────────────────────────────────────────────
async function MultiFileExample({
  files,
  preview = false,
}: {
  files: CodeFile[];
  preview?: boolean;
}) {
  const highlighted = await highlightFiles(files);

  // Preview is available when at least one file is previewable (html/css/js).
  const canPreview =
    preview && files.some((f) => ["html", "css", "js", "jsx"].includes(f.lang));
  const assembled = canPreview ? assembleProject(files) : "";

  return (
    <div style={{ margin: "1.375rem 0" }}>
      {/* Stack of file windows (display = separate files). */}
      <div role="group" aria-label="Project files">
        {highlighted.map((f, i) => (
          <CodeFileWindow
            key={`${f.name}-${i}`}
            name={f.name}
            html={f.html}
            code={files[i].code}
            stacked={i > 0}
          />
        ))}
      </div>

      {/* Combined result (run = one assembled page). */}
      {canPreview && (
        <div
          className="preview-pane"
          style={{
            marginTop: "10px",
            borderRadius: "10px",
            border: "1px solid var(--border)",
            overflow: "hidden",
            background: "var(--bg-surface)",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div style={PANE_LABEL_STYLE}>Result</div>
          <CodePreview srcDoc={assembled} />
        </div>
      )}
    </div>
  );
}

// ─── Single-file mode (unchanged behavior) ────────────────────────────────────
async function SingleFileExample({
  language,
  preview = false,
  code: rawCode,
}: {
  language: string;
  preview?: boolean;
  code: string;
}) {
  const code = rawCode.trimEnd();
  const html = await highlightCode(code, language);
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
          {canPreview && <div style={PANE_LABEL_STYLE}>Code</div>}
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
            <div style={PANE_LABEL_STYLE}>Result</div>
            <CodePreview code={code} language={language} />
          </div>
        )}
      </div>
    </div>
  );
}
