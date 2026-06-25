# CSS Module — Extra Practice Submodule Research

> Research for **additive** practice submodules for the Webcraft CSS module. These are EXTRA, exercise- and quiz-focused submodules that sit alongside the five main lessons (which stay unchanged). Every item below is NEW practice — none duplicates an existing per-chapter `<Exercise>` or `<Quiz>`.
>
> **Audience:** learners with some prior coding exposure, working in **VS Code + GitHub Desktop**, previewing with Live Server in a browser.
> **Format conventions matched:** hands-on tasks doable in a plain `.html`/`.css` project; quiz items give the concept + a sample question; difficulty tagged intro / core / stretch.
> **Last verified:** 2026-06-25. All source links fetched and confirmed live on that date.

---

## What the main lessons already cover (so we stay additive)

| Lesson | Teaches | Existing `<Exercise>` | Existing `<Quiz>` focus |
| --- | --- | --- | --- |
| 1 How CSS works | rule anatomy; element/class/id selectors; inline vs internal vs external; cascade + specificity (basic) | Move styles into an external `styles.css`; style a profile card | selector vs property/value; `.` vs `#`; best place for CSS; cascade tie-break; `<link>` |
| 2 Box model, color, units, type | content/padding/border/margin; `box-sizing: border-box`; named/hex/rgb/hsl; px/rem/em/%; font-family/size/weight/line-height | Add spacing + typography to the card | margin vs padding; border-box width; what `rem` is relative to; valid hex; `line-height` |
| 3 Layout & flexbox | `display` block/inline/inline-block/none; flex container; `justify-content`/`align-items`/`gap`/`flex-direction`/`flex-wrap`; flex vs grid peek; `:hover`/`:focus` mention | Lay out card with flexbox (avatar + details + nav row) | `display:none`; what `display:flex` does; main-axis property; 2D→grid; `gap`; `space-between` |
| 4 Responsive basics | viewport meta; fluid sizing (`max-width`, `%`, `margin:0 auto`); mobile-first media queries; one breakpoint | Make the card responsive (column→row at 600px) | viewport tag job; `min-width` semantics; mobile-first; `max-width` vs `width`; breakpoint; `flex-direction` |
| 5 Grid in depth | `display:grid`; `grid-template-columns`/`fr`/`repeat()`; `gap`; `grid-column`/`grid-row` span; `grid-template-areas`; `repeat(auto-fit, minmax())`; grid vs flex | Responsive project gallery + feature tile | `repeat(3,1fr)`; `fr`; `span 2`; `grid-template-areas`; flex-for-wrapping-nav; `auto-fit` |

**Gaps the existing exercises never drill (these are where the new practice earns its place):**
- Pure **selector fluency** beyond element/class/id — descendant, child, grouping, pseudo-classes, attribute selectors.
- **Debugging** existing broken CSS (the lessons only ever build from scratch — there is no "fix-this" practice anywhere).
- **Reading/predicting** the cascade & specificity instead of just defining it.
- Combining the whole module into **one component built from a written spec** (the lessons all iterate on a single guided profile card).
- Using **browser DevTools** to inspect and tweak the box model / computed styles.

---

## Source quality notes (all verified live 2026-06-25)

| Source | What it is | Best for | Verified |
| --- | --- | --- | --- |
| MDN Learn — *CSS styling basics* module | Official tutorial + "Test your skills" assessment pages | Authoritative reference + ready-made fix-this assessments | `Learn_web_development/Core/Styling_basics` live; sub-pages confirmed |
| MDN Learn — *CSS layout* module | Official flexbox/grid/media-query lessons + skills tests | Flexbox & responsive practice with collapsible solutions | `Learn_web_development/Core/CSS_layout` live; Flexbox skills page live |
| web.dev — *Learn CSS* | Google's free course (box model, selectors, cascade, specificity, flexbox, grid, units, color) | Deeper conceptual reading for quiz authoring | `https://web.dev/learn/css` live |
| CSS Diner (flukeout) | Browser game, 32 levels, learn selectors by typing them | Selector-fluency drills | `https://flukeout.github.io/` live |
| Flexbox Froggy (Codepip) | Browser game, 24 levels, flexbox properties | Flexbox alignment drills | `https://flexboxfroggy.com/` live |
| Grid Garden (Codepip) | Browser game, 28 levels, grid properties | Grid track/placement drills | `https://cssgridgarden.com/` live |
| Frontend Mentor | 120+ real design challenges, many free "Newbie" tier | Build-from-a-design capstone-style practice | challenges page + QR-code component (Newbie) live |
| The Odin Project — Foundations | Free curriculum: CSS Foundations, Box Model, Flexbox + projects (Recipes, Landing Page) | Longer guided projects, extra reading | Foundations course page live |
| CSSBattle | Code-golf: reproduce a target image in the least CSS | Stretch/fun reinforcement only (not beginner-friendly as core practice) | `https://cssbattle.dev/` live |

> Note on CSSBattle: it is a code-golf novelty (smallest CSS wins), not a teaching tool. Recommend it only as an optional "stretch / for fun" link, never as a graded item — its scoring rewards hacks (e.g. abusing `box-shadow`) that contradict the clean-CSS habits the module teaches.

---

# Practice Set A — "Selector Workout" (maps to Lesson 1)

**Theme:** Build real selector fluency. The lesson teaches element/class/id and a one-line mention of cascade; learners never practice descendant/child/grouping/pseudo/attribute selectors, and never *read* a stylesheet to predict what wins. This set fixes both.
**Items: 5.**

### A1. CSS Diner challenge run
- **Type:** build (game)
- **Skill drilled:** writing selectors — type, class, id, descendant, `:first-child`, attribute selectors
- **Difficulty:** intro
- **Task:** Play CSS Diner and clear at least levels 1–12, writing the selector that "eats" only the highlighted plates. Note any level where you needed a hint.
- **Deliverable:** a short note (e.g. in `notes.md`) listing which levels you cleared and one selector you learned that you had not seen in the lesson.
- **Source:** https://flukeout.github.io/

### A2. Style by relationship, not by adding classes
- **Type:** build
- **Skill drilled:** descendant (`.card p`), child (`nav > a`), and grouping (`h1, h2`) selectors
- **Difficulty:** core
- **Task:** Given an HTML snippet of a card with a nested list and links, write a stylesheet that targets elements **only by their relationships** — you may not add any new `class` or `id` attributes to the HTML.
- **Deliverable:** a `styles.css` using at least one descendant selector, one child (`>`) selector, and one grouped selector, with the HTML left untouched.
- **Source:** https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Styling_basics/Combinators

### A3. Interactive states with pseudo-classes
- **Type:** extend
- **Skill drilled:** `:hover`, `:focus`, `:nth-child()` / `:first-child`
- **Difficulty:** core
- **Task:** Take a plain navigation list and a striped table-like list; add `:hover` and `:focus` styles to the links and use `:nth-child(even)` to zebra-stripe alternating rows.
- **Deliverable:** a page where links visibly change on mouse-over AND on keyboard Tab focus, and every other row has a tinted background.
- **Source:** https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Styling_basics/Pseudo-classes_and_pseudo-elements

### A4. "Which rule wins?" — predict the cascade
- **Type:** fix-this
- **Skill drilled:** reading specificity and source order before changing code
- **Difficulty:** stretch
- **Task:** Given a stylesheet where an element has four competing color rules (element, class, id, and an inline style), first **predict in a comment** which color will show, then open the page to check, then make the *least specific* rule win without using `!important` (e.g. by removing/restructuring competitors).
- **Deliverable:** the page rendering the intended color, plus a comment explaining why the original winner won (specificity order id > class > element, inline strongest).
- **Source:** https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Styling_basics/Handling_conflicts

### A5. Quiz — selectors & specificity
- **Type:** quiz
- **Concept:** combinators and specificity ranking (extends the lesson's `.`-vs-`#` quiz into relationships and conflict resolution)
- **Difficulty:** core
- **Sample question (multiple-choice):** "Given `nav a { color: gray; }` and `nav > a { color: blue; }`, what color is a link that is a **direct child** of `<nav>`?" — Options: (a) gray, (b) blue ✓, (c) black, (d) it's an error. **Explanation:** both selectors match a direct child and have equal specificity (one element + one class-of-pseudo? no — two type/combinator selectors each), so source order decides; the `>` rule comes later and wins. (Author note: tune options so the teaching point is "equal specificity → later wins.")
- **Sample question (fill-in):** "Write the selector that targets every `<li>` that is the **first child** of its parent." — Answer: `li:first-child`.
- **Source:** https://web.dev/learn/css/specificity

---

# Practice Set B — "Box Model & Type Lab" (maps to Lesson 2)

**Theme:** Make spacing, sizing, and color *visible and debuggable*. The lesson builds one card from scratch; this set adds a fix-this with broken sizing, a DevTools inspection task, and a color/units drill — none of which the lesson exercises touch.
**Items: 5.**

### B1. Fix the overflowing box
- **Type:** fix-this
- **Skill drilled:** `box-sizing: border-box`; how padding/border add to width
- **Difficulty:** intro
- **Task:** A 3-up row of `width: 33%` cards with padding and a border is overflowing and wrapping to a second line. Diagnose why (content-box width math) and fix it with a single rule.
- **Deliverable:** three cards sitting on one row, fixed by adding `* { box-sizing: border-box; }` (and nothing else), with a one-line comment naming the cause.
- **Source:** https://web.dev/learn/css/box-model

### B2. Inspect the box model in DevTools
- **Type:** build (tooling)
- **Skill drilled:** reading the box-model diagram and computed styles in browser DevTools
- **Difficulty:** intro
- **Task:** Open any styled card with Live Server, open DevTools (right-click → Inspect), find the box-model diagram in the Styles/Computed panel, and identify the element's content size, padding, border, and margin.
- **Deliverable:** a short note recording the four box-model numbers for one element, plus a screenshot or description of where the diagram lives.
- **Source:** https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Styling_basics/Debugging_CSS

### B3. One color, four ways
- **Type:** build
- **Skill drilled:** named / hex / `rgb()` / `hsl()` color formats and picking shades
- **Difficulty:** core
- **Task:** Pick one brand color and write a small palette block where a heading, a button, and a hovered button use the **same hue** expressed as hex, `rgb()`, and `hsl()` — using `hsl()` to make the hover state 10% lighter.
- **Deliverable:** a swatch page proving the three formats render the same base color, with the `hsl()` lightness bump visible on hover.
- **Source:** https://web.dev/learn/css/color

### B4. Units showdown: px vs rem vs em vs %
- **Type:** extend
- **Skill drilled:** how each unit responds when the root or parent font-size changes
- **Difficulty:** stretch
- **Task:** Build a nested set of boxes/text using `px`, `rem`, `em`, and `%` sizes, then change `html { font-size }` from 16px to 20px and observe which values move and which stay fixed.
- **Deliverable:** a before/after note explaining which elements resized and why (`rem` follows root, `em` compounds, `px` is fixed, `%` follows parent).
- **Source:** https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Styling_basics/Values_and_units

### B5. Quiz — box model & units
- **Type:** quiz
- **Concept:** the difference between `em` and `rem` and compounding (the lesson quiz asks what `rem` is relative to; this one tests the trickier `em` nesting case)
- **Difficulty:** core
- **Sample question (multiple-choice):** "`html` is 16px. A `.parent` sets `font-size: 1.5em` and a `.child` inside it also sets `font-size: 1.5em`. What is the child's computed font size?" — Options: (a) 16px, (b) 24px, (c) 36px ✓, (d) 1.5px. **Explanation:** `em` is relative to the *current/parent* font size, so it compounds: 16 × 1.5 = 24 for the parent, then 24 × 1.5 = 36 for the child. `rem` would have stayed 24px for both.
- **Sample question (multiple-choice):** "Which `line-height` value is recommended because it scales with the font size?" — Options: (a) `24px`, (b) `1.5` ✓, (c) `150%` of the parent, (d) `1.5em`. **Explanation:** a unitless `1.5` is computed per-element from each element's own font size, avoiding the inheritance surprises of length/`em` values.
- **Source:** https://web.dev/learn/css/sizing-units

---

# Practice Set C — "Flexbox & Responsive Drills" (maps to Lessons 3 & 4)

**Theme:** Drill the alignment muscle and the mobile-first switch. The lesson builds one flex card and one breakpoint; this set adds game-based reps, MDN's ready-made fix-this skills tasks, and a two-breakpoint navbar — all new.
**Items: 6.**

### C1. Flexbox Froggy run
- **Type:** build (game)
- **Skill drilled:** `justify-content`, `align-items`, `flex-direction`, `flex-wrap`, `order`, `align-self`
- **Difficulty:** intro
- **Task:** Play Flexbox Froggy and clear all 24 levels, guiding the frogs to their lilypads using only flex properties. Note the two properties you had not met in the lesson (likely `order` and `align-self`).
- **Deliverable:** a note confirming completion plus the two new properties and one sentence on what each does.
- **Source:** https://flexboxfroggy.com/

### C2. MDN "Test your skills: Flexbox"
- **Type:** fix-this
- **Skill drilled:** flex navbar with even spacing; equal-width columns with `flex: 1`; wrapping rows with `flex-wrap`
- **Difficulty:** core
- **Task:** Complete MDN's three flexbox skill tasks in place — make the nav items a space-between row, make three list items equal columns, and wrap ten items into rows — then reveal each collapsible solution to self-check.
- **Deliverable:** the three tasks each rendering as described, compared against MDN's provided solutions.
- **Source:** https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/CSS_layout/Test_your_skills/Flexbox

### C3. Center anything (the classic)
- **Type:** build
- **Skill drilled:** centering on both axes with `justify-content: center` + `align-items: center`
- **Difficulty:** intro
- **Task:** Put a single card in the middle of a full-viewport-height container (`min-height: 100vh`), perfectly centered horizontally and vertically using flexbox.
- **Deliverable:** a page where the card stays centered as the window resizes.
- **Source:** https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/CSS_layout/Flexbox

### C4. Responsive navbar with two breakpoints
- **Type:** extend
- **Skill drilled:** mobile-first media queries; switching `flex-direction` and spacing across breakpoints
- **Difficulty:** core
- **Task:** Build a header that is a stacked column on mobile, becomes a row at `min-width: 600px`, and adds more spacing/larger logo at `min-width: 900px` — written mobile-first (base = mobile, two `min-width` queries layered on).
- **Deliverable:** a header demonstrably changing layout at two breakpoints, verified by dragging the window or using the DevTools device toolbar.
- **Source:** https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/CSS_layout/Media_query_fundamentals

### C5. Fix the broken media query
- **Type:** fix-this
- **Skill drilled:** debugging media-query syntax and mobile-first logic
- **Difficulty:** stretch
- **Task:** Given a page whose layout never changes on resize, find the bug(s) — a missing viewport meta tag, a `max-width` query fighting a `min-width` one, and a typo'd `@media screen and (min-width 600px)` (missing colon) — and make it switch correctly at 600px.
- **Deliverable:** the page switching layout at the breakpoint, with a comment listing each bug found and fixed.
- **Source:** https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_media_queries/Using_media_queries

### C6. Quiz — axes & responsive logic
- **Type:** quiz
- **Concept:** main vs cross axis when `flex-direction` flips, and what `min-width` vs `max-width` queries select (extends the lesson quiz, which only covers row-axis defaults)
- **Difficulty:** core
- **Sample question (multiple-choice):** "A flex container has `flex-direction: column`. Which property now controls **horizontal** alignment of the items?" — Options: (a) `justify-content`, (b) `align-items` ✓, (c) `flex-wrap`, (d) `gap`. **Explanation:** in a column, the main axis runs top-to-bottom (`justify-content`), so the cross axis is horizontal and is controlled by `align-items`. The roles swap when direction changes.
- **Sample question (multiple-choice):** "`@media (max-width: 599px) { ... }` applies on which screens?" — Options: (a) 599px and wider, (b) 600px and wider, (c) 599px and narrower ✓, (d) exactly 599px. **Explanation:** `max-width` caps the upper bound, so the rules apply from 0 up to 599px — the opposite of the mobile-first `min-width` pattern the lesson uses.
- **Source:** https://web.dev/learn/css/flexbox

---

# Practice Set D — "Grid Studio + Build From Spec" (maps to Lesson 5 + module capstone)

**Theme:** Cement two-dimensional layout, then combine the entire module into one component built from a written brief (not the guided profile card). This is the closest thing to a real-world task and the natural finale of the practice track.
**Items: 6.**

### D1. Grid Garden run
- **Type:** build (game)
- **Skill drilled:** `grid-column-start/end`, `grid-row`, `span`, `grid-template-columns`, `repeat()`, `order`
- **Difficulty:** intro
- **Task:** Play Grid Garden and clear all 28 levels, watering the carrots by placing items on grid lines. Note where line-number placement (`grid-column: 2 / 4`) differs from the `span` syntax the lesson taught.
- **Deliverable:** a note confirming completion and one example contrasting line-based placement vs `span`.
- **Source:** https://cssgridgarden.com/

### D2. Holy-grail page with grid-template-areas
- **Type:** build
- **Skill drilled:** `grid-template-areas`, `grid-area`, spanning a region across columns
- **Difficulty:** core
- **Task:** Build a full-page layout — header across the top, left sidebar, main content, right sidebar, footer across the bottom — using `grid-template-areas` only (no manual line numbers), then rearrange it by editing only the area map.
- **Deliverable:** the five-region page, plus a second version reordered purely by rewriting the `grid-template-areas` strings.
- **Source:** https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/CSS_layout/Grids

### D3. Grid vs flexbox — pick the right tool
- **Type:** fix-this
- **Skill drilled:** recognizing 1D vs 2D problems; refactoring a misused layout
- **Difficulty:** core
- **Task:** Given a card gallery awkwardly forced into flexbox with hand-tuned widths and margins (misaligned on the last row), rebuild it with `repeat(auto-fit, minmax(200px, 1fr))`; and given a simple button row built with grid, simplify it back to flexbox.
- **Deliverable:** the gallery reflowing cleanly as a grid and the button row simplified to flex, with a one-line note on why each tool fits.
- **Source:** https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/CSS_layout/Grids

### D4. Build "Webcraft" — a component from a written spec (mini capstone)
- **Type:** build
- **Skill drilled:** the whole module — selectors, box model, type, color, flexbox, grid, responsive — applied to a brief instead of step-by-step instructions
- **Difficulty:** stretch
- **Task:** From a written spec only (e.g. "a responsive pricing section: three plan cards in a grid that becomes one column under 600px; each card is a flex column with a title, price, feature list, and a button with hover/focus states"), build the component without per-step guidance.
- **Deliverable:** a single `index.html` + `styles.css` matching the spec, responsive across one breakpoint, committed in GitHub Desktop.
- **Source:** https://www.theodinproject.com/lessons/foundations-css-foundations (Odin CSS Foundations + Flexbox projects as a model for spec-driven builds)

### D5. Frontend Mentor "QR code component" (Newbie)
- **Type:** build (real design)
- **Skill drilled:** matching a provided design with box model, color, type, and centering — reading a brief like a real ticket
- **Difficulty:** core
- **Task:** Download the free Newbie-tier "QR code component" challenge and build it to match the supplied design (centered card, image, heading, paragraph, given colors and spacing).
- **Deliverable:** a finished component visually matching the design, optionally posted to Frontend Mentor for community feedback.
- **Source:** https://www.frontendmentor.io/challenges/qr-code-component-iux_sIO_H

### D6. Quiz — grid placement & tool choice
- **Type:** quiz
- **Concept:** `auto-fit` vs `auto-fill`, fr math, and 1D-vs-2D decisions (extends the lesson quiz, which only hints `auto-fill` in an explanation)
- **Difficulty:** stretch
- **Sample question (multiple-choice):** "`repeat(auto-fill, minmax(180px, 1fr))` vs `repeat(auto-fit, …)` — in a wide container with only two items, what is the visible difference?" — Options: (a) none, (b) `auto-fill` leaves empty invisible columns so the two items stay narrow at the left, while `auto-fit` collapses empty tracks so the two items stretch to fill ✓, (c) `auto-fit` adds more items, (d) `auto-fill` is invalid. **Explanation:** `auto-fill` keeps the empty tracks it created; `auto-fit` collapses them to zero, letting the present items grow.
- **Sample question (multiple-choice):** "You need a row of tags that wraps onto new lines as the window narrows, with no concern for column alignment. Best tool?" — Options: (a) grid with `grid-template-areas`, (b) flexbox with `flex-wrap: wrap` ✓, (c) `display: inline-block` + margins, (d) absolute positioning. **Explanation:** wrapping content along one axis with no row/column grid to maintain is the textbook 1D case — flexbox.
- **Source:** https://web.dev/learn/css/grid

---

## Summary of themed sets

| Set | Maps to | Items | Mix |
| --- | --- | --- | --- |
| A — Selector Workout | Lesson 1 | 5 | 2 build, 1 extend, 1 fix-this, 1 quiz |
| B — Box Model & Type Lab | Lesson 2 | 5 | 3 build, 1 extend, 1 quiz (incl. 1 DevTools, 1 fix-this) |
| C — Flexbox & Responsive Drills | Lessons 3 & 4 | 6 | 3 build, 1 extend, 1 fix-this, 1 quiz (2 are MDN/game) |
| D — Grid Studio + Build From Spec | Lesson 5 + capstone | 6 | 4 build, 1 fix-this, 1 quiz |

**Total: 22 practice items across 4 submodules.** Difficulty spread: ~6 intro, ~11 core, ~5 stretch.

## Confidence & limitations

- **Confirmed:** every source URL was fetched and resolved live on 2026-06-25. MDN now serves the Learn pages under `Learn_web_development/Core/...` (matching what the existing lessons already cite), and the "Test your skills" assessments live under a `/Test_your_skills/` sub-path.
- **Likely / author-tune:** the exact level counts for the three games (CSS Diner ~32, Flexbox Froggy 24, Grid Garden 28) are widely reported but the game pages don't print a total on the landing screen — verify the final number when authoring, or phrase tasks as "clear all levels" to stay robust.
- **Watch:** Frontend Mentor gates *some* assets behind a free account; the QR-code component is Newbie-tier and downloadable for free, but confirm the starter files are still free before making it a required item. Provide a self-hosted fallback brief if account creation is a barrier in a classroom.
- **Recommendation:** treat CSSBattle as an optional "for fun / stretch" link only — its code-golf scoring rewards hacks that conflict with the clean-CSS habits the module teaches, so it should not be a graded item.
- **Not duplicated:** I cross-checked each item against the existing `<Exercise>`/`<Quiz>` in all five lesson MDX files; the new items deliberately target the untested gaps (combinators/pseudo/attribute selectors, fix-this debugging, DevTools, cascade prediction, `em` compounding, axis-swap, `auto-fit` vs `auto-fill`, and spec-driven building).
