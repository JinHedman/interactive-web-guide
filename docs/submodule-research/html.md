# HTML Module — Extra Practice Submodule Research

> Research for **additive** practice submodules for the Webcraft HTML module. These are EXTRA, exercise- and quiz-focused submodules that sit alongside the eight main lessons (which stay unchanged). Every item below is NEW practice — none duplicates an existing per-chapter `<Exercise>` or `<Quiz>`.
>
> **Audience:** learners with some prior coding exposure, working in **VS Code + GitHub Desktop**, previewing with Live Server in a browser, validating at validator.w3.org.
> **Format conventions matched:** hands-on tasks doable in a plain `.html` project (no CSS or JS — the HTML module precedes both); quiz items give the concept + a sample question; difficulty tagged intro / core / stretch.
> **Last verified:** 2026-06-25. All source links fetched and confirmed live on that date.

---

## What the main lessons already cover (so we stay additive)

| Lesson | Teaches | Existing `<Exercise>` | Existing `<Quiz>` focus |
| --- | --- | --- | --- |
| 1 Structure | element/tag/attribute; nesting; `<!doctype>`; `<html lang>`; `<head>` vs `<body>`; charset/viewport/title | Build the profile-page skeleton | what is an attribute; correct doctype; where `<title>` shows; which element holds visible content; `lang` |
| 2 Text | `<h1>`–`<h6>` outline (no skipping); `<p>`; `<ul>`/`<ol>`/`<li>`; `<em>`/`<strong>` vs `<i>`/`<b>`; `<br>`/`<hr>` | Add headings, paragraphs, two lists, emphasis to the profile | correct heading order; ordered vs unordered; `<strong>` vs `<b>`; correct `<br>` use; `<li>` |
| 3 Links | `<a href>`; relative vs absolute; `#fragment` + `id`; `target="_blank"` + `rel="noopener"`; descriptive link text | Add in-page nav + an external link | which attr is destination; which URL is relative; fragment syntax; why `rel="noopener"`; best link text |
| 4 Images & media | `<img src alt>`; relative paths; decorative `alt=""`; `width`/`height` (layout shift); `<audio>`/`<video controls>` | Add an accessible profile photo | which attr is alt text; when `alt=""`; why width/height; which attr shows video controls |
| 5 Semantics | `header`/`nav`/`main`/`section`/`article`/`footer`; `div`/`span` fallback; block vs inline; why semantics help a11y/SEO | Restructure the profile with landmarks | which element is `<main>`; when `<div>`; which is inline; `<article>` use; non-benefit of semantics |
| 6 Forms | `<form>` action/method; `<label>` for/id; input types (text/email/password/number/checkbox/radio); `<textarea>`/`<select>`/`<option>`; button types; `required`/`placeholder` | Add a contact form | label/input association; radio grouping by `name`; what `required` does; why placeholder ≠ label; `<textarea>` |
| 7 Tables | `<table>`/`<tr>`/`<th>`/`<td>`; `<thead>`/`<tbody>`; `<caption>`; data-not-layout | Add a skills table | which is a header cell; role of `<tbody>`; where `<caption>` goes; when to use a table |
| 8 Page project | plan from landmarks; combine all elements; in-page nav; validate at validator.w3.org | Build the complete profile page | first build step; what makes fragment nav work; a11y checklist item; W3C validator; combined recall |

**Gaps the existing exercises never drill (these are where the new practice earns its place):**
- Every lesson iterates on the **same single artifact** (the "Ada Lovelace profile page"); learners never choose elements for *unfamiliar* content from scratch.
- **Debugging** existing broken markup — there is no "fix-this" practice anywhere in the module (lessons only ever build forward).
- A small **multi-file site** so relative paths and fragment links are practiced for real, not in one page.
- **Extension elements** that fit the topics but aren't taught: `<dl>`, `<figure>`/`<figcaption>`, `<details>`/`<summary>`, `<fieldset>`/`<legend>`, `<th scope>`, `colspan`/`rowspan`.
- Reading content as **structure** (a letter, a planet table, a feedback form) the way real assessment briefs present it.

---

## Source quality notes (all verified live 2026-06-25)

| Source | What it is | Best for | Verified |
| --- | --- | --- | --- |
| MDN Learn — *Structuring content* module | Official tutorial + **Challenge** + **Test your skills** assessment pages | Authoritative reference + ready-made build briefs & fix-this drills | `Learn_web_development/Core/Structuring_content` live (last mod Aug 2025) |
| MDN — Challenge pages | Marking up a letter; Structuring a page of content; Planet data table; Typical feedback form; Splash page | `build` briefs with starter file + expected-result screenshot (CC-licensed) | all five linked from module index, live |
| MDN — "Test your skills" pages | text basics, advanced text, links, images, audio/video, forms-and-buttons | `fix-this` drills with collapsible solutions | `/Test_your_skills/` index live (200) |
| MDN — HTML table accessibility | `scope`, `colspan`/`rowspan`, header association | `scope`/spanning extension material | `/Structuring_content/Table_accessibility` live |
| web.dev — *Learn HTML* | Google's 22-lesson course, each lesson has a quiz | Quiz-question inspiration; deeper concept reading | `https://web.dev/learn/html` live; sub-pages /forms /images /tables /links /semantic-html live |
| The Odin Project — HTML Foundations | Free curriculum + "Recipes" project | Longer guided build (recipe = lists practice) | Foundations course + `/lessons/foundations-recipes` live |
| freeCodeCamp — Responsive Web Design (v9) | Project-based: "Learn HTML by Building a Cat Photo App"; accessibility "Build a Web Form" | Step-by-step build inspiration; a11y form grouping | `/learn/responsive-web-design-v9` live |
| Frontend Mentor | 120+ real design challenges, free "Newbie" tier | `build`-the-markup inspiration (structure phase only) | challenges + Blog-preview-card / QR-code (Newbie) live |
| W3Schools — HTML Exercises / Quiz | 51 graded fill-in exercises across all topics; HTML quiz | Fill-in quiz-item inspiration | `/html/html_exercises.asp`, `/html/html_quiz.asp` live |

> Note on Frontend Mentor: its challenges are authored as HTML **+ CSS** with Figma designs. They are cited here strictly as inspiration for the **markup phase** — CSS/visual-fidelity grading is out of scope for an HTML-only module and must not be the acceptance criterion. Its challenge *list* page is a JS SPA that WebFetch cannot read; individual challenge slug URLs were confirmed via search.

---

# Practice Set A — "Mark Up Real Content" (maps to Lessons 1 & 2)

**Theme:** Choose the right text/structure elements for documents that are NOT the profile page, so the learner selects elements from meaning rather than copying the running example. Adds the module's first-ever fix-this and an extension list type.
**Items: 5.**

### A1. Mark up a personal letter
- **Type:** build
- **Skill drilled:** choosing headings vs paragraphs from raw text; correct skeleton (`<!doctype>`, `lang`, `<head>`/`<body>`); `<br>` used for content line-breaks, not spacing
- **Difficulty:** core
- **Task:** Given a plain-text letter (sender address, date, salutation, three body paragraphs, sign-off), wrap it in a valid HTML document choosing the right element for each piece — paragraphs for prose, `<br>` only inside the address block.
- **Deliverable:** a valid `letter.html` with a proper `<title>`, one `<h1>`, correctly separated paragraphs, and an address whose lines break as content; passes validator.w3.org with no errors.
- **Source:** https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Structuring_content/Marking_up_a_letter

### A2. Fix the broken skeleton
- **Type:** fix-this
- **Skill drilled:** reading nesting errors; metadata-vs-content placement; empty vs container elements
- **Difficulty:** intro
- **Task:** Start from a file with 4–5 planted bugs (missing `<!doctype>`, a `<title>` placed in `<body>`, an unclosed `<p>`, tags closed in the wrong order, a `<meta charset>` written with a closing tag). Find and fix each so the document is valid.
- **Deliverable:** a corrected file that passes validator.w3.org, plus a one-line note per bug naming what was wrong.
- **Source:** https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Structuring_content/Debugging_HTML

### A3. A recipe as a document
- **Type:** build
- **Skill drilled:** `<ol>` for ordered steps vs `<ul>` for ingredients; heading outline; `<em>`/`<strong>` for meaning
- **Difficulty:** core
- **Task:** Mark up a recipe of your choice with a title, a short intro paragraph, an unordered ingredients list, and an ordered method list, emphasizing the one ingredient that matters most with `<strong>`.
- **Deliverable:** a `recipe.html` with exactly one `<h1>`, an ingredients `<ul>`, a method `<ol>`, and at least one meaningful `<strong>`/`<em>` — no manual numbering typed into the list.
- **Source:** https://www.theodinproject.com/lessons/foundations-recipes

### A4. Description list for a glossary
- **Type:** extend
- **Skill drilled:** `<dl>`/`<dt>`/`<dd>` — a list type the lessons do not cover but that fits text mark-up
- **Difficulty:** stretch
- **Task:** Add a small glossary of four web terms (HTML, element, attribute, tag) using a description list, pairing each term (`<dt>`) with its definition (`<dd>`).
- **Deliverable:** a valid `<dl>` rendering term/definition pairs, used because the data is genuinely term→definition (not bullets).
- **Source:** https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Structuring_content/Lists

### A5. Quiz — text & structure recall
- **Type:** quiz
- **Concept:** whitespace collapsing, list-type choice, emphasis semantics (extends the lesson quiz, which tests heading order and `<br>` use, into the "why doesn't my spacing work" case)
- **Difficulty:** intro
- **Sample question (multiple-choice):** "You typed three blank lines inside one `<p>` to space paragraphs apart, but the browser shows them as one block of text. Why?" — Options: (a) the browser collapses runs of whitespace; use a separate `<p>` per paragraph ✓, (b) `<p>` is an empty element, (c) you must add `<br><br><br>`, (d) blank lines need `&nbsp;`. **Explanation:** HTML collapses consecutive whitespace to a single space, so paragraph separation comes from using distinct `<p>` elements, not blank lines.
- **Sample question (fill-in):** "Which element wraps each item inside a `<ul>` or `<ol>`?" — Answer: `li` (accept `<li>`).
- **Source:** https://web.dev/learn/html

---

# Practice Set B — "Connect & Show" (maps to Lessons 3 & 4)

**Theme:** Move link/image skills onto a small multi-file site so relative paths and fragment links are exercised for real, plus a fix-this for the common link mistakes and one media extension.
**Items: 5.**

### B1. Two-page mini site with relative links
- **Type:** build
- **Skill drilled:** relative URLs between files; back-and-forth navigation; descriptive link text
- **Difficulty:** core
- **Task:** Create `index.html` and `about.html` in one folder. Link each page to the other using relative URLs and link text that names the destination (no "click here").
- **Deliverable:** two files where clicking the link on each page loads the other in Live Server; both links read meaningfully out of context.
- **Source:** https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Structuring_content/Creating_links

### B2. Fix the broken links
- **Type:** fix-this
- **Skill drilled:** distinguishing absolute/relative/fragment/`mailto:`; spotting `target="_blank"` missing `rel`; a fragment pointing at a missing `id`
- **Difficulty:** core
- **Task:** Given a page with five planted link bugs (a relative path with a leading `/` that breaks locally, a `#contact` fragment with no matching `id`, a `target="_blank"` with no `rel="noopener"`, a `mailto:` typo, a "click here" link), fix all five.
- **Deliverable:** a page where every link works in Live Server, all fragments scroll, and external-new-tab links carry `rel="noopener"`.
- **Source:** https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Structuring_content/Test_your_skills/Links

### B3. Accessible image gallery
- **Type:** build
- **Skill drilled:** real vs decorative `alt`; `width`/`height` to prevent layout shift; relative paths into an `images/` folder
- **Difficulty:** core
- **Task:** Build a page showing three images (placehold.co URLs or local files): two informative images with descriptive `alt`, and one decorative divider with `alt=""`. Add `width`/`height` to each.
- **Deliverable:** a page where every `<img>` has an `alt` (real or intentionally empty) and dimensions; the decorative image is skipped by a screen reader.
- **Source:** https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Structuring_content/Test_your_skills/Images

### B4. figure/figcaption and an embedded video
- **Type:** extend
- **Skill drilled:** `<figure>`/`<figcaption>` to caption media; `<video controls>` with fallback text
- **Difficulty:** stretch
- **Task:** Wrap one gallery image in a `<figure>` with a `<figcaption>`, then add a `<video controls>` (any public MP4 or a local file) with text between the tags as a fallback for unsupported browsers.
- **Deliverable:** a captioned figure and a working video player with visible controls and fallback text.
- **Source:** https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Structuring_content/HTML_video_and_audio

### B5. Quiz — links & media decisions
- **Type:** quiz
- **Concept:** relative vs absolute, `rel="noopener"` rationale, `alt` decisions (extends the lesson quiz into the "what travels with `target=\"_blank\"`" judgment)
- **Difficulty:** intro
- **Sample question (multiple-choice):** "You add `target=\"_blank\"` to an external link. What should travel with it, and why?" — Options: (a) `rel=\"noopener\"`, to stop the opened page reaching back to yours via `window.opener` ✓, (b) `download`, to force a download, (c) nothing extra is needed, (d) `method=\"post\"`. **Explanation:** without `rel="noopener"` the newly opened page can access `window.opener`, a security/performance hole the lesson flags; the two attributes travel together.
- **Sample question (multiple-choice):** "When is `alt=\"\"` (an empty alt) correct?" — Options: (a) always, alt is optional, (b) when the image is purely decorative and adds no information ✓, (c) for very large images, (d) for images from another site. **Explanation:** an empty alt tells a screen reader to skip a decorative image; informative images still need a real description and alt is never omitted.
- **Source:** https://web.dev/learn/html

---

# Practice Set C — "Structure It Semantically" (maps to Lesson 5)

**Theme:** Choose landmarks for unfamiliar layouts (a content page, a card) rather than re-wrapping the known profile page, plus a "de-div-ify" fix-this and a no-JS interactive extension.
**Items: 5.**

### C1. Structure a page of content from a flat draft
- **Type:** build
- **Skill drilled:** mapping a wireframe to `header`/`nav`/`main`/`article`/`aside`/`footer`; one `<main>` per page
- **Difficulty:** core
- **Task:** Given a flat dump of content (site title, nav links, a main article, a related-links sidebar, a footer), wrap each region in the correct semantic landmark.
- **Deliverable:** a page whose landmarks read like an outline — a single `<main>`, a `<nav>` of links, an `<aside>` for related links, a `<footer>` — and that still makes sense with styles stripped.
- **Source:** https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Structuring_content/Structuring_a_page_of_content

### C2. De-div-ify a page
- **Type:** fix-this
- **Skill drilled:** replacing `<div class="header">`-style soup with real landmarks; knowing when `<div>`/`<span>` is genuinely correct
- **Difficulty:** core
- **Task:** Given a page built entirely from `<div>`s (`div.header`, `div.nav`, `div.main`, `div.footer`) plus one legitimately generic grouping div, swap each for its semantic element — and leave the one that should stay a `<div>` alone.
- **Deliverable:** a page using `header`/`nav`/`main`/`footer`, with the single justified `<div>` kept and a one-line note on why it stays generic.
- **Source:** https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Structuring_content/Structuring_documents

### C3. Build a self-contained card as an article
- **Type:** build
- **Skill drilled:** `<article>` for stand-alone content; nested heading levels inside a section; block vs inline awareness
- **Difficulty:** core
- **Task:** Build a blog-preview card as pure structure (no CSS): an `<article>` containing a category line, an `<h2>` title, a published date, a short summary `<p>`, and an author line with an inline `<img>` and name.
- **Deliverable:** a valid `<article>` that would still make sense pasted on its own, with correct heading nesting and an inline author image.
- **Source:** https://www.frontendmentor.io/challenges/blog-preview-card-ckPaj01IcS

### C4. details/summary disclosure
- **Type:** extend
- **Skill drilled:** native `<details>`/`<summary>` collapsible content — no JS needed
- **Difficulty:** stretch
- **Task:** Add an FAQ section where each question is a `<summary>` inside a `<details>`, so answers expand and collapse natively.
- **Deliverable:** three working disclosure widgets that toggle open/closed on click with zero JavaScript.
- **Source:** https://web.dev/learn/html (also https://developer.mozilla.org/en-US/docs/Web/HTML/Element/details)

### C5. Quiz — landmark & display choices
- **Type:** quiz
- **Concept:** `<section>` vs `<article>`, the one-`<main>` rule, block vs inline (extends the lesson quiz into the "would it stand alone?" test)
- **Difficulty:** core
- **Sample question (multiple-choice):** "A comment under a blog post would make sense if you lifted it out and pasted it elsewhere. Which element fits best?" — Options: (a) `<section>`, (b) `<article>` ✓, (c) `<div>`, (d) `<aside>`. **Explanation:** self-contained, stand-alone content is an `<article>`; `<section>` is a themed part of a larger whole.
- **Sample question (multiple-choice):** "Which of these is an **inline** element by default?" — Options: (a) `<p>`, (b) `<section>`, (c) `<span>` ✓, (d) `<div>`. **Explanation:** `<span>` flows within a line of text; the others are block elements that start on a new line.
- **Source:** https://web.dev/learn/html/semantic-html

---

# Practice Set D — "Forms & Tables That Hold Data" (maps to Lessons 6 & 7)

**Theme:** Drill the label/header relationships beginners most often get wrong, and extend both topics with the next correctness layer (`<fieldset>`/`<legend>`, `scope`, `colspan`). Forms and tables are the module's biggest accessibility risk, so this set leans on association.
**Items: 6.**

### D1. Typical feedback form
- **Type:** build
- **Skill drilled:** `<label>` for/id on every field; input types (text/email/number); `<textarea>`; submit button; `required`
- **Difficulty:** core
- **Task:** Build a feedback form with name, email, a rating (number or radio group), a comments textarea, and a submit button — every control paired with a `<label>`, the email marked `required`.
- **Deliverable:** a form where clicking any label focuses its control, an empty required email blocks submission, and the radio group (if used) shares one `name`.
- **Source:** https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Structuring_content/Forms_challenge

### D2. Fix the inaccessible form
- **Type:** fix-this
- **Skill drilled:** spotting placeholder-as-label; a `for`/`id` mismatch; radios with different `name`s; a missing button `type`
- **Difficulty:** core
- **Task:** Given a form with planted accessibility bugs (a field labelled only by `placeholder`, a `for`/`id` mismatch, three radios with different `name`s so all can be selected, a bare `<button>` with no `type`), fix each one.
- **Deliverable:** a form where every field has a real associated `<label>`, the radio group is mutually exclusive, and the submit button has an explicit `type`.
- **Source:** https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Structuring_content/Test_your_skills/Forms_and_buttons

### D3. Group related fields with fieldset and legend
- **Type:** extend
- **Skill drilled:** `<fieldset>` + `<legend>` to group a set of related controls (esp. a radio group) — beyond the lesson
- **Difficulty:** stretch
- **Task:** Wrap a radio-button group ("How did you hear about us?") in a `<fieldset>` with a `<legend>` describing the group, so assistive tech announces the group label before each option.
- **Deliverable:** a correctly grouped radio set where the legend is announced as the group's question.
- **Source:** https://www.freecodecamp.org/learn/responsive-web-design-v9 (also https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Structuring_content/HTML_forms)

### D4. Structure a planet data table
- **Type:** build
- **Skill drilled:** `<thead>`/`<tbody>`, `<caption>`, header cells; data-not-layout discipline
- **Difficulty:** core
- **Task:** Given a grid of planet facts (name, mass, distance, moons), build a table with a caption, a `<thead>` header row, and a `<tbody>` of data rows.
- **Deliverable:** a captioned table with a clearly separated header group; each column labelled by a `<th>`.
- **Source:** https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Structuring_content/Planet_data_table

### D5. Add scope and a spanning cell
- **Type:** extend
- **Skill drilled:** `scope="col"`/`scope="row"` for header association; `colspan`/`rowspan` for merged cells — both beyond the lesson
- **Difficulty:** stretch
- **Task:** Extend the planet table so the first column is a row header (`<th scope="row">`), column headers use `scope="col"`, and one summary row spans multiple columns with `colspan`.
- **Deliverable:** a table where each data cell is unambiguously associated with both its row and column header, with one correctly spanning cell.
- **Source:** https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Structuring_content/Table_accessibility

### D6. Quiz — forms & tables correctness
- **Type:** quiz
- **Concept:** label association, `placeholder` ≠ label, `<th scope>` (extends the lesson quizzes into the "why is placeholder-only inaccessible" and header-association cases)
- **Difficulty:** core
- **Sample question (multiple-choice):** "A designer suggests dropping the visible label and using only a `placeholder` to save space. What's the accessibility problem?" — Options: (a) none — placeholders are labels, (b) the placeholder text disappears as soon as the user types, so the field has no persistent accessible name ✓, (c) placeholders aren't valid HTML, (d) placeholders only work on `<select>`. **Explanation:** a placeholder is a transient hint, not a label; the field loses its accessible name once typing begins, so a real `<label>` is still required.
- **Sample question (multiple-choice):** "On a data table, what does `<th scope=\"col\">` do?" — Options: (a) colors the column, (b) tells assistive tech that this header labels the cells **down its column** ✓, (c) merges two columns, (d) sorts the column. **Explanation:** `scope` declares whether a `<th>` heads a column or a row, so screen readers announce the right header for each data cell; `colspan` is what merges columns.
- **Source:** https://web.dev/learn/html/forms (also W3Schools HTML Quiz — https://www.w3schools.com/html/html_quiz.asp)

---

## Summary of themed sets

| Set | Maps to | Items | Mix |
| --- | --- | --- | --- |
| A — Mark Up Real Content | Lessons 1 & 2 | 5 | 2 build, 1 fix-this, 1 extend, 1 quiz |
| B — Connect & Show | Lessons 3 & 4 | 5 | 2 build, 1 fix-this, 1 extend, 1 quiz |
| C — Structure It Semantically | Lesson 5 | 5 | 2 build, 1 fix-this, 1 extend, 1 quiz |
| D — Forms & Tables That Hold Data | Lessons 6 & 7 | 6 | 2 build, 1 fix-this, 2 extend, 1 quiz |

**Total: 21 practice items across 4 submodules.** Type mix: 8 build, 3 fix-this, 5 extend, 5 quiz. Difficulty spread: 3 intro, 11 core, 7 stretch. Every build/fix-this item ends in a validator.w3.org-checkable deliverable, matching the module's existing "validate before done" habit (Lesson 8).

## Confidence & limitations

- **Confirmed:** every source URL was fetched and resolved live on 2026-06-25. MDN serves the Learn pages under `Learn_web_development/Core/Structuring_content/...` (matching what the existing lessons already cite), with **Challenge** briefs and a `/Test_your_skills/` sub-path of fix-this assessments.
- **Likely / author-tune:** the *content* of individual MDN Challenge briefs (the exact data handed to a learner) was inferred from the module index, not opened page-by-page; the URLs themselves are confirmed live. Open each challenge page directly when authoring to lift the precise starting files.
- **Watch — Frontend Mentor:** its challenges are HTML **+ CSS** with Figma designs. Cite the Blog-preview-card only as inspiration for the **markup phase** (C3); do not set visual fidelity as the acceptance criterion in an HTML-only module, and provide a self-hosted brief if account creation is a classroom barrier. Its challenge-list page is a JS SPA WebFetch cannot read — slug URLs were confirmed via search.
- **Watch — freeCodeCamp:** the v9 Responsive Web Design path was being re-versioned through 2025–26 (v8 "legacy" vs v9 current). The accessibility web-form project is confirmed present, but deep step URLs are unstable — link the certification landing page (used in D3), not a step URL.
- **MDN starter files:** Challenge/"Test your skills" pages ship downloadable starting points (CC-licensed); the fix-this items (A2, B2, C2, D2) can adapt those rather than authoring buggy starters from scratch — confirm licensing/attribution before reuse.
- **Not duplicated:** I cross-checked each item against the existing `<Exercise>`/`<Quiz>` in all eight lesson MDX files; the new items deliberately target the untested gaps (fresh-context mark-up, fix-this debugging, multi-file relative links, `<dl>`/`<figure>`/`<details>`/`<fieldset>`/`<th scope>`/`colspan` extensions, and label/header-association reasoning).
