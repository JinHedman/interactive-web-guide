// Server-only Shiki highlighting shared by CodeExample (single + multi-file)
// and the Exercise solution wrapper. Centralizes the Webcraft syntax palette,
// the language-alias map, and the assemble-into-one-document logic for the
// sandboxed preview so display (separate files) and result (combined page)
// stay in sync.
import { codeToHtml, type ThemeRegistrationRaw } from "shiki";

// Languages we know how to render a live preview for.
export type PreviewLang = "html" | "css" | "js" | "jsx";

export interface CodeFile {
  /** Display filename, e.g. "index.html". Shown in the window title bar. */
  name: string;
  /** Language for syntax highlighting (alias-friendly: js/ts/html/css/…). */
  lang: string;
  /** Raw source for this file. */
  code: string;
}

// Map our language aliases to Shiki language IDs.
export function toShikiLang(lang: string): string {
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
// CSS vars. The theme background is left transparent so the wrapper's
// --code-bg keeps the per-page-theme shade.
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

/** Highlight one snippet to Shiki HTML using the Webcraft palette. */
export async function highlightCode(code: string, lang: string): Promise<string> {
  return codeToHtml(code.trimEnd(), {
    lang: toShikiLang(lang),
    theme: codeTheme,
  });
}

/** A file plus its pre-rendered Shiki HTML. */
export interface HighlightedFile {
  name: string;
  lang: string;
  html: string;
}

/** Highlight a list of files, preserving order. */
export async function highlightFiles(files: CodeFile[]): Promise<HighlightedFile[]> {
  return Promise.all(
    files.map(async (f) => ({
      name: f.name,
      lang: f.lang,
      html: await highlightCode(f.code, f.lang),
    }))
  );
}

// ─── Preview assembly ─────────────────────────────────────────────────────────
// Escape a string so it can be safely embedded *inside* a <script> body without
// prematurely closing the tag. We only need to neutralize "</script" sequences.
function guardScript(js: string): string {
  return js.replace(/<\/(script)/gi, "<\\/$1");
}

const HTML_SHELL_HEAD = `<meta charset="utf-8">
<meta name="viewport" content="width=device-width">`;

const DEFAULT_BODY_STYLE = `body { font-family: system-ui, sans-serif; padding: 1rem; margin: 0; line-height: 1.6; }`;

function isFullDoc(html: string): boolean {
  return /<html[\s>]/i.test(html) || /<!doctype/i.test(html);
}

/**
 * Build the iframe srcDoc for a SINGLE-file snippet (back-compat path used by
 * the existing single-file CodeExample API).
 */
export function buildSingleSrcDoc(code: string, language: string): string {
  if (language === "html") {
    if (isFullDoc(code)) return code;
    return `<!doctype html>
<html lang="en">
<head>
${HTML_SHELL_HEAD}
<style>
  ${DEFAULT_BODY_STYLE}
</style>
</head>
<body>
${code}
</body>
</html>`;
  }

  if (language === "css") {
    return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<style>
  body { font-family: system-ui, sans-serif; padding: 1rem; margin: 0; }
  ${code}
</style>
</head>
<body>
  <p>CSS applied to this paragraph.</p>
  <div class="box">A .box element</div>
  <button class="btn">A .btn button</button>
</body>
</html>`;
  }

  if (language === "js" || language === "jsx") {
    return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<style>
  body { font-family: system-ui, sans-serif; padding: 1rem; margin: 0; }
  #output { background: #f5f5f5; padding: 0.75rem; border-radius: 4px; white-space: pre-wrap; }
</style>
</head>
<body>
<div id="output"></div>
<script>
(function() {
  var _log = console.log;
  var out = document.getElementById('output');
  console.log = function() {
    var args = Array.from(arguments).map(function(a) {
      return typeof a === 'object' ? JSON.stringify(a, null, 2) : String(a);
    });
    out.textContent += args.join(' ') + '\\n';
    _log.apply(console, arguments);
  };
  try {
${guardScript(code)}
  } catch(e) {
    out.textContent += 'Error: ' + e.message;
  }
})();
</script>
</body>
</html>`;
  }

  return `<pre style="padding:1rem;margin:0">${code}</pre>`;
}

// Match <link rel="stylesheet" href="NAME"> (any attribute order) for a file.
function linkTagFor(name: string): RegExp {
  const esc = name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return new RegExp(
    `<link\\b[^>]*\\bhref\\s*=\\s*['"]\\.?/?${esc}['"][^>]*>`,
    "i"
  );
}

// Match <script src="NAME" ...></script> (with or without a closing tag).
function scriptTagFor(name: string): RegExp {
  const esc = name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return new RegExp(
    `<script\\b[^>]*\\bsrc\\s*=\\s*['"]\\.?/?${esc}['"][^>]*>\\s*</script>`,
    "i"
  );
}

/**
 * Assemble a multi-file project into ONE document for the sandboxed iframe.
 *
 * Resolution rules (in order):
 *  1. Pick the HTML file (the first file whose lang is html, else a synthesized
 *     minimal shell).
 *  2. For each CSS file: if the HTML references it via
 *     `<link rel="stylesheet" href="styles.css">`, replace that tag in place
 *     with an inline `<style>…</style>`. Otherwise inject a `<style>` into
 *     `<head>` (or before `</body>`, or appended).
 *  3. For each JS file: if the HTML references it via
 *     `<script src="script.js"></script>`, replace that tag in place with an
 *     inline `<script>…</script>`. Otherwise inject a `<script>` just before
 *     `</body>` (or appended). Order of unreferenced scripts is preserved.
 *
 * The DISPLAY shows the separate files; only this combined output runs in the
 * iframe. The iframe sandbox stays exactly as restrictive as the single-file
 * path (`allow-scripts`, no same-origin, no network).
 */
export function assembleProject(files: CodeFile[]): string {
  const htmlFile = files.find((f) => f.lang === "html");
  const cssFiles = files.filter((f) => f.lang === "css");
  const jsFiles = files.filter((f) => f.lang === "js" || f.lang === "jsx");

  let doc =
    htmlFile?.code ??
    `<!doctype html>
<html lang="en">
<head>
${HTML_SHELL_HEAD}
<style>
  ${DEFAULT_BODY_STYLE}
</style>
</head>
<body>
</body>
</html>`;

  // If the author gave a bare fragment (no <html>/<!doctype>), wrap it so we
  // have a <head>/<body> to inject into.
  if (htmlFile && !isFullDoc(doc)) {
    doc = `<!doctype html>
<html lang="en">
<head>
${HTML_SHELL_HEAD}
<style>
  ${DEFAULT_BODY_STYLE}
</style>
</head>
<body>
${doc}
</body>
</html>`;
  }

  // CSS: replace matching <link> tags, else collect for head injection.
  const pendingCss: string[] = [];
  for (const css of cssFiles) {
    const tag = linkTagFor(css.name);
    const styleEl = `<style>\n${css.code.trimEnd()}\n</style>`;
    if (tag.test(doc)) {
      doc = doc.replace(tag, styleEl);
    } else {
      pendingCss.push(styleEl);
    }
  }

  // JS: replace matching <script src> tags, else collect for body injection.
  const pendingJs: string[] = [];
  for (const js of jsFiles) {
    const tag = scriptTagFor(js.name);
    const scriptEl = `<script>\n${guardScript(js.code.trimEnd())}\n</script>`;
    if (tag.test(doc)) {
      doc = doc.replace(tag, scriptEl);
    } else {
      pendingJs.push(scriptEl);
    }
  }

  if (pendingCss.length) {
    const block = pendingCss.join("\n");
    if (/<\/head>/i.test(doc)) {
      doc = doc.replace(/<\/head>/i, `${block}\n</head>`);
    } else if (/<body[\s>]/i.test(doc)) {
      doc = doc.replace(/(<body[^>]*>)/i, `$1\n${block}`);
    } else {
      doc = `${block}\n${doc}`;
    }
  }

  if (pendingJs.length) {
    const block = pendingJs.join("\n");
    if (/<\/body>/i.test(doc)) {
      doc = doc.replace(/<\/body>/i, `${block}\n</body>`);
    } else {
      doc = `${doc}\n${block}`;
    }
  }

  return doc;
}
