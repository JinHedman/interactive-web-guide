"use client";

// Renders a sandboxed iframe showing the result of a code snippet.
// Language can be html, css, or js/jsx.

interface Props {
  code: string;
  language: string;
}

function buildSrcDoc(code: string, language: string): string {
  if (language === "html") {
    // If it looks like a full document (has <html> or <!doctype), render as-is.
    // Otherwise wrap in a minimal shell with sensible defaults.
    const isFullDoc =
      /<html[\s>]/i.test(code) || /<!doctype/i.test(code);

    if (isFullDoc) return code;

    return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width">
<style>
  body { font-family: system-ui, sans-serif; padding: 1rem; margin: 0; line-height: 1.6; }
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
    ${code}
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

export default function CodePreview({ code, language }: Props) {
  const srcDoc = buildSrcDoc(code, language);

  return (
    <iframe
      srcDoc={srcDoc}
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
