/**
 * Documentation reference registry for inline code auto-linking.
 *
 * Inline code tokens in the MDX lessons (e.g. `<a>`, `querySelector`, `flex`)
 * are matched against these maps to render a hover card linking to the
 * canonical MDN page (always) and a W3Schools page (when one reliably exists).
 *
 * Only tokens actually taught in the lessons are included, and only tokens
 * that have a real canonical doc page — generic variable names, literal
 * values, and made-up example identifiers are deliberately excluded to avoid
 * false-positive links in prose.
 *
 * KEY-NORMALIZATION CONTRACT (the consumer relies on this):
 *   - HTML_TAGS keys: lowercase tag name only, no `<`, `>`, or `/`.
 *       e.g. "a", "img", "form"
 *   - CSS_PROPS keys: lowercase CSS property name.
 *       e.g. "display", "flex-direction", "grid-template-columns"
 *   - JS_REFS keys: LOWERCASE, no trailing "()", no leading ".".
 *       Dotted forms use a lowercase dotted key: "json.parse", "console.log".
 *       Bare-method aliases are added where a method is commonly written alone:
 *       "queryselector", "addeventlistener", "foreach".
 *
 * URLs were spot-verified against live MDN / W3Schools pages on 2026-06-25.
 * Where no reliable W3Schools page exists, the `w3schools` field is omitted
 * (the card then shows MDN only). W3Schools URLs are never guessed.
 */

export interface DocReference {
  title: string;
  mdn: string;
  w3schools?: string;
}

// Keyed by lowercase tag name (no angle brackets): "a", "img", "form"
export const HTML_TAGS: Record<string, DocReference> = {
  html: {
    title: "<html> — root element",
    mdn: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/html",
    w3schools: "https://www.w3schools.com/tags/tag_html.asp",
  },
  head: {
    title: "<head> — document metadata",
    mdn: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/head",
    w3schools: "https://www.w3schools.com/tags/tag_head.asp",
  },
  body: {
    title: "<body> — document body",
    mdn: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/body",
    w3schools: "https://www.w3schools.com/tags/tag_body.asp",
  },
  title: {
    title: "<title> — document title",
    mdn: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/title",
    w3schools: "https://www.w3schools.com/tags/tag_title.asp",
  },
  meta: {
    title: "<meta> — metadata",
    mdn: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/meta",
    w3schools: "https://www.w3schools.com/tags/tag_meta.asp",
  },
  link: {
    title: "<link> — external resource link",
    mdn: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/link",
    w3schools: "https://www.w3schools.com/tags/tag_link.asp",
  },
  style: {
    title: "<style> — embedded CSS",
    mdn: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/style",
    w3schools: "https://www.w3schools.com/tags/tag_style.asp",
  },
  script: {
    title: "<script> — embedded/linked script",
    mdn: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/script",
    w3schools: "https://www.w3schools.com/tags/tag_script.asp",
  },
  h1: {
    title: "<h1> — heading level 1",
    mdn: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/Heading_Elements",
    w3schools: "https://www.w3schools.com/tags/tag_hn.asp",
  },
  h2: {
    title: "<h2> — heading level 2",
    mdn: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/Heading_Elements",
    w3schools: "https://www.w3schools.com/tags/tag_hn.asp",
  },
  h3: {
    title: "<h3> — heading level 3",
    mdn: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/Heading_Elements",
    w3schools: "https://www.w3schools.com/tags/tag_hn.asp",
  },
  h6: {
    title: "<h6> — heading level 6",
    mdn: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/Heading_Elements",
    w3schools: "https://www.w3schools.com/tags/tag_hn.asp",
  },
  p: {
    title: "<p> — paragraph",
    mdn: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/p",
    w3schools: "https://www.w3schools.com/tags/tag_p.asp",
  },
  span: {
    title: "<span> — inline container",
    mdn: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/span",
    w3schools: "https://www.w3schools.com/tags/tag_span.asp",
  },
  div: {
    title: "<div> — block container",
    mdn: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/div",
    w3schools: "https://www.w3schools.com/tags/tag_div.asp",
  },
  a: {
    title: "<a> — anchor (link) element",
    mdn: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a",
    w3schools: "https://www.w3schools.com/tags/tag_a.asp",
  },
  strong: {
    title: "<strong> — strong importance",
    mdn: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/strong",
    w3schools: "https://www.w3schools.com/tags/tag_strong.asp",
  },
  em: {
    title: "<em> — emphasis",
    mdn: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/em",
    w3schools: "https://www.w3schools.com/tags/tag_em.asp",
  },
  b: {
    title: "<b> — bold text (stylistic)",
    mdn: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/b",
    w3schools: "https://www.w3schools.com/tags/tag_b.asp",
  },
  i: {
    title: "<i> — italic text (stylistic)",
    mdn: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/i",
    w3schools: "https://www.w3schools.com/tags/tag_i.asp",
  },
  br: {
    title: "<br> — line break",
    mdn: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/br",
    w3schools: "https://www.w3schools.com/tags/tag_br.asp",
  },
  hr: {
    title: "<hr> — thematic break",
    mdn: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/hr",
    w3schools: "https://www.w3schools.com/tags/tag_hr.asp",
  },
  ul: {
    title: "<ul> — unordered list",
    mdn: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/ul",
    w3schools: "https://www.w3schools.com/tags/tag_ul.asp",
  },
  ol: {
    title: "<ol> — ordered list",
    mdn: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/ol",
    w3schools: "https://www.w3schools.com/tags/tag_ol.asp",
  },
  li: {
    title: "<li> — list item",
    mdn: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/li",
    w3schools: "https://www.w3schools.com/tags/tag_li.asp",
  },
  nav: {
    title: "<nav> — navigation section",
    mdn: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/nav",
    w3schools: "https://www.w3schools.com/tags/tag_nav.asp",
  },
  header: {
    title: "<header> — introductory section",
    mdn: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/header",
    w3schools: "https://www.w3schools.com/tags/tag_header.asp",
  },
  footer: {
    title: "<footer> — footer section",
    mdn: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/footer",
    w3schools: "https://www.w3schools.com/tags/tag_footer.asp",
  },
  main: {
    title: "<main> — main content",
    mdn: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/main",
    w3schools: "https://www.w3schools.com/tags/tag_main.asp",
  },
  section: {
    title: "<section> — generic section",
    mdn: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/section",
    w3schools: "https://www.w3schools.com/tags/tag_section.asp",
  },
  article: {
    title: "<article> — self-contained content",
    mdn: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/article",
    w3schools: "https://www.w3schools.com/tags/tag_article.asp",
  },
  img: {
    title: "<img> — image",
    mdn: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img",
    w3schools: "https://www.w3schools.com/tags/tag_img.asp",
  },
  audio: {
    title: "<audio> — embedded audio",
    mdn: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/audio",
    w3schools: "https://www.w3schools.com/tags/tag_audio.asp",
  },
  video: {
    title: "<video> — embedded video",
    mdn: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/video",
    w3schools: "https://www.w3schools.com/tags/tag_video.asp",
  },
  form: {
    title: "<form> — form",
    mdn: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/form",
    w3schools: "https://www.w3schools.com/tags/tag_form.asp",
  },
  label: {
    title: "<label> — form control label",
    mdn: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/label",
    w3schools: "https://www.w3schools.com/tags/tag_label.asp",
  },
  input: {
    title: "<input> — form input control",
    mdn: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input",
    w3schools: "https://www.w3schools.com/tags/tag_input.asp",
  },
  textarea: {
    title: "<textarea> — multi-line text input",
    mdn: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/textarea",
    w3schools: "https://www.w3schools.com/tags/tag_textarea.asp",
  },
  select: {
    title: "<select> — dropdown control",
    mdn: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/select",
    w3schools: "https://www.w3schools.com/tags/tag_select.asp",
  },
  option: {
    title: "<option> — select option",
    mdn: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/option",
    w3schools: "https://www.w3schools.com/tags/tag_option.asp",
  },
  button: {
    title: "<button> — clickable button",
    mdn: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button",
    w3schools: "https://www.w3schools.com/tags/tag_button.asp",
  },
  table: {
    title: "<table> — table",
    mdn: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/table",
    w3schools: "https://www.w3schools.com/tags/tag_table.asp",
  },
  thead: {
    title: "<thead> — table header group",
    mdn: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/thead",
    w3schools: "https://www.w3schools.com/tags/tag_thead.asp",
  },
  tbody: {
    title: "<tbody> — table body group",
    mdn: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/tbody",
    w3schools: "https://www.w3schools.com/tags/tag_tbody.asp",
  },
  tr: {
    title: "<tr> — table row",
    mdn: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/tr",
    w3schools: "https://www.w3schools.com/tags/tag_tr.asp",
  },
  th: {
    title: "<th> — table header cell",
    mdn: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/th",
    w3schools: "https://www.w3schools.com/tags/tag_th.asp",
  },
  td: {
    title: "<td> — table data cell",
    mdn: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/td",
    w3schools: "https://www.w3schools.com/tags/tag_td.asp",
  },
  caption: {
    title: "<caption> — table caption",
    mdn: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/caption",
    w3schools: "https://www.w3schools.com/tags/tag_caption.asp",
  },
};

// Keyed by lowercase CSS property: "display", "flex-direction"
export const CSS_PROPS: Record<string, DocReference> = {
  display: {
    title: "display (CSS property)",
    mdn: "https://developer.mozilla.org/en-US/docs/Web/CSS/display",
    w3schools: "https://www.w3schools.com/cssref/pr_class_display.php",
  },
  color: {
    title: "color (CSS property)",
    mdn: "https://developer.mozilla.org/en-US/docs/Web/CSS/color",
    w3schools: "https://www.w3schools.com/cssref/pr_text_color.php",
  },
  "background-color": {
    title: "background-color (CSS property)",
    mdn: "https://developer.mozilla.org/en-US/docs/Web/CSS/background-color",
    w3schools: "https://www.w3schools.com/cssref/pr_background-color.php",
  },
  "font-size": {
    title: "font-size (CSS property)",
    mdn: "https://developer.mozilla.org/en-US/docs/Web/CSS/font-size",
    w3schools: "https://www.w3schools.com/cssref/pr_font_font-size.php",
  },
  "font-family": {
    title: "font-family (CSS property)",
    mdn: "https://developer.mozilla.org/en-US/docs/Web/CSS/font-family",
    w3schools: "https://www.w3schools.com/cssref/pr_font_font-family.php",
  },
  "font-weight": {
    title: "font-weight (CSS property)",
    mdn: "https://developer.mozilla.org/en-US/docs/Web/CSS/font-weight",
    w3schools: "https://www.w3schools.com/cssref/pr_font_weight.php",
  },
  "line-height": {
    title: "line-height (CSS property)",
    mdn: "https://developer.mozilla.org/en-US/docs/Web/CSS/line-height",
    w3schools: "https://www.w3schools.com/cssref/pr_dim_line-height.php",
  },
  "text-decoration": {
    title: "text-decoration (CSS property)",
    mdn: "https://developer.mozilla.org/en-US/docs/Web/CSS/text-decoration",
    w3schools: "https://www.w3schools.com/cssref/pr_text_text-decoration.php",
  },
  margin: {
    title: "margin (CSS property)",
    mdn: "https://developer.mozilla.org/en-US/docs/Web/CSS/margin",
    w3schools: "https://www.w3schools.com/cssref/pr_margin.php",
  },
  "margin-left": {
    title: "margin-left (CSS property)",
    mdn: "https://developer.mozilla.org/en-US/docs/Web/CSS/margin-left",
    w3schools: "https://www.w3schools.com/cssref/pr_margin-left.php",
  },
  padding: {
    title: "padding (CSS property)",
    mdn: "https://developer.mozilla.org/en-US/docs/Web/CSS/padding",
    w3schools: "https://www.w3schools.com/cssref/pr_padding.php",
  },
  "padding-top": {
    title: "padding-top (CSS property)",
    mdn: "https://developer.mozilla.org/en-US/docs/Web/CSS/padding-top",
    w3schools: "https://www.w3schools.com/cssref/pr_padding-top.php",
  },
  width: {
    title: "width (CSS property)",
    mdn: "https://developer.mozilla.org/en-US/docs/Web/CSS/width",
    w3schools: "https://www.w3schools.com/cssref/pr_dim_width.php",
  },
  height: {
    title: "height (CSS property)",
    mdn: "https://developer.mozilla.org/en-US/docs/Web/CSS/height",
    w3schools: "https://www.w3schools.com/cssref/pr_dim_height.php",
  },
  "max-width": {
    title: "max-width (CSS property)",
    mdn: "https://developer.mozilla.org/en-US/docs/Web/CSS/max-width",
    w3schools: "https://www.w3schools.com/cssref/pr_dim_max-width.php",
  },
  "box-sizing": {
    title: "box-sizing (CSS property)",
    mdn: "https://developer.mozilla.org/en-US/docs/Web/CSS/box-sizing",
    w3schools: "https://www.w3schools.com/cssref/css3_pr_box-sizing.php",
  },
  "flex-direction": {
    title: "flex-direction (CSS property)",
    mdn: "https://developer.mozilla.org/en-US/docs/Web/CSS/flex-direction",
    w3schools: "https://www.w3schools.com/cssref/css3_pr_flex-direction.php",
  },
  "flex-wrap": {
    title: "flex-wrap (CSS property)",
    mdn: "https://developer.mozilla.org/en-US/docs/Web/CSS/flex-wrap",
    w3schools: "https://www.w3schools.com/cssref/css3_pr_flex-wrap.php",
  },
  "align-items": {
    title: "align-items (CSS property)",
    mdn: "https://developer.mozilla.org/en-US/docs/Web/CSS/align-items",
    w3schools: "https://www.w3schools.com/cssref/css3_pr_align-items.php",
  },
  "justify-content": {
    title: "justify-content (CSS property)",
    mdn: "https://developer.mozilla.org/en-US/docs/Web/CSS/justify-content",
    w3schools: "https://www.w3schools.com/cssref/css3_pr_justify-content.php",
  },
  gap: {
    title: "gap (CSS property)",
    mdn: "https://developer.mozilla.org/en-US/docs/Web/CSS/gap",
    w3schools: "https://www.w3schools.com/cssref/css3_pr_gap.php",
  },
  "grid-template-columns": {
    title: "grid-template-columns (CSS property)",
    mdn: "https://developer.mozilla.org/en-US/docs/Web/CSS/grid-template-columns",
    w3schools: "https://www.w3schools.com/cssref/pr_grid-template-columns.php",
  },
  "grid-template-areas": {
    title: "grid-template-areas (CSS property)",
    mdn: "https://developer.mozilla.org/en-US/docs/Web/CSS/grid-template-areas",
    w3schools: "https://www.w3schools.com/cssref/pr_grid-template-areas.php",
  },
  "grid-area": {
    title: "grid-area (CSS property)",
    mdn: "https://developer.mozilla.org/en-US/docs/Web/CSS/grid-area",
    w3schools: "https://www.w3schools.com/cssref/pr_grid-area.php",
  },
  "grid-column": {
    title: "grid-column (CSS property)",
    mdn: "https://developer.mozilla.org/en-US/docs/Web/CSS/grid-column",
    w3schools: "https://www.w3schools.com/cssref/pr_grid-column.php",
  },
  "grid-row": {
    title: "grid-row (CSS property)",
    mdn: "https://developer.mozilla.org/en-US/docs/Web/CSS/grid-row",
    w3schools: "https://www.w3schools.com/cssref/pr_grid-row.php",
  },
};

// Keyed by the bare identifier as written, lowercased, no trailing "()" or
// leading ".". Dotted forms use a lowercase dotted key (e.g. "json.parse").
export const JS_REFS: Record<string, DocReference> = {
  // ---- Statements / declarations / keywords ----
  const: {
    title: "const (declaration)",
    mdn: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/const",
    w3schools: "https://www.w3schools.com/jsref/jsref_const.asp",
  },
  let: {
    title: "let (declaration)",
    mdn: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let",
    w3schools: "https://www.w3schools.com/jsref/jsref_let.asp",
  },
  var: {
    title: "var (declaration)",
    mdn: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/var",
    w3schools: "https://www.w3schools.com/jsref/jsref_var.asp",
  },
  function: {
    title: "function (declaration)",
    mdn: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function",
    w3schools: "https://www.w3schools.com/jsref/jsref_function.asp",
  },
  return: {
    title: "return (statement)",
    mdn: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/return",
    w3schools: "https://www.w3schools.com/jsref/jsref_return.asp",
  },
  if: {
    title: "if...else (statement)",
    mdn: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/if...else",
    w3schools: "https://www.w3schools.com/jsref/jsref_if.asp",
  },
  else: {
    title: "if...else (statement)",
    mdn: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/if...else",
    w3schools: "https://www.w3schools.com/jsref/jsref_if.asp",
  },
  for: {
    title: "for (statement)",
    mdn: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for",
    w3schools: "https://www.w3schools.com/jsref/jsref_for.asp",
  },
  "for...of": {
    title: "for...of (statement)",
    mdn: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...of",
    w3schools: "https://www.w3schools.com/jsref/jsref_forof.asp",
  },
  while: {
    title: "while (statement)",
    mdn: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/while",
    w3schools: "https://www.w3schools.com/jsref/jsref_while.asp",
  },
  try: {
    title: "try...catch (statement)",
    mdn: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/try...catch",
    w3schools: "https://www.w3schools.com/js/js_errors.asp",
  },
  catch: {
    title: "try...catch (statement)",
    mdn: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/try...catch",
    w3schools: "https://www.w3schools.com/js/js_errors.asp",
  },
  "try...catch": {
    title: "try...catch (statement)",
    mdn: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/try...catch",
    w3schools: "https://www.w3schools.com/js/js_errors.asp",
  },
  async: {
    title: "async function (declaration)",
    mdn: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function",
    w3schools: "https://www.w3schools.com/js/js_async.asp",
  },
  await: {
    title: "await (operator)",
    mdn: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/await",
    w3schools: "https://www.w3schools.com/js/js_async.asp",
  },
  import: {
    title: "import (statement)",
    mdn: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import",
    w3schools: "https://www.w3schools.com/js/js_modules.asp",
  },
  export: {
    title: "export (statement)",
    mdn: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/export",
    w3schools: "https://www.w3schools.com/js/js_modules.asp",
  },
  typeof: {
    title: "typeof (operator)",
    mdn: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/typeof",
    w3schools: "https://www.w3schools.com/js/js_typeof.asp",
  },

  // ---- Values / primitives ----
  null: {
    title: "null (value)",
    mdn: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/null",
    w3schools: "https://www.w3schools.com/js/js_type_conversion.asp",
  },
  undefined: {
    title: "undefined (value)",
    mdn: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/undefined",
  },
  nan: {
    title: "NaN (value)",
    mdn: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/NaN",
  },

  // ---- Global functions / objects ----
  number: {
    title: "Number() — convert to number",
    mdn: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/Number",
    w3schools: "https://www.w3schools.com/jsref/jsref_number.asp",
  },
  parseint: {
    title: "parseInt()",
    mdn: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/parseInt",
    w3schools: "https://www.w3schools.com/jsref/jsref_parseint.asp",
  },
  json: {
    title: "JSON (object)",
    mdn: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON",
    w3schools: "https://www.w3schools.com/js/js_json_intro.asp",
  },
  "json.parse": {
    title: "JSON.parse()",
    mdn: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse",
    w3schools: "https://www.w3schools.com/jsref/jsref_parse_json.asp",
  },
  "json.stringify": {
    title: "JSON.stringify()",
    mdn: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify",
    w3schools: "https://www.w3schools.com/jsref/jsref_stringify.asp",
  },

  // ---- String methods ----
  tolowercase: {
    title: "String.prototype.toLowerCase()",
    mdn: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/toLowerCase",
    w3schools: "https://www.w3schools.com/jsref/jsref_tolowercase.asp",
  },
  touppercase: {
    title: "String.prototype.toUpperCase()",
    mdn: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/toUpperCase",
    w3schools: "https://www.w3schools.com/jsref/jsref_touppercase.asp",
  },
  trim: {
    title: "String.prototype.trim()",
    mdn: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/trim",
    w3schools: "https://www.w3schools.com/jsref/jsref_trim_string.asp",
  },

  // ---- Array methods ----
  foreach: {
    title: "Array.prototype.forEach()",
    mdn: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach",
    w3schools: "https://www.w3schools.com/jsref/jsref_foreach.asp",
  },
  push: {
    title: "Array.prototype.push()",
    mdn: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/push",
    w3schools: "https://www.w3schools.com/jsref/jsref_push.asp",
  },
  pop: {
    title: "Array.prototype.pop()",
    mdn: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/pop",
    w3schools: "https://www.w3schools.com/jsref/jsref_pop.asp",
  },
  splice: {
    title: "Array.prototype.splice()",
    mdn: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/splice",
    w3schools: "https://www.w3schools.com/jsref/jsref_splice.asp",
  },
  slice: {
    title: "Array.prototype.slice()",
    mdn: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/slice",
    w3schools: "https://www.w3schools.com/jsref/jsref_slice_array.asp",
  },
  includes: {
    title: "Array.prototype.includes()",
    mdn: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/includes",
    w3schools: "https://www.w3schools.com/jsref/jsref_includes_array.asp",
  },
  length: {
    title: "Array.prototype.length",
    mdn: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/length",
    w3schools: "https://www.w3schools.com/jsref/jsref_length_array.asp",
  },

  // ---- DOM: document / element selection ----
  document: {
    title: "document (global object)",
    mdn: "https://developer.mozilla.org/en-US/docs/Web/API/Document",
    w3schools: "https://www.w3schools.com/jsref/dom_obj_document.asp",
  },
  "document.title": {
    title: "document.title",
    mdn: "https://developer.mozilla.org/en-US/docs/Web/API/Document/title",
    w3schools: "https://www.w3schools.com/jsref/prop_doc_title.asp",
  },
  queryselector: {
    title: "querySelector()",
    mdn: "https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelector",
    w3schools: "https://www.w3schools.com/jsref/met_document_queryselector.asp",
  },
  queryselectorall: {
    title: "querySelectorAll()",
    mdn: "https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelectorAll",
    w3schools: "https://www.w3schools.com/jsref/met_document_queryselectorall.asp",
  },
  getelementbyid: {
    title: "getElementById()",
    mdn: "https://developer.mozilla.org/en-US/docs/Web/API/Document/getElementById",
    w3schools: "https://www.w3schools.com/jsref/met_document_getelementbyid.asp",
  },
  "document.getelementbyid": {
    title: "document.getElementById()",
    mdn: "https://developer.mozilla.org/en-US/docs/Web/API/Document/getElementById",
    w3schools: "https://www.w3schools.com/jsref/met_document_getelementbyid.asp",
  },
  "document.queryselector": {
    title: "document.querySelector()",
    mdn: "https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelector",
    w3schools: "https://www.w3schools.com/jsref/met_document_queryselector.asp",
  },
  createelement: {
    title: "createElement()",
    mdn: "https://developer.mozilla.org/en-US/docs/Web/API/Document/createElement",
    w3schools: "https://www.w3schools.com/jsref/met_document_createelement.asp",
  },
  "document.createelement": {
    title: "document.createElement()",
    mdn: "https://developer.mozilla.org/en-US/docs/Web/API/Document/createElement",
    w3schools: "https://www.w3schools.com/jsref/met_document_createelement.asp",
  },

  // ---- DOM: content & attributes ----
  textcontent: {
    title: "Node.textContent",
    mdn: "https://developer.mozilla.org/en-US/docs/Web/API/Node/textContent",
    w3schools: "https://www.w3schools.com/jsref/prop_node_textcontent.asp",
  },
  innerhtml: {
    title: "Element.innerHTML",
    mdn: "https://developer.mozilla.org/en-US/docs/Web/API/Element/innerHTML",
    w3schools: "https://www.w3schools.com/jsref/prop_html_innerhtml.asp",
  },
  classlist: {
    title: "Element.classList",
    mdn: "https://developer.mozilla.org/en-US/docs/Web/API/Element/classList",
    w3schools: "https://www.w3schools.com/jsref/prop_element_classlist.asp",
  },
  classname: {
    title: "Element.className",
    mdn: "https://developer.mozilla.org/en-US/docs/Web/API/Element/className",
    w3schools: "https://www.w3schools.com/jsref/prop_html_classname.asp",
  },
  getattribute: {
    title: "getAttribute()",
    mdn: "https://developer.mozilla.org/en-US/docs/Web/API/Element/getAttribute",
    w3schools: "https://www.w3schools.com/jsref/met_element_getattribute.asp",
  },
  setattribute: {
    title: "setAttribute()",
    mdn: "https://developer.mozilla.org/en-US/docs/Web/API/Element/setAttribute",
    w3schools: "https://www.w3schools.com/jsref/met_element_setattribute.asp",
  },

  // ---- DOM: insertion & removal ----
  append: {
    title: "Element.append()",
    mdn: "https://developer.mozilla.org/en-US/docs/Web/API/Element/append",
  },
  appendchild: {
    title: "Node.appendChild()",
    mdn: "https://developer.mozilla.org/en-US/docs/Web/API/Node/appendChild",
    w3schools: "https://www.w3schools.com/jsref/met_node_appendchild.asp",
  },
  remove: {
    title: "Element.remove()",
    mdn: "https://developer.mozilla.org/en-US/docs/Web/API/Element/remove",
    w3schools: "https://www.w3schools.com/jsref/met_element_remove.asp",
  },

  // ---- DOM: events ----
  addeventlistener: {
    title: "addEventListener()",
    mdn: "https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener",
    w3schools: "https://www.w3schools.com/jsref/met_element_addeventlistener.asp",
  },

  // ---- Globals: console / window / fetch ----
  "console.log": {
    title: "console.log()",
    mdn: "https://developer.mozilla.org/en-US/docs/Web/API/console/log_static",
    w3schools: "https://www.w3schools.com/jsref/met_console_log.asp",
  },
  alert: {
    title: "alert()",
    mdn: "https://developer.mozilla.org/en-US/docs/Web/API/Window/alert",
    w3schools: "https://www.w3schools.com/jsref/met_win_alert.asp",
  },
  fetch: {
    title: "fetch()",
    mdn: "https://developer.mozilla.org/en-US/docs/Web/API/Window/fetch",
    w3schools: "https://www.w3schools.com/jsref/api_fetch.asp",
  },

  // ---- Fetch API objects ----
  response: {
    title: "Response (Fetch API)",
    mdn: "https://developer.mozilla.org/en-US/docs/Web/API/Response",
  },
  "response.json": {
    title: "Response.json()",
    mdn: "https://developer.mozilla.org/en-US/docs/Web/API/Response/json",
  },
};

// ─── Lookup ───────────────────────────────────────────────────────────────
// Resolve an inline-code token to a DocReference, or null if it's not a known
// reference (the common case — most inline code stays plain). Runs server-side
// in the MDX `code` renderer to decide whether to emit an interactive <DocRef>.
//
// `module` (the chapter's module, e.g. "css", "javascript") only disambiguates
// the rare token that exists as both a CSS property and a JS identifier — the
// chapter's own subject wins.

const HTML_TAG_RE = /^<\/?\s*([a-zA-Z][a-zA-Z0-9-]*)/;

// Normalize an identifier token to a registry key: drop a trailing "()" and a
// leading ".", then lowercase — matching the key-normalization contract above.
function normalizeId(text: string): string {
  return text
    .trim()
    .replace(/\(\s*\)$/, "")
    .replace(/^\./, "")
    .toLowerCase();
}

export function lookupReference(
  rawText: string,
  module?: string
): DocReference | null {
  const text = rawText.trim();
  if (!text) return null;

  // Anything that looks like markup (`<a>`, `</a>`, `<a href>`) resolves via
  // the tag name. If it's markup but an unknown tag, don't fall through to the
  // identifier maps — it isn't a CSS/JS token.
  if (text.includes("<")) {
    const m = text.match(HTML_TAG_RE);
    if (m) {
      const tag = m[1].toLowerCase();
      return HTML_TAGS[tag] ?? null;
    }
    return null;
  }

  const id = normalizeId(text);
  if (!id) return null;

  // Try the chapter-subject map first so an ambiguous bare token resolves to
  // the topic being taught.
  const maps = module === "css" ? [CSS_PROPS, JS_REFS] : [JS_REFS, CSS_PROPS];
  for (const map of maps) {
    if (map[id]) return map[id];
  }
  return null;
}
