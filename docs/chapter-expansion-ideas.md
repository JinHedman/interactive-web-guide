# Per-Chapter Deepening Plan — Topic Depth *Within* Existing Chapters

> **Scope.** This document proposes additional teaching *topic areas* that would deepen each existing teaching chapter, paired with a concrete exercise addition for each. These are **in-chapter deepenings, NOT new chapters**. The motivating example is "teach more JS list methods like `map`/`filter`/`reduce`" — genuinely absent today and the single highest-value gap.
>
> **How this complements the existing `docs/`.** Two bodies of planning already exist and are deliberately *not* duplicated here:
> - `docs/extension-ideas.md` proposes **new chapters / mini-modules** (a11y as its own topic, deploy, deeper grid, package managers, the follow-on React/Next/TS track). Nothing below re-proposes a new chapter.
> - `docs/submodule-research/*.md` proposes **extra practice drills** that re-drill *already-taught* skills on fresh themes (FizzBuzz, counters, accordions, fetch-a-dog, CSS games, fix-this). They explicitly flag several topics as "out of scope / not taught" — event delegation, `localStorage`, `map`/`filter`/`reduce`, keyboard a11y for widgets. **Those deliberately-excluded topics are exactly this document's territory:** new *concepts* to teach inside a chapter, not new reps of old concepts.
>
> So the rule used throughout: if a chapter already *teaches* a thing, it is not proposed (verified against every `.mdx`). Each addition introduces a concept the chapter does not currently cover, at the chapter's current level, favoring the 2–3 highest-value additions over an exhaustive dump.
>
> **Audience.** Learners with *some* prior coding exposure (not absolute beginners), on VS Code + GitHub Desktop. Additions must not bloat a chapter or break the strict no-forward-reference ordering.
>
> **Exercise-placement convention.** Each chapter today has exactly ONE `<Exercise>` and ONE `<Quiz>`. Per the brief's constraint, a deepening's drill lands in **one of two places**:
> - **New `<Exercise>` inside the chapter** — only when the topic is core enough to belong in the teaching flow and the chapter can carry a second short exercise without losing focus (rare; flagged explicitly).
> - **New drill in that module's `*-practice.mdx`** — the default home, since those chapters are explicitly the exercise-heavy ones and already hold multiple `<Exercise>` blocks. This keeps teaching chapters lean.
>
> **Doc-reference registry.** New identifiers introduced by these additions are listed per module under "New doc-reference entries needed" so `lib/references.ts` can be extended (keys follow the lowercase, no-`()`, no-leading-`.` contract; dotted forms lowercased).

---

## Biggest wins (read this first)

The must-adds, ranked by value-to-effort across the whole course:

1. **`map` / `filter` / `reduce` in JS `4-arrays` (transform methods) + `7-functions` (callbacks-as-arguments).** The flagship gap. `forEach` is taught, the render-from-array pattern leans on it, and the capstone's "array is the source of truth" discipline is *begging* for declarative transforms — yet the three methods that define modern array work are absent. Highest-value single addition in the course. Drill home: `javascript/10-practice`.
2. **Event delegation (one listener on a parent + `event.target`/`closest`) in integration `3-events`.** The capstone attaches a fresh listener to every element on every render; delegation is the professional answer and the chapter already half-teaches it (`event.target` is shown). A real conceptual gap the practice docs flagged as untaught. Drill home: `integration/8-practice`.
3. **`localStorage` persistence as a deepening of the capstone (`integration/6`).** Every learner notices their to-do list vanishes on reload. Two methods (`setItem`/`getItem`) + `JSON.stringify`/`parse` (already in the registry) make the app feel real. Highest motivation payoff. Drill: a new short `<Exercise>` inside the capstone *or* `integration/8-practice`.
4. **Object/array shorthands learners will hit immediately: destructuring + spread (JS `4-arrays`).** `const { text, done } = task` and `[...tasks, newTask]` appear in literally every React tutorial and most modern code; the capstone manually writes `tasks[index].done`. A natural "nice depth" that smooths the on-ramp to the framework read-mores. Drill home: `javascript/10-practice`.
5. **CSS custom properties (variables) in `2-box-model` and pseudo-classes/combinators in `1-how-css-works`.** Variables are how every real stylesheet manages a palette (and the bridge to "design tokens"); relationship selectors and `:hover`/`:focus` are used in examples but never *taught*. Both are low-effort, high-transfer. Drill home: `css/6-practice`.
6. **`:invalid`/`required` + the Constraint Validation basics in HTML `6-forms`.** The form chapter teaches `required` structurally but never that the browser *styles and blocks* on it; one paragraph + `:invalid` closes the loop without straying into JS. Drill home: `html/9-practice`.

Everything else below is solid "nice depth." The six above are the ones to schedule first.

---

# Module: setup

## `1-tools-and-first-page`
**Current focus.** Install VS Code + Live Server + Prettier, set Format-On-Save, clone a repo, create `index.html`, preview with Live Server, commit and push.

**Proposed additions.**

- **The `file://` vs `http://127.0.0.1:5500` distinction (why Live Server, not double-click).** One short callout that opening a file directly (`file://`) and serving it via Live Server are different, and that the latter is required for reloads (and later, `fetch`).
  - **must-add** — this is the #1 silent-failure mode for the whole course; the `submodule-research/setup.md` Set A is built entirely around diagnosing it.
  - **Exercise plan:** drill in `setup/2-practice` — a verify-and-fix scenario: "edits save but the browser doesn't refresh; name the cause and the fix" (confirm the address bar reads `127.0.0.1:5500`, re-open via Live Server).

- **Commit ≠ pushed (the local-vs-remote mental model).** The chapter does both actions but doesn't dwell on the trap that a commit is local until pushed.
  - **nice depth** — high-retention, near-zero cost; reinforced heavily in `setup/2-practice` research.
  - **Exercise plan:** drill in `setup/2-practice` — "prove your commit reached GitHub": confirm `Push origin` is greyed out and the commit message appears on github.com.

> *Restraint note:* `setup/submodule-research.md` argues convincingly that setup warrants *at most* one small practice set and that branches/PRs/`.gitignore` belong to the `workflow` module. These two additions stay strictly within the existing clone/commit/push surface and do not pull workflow material forward.

---

# Module: html

## `1-structure`
**Current focus.** Elements/tags/attributes, nesting, `<!doctype html>`, `<html lang>`, `<head>` vs `<body>`, charset/viewport/title.

**Proposed additions.**

- **HTML comments (`<!-- -->`) and how whitespace collapses.** Learners with prior coding exposure expect comments; HTML's are unique, and "why don't my blank lines space paragraphs?" bites in chapter 2.
  - **must-add** — comments are a basic tool used in every later chapter's examples but never introduced; whitespace-collapse is a top beginner confusion the `html/9` practice quiz already targets but the *lesson* never explains.
  - **Exercise plan:** drill in `html/9-practice` — add a comment to a small doc and fix a "three blank lines inside one `<p>`" spacing attempt by using separate `<p>` elements.

- **A couple more `<head>` metadata tags worth knowing: `<meta name="description">` and `<link rel="icon">`.** Stays conceptual; ties metadata to "what search results and browser tabs show."
  - **nice depth** — rounds out "what lives in `<head>` and why," reinforcing the content-vs-metadata test the chapter already teaches.
  - **Exercise plan:** drill in `html/9-practice` — add a description meta and a favicon link to the profile skeleton; confirm the tab icon/description.

## `2-text`
**Current focus.** `<h1>`–`<h6>` outline, `<p>`, `<ul>`/`<ol>`/`<li>`, `<em>`/`<strong>` vs `<i>`/`<b>`, `<br>`/`<hr>`.

**Proposed additions.**

- **Description lists (`<dl>`/`<dt>`/`<dd>`) and nested lists.** A third list type for genuine term→definition data, plus lists inside list items.
  - **nice depth** — `submodule-research/html.md` (A4) already wants a `<dl>` *drill*; the gap is that the *concept* is never taught. Teaching it here (one short example) gives that drill a home.
  - **Exercise plan:** drill in `html/9-practice` — mark up a 4-term glossary as a `<dl>`, and nest a sub-list inside one `<li>`.

- **Inline semantic text: `<blockquote>`/`<q>`, `<code>`, `<time>`, `<abbr>`.** A small set of meaning-carrying inline elements beyond `<em>`/`<strong>`.
  - **nice depth** — extends the "same look, more meaning" theme the chapter already lands; keep it to 3–4 elements so it doesn't sprawl.
  - **Exercise plan:** drill in `html/9-practice` — mark up a short quote with attribution and an inline `<code>` snippet inside a paragraph.

## `3-links`
**Current focus.** `<a href>`, relative vs absolute, `#fragment` + `id`, `target="_blank"` + `rel="noopener"`, descriptive link text.

**Proposed additions.**

- **`mailto:` and `tel:` links.** The non-`http` schemes a contact page needs; tiny but genuinely useful and never mentioned.
  - **must-add** — the course builds a contact section/form; an email link is the obvious missing piece, and `submodule-research/html.md` (B2) already assumes a `mailto:` exists to *debug*.
  - **Exercise plan:** drill in `html/9-practice` — add a working `mailto:` link to the footer with descriptive text (not the raw address as the only label).

- **Relative-path navigation: `./`, `../`, and folder structure.** The chapter shows `about.html` and `projects/web.html` but never `../` (up a folder) — the exact thing that breaks in a multi-page site.
  - **nice depth** — pairs with `submodule-research/html.md` (B1) two-page-site drill; teaching `../` makes that drill correct rather than guesswork.
  - **Exercise plan:** drill in `html/9-practice` — build a two-folder mini-site (`index.html` + `pages/about.html`) linking back and forth with `../`.

## `4-images-media`
**Current focus.** `<img src alt>`, relative paths, decorative `alt=""`, `width`/`height` (layout shift), `<audio>`/`<video controls>`.

> *Boundary:* `docs/extension-ideas.md` §1.8 already reserves **image optimization** (`srcset`, `<picture>`, formats, `loading="lazy"`) for a *new* chapter. Do **not** teach those here. The additions below stay within "caption and label media."

**Proposed additions.**

- **`<figure>` + `<figcaption>` for captioned media.** The semantic way to attach a visible caption to an image/diagram — distinct from `alt`.
  - **must-add** — it's the natural next element after `alt`, used constantly, and `submodule-research/html.md` (B4) already wants the *drill*; the concept just needs a home.
  - **Exercise plan:** drill in `html/9-practice` — wrap a gallery image in `<figure>` with a `<figcaption>`, and contrast when to use a caption vs `alt`.

- **`<video>`/`<audio>` fallback content and the `<source>` element.** Text between the tags as a fallback, and naming why multiple `<source>`s exist (format support) without going deep.
  - **nice depth** — the chapter shows `<video controls>` with a single `src`; one sentence on fallback text + `<source>` rounds out media literacy.
  - **Exercise plan:** drill in `html/9-practice` — add a `<video controls>` with fallback text and confirm the controls render.

## `5-semantics`
**Current focus.** `<header>`/`<nav>`/`<main>`/`<section>`/`<article>`/`<footer>`, `<div>`/`<span>` fallback, block vs inline, why semantics help a11y/SEO.

> *Boundary:* `docs/extension-ideas.md` §1.5 reserves a full **accessibility chapter** (ARIA, contrast, keyboard nav, audits). Keep ARIA/audits out of here.

**Proposed additions.**

- **`<aside>` and `<figure>` as landmarks; the heading-outline relationship.** The chapter lists six landmarks but omits `<aside>` (related/sidebar content), which its own `submodule-research` (C1) drill assumes.
  - **must-add** — `<aside>` is a core landmark left out of an otherwise-complete set; teaching it makes the landmark vocabulary whole.
  - **Exercise plan:** drill in `html/9-practice` — restructure a flat content dump adding an `<aside>` for related links alongside `<main>`.

- **`<details>`/`<summary>` for native, no-JS disclosure.** A native collapsible widget — a satisfying "HTML can do this without JavaScript" moment.
  - **nice depth** — `submodule-research/html.md` (C4) wants the drill; the concept fits "semantics name behavior, not just regions." Keep it to one example.
  - **Exercise plan:** drill in `html/9-practice` — build a 3-item FAQ with `<details>`/`<summary>` and confirm it toggles with zero JS.

## `6-forms`
**Current focus.** `<form>` action/method, `<label>` for/id, input types (text/email/password/number/checkbox/radio), `<textarea>`/`<select>`/`<option>`, button types, `required`/`placeholder`.

> *Boundary:* `docs/extension-ideas.md` §1.7 reserves a **deep forms-validation chapter** (Constraint Validation API, `setCustomValidity`, `validity`). Keep the JS API out; teach only the *HTML-side* validation that the markup already implies.

**Proposed additions.**

- **HTML5 validation attributes the browser enforces for free: `:invalid` styling, `minlength`/`maxlength`, `pattern`, `min`/`max`, `type="url"`/`type="tel"`.** The chapter teaches `required` but never that the browser *blocks submission and can be styled* on validity — a one-paragraph, HTML-only deepening.
  - **must-add** — closes a real loop: learners set `required` without understanding what it actually *does* in the browser, and it's purely declarative (no JS, stays in-module).
  - **Exercise plan:** drill in `html/9-practice` — add `type="url"`, `minlength`, and `pattern` to the contact form and observe the browser's built-in blocking on submit.

- **`<fieldset>` + `<legend>` to group related controls (esp. radio groups).** The accessible grouping element a radio set needs; the chapter teaches radio `name`-grouping but not the visual/semantic group label.
  - **nice depth** — `submodule-research/html.md` (D3) wants the drill; the concept fits naturally right after the radio-group explanation.
  - **Exercise plan:** drill in `html/9-practice` — wrap a "How did you hear about us?" radio group in `<fieldset>`/`<legend>`.

## `7-tables`
**Current focus.** `<table>`/`<tr>`/`<th>`/`<td>`, `<thead>`/`<tbody>`, `<caption>`, data-not-layout.

**Proposed additions.**

- **`<th scope="col">`/`scope="row">` for header association.** The chapter uses `<th>` only as column headers; `scope` (and row headers) is what makes a table actually navigable by a screen reader.
  - **must-add** — it's the single biggest table-accessibility gap and `submodule-research/html.md` (D5) already targets it; one short example teaches it.
  - **Exercise plan:** drill in `html/9-practice` — convert a table's first column to `<th scope="row">` and mark column headers `scope="col"`.

- **`colspan`/`rowspan` for merged cells, and `<tfoot>` for a summary/total row.** The mechanics of cells that span, plus the footer group for totals.
  - **nice depth** — completes the table element set; keep it to a single 2-row example so it doesn't balloon a deliberately short (20-min) chapter.
  - **Exercise plan:** drill in `html/9-practice` — add a `<tfoot>` total row that spans columns with `colspan`.

## `8-page-project`
**Current focus.** Plan from landmarks, combine all elements into one page, in-page nav, validate at W3C.

**Proposed additions.**

- **A pre-flight accessibility/validity checklist as a reusable habit (not new elements).** The chapter already lists a checklist inline; the deepening is framing it as a repeatable pass the learner runs on *any* page, plus a note on the browser's built-in "inspect the accessibility tree" view.
  - **nice depth** — pure consolidation; no new tags. Reinforces every prior chapter's a11y thread without straying into the reserved a11y chapter.
  - **Exercise plan:** no new exercise needed — the existing capstone exercise already ends in a validate-and-check step; extend its `expected`/checklist rather than add a drill. (If anything, a tiny `html/9-practice` "audit this page against the checklist" fix-this.)

**New doc-reference entries needed (html module).**
- HTML_TAGS: `dl`, `dt`, `dd`, `blockquote`, `q`, `code`, `time`, `abbr`, `figure`, `figcaption`, `source`, `aside`, `details`, `summary`, `fieldset`, `legend`, `tfoot`.
- (Attributes like `scope`, `colspan`, `mailto:`, `pattern`, `minlength` are not registry keys — the registry keys tags/props/JS identifiers, not attributes — so no entries are needed for those; they live in prose with `DocsLinks`.)

---

# Module: css

## `1-how-css-works`
**Current focus.** Rule anatomy, element/class/id selectors, inline/internal/external, cascade + specificity (basic), `<link>`.

**Proposed additions.**

- **Combinators and grouping: descendant (`.card p`), child (`>`), and the grouping comma (`h1, h2`).** The chapter teaches only the three single selectors; relationship selectors are *used* in later examples (`.card p`, `.details h1`) but never taught — a forward-reference the cascade chapter quietly relies on.
  - **must-add** — genuinely fills a self-referenced gap; `submodule-research/css.md` (A2) wants the drill but the *concept* is untaught. Low effort, high transfer.
  - **Exercise plan:** drill in `css/6-practice` (which *already* has a "style by relationship" drill — so the teaching addition here *justifies* that existing drill rather than adding a new one). No new drill needed; add the teaching, point the existing drill at it.

- **Pseudo-classes: `:hover`, `:focus`, and `:nth-child()`.** `:hover`/`:focus` are mentioned in passing in chapter 3 ("add both") but never *taught*; `:nth-child` (zebra striping) is a common, satisfying next step.
  - **must-add** — interactive states are used before they're explained; teaching them in the selectors chapter is the correct home and removes another forward-reference.
  - **Exercise plan:** drill in `css/6-practice` (its existing "interactive states with pseudo-classes" drill becomes the home — again, the teaching addition justifies a drill the practice chapter already assumes).

## `2-box-model-color-typography`
**Current focus.** Box model, `box-sizing: border-box`, named/hex/rgb/hsl color, px/rem/em/%, font-family/size/weight/line-height.

**Proposed additions.**

- **CSS custom properties (variables): `--brand: navy;` + `var(--brand)`.** How every real stylesheet manages a palette in one place; the conceptual bridge to "design tokens" and Tailwind's theme.
  - **must-add** — the single most-used modern-CSS feature absent from the module; trivial to teach (define on `:root`, use with `var()`), huge payoff, and it directly sets up the CSS read-more's Tailwind framing.
  - **Exercise plan:** drill in `css/6-practice` — refactor the profile card to define its colors as `--card-bg`, `--accent` on `:root` and reference them with `var()`; change the palette by editing one line.

- **`em` compounding vs `rem`, and a quick note on `box-shadow`/`opacity` for polish.** The chapter teaches what `em`/`rem` mean but not the *compounding trap* (`em` inside `em`); `box-shadow` is the one decorative property learners most want.
  - **nice depth** — `submodule-research/css.md` (B4/B5) targets the `em`-compounding *quiz/drill*; teaching the trap explicitly gives it grounding. `box-shadow` is a small, motivating extra.
  - **Exercise plan:** drill in `css/6-practice` — a nested-`em` "units showdown" (predict each size, then verify) plus add a subtle `box-shadow` to the card.

## `3-layout-and-flexbox`
**Current focus.** `display` block/inline/inline-block/none, flex container, `justify-content`/`align-items`/`gap`/`flex-direction`/`flex-wrap`, grid peek, `:hover`/`:focus` mention.

**Proposed additions.**

- **`flex-grow`/`flex-shrink`/`flex-basis` (and the `flex: 1` shorthand) on flex *items*.** The chapter is all container properties; the capstone literally uses `flex: 1` on the task span (`li span { flex: 1; }`) without it ever being taught — a forward-reference into the integration module.
  - **must-add** — `flex: 1` appears in the capstone and the integration practice solutions; teaching it here removes a genuine forward-reference and explains "make this item take the remaining space."
  - **Exercise plan:** drill in `css/6-practice` — build a toolbar where a title takes fixed width and a search box grows to fill with `flex: 1`, plus a `flex-shrink: 0` avatar that never squashes.

- **`align-self` and `order` (per-item overrides), and centering with flex (`justify-content: center` + `align-items: center`).** The "center anything" recipe plus the two item-level overrides Flexbox Froggy introduces.
  - **nice depth** — `submodule-research/css.md` (C1/C3) wants the centering drill and notes `order`/`align-self` as "new properties"; teaching them briefly closes that loop.
  - **Exercise plan:** drill in `css/6-practice` — center a card in a full-viewport-height container, then use `order` to visually reorder two items without changing the HTML.

## `4-responsive-basics`
**Current focus.** Viewport meta, fluid sizing (`max-width`, `%`, `margin: 0 auto`), mobile-first media queries (one breakpoint), prefer relative units.

**Proposed additions.**

- **A second breakpoint + `max-width` queries, and the `clamp()` function for fluid type.** The chapter teaches exactly one `min-width` breakpoint; real layouts layer two, and `clamp(min, preferred, max)` is the modern one-line fluid-sizing tool.
  - **nice depth** — `submodule-research/css.md` (C4) wants the two-breakpoint navbar drill; teaching `clamp()` is a small, high-impact modern addition that fits "fluid sizing first."
  - **Exercise plan:** drill in `css/6-practice` — a header that changes at two breakpoints (600px and 900px), with a heading sized by `clamp()` so it scales smoothly between them.

- **`prefers-color-scheme` and `prefers-reduced-motion` media features.** Media queries aren't only about width — responding to the user's OS dark-mode/motion preference is the same `@media` tool applied to a new condition.
  - **nice depth** — extends the media-query concept the chapter already teaches into the most common non-width feature; pairs with the integration dark-mode toggle drill.
  - **Exercise plan:** drill in `css/6-practice` — add an `@media (prefers-color-scheme: dark)` block that swaps the card's CSS-variable palette (ties back to the `2-box-model` variables addition).

## `5-grid-in-depth`
**Current focus.** `display: grid`, `grid-template-columns`/`fr`/`repeat()`, `gap`, `grid-column`/`grid-row` span, `grid-template-areas`, `repeat(auto-fit, minmax())`, grid vs flex.

> This chapter is already deep (it *is* the `extension-ideas.md` §1.4 "grid in depth" addition realized) and its read-more already names subgrid + container queries. Keep additions minimal.

**Proposed additions.**

- **Line-based placement (`grid-column: 2 / 4`) alongside the `span` syntax already taught, plus `align-items`/`justify-items` on the grid.** The chapter teaches `span` but not numbered grid lines (what Grid Garden drills) or item alignment within cells.
  - **nice depth** — `submodule-research/css.md` (D1) explicitly notes line-based placement as the thing Grid Garden teaches beyond the lesson's `span`; one example closes it.
  - **Exercise plan:** drill in `css/6-practice` — place one feature tile by explicit line numbers (`grid-column: 1 / 3; grid-row: 1 / 3`) and contrast it with the `span` version.

**New doc-reference entries needed (css module).**
- CSS_PROPS: `flex` (shorthand), `flex-grow`, `flex-shrink`, `flex-basis`, `align-self`, `order`, `justify-items`, `box-shadow`, `opacity`, `border-radius`, `grid-row-start`/`grid-column-start` (optional). Custom properties (`--name`) and `var()` are not single property keys — add a `var` entry under a "CSS functions" note if the registry supports functions, otherwise leave to `DocsLinks`. `clamp()`, `minmax()`, `repeat()` likewise are functions; `minmax`/`repeat` already appear in grid prose — add `DocsLinks` rather than registry keys.
- Media features (`prefers-color-scheme`, `prefers-reduced-motion`) are at-rule features, not property keys — `DocsLinks` only.

---

# Module: javascript

> **The flagship gap lives here.** `forEach` is taught (ch6) and template literals (ch3); `map`/`filter`/`reduce` are genuinely absent. The arrays chapter teaches `push`/`pop`/index/`length`; the functions chapter teaches declaration/params/return/scope/arrows. Transform methods are the missing link between "I can loop" and "I can declaratively transform data" — the exact instinct React formalizes.

## `1-what-is-js-and-running-it`
**Current focus.** What JS adds (behavior), `<script src>` + placement, `console.log`, opening devtools, comments.

**Proposed additions.**

- **More `console` methods: `console.warn`, `console.error`, `console.table`, and logging multiple values / objects.** The chapter only shows `console.log("text")`; learners benefit from `console.table` (great for arrays of objects, which they'll have by ch4) and the warn/error levels they'll *see* in red later.
  - **nice depth** — tiny, compounds across every later chapter, and `console.table` pays off the moment arrays-of-objects appear.
  - **Exercise plan:** drill in `javascript/10-practice` — log an array of objects with `console.table`, and use `console.warn`/`console.error` to see the styled output levels.

- **`<script defer>` as the modern alternative to bottom-of-body placement.** The chapter explains *why* the script goes before `</body>`; `defer` is the one-attribute modern equivalent worth naming.
  - **nice depth** — a one-sentence "what's next" pointer; keep it light so it doesn't muddy the clear bottom-of-body rule.
  - **Exercise plan:** no new drill — fold into prose as a callout; the existing exercise already proves placement works.

## `2-variables-and-types`
**Current focus.** `const`/`let` (not `var`), primitives (string/number/boolean/null/undefined), arithmetic, assignment operators, `const` by default.

**Proposed additions.**

- **`++`/`--` increment/decrement operators.** The loops chapter (ch6) uses `i++` heavily and the integration counters use `count + 1`; `++`/`--` are introduced *implicitly* in loops but never taught as operators.
  - **must-add** — `i++` is a forward-reference into ch6; teaching it alongside `+=`/`-=` (already covered) is the natural home and one line of new content.
  - **Exercise plan:** drill in `javascript/10-practice` — a tiny "tally" script using `++` and `--` and logging the running value (or fold into an existing counter-style drill).

- **`typeof` edge cases + a one-line note on `bigint`/`symbol` existing.** The chapter shows `typeof` for the five core types; a brief mention that two more primitives exist (without teaching them) prevents the "you said five but MDN says seven" confusion for this audience.
  - **nice depth** — accuracy for prior-exposure learners who will look things up; explicitly framed as "you won't use these yet."
  - **Exercise plan:** no new drill — prose-only callout.

## `3-strings-numbers-booleans`
**Current focus.** Concatenation vs template literals, `length`/`toUpperCase`/`toLowerCase`/`includes`/`slice`, `Number`/`parseInt`, truthy/falsy.

**Proposed additions.**

- **More everyday string methods: `split`, `trim`, `replace`, `startsWith`/`endsWith`, `indexOf`.** The chapter teaches five methods; `split` (used in the `javascript/10` word-counter drill *before* it's taught), `trim` (used throughout integration validation *before* it's taught), and `replace` are core gaps.
  - **must-add** — `split` and `trim` are *already used in existing drills/lessons* (word-counter drill; `input.value.trim()` in three integration chapters) without ever being taught — real forward-references. Teaching them here fixes that.
  - **Exercise plan:** drill in `javascript/10-practice` (its word-counter drill already uses `split`; this teaching addition grounds it). Add a small "normalize a name" drill: `trim`, `toLowerCase`, `replace` extra spaces.

- **Numbers: `toFixed`, `Math.round`/`Math.max`/`Math.min`/`Math.random`, and `template-literal` number formatting.** The chapter does arithmetic and conversion but never `Math.*` or `toFixed` — needed the moment they format a price or pick a random item.
  - **nice depth** — `submodule-research/javascript.md` (B2) drills "find the largest *without* `Math.max`" precisely because `Math.max` is untaught; teaching the `Math` basics is the complement, and `toFixed` is essential for money.
  - **Exercise plan:** drill in `javascript/10-practice` — format a computed price to 2 decimals with `toFixed`, and pick a random array item with `Math.random` + `Math.floor`.

## `4-arrays-and-objects`
**Current focus.** Array index/`push`/`pop`/`length`, object literals, dot vs bracket, nesting, `const` mutation.

**Proposed additions.**

- **`map`, `filter`, and `reduce` (transform methods).** ⭐ The flagship gap. Build directly on `forEach` (which the loops chapter teaches): `map` transforms each item into a new array, `filter` keeps items matching a test, `reduce` collapses to a single value. Frame as "produce a *new* array/value from an existing one" — the declarative counterpart to the loops they already write.
  - **must-add** — the single highest-value addition in the whole course. Note an ordering subtlety: these take a *callback function*, so they read most naturally *after* `7-functions` (arrows). **Recommendation:** introduce `map`/`filter` *lightly* in `4-arrays` using the `function`-callback form already shown for `forEach` in ch6's prerequisite chain — but the **deep treatment + `reduce`** belongs paired with `7-functions`, where arrow callbacks are taught. Trade-off: teaching them fully in ch4 forward-references arrow syntax; teaching them only in ch7 delays a core data skill. The split (light intro in ch4, full callbacks-as-arguments treatment in ch7) respects ordering while front-loading the instinct.
  - **Exercise plan:** drill in `javascript/10-practice` — given `const prices = [4, 9, 2, 6]` (matching the existing cart drill data), use `map` to add tax to each, `filter` to keep those over 5, and `reduce` to total them — contrasted with the `for`-loop version the practice chapter already has. This is the keystone new drill.

- **Array search/order methods: `find`, `indexOf`, `sort`, `join`, `Array.includes`.** `includes` is in the registry but only as an array note; `find` (get the first matching object), `sort`, and `join` are everyday tools absent from the chapter.
  - **must-add** — `find` is exactly what the capstone's `splice(index, 1)` works around; `join` is the clean way to render a list to a string. These are core, not exotic.
  - **Exercise plan:** drill in `javascript/10-practice` — from an array of `{ name, score }` objects, `find` one by name, `sort` by score, and `join` the names into a sentence.

- **Object/array destructuring and the spread operator (`...`).** `const { text, done } = task` and `const next = [...tasks, newTask]`. The capstone manually writes `tasks[index].done` and mutates with `push`/`splice`; destructuring + spread are the modern idioms every React example uses.
  - **must-add (depth)** — biggest smoother for the framework on-ramp; the capstone read-more says "your `{ text, done }` objects *are* component props/state," and destructuring is how you read props. Keep the intro concrete (pull two fields off an object; copy an array with one new item).
  - **Exercise plan:** drill in `javascript/10-practice` — destructure `{ name, score }` in a loop body, and build a new array with spread (`[...nums, 99]`) instead of `push`, observing the original is unchanged.

## `5-conditionals-and-comparison`
**Current focus.** `===`/`!==`/`<`/`>`, `&&`/`||`/`!`, `if`/`else if`/`else`, ternary, truthiness recap.

**Proposed additions.**

- **`switch` statements.** The standard multi-branch alternative to a long `else if` chain — prior-exposure learners likely know it from other languages and will look for it.
  - **nice depth** — natural companion to `if`/`else if`; keep it to one example (e.g. a day-of-week or priority mapper) so it doesn't compete with the ternary.
  - **Exercise plan:** drill in `javascript/10-practice` — rewrite a 4-branch `if`/`else if` (e.g. priority → label) as a `switch`, confirming identical output.

- **Logical operators as value-pickers: `||` for defaults, `??` (nullish coalescing), and optional chaining `?.`.** The chapter teaches `&&`/`||` as boolean combiners only; their use as `const name = input || "Anonymous"` and `user?.address?.city` is how they appear in real code (and guards the exact `null`/`undefined` traps the integration module warns about).
  - **must-add (depth)** — `?.` and `??` directly prevent the "Cannot read properties of null" crash the devtools chapter (ch9) describes; teaching them where comparison lives is the right home. High modern relevance.
  - **Exercise plan:** drill in `javascript/10-practice` — given a nested object that may be missing a field, read it safely with `?.` and supply a fallback with `??`; contrast with the crash you'd get without them.

## `6-loops`
**Current focus.** `for` counter, `for...of`, `while`, infinite-loop trap, `forEach`.

**Proposed additions.**

- **`break` and `continue`.** The two loop-control keywords — stop early, or skip a pass. The chapter teaches loop *structure* but not how to exit early (useful for search loops like the "find largest" drill).
  - **must-add** — basic loop control every prior-exposure learner expects; the find-first-match pattern needs `break`, and it's a one-example addition.
  - **Exercise plan:** drill in `javascript/10-practice` — loop to find the first number over a threshold and `break`; loop to print only even numbers with `continue` (or fold into the existing "largest" drill as a stretch).

- **`for...in` for object keys, and `Object.keys`/`Object.values`/`Object.entries`.** The chapter loops arrays only; iterating an object's properties is the obvious gap, and `Object.entries` + `for...of` is the modern way.
  - **nice depth** — pairs with the objects taught in ch4; keep it brief and steer toward `Object.keys`/`entries` over bare `for...in`.
  - **Exercise plan:** drill in `javascript/10-practice` — given an object of `{ skill: level }` pairs, loop with `Object.entries` and log each `"skill: level"` line.

## `7-functions`
**Current focus.** Declare/call, params vs args, return, local vs global scope, function expression + arrow.

**Proposed additions.**

- **Functions as arguments (callbacks) — and the deep `map`/`filter`/`reduce` treatment.** ⭐ This is where transform methods belong *fully*, because they take a callback. The chapter teaches arrows but never that a function can be *passed to* another function — yet `forEach`/`addEventListener`/`map` all do exactly that. Teaching "a function is a value you can pass" here unifies `forEach` (already met), event handlers (coming next module), and `map`/`filter`/`reduce`.
  - **must-add** — the conceptual keystone the whole DOM/events/transform story rests on; currently implicit everywhere and explicit nowhere. Pair it with the full `map`/`filter`/`reduce` treatment (see ch4) so the callback concept has a concrete payoff.
  - **Exercise plan:** drill in `javascript/10-practice` — write a function that takes another function as an argument (e.g. `applyToEach(array, fn)`), then call `map`/`filter` with arrow callbacks and explain they're the built-in version of what you just wrote.

- **Default parameters and the rest parameter (`...args`).** `function greet(name = "friend")` and `function sum(...nums)`. Common, simple, and absent.
  - **nice depth** — default params are immediately useful and trivial; rest params round out the spread/destructuring story from ch4.
  - **Exercise plan:** drill in `javascript/10-practice` — write `greet(name = "friend")` and a `sum(...nums)` that totals any number of arguments with `reduce`.

## `8-dom-concept`
**Current focus.** DOM as a live tree, `document` as entry point, changing the DOM changes the view, preview of next module. (Bridge chapter, intentionally light.)

**Proposed additions.**

- **Nodes vs elements, and parent/child/sibling relationships (`parentElement`, `children`).** The chapter sketches the tree but doesn't name the navigation relationships the integration module *uses* (the capstone calls `question.parentElement`).
  - **nice depth** — the tree-navigation vocabulary (`parentElement`, `children`, `nextElementSibling`) is used in `integration/8`'s accordion solution before it's introduced; one labelled diagram closes the gap without adding code to this concept-only chapter.
  - **Exercise plan:** no new drill — this is a concept chapter; extend the existing tree diagram + one prose paragraph. (Any drill belongs in `integration/8-practice`, where DOM navigation is actually exercised.)

> Keep this chapter light by design — it's a 20-minute bridge. One vocabulary addition is the right ceiling.

## `9-devtools-and-debugging`
**Current focus.** Elements/Console/Sources panels, live-edit DOM/CSS, `ReferenceError`/`TypeError`, off-by-one debug, `console.log` workflow, breakpoints intro.

**Proposed additions.**

- **The Network tab (first look) — sets up `fetch`.** The chapter tours Elements/Console/Sources but not Network, which the integration `fetch` chapter (ch7) needs for "is my request actually firing / what came back?".
  - **must-add** — `extension-ideas.md` §1.2 explicitly wants "a first look at the Network tab (sets up fetch)"; it's the one panel missing and it directly serves a later chapter.
  - **Exercise plan:** drill in `integration/8-practice` (alongside the fetch drill) — open the Network tab, watch the request to JSONPlaceholder, and inspect the JSON response. (Belongs in integration practice, not JS practice, since that's where a real request runs.)

- **`debugger;` statement and conditional breakpoints; `console.assert`.** The chapter introduces clickable breakpoints; the `debugger;` keyword (a breakpoint in code) and `console.assert` are small, high-value debugging tools.
  - **nice depth** — `debugger;` is the fastest way to pause without the Sources UI; one sentence each.
  - **Exercise plan:** drill in `javascript/10-practice` — add a `debugger;` line to a buggy loop and step through, or use `console.assert` to flag an unexpected value.

**New doc-reference entries needed (javascript module).**
- JS_REFS array methods: `map`, `filter`, `reduce`, `find`, `sort`, `join`, `indexof` (alias `indexOf`).
- JS_REFS string methods: `split`, `replace`, `startswith`, `endswith`, `indexof` (shared key with array — registry already disambiguates by being a single page; point to String or add `string.indexof`/`array.indexof` if the registry needs distinct titles).
- JS_REFS objects/globals: `object.keys`, `object.values`, `object.entries`, `math.round`, `math.max`, `math.min`, `math.random`, `math.floor`, `tofixed`, `number.tofixed` (alias).
- JS_REFS statements/operators: `switch`, `break`, `continue`, `for...in`, `++`/`--` (likely not registry keys — operators rarely are; leave to prose), `??` (nullish — operator, prose/`DocsLinks`), `?.` (optional chaining — operator, prose/`DocsLinks`), `defer` (HTML attribute, not a key).
- JS_REFS console: `console.warn`, `console.error`, `console.table`, `console.assert`, `debugger`.
- JS_REFS DOM (for ch8 vocabulary): `parentelement`, `children`, `nextelementsibling` (these also serve the integration module — see below).

---

# Module: integration

> The capstone's "array is the source of truth → re-render on change" discipline is the spine. The deepenings below make that engine more capable (persistence), more efficient (delegation), and more robust (loading/empty/error states) without changing the pedagogy.

## `1-selecting-elements`
**Current focus.** `getElementById`, `querySelector`, `querySelectorAll`, `null` check, separate-files setup.

**Proposed additions.**

- **Scoped selection: `element.querySelector(...)` (searching *within* an element, not just `document`).** The chapter only selects from `document`; the capstone builds `<li>`s with children and would benefit from finding a child *inside* a specific item (`li.querySelector(".delete")`).
  - **must-add** — scoped queries are the natural companion to per-item rendering and event delegation; teaching that `querySelector` works on any element, not just `document`, is one example.
  - **Exercise plan:** drill in `integration/8-practice` — given a card with several children, select a specific child *within* one card by calling `querySelector` on the card element rather than `document`.

- **`NodeList` vs `Array` (and converting with `Array.from`/spread).** The chapter says a `NodeList` is "a list you can loop over with `forEach`" but not that it isn't a real array — so `map`/`filter` (newly taught in JS) don't work on it directly.
  - **nice depth** — bridges the new JS transform methods to the DOM; `Array.from(nodeList)` or `[...nodeList]` unlocks `map`/`filter` on selected elements.
  - **Exercise plan:** drill in `integration/8-practice` — `querySelectorAll` some items, convert to an array, and `map` them to their `textContent` values.

## `2-changing-content-and-styles`
**Current focus.** `textContent`, `classList` add/remove/toggle, `style`, `getAttribute`/`setAttribute`, prefer classes over inline styles.

**Proposed additions.**

- **`classList.toggle(name, force)` and `classList.contains`.** The chapter teaches `toggle(name)`; the two-argument `toggle(name, condition)` form is *already used in the integration practice live-filter solution* (`item.classList.toggle("hidden", !match)`) without being taught, and `contains` is used in the accordion solution.
  - **must-add** — both are forward-referenced in existing practice solutions; teaching them here grounds drills the course already ships.
  - **Exercise plan:** drill in `integration/8-practice` — use `toggle(class, condition)` to drive a show/hide off a boolean, and `contains` to read current state (the practice chapter's filter/accordion drills already do this — the teaching addition justifies them).

- **`dataset` / `data-*` attributes for stashing data on elements.** A clean way to attach an item's id/index to its DOM element — the professional alternative to the capstone's index-closure approach, and the key to event delegation.
  - **must-add (depth)** — `data-*` is how delegation finds *which* item was clicked; the capstone's footnote about closed-over indexes being fragile is exactly the problem `dataset` + delegation solves. Teaching `setAttribute`/`getAttribute` (already covered) extends naturally to `el.dataset.id`.
  - **Exercise plan:** drill in `integration/8-practice` — build list items that each carry a `data-id`, then read `event.target.dataset.id` in a single handler (pairs with the delegation addition in ch3).

## `3-events-and-listeners`
**Current focus.** `addEventListener` (click/input/submit), the event object, `event.target`, `preventDefault`.

**Proposed additions.**

- **Event delegation: one listener on a parent + `event.target` + `closest()`.** ⭐ The chapter *shows* `event.target` and even says it's "useful later, when one listener handles clicks on many items" — but never teaches that pattern. The capstone instead attaches a fresh listener to every element on every render (and footnotes that this is fragile). Delegation is the professional answer.
  - **must-add** — top-3 win for the module; explicitly named-as-coming in this very chapter, flagged as untaught by `submodule-research/integration.md`, and the direct fix for the capstone's per-render-listener weakness. `closest()` lets a click on a child button resolve to its parent item.
  - **Exercise plan:** drill in `integration/8-practice` — rebuild the editable list so ONE listener on the `<ul>` handles all delete clicks via `event.target.closest("li")` and `dataset.id`, instead of one listener per item. A "refactor the capstone to delegation" stretch.

- **`removeEventListener`, the `once` option, and `keydown`/Enter/Escape handling.** Removing a listener, firing-once, and responding to specific keys (Escape to close a modal, Enter to submit) — the events beyond click/input/submit.
  - **nice depth** — `keydown` + `event.key` is needed for any keyboard-accessible widget (the modal/accordion drills); `removeEventListener` completes the add/remove pair.
  - **Exercise plan:** drill in `integration/8-practice` — make the existing modal/accordion drill close on the Escape key via a `keydown` handler reading `event.key === "Escape"`.

## `4-reading-form-input`
**Current focus.** `value`, `checked`, `<select>.value`, validate + DOM message (not `alert`).

> *Boundary:* `extension-ideas.md` §1.7 reserves the **Constraint Validation API** (`setCustomValidity`, `validity`, `:valid`/`:invalid` in JS) for a deep-forms chapter. Keep that out.

**Proposed additions.**

- **Reading radio groups and multiple checkboxes; `<form>.elements` and reset.** The chapter reads one checkbox and one select; reading *which radio* is selected (`document.querySelector('input[name="x"]:checked').value`) and gathering several checkboxes is the common next step.
  - **must-add** — the HTML forms chapter teaches radio groups and multi-checkbox forms, but the integration chapter never shows how to *read* a radio group's selected value — a real gap between the two modules. `form.reset()` is already used in the integration practice solution without being taught.
  - **Exercise plan:** drill in `integration/8-practice` (the existing pizza-order/sign-up drills read these) — read a radio group's selected value and a set of checkbox states into a summary, then `form.reset()`.

- **The `input` vs `change` event distinction, made explicit.** The chapter uses `change` for `<select>` and `input` for typing but never contrasts *when* each fires (every keystroke vs on commit/blur).
  - **nice depth** — `submodule-research/integration.md` quiz C wants this distinction; one sentence + a side-by-side example teaches it.
  - **Exercise plan:** drill in `integration/8-practice` — wire the same field to both `input` and `change`, log each, and observe the timing difference.

## `5-creating-and-removing-elements`
**Current focus.** `createElement`, `append`/`appendChild`, `remove`, render-from-array (with `for...of`).

**Proposed additions.**

- **Building elements with `map` + `join` into a template-literal string, vs `createElement` (and the `innerHTML` trade-off, safely).** The chapter builds elements imperatively with `createElement`; once `map` is taught, `items.map(i => \`<li>${i.text}</li>\`).join("")` is the declarative alternative — with the *explicit* safety caveat the chapter 2 `textContent`/`innerHTML` discussion already raised.
  - **nice depth (depth)** — bridges the new JS `map` skill to rendering and previews the JSX/template mental model the read-mores point to; must be taught alongside the XSS caveat (never interpolate raw user input into `innerHTML`).
  - **Exercise plan:** drill in `integration/8-practice` — render a list two ways (the taught `createElement` loop, and a `map`+`join`+`innerHTML` version) and discuss when each is safe.

- **`prepend`, `insertBefore`, `cloneNode`, and `<template>`.** Insertion beyond "append to the end," plus the native `<template>` element for reusable markup.
  - **nice depth** — `prepend` (add to top — useful for "newest task first") and `<template>` are the realistic next tools; keep to `prepend` + a `<template>` mention to avoid sprawl.
  - **Exercise plan:** drill in `integration/8-practice` — add a "newest first" toggle that uses `prepend` instead of `append`.

## `6-capstone-interactive-app`
**Current focus.** Full to-do app: array of `{ text, done }`, render, add/complete/delete, empty state, `splice`. Ends in the React/Next.js read-more.

> The capstone is intentionally beginner-safe and in-memory. `extension-ideas.md` keeps it that way and pushes live-data variants to a `next-steps` module. The deepenings below are *opt-in extensions* of the existing app, not a rewrite.

**Proposed additions.**

- **`localStorage` persistence (`setItem`/`getItem` + `JSON.stringify`/`parse`).** ⭐ The most-wanted capstone upgrade: the to-do list survives a reload. `JSON.stringify`/`parse` are already in the registry; `localStorage` is two methods. Fits the existing "save after every change, load on startup" rhythm perfectly (`save()` after each `render()`-triggering action; load into `tasks` at boot).
  - **must-add (depth)** — top-3 motivation win for the whole course; the in-memory limitation is the first thing every learner notices. Keep it as a clearly-marked optional extension so the core in-memory version stays the teaching baseline.
  - **Exercise plan:** **new short `<Exercise>` inside the capstone** (the one place a second exercise is warranted, because persistence is a small, self-contained, high-payoff extension of the just-built app) *or* `integration/8-practice` if keeping the capstone single-exercise is preferred. Drill: add `saveTasks()`/`loadTasks()` so the list persists across reloads.

- **Editing a task in place (double-click to edit, Enter/Escape to commit/cancel).** The app adds/completes/deletes but can't *edit* — the obvious missing CRUD verb.
  - **nice depth** — exercises `value`, `keydown` (`event.key`), and the update-array-then-render discipline on a new action; pairs with the ch3 keydown addition.
  - **Exercise plan:** drill in `integration/8-practice` — extend the to-do (or a fresh list) so a double-click turns a task into an input, Enter saves to the array + re-renders, Escape cancels.

## `7-json-fetch-apis`
**Current focus.** API concept, JSON shape, `fetch` + `async`/`await`, `response.json()`, render fetched array, `try/catch`. Ends in promises read-more.

**Proposed additions.**

- **`response.ok` / HTTP status checking, and explicit loading + empty + error UI states.** The chapter `try/catch`es network failure but never checks `response.ok` (a 404 returns a *resolved* promise — a classic trap), and shows no loading state. The integration *practice* (D3/D4) wants loading/error/retry states — teaching them here grounds those drills.
  - **must-add** — `response.ok` is the single most common fetch bug for beginners (the request "succeeds" but returns an error page); loading/empty/error are the three states every real data UI needs.
  - **Exercise plan:** drill in `integration/8-practice` (the existing fetch drill) — add a `if (!response.ok) throw ...` check, a "Loading…" state before, and a friendly empty-state when the array is `[]`.

- **Sending data with `fetch` (`POST` + headers + `JSON.stringify` body), conceptually.** The chapter only *reads* (GET); naming how you *send* data (method/headers/body) completes the API mental model and ties back to the forms module's `method="post"`.
  - **nice depth** — keep it conceptual (one example, no real backend to hit reliably in class); connects `<form method="post">` from HTML to the fetch story.
  - **Exercise plan:** drill in `integration/8-practice` — a read-only walkthrough/predict-the-shape of a `POST` request with a JSON body to JSONPlaceholder, observing the echoed response (JSONPlaceholder fakes writes), flagged as "needs Live Server."

**New doc-reference entries needed (integration module).**
- JS_REFS DOM: `closest`, `dataset`, `prepend`, `insertbefore`, `clonenode`, `parentelement`, `children`, `nextelementsibling`, `removeeventlistener`.
- JS_REFS storage: `localstorage`, `localstorage.setitem`, `localstorage.getitem` (and `removeitem`).
- JS_REFS Fetch: `response.ok`, `response.status` (the registry already has `response` and `response.json`).
- HTML_TAGS: `template` (if the `<template>` addition ships).
- Form reading helpers (`form.elements`, `form.reset`, `input[name]:checked`) are not single registry identifiers — `DocsLinks` only.

---

# Module: workflow

> `submodule-research/workflow.md` argues (convincingly) that Git is *process over code* and warrants **less** extra material — and that recovery drills, `.gitignore`, and history-reading are the real gaps, all routed to `workflow/4-practice`. The teaching-chapter deepenings below are deliberately minimal and align with that.

## `1-branches-and-commits`
**Current focus.** What a branch is, create/switch via Current Branch dropdown, focused commits + good messages, publish a branch.

**Proposed additions.**

- **Pull `main` before branching (the staleness habit) and the role of `.gitignore`.** The chapter creates branches but never names the "branch off fresh `main`" habit, and `.gitignore` is a course-wide acknowledged gap.
  - **must-add** — the "I branched off stale main" trap is the #1 beginner branching mistake (`workflow/submodule-research` Set A2 is built on it); `.gitignore` is named as a gap in `extension-ideas.md`.
  - **Exercise plan:** drill in `workflow/4-practice` (Set A2 + Set C1 in the research already cover these) — "branch off stale main, notice the missing change, recover by pulling first," and "ignore a junk file via `.gitignore`."

## `2-pull-requests`
**Current focus.** (Per research: Preview→Create PR, read Files changed, merge, switch to main + Fetch/Pull.)

**Proposed additions.**

- **Reading a diff / "Files changed" as a skill, and self-review before requesting review.** The chapter creates and merges a PR; making "read the diff" a deliberate habit is a small, high-value framing.
  - **nice depth** — `workflow/submodule-research` Set C3 ("read this history — what happened?") targets the reading half of Git; reinforce it in the PR context.
  - **Exercise plan:** drill in `workflow/4-practice` — self-review a PR's diff and write a one-line summary of what changed before merging.

## `3-merge-conflicts`
**Current focus.** What causes a conflict, GitHub Desktop surfacing, reading `<<<<<<<`/`=======`/`>>>>>>>` markers, resolving in VS Code, committing the merge.

**Proposed additions.**

- **Recovery moves the conflict chapter implies but doesn't teach: Undo a commit, Revert a merged change, Discard uncommitted edits.** A conflict resolution can go wrong; knowing the three recovery tools removes the fear that makes beginners avoid committing.
  - **must-add** — `workflow/submodule-research` Set B is explicit that recovery is "the single most useful thing the lessons omit," and all three are first-class GitHub Desktop UI actions (no terminal).
  - **Exercise plan:** drill in `workflow/4-practice` (Set B) — match-the-situation-to-the-tool (bad message not pushed → Undo; bad commit on `main` → Revert; unwanted edits → Discard), each as a small guided GitHub Desktop drill.

**New doc-reference entries needed (workflow module).**
- None for `lib/references.ts` — the workflow module's references are GitHub Desktop / GitHub Docs pages handled via `DocsLinks`, not inline-code tokens. (The registry keys HTML tags / CSS props / JS identifiers; Git UI actions are not among them.)

---

## Appendix: where each new drill lands (summary table)

| Module | Teaching addition(s) | Primary drill home |
| --- | --- | --- |
| setup | `file://` vs Live Server; commit≠pushed | `setup/2-practice` |
| html | comments+whitespace, `<dl>`, inline semantics, `mailto:`/`tel:`, `../` paths, `<figure>`, media fallback, `<aside>`, `<details>`, HTML5 validation, `<fieldset>`, `scope`, `colspan`/`<tfoot>` | `html/9-practice` |
| css | combinators+pseudo-classes, custom properties, `em`-compounding+`box-shadow`, flex-item props (`flex:1`), `align-self`/`order`/centering, 2nd breakpoint+`clamp()`, `prefers-color-scheme`, line-based grid placement | `css/6-practice` |
| javascript | `console.table`/levels, `++`/`--`, more string methods (`split`/`trim`/`replace`), `Math.*`/`toFixed`, **`map`/`filter`/`reduce`**, `find`/`sort`/`join`, **destructuring+spread**, `switch`, `??`/`?.`, `break`/`continue`, `Object.entries`, **callbacks-as-arguments**, default/rest params, node relationships, Network tab/`debugger;` | `javascript/10-practice` (Network tab → `integration/8-practice`) |
| integration | scoped `querySelector`, NodeList→Array, `toggle(class,cond)`/`contains`, **`dataset`/`data-*`**, **event delegation+`closest`**, `keydown`/`removeEventListener`, radio/checkbox reading+`reset`, `input` vs `change`, `map`+`join`+`innerHTML` (safely), `prepend`/`<template>`, **`localStorage`**, edit-in-place, `response.ok`+loading/empty/error states, sending data (`POST`) | `integration/8-practice` (capstone `localStorage` may be a new in-chapter `<Exercise>`) |
| workflow | pull-before-branch + `.gitignore`, read-the-diff, recovery (Undo/Revert/Discard) | `workflow/4-practice` |

**Two places a NEW in-chapter `<Exercise>` is justified (everything else goes to `*-practice.mdx`):**
1. **`integration/6` capstone — `localStorage` persistence.** Small, self-contained, enormous payoff, directly extends the app just built. The strongest candidate for a second in-chapter exercise.
2. *(Borderline)* **`javascript/4` or `javascript/7` — a first `map`/`filter` reps**, if the authors want the keystone skill drilled inside the teaching flow rather than only in practice. Recommendation: keep the *full* drill in `javascript/10-practice` and use only inline `<CodeExample>`s in the teaching chapters, to preserve the one-exercise-per-teaching-chapter shape — but flag this as an author's-call trade-off.
