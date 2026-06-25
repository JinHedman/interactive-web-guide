"use client";

// Renders a sandboxed iframe showing the result of a code snippet.
//
// Two ways to supply the document:
//  - SINGLE-FILE: pass `code` + `language` (html | css | js | jsx). The minimal
//    shell wrapping is applied here via buildSingleSrcDoc.
//  - MULTI-FILE: pass a fully-assembled `srcDoc` (built by lib/highlight's
//    assembleProject on the server). When `srcDoc` is given it wins.
//
// The sandbox is intentionally restrictive: `allow-scripts` only — no
// same-origin, no network — identical for both paths.
import { buildSingleSrcDoc } from "@/lib/highlight";

interface Props {
  /** Pre-assembled full document (multi-file mode). */
  srcDoc?: string;
  /** Single-file source. */
  code?: string;
  /** Single-file language. */
  language?: string;
}

export default function CodePreview({ srcDoc, code, language }: Props) {
  const doc =
    srcDoc ?? buildSingleSrcDoc(code ?? "", language ?? "html");

  return (
    <iframe
      srcDoc={doc}
      sandbox="allow-scripts"
      title="Code preview"
      style={{
        flex: 1,
        width: "100%",
        minHeight: "180px",
        border: "none",
        background: "#fff",
      }}
    />
  );
}
