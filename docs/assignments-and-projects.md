# Assignments, Projects & Assessment

A proposal to add classroom depth to the Interactive Web Development Guide. This document does **not** change any lesson content — it sits alongside the guide as the instructor's playbook for assignments, multi-module projects, classroom activities, assessment, and real-world context.

## How this fits the existing guide

The guide already teaches via two interactive components per chapter: a guided `<Exercise>` (numbered steps + expected result + full solution) and a `<Quiz>`. It carries two running examples:

- **Profile page / profile card** — built across Setup → HTML → CSS in a repo named `profile-page`, using the Ada Lovelace persona as sample data.
- **To-do app** — built across the Integration module in `todo.html`, ending in the capstone.

Everything below is **larger and more open-ended than the in-chapter exercises**, and deliberately **avoids the profile-page and to-do themes** so students practice transferring skills to fresh problems. Each in-chapter exercise is already accounted for; nothing here duplicates one.

**Shared conventions (match the guide):**

- **Tooling:** VS Code + Live Server + Prettier (Format On Save), GitHub Desktop. No CLI git is required.
- **Delivery:** every assignment ships as a **GitHub repo** pushed via GitHub Desktop. The repo URL is the deliverable. Students already have GitHub accounts.
- **Commit hygiene:** commit in small, labelled steps (e.g. `"Add nav and hero section"`), not one giant commit at the end. Commit history is graded.
- **Validation tools:** [W3C Markup Validator](https://validator.w3.org) for HTML; [WAVE](https://wave.webaim.org) for accessibility.
- **Filenames:** `index.html`, `styles.css`, and clearly named `.js` files. No build tools.

> **A note on AI:** these learners have some prior coding exposure and will have AI tools available. The rubrics weight *commit history*, *in-class explanation*, and *code-reading* precisely so that a student who pasted an answer cannot score well without understanding it. The "explain your code" checkpoint in each project milestone is the main defence.

---

## 1. Per-module assignments

Each assignment is a standalone repo. Estimated times assume a student who has completed that module's chapters.

### Module 0 — Setup

#### Assignment S1 — "Repo warm-up: a links page"

**Why:** prove the whole toolchain works end-to-end before content gets harder — clone, edit, preview, commit, push, and read the live result.

**Requirements:**
- Create a new GitHub repo named `links-page` and clone it with GitHub Desktop.
- Add `index.html` with a valid skeleton (doctype, `lang`, `charset`, `<title>`).
- Page content: a heading with your name, and **5 links** to sites you actually use (one must open in a new tab with `rel="noopener"`).
- Preview with Live Server; format with Prettier before each commit.
- **At least 3 separate commits** with meaningful messages, all pushed.

**Deliverable:** the `links-page` repo URL.

**Estimated time:** 30–40 min.

**Rubric (10 pts):**

| Criterion | Pts |
|---|---|
| Repo cloned, committed, and pushed via GitHub Desktop (it's actually on GitHub) | 3 |
| Valid HTML skeleton + title | 2 |
| 5 working links; one correct new-tab link with `rel="noopener"` | 3 |
| ≥3 commits with clear messages; file is Prettier-formatted | 2 |

---

### Module 1 — HTML

> In-chapter exercise builds the **profile page** (About/Skills/Projects/Contact for Ada Lovelace). These assignments use **different content** so the markup skills transfer.

#### Assignment H1 — "Recipe page" (core)

**Why:** recipes are the classic semantic-HTML test — they exercise headings, lists, images, and a table naturally, with no CSS to hide weak structure.

**Requirements (HTML only — no CSS, no JS):**
- New repo `recipe-page`, file `index.html`.
- Semantic landmarks: `<header>`, `<main>`, `<footer>`; at least two `<section>`s with `id`s.
- A correct heading outline (single `<h1>`, no skipped levels).
- An **ordered list** for the method and an **unordered list** for ingredients.
- One `<img>` with meaningful `alt` (use a local image in the repo, relative path).
- A **table** for nutrition or timing info, with `<caption>`, `<thead>`/`<tbody>`, and `<th>` headers.
- A "jump to method" in-page link to a section `id`.
- **Passes the [W3C validator](https://validator.w3.org) with zero errors.**

**Deliverable:** the `recipe-page` repo URL + a screenshot of a clean validator result committed as `validation.png`.

**Estimated time:** 60–75 min.

**Rubric (20 pts):**

| Criterion | Pts |
|---|---|
| Correct document skeleton + semantic landmarks | 4 |
| Valid, non-skipping heading outline | 3 |
| Ordered + unordered lists used appropriately | 3 |
| Image with meaningful `alt` and working relative path | 3 |
| Data table with caption + header cells (not used for layout) | 4 |
| Passes W3C validator with zero errors (screenshot committed) | 3 |

#### Assignment H2 — "Event sign-up page" (forms focus, optional second brief)

**Why:** an accessible form is a high-value, frequently-botched real-world skill; this isolates it.

**Requirements:**
- New repo `signup-page`. Build a single semantic page for a fictional event with a sign-up `<form>`.
- Every input paired with a `<label>` via `for`/`id` (no placeholder-as-label).
- Use at least: text, email, a radio group (ticket type), a checkbox (agree to terms), a `<select>`, and a `<textarea>`.
- Use `required` on the right fields; a submit `<button>`.
- The form need not *do* anything yet (no JS) — structure and labelling are the point.

**Deliverable:** `signup-page` repo URL.

**Estimated time:** 45–60 min.

**Rubric (15 pts):**

| Criterion | Pts |
|---|---|
| Every input correctly labelled (`for`/`id`) | 5 |
| Required input types all present and used correctly | 5 |
| Sensible validation attributes + correct button type | 3 |
| Valid markup; semantic wrapping of the form | 2 |

---

### Module 2 — CSS

> In-chapter exercises style the **profile card** with flexbox and make it responsive. This assignment styles a **multi-element page** so the box model, layout, and media queries get a bigger workout.

#### Assignment C1 — "Style the recipe page"

**Why:** taking *your own* unstyled HTML (from H1) and styling it mirrors the real job: you rarely write HTML and CSS in the same breath.

**Requirements:**
- Copy your H1 `recipe-page` HTML into a **new repo** `recipe-styled` (or branch). Add an **external** `styles.css` linked with `<link rel="stylesheet">` — no inline styles.
- Apply `box-sizing: border-box`, deliberate spacing via the box model, and a readable type scale (`font-family`, `font-size`, `line-height`).
- Use a **flexbox** layout somewhere meaningful (e.g. ingredients beside method, or a header row).
- Use a **color palette** of at least 3 colors with sufficient contrast; set colors with hex or `hsl`.
- **Responsive:** include the viewport meta tag and **one media query** that changes the layout between mobile and desktop (e.g. single column → two columns).
- Must look intentional at 375px and 1280px widths.

**Deliverable:** `recipe-styled` repo URL + two screenshots (mobile + desktop) committed.

**Estimated time:** 90 min.

**Rubric (25 pts):**

| Criterion | Pts |
|---|---|
| External stylesheet, no inline styles, `box-sizing: border-box` | 4 |
| Box-model spacing is deliberate and consistent | 4 |
| Typography is readable (scale, line-height, font choice) | 4 |
| Flexbox used correctly for a real layout need | 5 |
| Responsive: viewport tag + working media query (verified at 375px & 1280px) | 6 |
| Overall visual polish and intentional color use | 2 |

---

### Module 3 — JavaScript

> In-chapter exercises do tiny isolated tasks (model a profile object; a 2-function calculator). These assignments are **console-only mini-programs** — no DOM yet, matching the module's scope — that chain variables, arrays/objects, conditionals, loops, and functions.

#### Assignment J1 — "Console toolkit" (core)

**Why:** forces composition of every JS fundamental into functions that return values, the way real code is organised — and it's all testable in the console with no DOM distraction.

**Requirements (one repo `js-toolkit`, file `toolkit.js`, run via a blank HTML page + Live Server + console):**
Write and `console.log`-demonstrate **four** functions:
1. `wordCount(sentence)` — returns the number of words (string methods + split logic).
2. `average(numbers)` — takes an array, returns the mean (loop or `forEach`).
3. `grade(score)` — returns `"A"`/`"B"`/`"C"`/`"Fail"` using conditionals.
4. `summarize(people)` — takes an **array of objects** `{name, age}` and returns a string like `"3 people, average age 29"` (combines arrays, objects, loops, and a called function — reuse `average`).
- Each function must **return** a value (not just `console.log` inside).
- At least one arrow function and one `function` declaration.
- Comments explaining each function's input and output.

**Deliverable:** `js-toolkit` repo URL.

**Estimated time:** 75–90 min.

**Rubric (25 pts):**

| Criterion | Pts |
|---|---|
| All four functions implemented and return correct values | 12 |
| `summarize` correctly composes arrays + objects + reuses `average` | 5 |
| Appropriate use of `const`/`let`, both function syntaxes | 3 |
| Correct conditional logic in `grade` (boundaries handled) | 3 |
| Clear comments + clean, Prettier-formatted code | 2 |

#### Assignment J2 — "FizzBuzz, your way" (short warm-up, optional)

**Why:** a 20-minute classic that confirms loops + conditionals + modulo before moving on; good as a graded warm-up or a make-up.

**Requirements:** in `fizzbuzz.js`, log 1–100, replacing multiples of 3 with `Fizz`, of 5 with `Buzz`, of both with `FizzBuzz`. Then wrap it in a function `fizzbuzz(n)` so the limit is a parameter.

**Deliverable:** repo or file URL.

**Estimated time:** 20–30 min.

**Rubric (10 pts):** correct output (5) · refactored into a parameterised function (3) · clean loop/conditional structure (2).

---

### Module 4 — Integration

> The in-chapter work builds the **to-do app**. This assignment builds a **different interactive app** so DOM selection, events, form-reading, and dynamic rendering transfer to a new problem.

#### Assignment I1 — "Interactive tip / bill calculator"

**Why:** a small but complete event-driven app with input reading, validation, and DOM feedback — a different shape from the to-do list (computed output rather than a growing list).

**Requirements (repo `tip-calculator`, `index.html` + `styles.css` + `app.js`):**
- A form with: bill amount (number), tip percentage (radio buttons *or* a `<select>`), and number of people (number).
- On submit (use `event.preventDefault()`), read the values, validate them (no negatives, people ≥ 1), and **show results in the DOM** — total per person and total tip — not in an `alert`.
- Show a clear **error message in the page** when input is invalid; clear it on a valid submit.
- Use `querySelector`/`getElementById`, `addEventListener`, and update `textContent`.
- Basic styling so the result is readable.

**Deliverable:** `tip-calculator` repo URL.

**Estimated time:** 90–120 min.

**Rubric (30 pts):**

| Criterion | Pts |
|---|---|
| Form reads all inputs correctly (value / checked / select) | 6 |
| `preventDefault` used; no full-page reload on submit | 4 |
| Calculation is correct (per-person total + tip) | 6 |
| Validation works; errors shown **in the DOM**, then cleared | 6 |
| Clean DOM updates via `textContent` (no `innerHTML` string-building of the whole page) | 4 |
| Code organised into small functions; readable styling | 4 |

---

## 2. Multi-module projects

These span several modules and are built up in **milestones** that line up with where students are in the guide. Each milestone is committed and (lightly) checked before the next; the final commit is graded against the full rubric.

### Project A — "Local business / community site" (HTML + CSS)

**Spans:** HTML module → CSS module. Start after `html/5-semantics`; finish after `css/4-responsive-basics`.

**Brief:** a small **multi-page** website (2–3 pages) for a fictional local business, club, or community group of the student's choice (cafe, climbing gym, board-game club…). Not a personal profile — pick a *thing*, not a *person*.

**Milestones:**
1. **M1 — Structure (after html/5):** home page with semantic landmarks and a real heading outline; a working nav.
2. **M2 — Content (after html/7):** add a second and third page (e.g. menu/schedule using a **table or list**, and a **contact form**); nav links work between all pages (relative URLs).
3. **M3 — Style (after css/3):** external stylesheet, box-model spacing, typography, a flexbox layout (e.g. a card grid).
4. **M4 — Responsive & polish (after css/4):** viewport tag + media query; looks good on phone and desktop; passes W3C validator with zero errors and a clean WAVE check.

**Requirements:**
- 2–3 pages, consistent shared header/nav/footer.
- At least one image with `alt`, one list, one table, one accessible form.
- External CSS only; responsive at 375px and 1280px.
- Repo `business-site`, committed milestone-by-milestone.

**Deliverable:** `business-site` repo URL + a 3-sentence README describing the business and which page does what.

**Estimated time:** 5–7 hours across the two modules.

**Rubric (40 pts):**

| Criterion | Pts |
|---|---|
| Semantic, valid HTML across all pages; clean heading outlines | 8 |
| Multi-page navigation works (correct relative links) | 5 |
| Required content present (image+alt, list, table, accessible form) | 7 |
| External CSS: box model, typography, color used deliberately | 7 |
| Flexbox layout used correctly for a real need | 5 |
| Responsive (viewport + media query; verified at two widths) | 5 |
| Passes W3C validator + clean WAVE; milestone commit history | 3 |

---

### Project B — "Interactive widget collection" (JavaScript + Integration)

**Spans:** JavaScript module → Integration module (pre-capstone). Start after `javascript/7-functions`; finish after `integration/5-creating-and-removing-elements`.

**Brief:** a single page hosting **two interactive widgets** the student picks from a menu (or proposes), exercising events, form-reading, and dynamic rendering on problems *other than* a to-do list. Suggested menu:

- A **quiz** (questions in an array of objects, score shown at the end).
- A **unit/currency converter** with live `input` events.
- An **image gallery** with next/prev buttons.
- A **"add to a list" widget** that is clearly *not* a to-do app (e.g. a shopping list with running total, or a guest list with a head count).
- A **theme/colour switcher** that toggles classes on the page.

**Milestones:**
1. **M1 — Data & logic (after js/7):** the data model (arrays/objects) and pure functions that compute results, demonstrated in the console.
2. **M2 — Wire one widget (after integration/3):** select elements, attach event listeners, update the DOM.
3. **M3 — Two widgets + render-from-data (after integration/5):** second widget done; at least one widget renders a list from an array by looping and uses `createElement`.

**Requirements:**
- Repo `widget-collection`: `index.html`, `styles.css`, `app.js`.
- At least one widget driven by an **array as the source of truth** that re-renders on change.
- Real event handling (`click` and `input` or `submit`); `preventDefault` where a form is involved.
- DOM feedback, never `alert`.

**Deliverable:** `widget-collection` repo URL + README listing the two widgets and how to use them.

**Estimated time:** 5–7 hours.

**Rubric (40 pts):**

| Criterion | Pts |
|---|---|
| Sound data model; pure logic functions return correct values | 8 |
| Element selection + event listeners wired correctly | 8 |
| At least one widget renders from an array and re-renders on change | 8 |
| Correct use of `createElement`/`append`/`remove` where building elements | 6 |
| Both widgets work end-to-end; DOM feedback (no `alert`) | 6 |
| Code split into readable functions; styling; milestone commits | 4 |

---

### Project C — FINAL CAPSTONE — "Pick-your-domain interactive app"

**Spans:** all five modules. Built after `integration/6-capstone`, reusing everything.

> The guide's in-chapter capstone walks every student through the **same** to-do app as a guided transcription. **This final capstone is the open-ended version of that experience:** the student designs and builds their *own* small app in a domain they choose, applying the to-do app's `state → render()` discipline to a new problem. It is the summative centrepiece of the course.

**Brief:** design and build a complete, single-page interactive app that maintains state in JavaScript and renders it to the DOM. It must **not** be a plain copy of the to-do app, though it may share the pattern. Suggested domains (or propose your own, instructor-approved):

- **Habit / water / reading tracker** with daily counts.
- **Flashcard study app** (flip, mark known/unknown, shuffle).
- **Expense splitter** or **simple budget tracker** with a running total.
- **Recipe/shopping planner** that builds a combined list.
- **Workout / set logger.**

**Required features (all must be present):**
1. **State** held in an array of objects (or similar) as the single source of truth.
2. A `render()` function that draws the whole UI from state, including an **empty state**.
3. **Add** items via a form (`preventDefault`, validated, input cleared).
4. **At least two more state-changing actions** beyond add — e.g. edit, complete/toggle, delete, filter, or a computed summary (count/total).
5. **DOM-only feedback** (no `alert`), accessible form labels, semantic HTML.
6. **Styling** with external CSS, responsive at phone + desktop width.
7. Clean, Prettier-formatted code split into named functions.

**Process requirements (graded):**
- A short **plan committed first** as `PLAN.md`: data shape, user actions, and what each renders (mirrors the planning step the guide teaches).
- **Milestone commits:** plan → static HTML/CSS → render-from-state → actions wired → polish.
- A **2–3 minute in-class demo + code walkthrough**, where the student explains how state flows to the DOM and answers one "what if I change X?" question. This is the anti-copy checkpoint.

**Stretch goals (for fast finishers — pick any; bonus points):**
- **Persistence** with `localStorage` so data survives a reload.
- **Filtering** (all / active / done) or **search**.
- **Edit-in-place** for an existing item.
- **Sorting or reordering** items.
- **Keyboard support** (e.g. Enter to add, Escape to cancel an edit).
- A polished **empty state and micro-interactions** (transitions on add/remove).

**Deliverable:** `capstone-app` repo URL with `PLAN.md`, the working app, and a README (what it is, how to run it with Live Server, which stretch goals you attempted).

**Estimated time:** 6–10 hours.

**Rubric (60 pts):**

| Criterion | Pts |
|---|---|
| `PLAN.md` committed first; data shape and actions thought through | 5 |
| State as single source of truth; `render()` draws UI from state incl. empty state | 12 |
| Add via validated form (`preventDefault`, cleared input) | 8 |
| Two+ additional state-changing actions work correctly | 10 |
| Semantic, accessible HTML; DOM-only feedback (no `alert`) | 6 |
| Responsive external CSS; visual polish | 6 |
| Code quality: named functions, no dead code, Prettier-formatted | 5 |
| Milestone commit history tells a coherent story | 3 |
| In-class demo + code walkthrough: can explain state→DOM flow | 5 |
| **Stretch goals attempted (bonus, capped)** | **+5** |

---

## 3. Classroom activities

Short, in-session activities to break up reading and surface misconceptions. None require a repo unless noted.

### Pair programming (driver / navigator)

Pairs swap roles every ~10 minutes. One types (driver), one directs and reviews (navigator).

| When | Task |
|---|---|
| After `html/6-forms` | **"Form face-off":** build an accessible newsletter sign-up form. Navigator owns the label/`for`/`id` correctness; swap and add validation attributes. |
| After `css/3-layout-flexbox` | **"Center the thing":** given a fixed HTML snippet, pair to center a card both axes with flexbox, then build a 3-card responsive row. |
| After `javascript/6-loops` | **"Loop relay":** navigator dictates the logic for printing a multiplication table; driver implements; swap to convert a `for` loop to `for...of` and `forEach`. |
| After `integration/3-events` | **"Counter":** build a +/- counter button that updates a number on the page; swap to add a reset and a "can't go below zero" rule. |

**Light rubric (participation, 5 pts):** both partners drove and navigated (2) · working result (2) · navigator caught/prevented at least one issue out loud (1).

### Code reading & critique

Project a snippet on screen; students annotate or discuss before you reveal the fix.

- **"Spot the accessibility bug"** (HTML): a form with placeholder-instead-of-label, an `<img>` with no `alt`, a `div` used as a button. Students list every issue and the fix.
- **"Rename these variables"** (JS): a working function with names like `x`, `tmp`, `data2`. Students rename for clarity and justify each.
- **"What does this log?"** (JS): a short script mixing truthy/falsy, `==` vs `===`, and scope. Predict the console output, then run it.
- **"Two ways"** (CSS): show the same layout done with margins vs with `gap`; discuss which is more maintainable and why.

### "Debug this broken page" challenges

Hand out a repo (or a single file via Live Server) that *looks* almost right but is broken. Students fix it and explain the bug. Calibrated per module:

| Module | Broken page | Bugs planted |
|---|---|---|
| HTML | A page that won't validate | unclosed `<li>`, `<h1>` jumping to `<h4>`, table used for layout, missing `alt` |
| CSS | A layout that won't lay out | typo'd property (`flex-direction: collumn`), missing viewport tag, specificity conflict overriding a color, no `box-sizing` causing overflow |
| JavaScript | A script that throws | `=` used in an `if`, off-by-one in a `for` loop, calling a function before reading its return, `const` reassignment error |
| Integration | A widget that does nothing | `addEventListener` typo, `querySelector` selecting the wrong thing → `null`, missing `preventDefault` so the page reloads, handler attached before the element exists |

**Format:** 15–20 min solo or in pairs; finish with a 2-minute "here's what was wrong" share-out. Great low-stakes formative check.

### Stretch goals for fast finishers

Keep these on a slide so quick students always have somewhere to go:

- **HTML:** re-validate with zero warnings (not just zero errors); add `<figure>`/`<figcaption>`; add a second language variant of one paragraph.
- **CSS:** add a dark-mode `@media (prefers-color-scheme: dark)`; convert one fixed layout to CSS Grid (preview territory — encourage exploration); add a hover transition.
- **JS:** add input validation that handles empty/whitespace/negative cases; refactor repeated code into a shared function.
- **Integration:** add `localStorage` persistence; add a keyboard shortcut; animate item add/remove.
- **Anything:** open a real challenge on **Frontend Mentor** or a **Codewars** kata (see §5) and start it.

---

## 4. Assessment design

### Weighting (overall course grade)

A blend that rewards consistent practice while making the capstone the centrepiece. Tune to your context.

| Component | Weight | Type |
|---|---|---|
| Chapter quizzes (the built-in `<Quiz>`s) | 10% | Formative-leaning; completion + score |
| In-chapter exercises (the built-in `<Exercise>`s) | 10% | Formative; completion checked |
| Per-module assignments (§1) | 30% | Summative; rubric-graded |
| Multi-module Projects A & B (§2) | 20% | Summative; milestone + final rubric |
| **Final capstone (Project C)** | **25%** | **Summative; centrepiece** |
| Participation (classroom activities, pair work, demos) | 5% | Formative |

> Quizzes and exercises are kept low-stakes on purpose: they exist to *teach*, and over-weighting them invites answer-copying. The graded weight is on what students *build* and can *explain*.

### Formative vs summative

- **Formative (feedback, low/no stakes):** quizzes, in-chapter exercises, classroom activities, "debug this" challenges, project milestone checks. Use these to catch misconceptions early — give comments, not just marks.
- **Summative (counts toward the grade):** the per-module assignments, the final commit of each project, and the capstone demo. Graded against the published rubric so expectations are known up front.
- **Milestone checks** straddle both: glance at the milestone commit, give one piece of feedback, don't assign a hard grade until the final submission.

### Reusable marking-rubric template

Use this skeleton for any assignment/project so grading is consistent and students know the bar:

```
Assignment: ____________________        Student/Repo: ____________________

1. Functionality / requirements met        [ /__ ]   does it do what was asked?
2. Correctness                             [ /__ ]   right output, no errors, edge cases
3. Code quality & readability              [ /__ ]   naming, structure, small functions, Prettier
4. Conventions & best practice             [ /__ ]   semantics/accessibility, no inline styles,
                                                     no alert, === over ==, etc. (module-specific)
5. Git workflow                            [ /__ ]   meaningful commits, pushed, milestone history
6. Explanation / understanding            [ /__ ]   (projects) can walk through their own code
                                          --------
                            TOTAL          [ /__ ]

Bonus — stretch goals attempted (capped): [ +__ ]

Strengths:    ____________________________________________
To improve:   ____________________________________________
```

**Grading guidance per criterion:** full = meets it cleanly; half = present but flawed; zero = missing or broken. Always write one *strength* and one *to-improve* — feedback that's only a number teaches nothing.

### Anti-copy / integrity notes

- Weight **commit history** and **in-class explanation** so understanding, not just a finished artifact, earns the grade.
- The capstone demo's "what if I change X?" question cannot be answered from a pasted solution.
- Vary assignment domains (recipe, business, tip calculator) so last-year's repos don't transfer.

---

## 5. Real-world context & curated links

Tell students *why* each skill matters and where professionals use it. All links below were checked and resolve.

### Why each module matters professionally

| Module | Why it matters on the job | Where you'll see it |
|---|---|---|
| **HTML / semantics** | Semantic, valid markup is the foundation of accessibility, SEO, and maintainability. Screen-reader users, search crawlers, and your future teammates all read your structure. | Every website. Roles: front-end developer, web designer, content/CMS developer, accessibility specialist. |
| **Forms** | Forms are where users *do* things — sign up, pay, search. Accessible, well-labelled forms are a legal requirement in many markets (e.g. WCAG/EN 301 549) and a top source of real-world bugs. | Checkout flows, dashboards, sign-up pages, internal tools. |
| **CSS / layout / responsive** | Sites must work on a 375px phone and a 4K monitor. Flexbox, the box model, and media queries are daily tools; "make it responsive" is a constant ticket. | Marketing sites, web apps, email templates. Roles: front-end developer, UI engineer, design-system engineer. |
| **JavaScript fundamentals** | Variables, arrays/objects, conditionals, loops, and functions are the bedrock under *every* framework. React/Vue/Svelte are just JavaScript with patterns. | All interactive web work, plus Node back-ends. |
| **DOM / integration** | Reading input, handling events, and updating the page from state is exactly what frameworks automate — understanding it by hand makes you far better with React later (see the guide's closing Read-More). | Interactive features, widgets, single-page apps. |

### Practice platforms (verified)

Point students here for extra reps and for the stretch goals in §3.

**HTML & CSS practice**
- [Frontend Mentor](https://www.frontendmentor.io) — professional design-to-code challenges with real designs; build portfolio pieces. Has a free tier. *Great for Projects A and beyond.*
- [Frontend Practice](https://www.frontendpractice.com) — recreate real companies' websites for practice.
- [Flexbox Froggy](https://flexboxfroggy.com) — a quick, fun game for learning flexbox properties. *Pairs with css/3.*
- [CSSBattle](https://cssbattle.dev) — recreate target images in the least CSS; a playful stretch challenge.

**JavaScript practice**
- [Codewars](https://www.codewars.com) — bite-sized "kata" challenges in JavaScript, ranked by difficulty. *Great for Module 3 stretch reps.*
- [JavaScript30](https://javascript30.com) — Wes Bos's free "30 vanilla-JS projects in 30 days." No frameworks — exactly this course's level, for after Module 4.

**Reference & tooling (use during assignments)**
- [MDN Web Docs — HTML](https://developer.mozilla.org/en-US/docs/Web/HTML) — the authoritative reference for every tag, property, and API.
- [web.dev — Learn HTML](https://web.dev/learn/html) — Google's free, structured companion course.
- [W3C Markup Validator](https://validator.w3.org) — required for the HTML assignments and Project A.
- [WAVE Accessibility Tool](https://wave.webaim.org) — catch accessibility issues before submitting.

**Going further (free curriculum, optional)**
- [The Odin Project](https://www.theodinproject.com) — a free, project-based full-stack/front-end curriculum for students who want to keep going after this course.

---

*End of proposal. This document adds classroom scaffolding only; it does not modify any guide content or code.*
