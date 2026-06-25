# Integration (HTML + JS / the DOM) — Extra Practice Submodules

Research for **additional, exercise-and-quiz-focused practice submodules** that sit alongside the seven existing Integration lessons. The main lessons stay unchanged; these are *extra* practice sets a learner can opt into after (or between) the lessons.

> **Audience:** learners with some prior coding exposure, working in VS Code + Live Server + GitHub Desktop, no build tools. Every build below is a single `.html` file with an inline `<script>` — so it runs in the course's in-page preview boxes (which execute full HTML + `<script>`). The only exception is the fetch set, which needs a live server (same caveat the existing chapter 7 already states).

## What the existing module already covers (so we don't duplicate)

| Lesson | Teaches | In-chapter Exercise (do NOT repeat) |
| --- | --- | --- |
| 1 Selecting elements | `getElementById`, `querySelector`, `querySelectorAll`, null check | Build the to-do page shell + select each part |
| 2 Changing content & styles | `textContent`, `classList` (add/remove/toggle), `style`, `get/setAttribute` | Mark first task done via a class |
| 3 Events & listeners | `addEventListener` (click/input/submit), event object, `preventDefault` | Wire up the Add button (submit, no reload) |
| 4 Reading form input | `value`, `checked`, `<select>.value`, validate + DOM message (not `alert`) | Reject empty task with on-page message |
| 5 Creating & removing | `createElement`, `append`/`appendChild`, `remove`, render-from-array | Render tasks from an array, push + re-render |
| 6 Capstone | Full to-do app: array of `{text, done}`, render, add/complete/delete, empty state, `splice` | Build & ship the to-do app |
| 7 JSON / fetch / APIs | API concept, JSON shape, `fetch` + `async/await`, `response.json()`, render fetched array, `try/catch` | Fetch + render users from JSONPlaceholder |

**Design rule for the new sets:** drill the *same skills* on *fresh, non-to-do, non-profile* themes, and deliberately combine skills the lessons introduce one at a time. The capstone proves the to-do theme is exhausted, so every build below uses a different mini-app (counter, tabs, accordion, color tool, live filter, quiz, dog/joke fetcher, etc.). This matches the established `docs/assignments-and-projects.md` principle of avoiding the running examples so skills transfer.

A note that shaped these picks: the in-page preview runs `<script>` but is **sandboxed against live network requests** (chapter 7 says so explicitly). So Sets A–C are fully preview-runnable; Set D is marked "run with Live Server" like the existing fetch exercise.

---

## Themed Set A — "Click, Toggle, React" (Events + content/style changes)

**Maps to lessons 2 + 3.** Pure event-handler practice with no forms and no element creation — the smallest possible interactive loop (select → listen → change). Good first extra set right after lesson 3.

**Skills drilled:** `addEventListener("click")`, mutating a counter variable across clicks, `textContent`, `classList.toggle`, `style` for one-off dynamic values, the event object / `event.target`.

| # | Title | Type | Skill drilled | Difficulty | Task | Expected deliverable |
| --- | --- | --- | --- | --- | --- | --- |
| A1 | Click counter | build | click handler + a variable that persists across clicks + `textContent` | intro | A button and a number on the page; each click increases the number by one and shows it. | `counter.html`: clicking increments a visible count starting at 0. |
| A2 | Counter with +/−/reset and a floor of 0 | extend | multiple buttons, shared state, a guard so the count never goes below 0 | core | Add minus and reset buttons to A1. Minus decreases the count but it must never drop below 0; reset returns it to 0. | `counter.html` with three working buttons and a count that clamps at 0. |
| A3 | Dark-mode toggle | build | `classList.toggle` on `<body>`, one button, CSS-driven look change | intro | One button that toggles a `dark` class on the body so the page swaps between light and dark colours (defined in a `<style>` block). | `theme-toggle.html`: clicking flips the whole page between two colour schemes. |
| A4 | "Like" button that toggles state and label | core | `classList.toggle` + reading state to swap `textContent` between "Like"/"Liked" | core | A heart/like button that toggles a `liked` class (colour change) AND swaps its label text on each click. | `like-button.html`: button alternates appearance and label on every click. |
| A5 | Fix-this: the counter that won't count | fix-this | spot the classic `addEventListener("click", handler())` bug (calling vs passing) | core | Given a snippet where the handler is registered as `btn.addEventListener("click", increment())` and the count never updates, explain why and fix it. | A corrected snippet that passes the function (not its return value) so clicks register. |
| A6 | Highlight the clicked box (event.target) | stretch | one listener on a parent, `event.target` to identify which child was clicked | stretch | A row of several `<div>` boxes share one click listener on their container; clicking any box adds a `selected` class to *that* box only (and removes it from the others). | `highlight.html`: clicking a box highlights only it, using `event.target`. |

**Why these sources:** the click-counter and color/toggle pattern is the canonical first DOM project in freeCodeCamp's beginner list, and `event.target` delegation is exactly what MDN's Events intro and JavaScript30 #25 drill.

**Verified sources**
- MDN — Introduction to events (addEventListener, the event object, preventDefault, bubbling): https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/Events ✅ live
- javascript.info — Introduction to browser events (handler vs calling pitfall, `event.type`): https://javascript.info/introduction-browser-events ✅ live
- MDN — Element.classList (`toggle`): https://developer.mozilla.org/en-US/docs/Web/API/Element/classList ✅ live (cited in lesson 2)
- freeCodeCamp — 40 JavaScript Projects for Beginners (includes "Counter (with conditional color changes)" and "Color Flipper"): https://www.freecodecamp.org/news/javascript-projects-for-beginners/ ✅ live (Counter + Color Flipper listed)
- JavaScript30 #25 — Event Capture, Propagation, Bubbling and Once (free): https://javascript30.com/ ✅ live & free

---

## Themed Set B — "Build the UI Pattern" (Create/remove elements + events + show/hide)

**Maps to lessons 3 + 5 (and the render-from-array idea from 5/6).** These are the small interactive *components* every real site has — tabs, accordion, an editable list — but built on a non-to-do theme. They push learners from "change one element" to "build/destroy structure and manage which thing is visible."

**Skills drilled:** `createElement`, `append`, `remove`, `classList.toggle`/`add`/`remove` for show/hide, looping over a `NodeList` with `forEach`, one listener per item attached at build time, the render-from-array discipline.

| # | Title | Type | Skill drilled | Difficulty | Task | Expected deliverable |
| --- | --- | --- | --- | --- | --- | --- |
| B1 | FAQ accordion (one panel at a time) | build | loop over question buttons, toggle an `open` class, hide/show answers | core | Given 3–4 question/answer pairs in the HTML, clicking a question shows its answer; opening one closes the others. | `accordion.html`: clicking a question reveals its answer and collapses the rest. |
| B2 | Tabbed content switcher | build | `querySelectorAll` + `forEach`, mark one tab `active`, show its matching panel | core | A row of tabs and matching content panels; clicking a tab shows only that panel and marks the tab active. | `tabs.html`: clicking each tab swaps the visible panel; exactly one tab is active. |
| B3 | Editable shopping list (create + remove) | build | `createElement`, `append`, per-item delete button with `remove()` | core | An input + Add button builds list items from typed text; each item has its own Delete button that removes just that item. (Theme: groceries, NOT tasks.) | `shopping-list.html`: add items by typing, remove any item with its own button. |
| B4 | Image gallery thumbnail → main view | extend | `forEach` over thumbnails, `setAttribute("src", ...)` / `src` swap, `active` class | core | A strip of thumbnail images; clicking one sets it as the large main image and marks it selected. | `gallery.html`: clicking a thumbnail updates the main image and highlights the choice. |
| B5 | Fix-this: accordion opens but never closes | fix-this | `classList.add` vs `classList.toggle`; spotting why state only goes one way | core | Given an accordion that uses `classList.add("open")` so panels can open but never collapse, diagnose and fix it. | Corrected snippet using `toggle` (or add/remove pairing) so panels close again. |
| B6 | Modal / dialog popup | stretch | open and close via `classList`, close on overlay click using `event.target` | stretch | A button opens a centered modal over a dimmed overlay; the modal closes on an X button AND when the user clicks the dark overlay (but not the modal body). | `modal.html`: button opens the modal; X or overlay-click closes it; clicking the body does not. |

**Why these sources:** the accordion, tabs, modal, and image-slider are explicitly the beginner DOM patterns freeCodeCamp lists, Frontend Mentor ships as free starter-file challenges (FAQ accordion is a JS + accessibility project), and The Odin Project's DOM lesson assigns "create elements with only JS" — exactly B3's muscle.

**Verified sources**
- Frontend Mentor — Build an FAQ Accordion (free, JS + accessibility, starter files + Figma): https://www.frontendmentor.io/challenges/faq-accordion-wyfFdeBwBz ✅ live (current slug; older `-PVZHGz3Megc` slug now 404s)
- Frontend Mentor — free beginner challenge listing (filter difficulty 1 + free): https://www.frontendmentor.io/challenges?difficulty=1&type=free ✅ live
- freeCodeCamp — 40 JavaScript Projects for Beginners (lists Tabs, FAQ page, Modal window, Image slider, Grocery list/CRUD): https://www.freecodecamp.org/news/javascript-projects-for-beginners/ ✅ live
- The Odin Project — DOM Manipulation and Events (assigns building elements with only JS; create/append/remove): https://www.theodinproject.com/lessons/foundations-dom-manipulation-and-events ✅ live
- MDN — Document.createElement(): https://developer.mozilla.org/en-US/docs/Web/API/Document/createElement ✅ live (cited in lesson 5)
- MDN — Element.remove(): https://developer.mozilla.org/en-US/docs/Web/API/Element/remove ✅ live (cited in lesson 5)

---

## Themed Set C — "Read, Validate, Filter" (Form input + live `input` events)

**Maps to lessons 3 + 4.** Form-control reading and the live `input` event, on non-to-do themes. This set leans hardest on `value`, `checked`, `<select>.value`, `.trim()`, validation feedback in the DOM, and the live-filter pattern (`input` event → filter a list → re-render) — which is the freshest skill not directly drilled by the to-do capstone.

**Skills drilled:** `input.value`, `checkbox.checked`, `select.value`, the `input` event (live), the `change` event, `.trim()` + early `return` validation, writing styled feedback into the DOM instead of `alert()`, filtering with `String.includes`/`toLowerCase`.

| # | Title | Type | Skill drilled | Difficulty | Task | Expected deliverable |
| --- | --- | --- | --- | --- | --- | --- |
| C1 | Live character counter | build | `input` event + `input.value.length` + `textContent`, colour change near a limit | intro | A textarea/input and a "X / 100 characters" counter that updates live as the user types and turns red past the limit. | `char-counter.html`: count updates on every keystroke and warns past 100. |
| C2 | Live list filter / search | build | `input` event, loop a list, hide non-matching items with a class or `style.display` | core | Given a static list of names/items, a search box hides any item whose text doesn't contain the typed query (case-insensitive). | `filter.html`: typing narrows the visible list in real time. |
| C3 | Tip / bill splitter | build | read number inputs, compute, show result; the "`value` is always a string" gotcha (`Number(...)`) | core | Inputs for bill amount and number of people; show the per-person total updating live (or on a Calculate click). | `tip-calc.html`: shows a correct per-person amount, converting string values to numbers. |
| C4 | Sign-up form validation (DOM messages, no alert) | build | `value.trim()`, multiple field checks, per-field error messages, `checked` for "agree to terms" | core | A small form (name, email-looking field, "I agree" checkbox); on submit, show a styled error beside each invalid field and a success message only when all pass — never using `alert()`. | `signup.html`: invalid submit shows field errors; valid submit shows success; page never reloads. |
| C5 | Fix-this: the filter that hides everything | fix-this | case-sensitivity / `.toLowerCase()` and `.includes` direction | core | Given a filter that compares the raw query against item text and hides everything once you type a capital letter, diagnose the case bug and fix it. | Corrected snippet that lowercases both sides before comparing. |
| C6 | Pizza order summary (checkbox + select + radio) | stretch | `checked` on several checkboxes, `select.value`, radio group, build a live order summary | stretch | Toppings (checkboxes), size (`<select>`), crust (radio); a summary line updates live to reflect every choice. | `order.html`: the summary text always matches the current selections. |

**Why these sources:** the live-filter, character counter, and form-validation patterns are standard beginner DOM exercises; MDN's client-side form-validation guide is the authoritative reference for doing validation right (and the existing lesson 4 already prefers DOM messages over `alert`, which C4 enforces). Restaurant menu filter / FAQ-style filtering appears directly in freeCodeCamp's project list.

**Verified sources**
- MDN — Client-side form validation (required, the gotchas, custom JS validation): https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Forms/Form_validation ✅ live
- MDN — HTMLInputElement.value: https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/value ✅ live (cited in lesson 4)
- freeCodeCamp — 40 JavaScript Projects for Beginners (lists Restaurant menu filter, Lorem ipsum generator, Grocery list): https://www.freecodecamp.org/news/javascript-projects-for-beginners/ ✅ live
- JavaScript30 #6 — Ajax Type Ahead (live-filter / search-as-you-type pattern, free): https://javascript30.com/ ✅ live & free
- javascript.info — Introduction to browser events (the `input` vs `change` distinction): https://javascript.info/introduction-browser-events ✅ live

---

## Themed Set D — "Fetch & Render Real Data" (fetch + JSON + async, run with Live Server)

**Maps to lesson 7.** Extra reps on `fetch` + `async/await` + `response.json()` + render-from-array + `try/catch`, against **different no-key, CORS-enabled APIs** than the lesson's JSONPlaceholder users. These need a live server (preview boxes block network), so flag that the way lesson 7 already does.

**Skills drilled:** `async`/`await`, `fetch(url)`, `response.json()`, reading one object vs an array, render-from-array (`forEach` + `createElement` + `append`), `try/catch` error UI, a loading state, building an image element from a returned URL with `setAttribute`/`src`.

| # | Title | Type | Skill drilled | Difficulty | Task | Expected deliverable |
| --- | --- | --- | --- | --- | --- | --- |
| D1 | Random dog photo | build | `fetch` a single-object response, read one field, set an `<img src>` | intro | A "New dog" button fetches `https://dog.ceo/api/breeds/image/random` and shows the returned image; reading `data.message` for the URL. | `dog.html`: button loads a fresh random dog image each click. |
| D2 | Random joke / fact card | build | `fetch` + `await response.json()`, read fields, write to the DOM | intro | A button fetches a random joke (or cat fact) and displays the text; uses `async/await`. | `joke.html`: button shows a fresh joke/fact each click. |
| D3 | Fetch + render a list with a loading state | core | render-from-array on fetched data + show "Loading…" before and replace after | core | Fetch a small JSON array (e.g. posts) and render each item as a list element, showing a "Loading…" placeholder until the data arrives. | `posts.html`: shows Loading, then a rendered list of fetched items. |
| D4 | Add error handling + a retry button | extend | `try/catch`, a friendly error message, a button that re-runs the fetch | core | Extend D3: wrap the fetch in `try/catch`, show a friendly message on failure (test by using a deliberately broken URL), and add a Retry button. | `posts.html` that degrades gracefully on a bad URL and can retry. |
| D5 | Fix-this: "[object Promise]" on the page | fix-this | the missing-`await` / forgetting `.json()` bug | core | Given code that renders `[object Promise]` or `[object Object]` because `await` (or `response.json()`) was omitted, diagnose and fix it. | Corrected snippet that awaits the response and parses JSON before rendering. |
| D6 | Search a real API on submit | stretch | combine form submit + `preventDefault` + fetch a query-based endpoint + render | stretch | A search form fetches results for the typed term from a no-key API and renders them; empty input shows a validation message instead of fetching. | `search.html`: submitting a term fetches and renders matching results; empty input is rejected. |

**Why these sources:** the lesson uses JSONPlaceholder, so these intentionally pick *other* documented no-auth, CORS-enabled APIs (Dog CEO, and the curated public-apis list for jokes/facts) so the skill transfers to a new endpoint. JavaScript30 #6 (Ajax Type Ahead) is the canonical vanilla fetch-and-render exercise.

**Verified sources**
- MDN — Using the Fetch API: https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch ✅ live (cited in lesson 7 ReadMore)
- MDN — Response.json(): https://developer.mozilla.org/en-US/docs/Web/API/Response/json ✅ live (cited in lesson 7)
- MDN — Using promises (await/then mental model): https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises ✅ live (cited in lesson 7 ReadMore)
- Dog CEO API — free, no key, CORS, `https://dog.ceo/api/breeds/image/random`: https://dog.ceo/dog-api/ ✅ live, no-auth, browser-fetchable
- public-apis list — filter Auth=No, CORS=Yes (Cat Facts, Dog Facts, etc.) for the joke/fact builds: https://github.com/public-apis/public-apis ✅ live (444k★)
- JavaScript30 #6 — Ajax Type Ahead (free): https://javascript30.com/ ✅ live & free
- JSONPlaceholder (same API the lesson uses, for D3/D4 arrays): https://jsonplaceholder.typicode.com/ — already cited in lesson 7

---

## Quiz ideas (one short quiz per submodule, ~4–6 items each)

These reinforce concepts the lessons present but the in-chapter quizzes don't drill from the *application* angle. Each item gives the **concept** + a **sample question**. Mix of multiple-choice (MC) and fill-in to match the existing `<Quiz>` shape.

### Quiz A — Events & state (pairs with Set A)
- **Concept: passing a function vs calling it.** *MC:* "Which registers a click handler correctly? (a) `btn.addEventListener('click', go())` (b) `btn.addEventListener('click', go)` (c) `btn.addEventListener(go, 'click')`" — Answer: (b); `go()` calls it immediately and passes the return value. (Source: javascript.info browser events.)
- **Concept: `toggle` returns/flips.** *MC:* "A box starts without `.active`. After three `classList.toggle('active')` calls, is `.active` present?" — Answer: yes (odd number of toggles).
- **Concept: where click state lives.** *MC:* "To make a counter remember its value across clicks, the count variable should be declared…" — Answer: outside the handler (in the surrounding scope), not inside it.
- **Concept: `event.target`.** *Fill-in:* "Inside one click listener on a container, which property tells you which child element was actually clicked?" — Answer: `event.target`.

### Quiz B — Building & toggling UI (pairs with Set B)
- **Concept: created element isn't on the page yet.** *MC:* "After `const li = document.createElement('li')`, the item is…" — Answer: in memory only, until you `append` it.
- **Concept: show/hide via class.** *MC:* "Best way to show one accordion panel and hide the rest is to…" — Answer: toggle a class and let CSS control visibility (vs. setting many inline styles).
- **Concept: per-item delete.** *Fill-in:* "Which method, called on an element, removes just that element from the page?" — Answer: `remove`.
- **Concept: 'one active at a time'.** *MC:* "To make exactly one tab active, before adding `active` to the clicked tab you should…" — Answer: remove `active` from all tabs first (loop with `forEach`).

### Quiz C — Reading input & validating (pairs with Set C)
- **Concept: `value` is always a string.** *MC:* "A number input holds `5`. `input.value + 1` produces…" — Answer: `"51"` (string concatenation); use `Number(input.value)`.
- **Concept: checkbox state.** *MC:* "To know if a checkbox is ticked you read…" — Answer: `.checked` (boolean), not `.value`.
- **Concept: `input` vs `change`.** *MC:* "Which event fires on every keystroke as the user types?" — Answer: `input` (`change` fires on blur / selection change).
- **Concept: validate before acting.** *Fill-in:* "Which string method strips leading/trailing spaces so a spaces-only field counts as empty?" — Answer: `trim`.
- **Concept: feedback in the DOM.** *MC:* "Why show a validation error in an on-page element instead of `alert()`?" — Answer: non-blocking and styleable (matches lesson 4's reasoning).

### Quiz D — Fetch, JSON & async (pairs with Set D)
- **Concept: why fetch returns a promise.** *MC:* "`fetch()` returns a promise because…" — Answer: the request takes time; the promise stands in for a value arriving later.
- **Concept: `await` needs `async`.** *Fill-in:* "A function must be declared with which keyword to use `await` inside it?" — Answer: `async`.
- **Concept: the two awaits.** *MC:* "After `const res = await fetch(url)`, what does `await res.json()` give you?" — Answer: the parsed JS value (e.g. an array of objects), not the raw Response.
- **Concept: JSON vs JS object.** *MC:* "How does JSON differ from a JS object literal?" — Answer: keys are double-quoted; data only, no functions/comments.
- **Concept: error handling shape.** *MC:* "The natural way to handle a failed `await fetch` is…" — Answer: wrap it in `try/catch` and show a message.
- **Concept: '[object Promise]' bug.** *MC:* "Your page shows `[object Promise]`. The most likely cause is…" — Answer: you forgot to `await` the result before using it.

---

## Coverage check & gaps

**Skill-to-set coverage (every lesson skill gets fresh practice):**

| Lesson skill | Reinforced in |
| --- | --- |
| Selecting (`getElementById`/`querySelector(All)`) | A6, B1–B5, C2, C6 (used throughout) |
| `textContent` / `classList` / `style` | A1–A4, B1, B6 |
| `addEventListener` (click/input/submit) + event object | A1–A6, B1–B6, C1–C6, D6 |
| `preventDefault` | C4, D6 |
| Reading `value` / `checked` / `select.value` | C1, C3, C4, C6 |
| Validation + DOM feedback (not `alert`) | C4, C5, D6 |
| `createElement` / `append` / `remove` | B3, B6, D3 |
| Render-from-array | B3, D3, D4 |
| `fetch` / `async`-`await` / `response.json()` / `try-catch` | D1–D6 |

**Deliberately NOT covered (out of module scope — flag if a learner asks):**
- Event delegation as a formal topic (A6 only previews `event.target`; full delegation, `closest()`, and dynamic-list delegation aren't in the lessons).
- `localStorage` persistence (JavaScript30 #15 covers it; the existing `extension-ideas.md` already proposes persistence as a *future* topic, so it's intentionally excluded here to stay additive-but-in-scope).
- Keyboard accessibility for the widgets (Frontend Mentor's FAQ accordion *does* ask for it; could be a "stretch" note on B1/B2/B6 but isn't a taught skill yet).

**Source-verification caveats (transparency):**
- Frontend Mentor challenge pages are client-rendered SPAs, so `WebFetch` couldn't read their body text. The URLs were **confirmed via search-engine-indexed titles** (e.g. "Build an FAQ Accordion | JavaScript & Accessibility Project") and the current slug `faq-accordion-wyfFdeBwBz`; the older slug `faq-accordion-PVZHGz3Megc` returned 404 and was discarded. **Confidence: high on existence/free status, medium on exact difficulty labels** (Frontend Mentor's own "difficulty 1 = Newbie / 2 = Junior" scale wasn't directly readable).
- All MDN, javascript.info, JavaScript30, Odin Project, freeCodeCamp, Dog CEO, and public-apis links were fetched and returned live content as of 2026-06-25.
- The freeCodeCamp "40 Projects" article (Mar 2021) is older but its project *list* (counter, tabs, modal, accordion, filter, slider, grocery CRUD) maps cleanly onto these sets and remains a valid idea source; it's used for **idea provenance**, not API correctness.
