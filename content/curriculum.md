# Curriculum map — Interactive Web Development Guide

Teaches HTML, CSS, JavaScript, and HTML+JS integration to learners who have **some prior coding exposure** but no real HTML/CSS/JS yet. Tooling: VS Code + Live Server + Prettier, GitHub Desktop.

**Chapter id format**: `<module>/<order>-<slug>`. Modules in order: `setup` → `html` → `css` → `javascript` → `integration` → `workflow`.

**Ordering rule**: no chapter references a concept before it is taught. Prerequisites below are dependency-safe and verified against this rule.

**Chapter counts**: setup 1 · html 8 · css 5 · javascript 9 · integration 7 · workflow 3 · **total 33**.

---

## Module 0 — setup

Get the toolchain working and ship one HTML file to the browser. Short on purpose.

### setup/1-tools-and-first-page

- **module**: setup
- **order**: 1
- **slug**: tools-and-first-page
- **title**: Your tools and your first page
- **goal**: Set up VS Code and GitHub Desktop, then create an `index.html` and open it in a browser with Live Server.
- **objectives**:
  - Install the Live Server and Prettier extensions in VS Code.
  - Clone a repo with GitHub Desktop, then commit and push a change.
  - Create an `index.html` file and open it with Live Server.
  - Make an edit and see the browser reload.
  - Format a file with Prettier.
- **prerequisites**: none
- **estMinutes**: 25
- **concepts**: VS Code, extensions, Live Server, Prettier, GitHub Desktop, clone/commit/push, `index.html`, browser reload
- **readMore**: none

---

## Module 1 — html

In-depth. Build a real multi-section page by the end. One running example/theme carries through the module.

### html/1-structure

- **module**: html
- **order**: 1
- **slug**: structure
- **title**: Elements, tags, attributes, and document structure
- **goal**: Write a valid HTML document with the correct skeleton and read any tag as element + attributes.
- **objectives**:
  - Identify an element, its tags, and its attributes.
  - Write the document skeleton: `<!DOCTYPE html>`, `<html>`, `<head>`, `<body>`.
  - Set the page language and character set.
  - Add a page `<title>` and explain where it shows up.
  - Tell the difference between content (`<body>`) and metadata (`<head>`).
- **prerequisites**: ["setup/1-tools-and-first-page"]
- **estMinutes**: 25
- **concepts**: element, tag, attribute, `<!DOCTYPE html>`, `<html>`, `<head>`, `<body>`, `<title>`, `lang`, `charset`, nesting
- **readMore**: none

### html/2-text

- **module**: html
- **order**: 2
- **slug**: text
- **title**: Headings, paragraphs, lists, and emphasis
- **goal**: Mark up text content with the right heading levels, paragraphs, lists, and emphasis.
- **objectives**:
  - Use `<h1>`–`<h6>` in a correct, non-skipping outline.
  - Write paragraphs with `<p>`.
  - Build ordered and unordered lists (`<ol>`, `<ul>`, `<li>`).
  - Add emphasis with `<em>` and `<strong>` (and why these, not `<i>`/`<b>`).
  - Use `<br>` and `<hr>` sparingly and correctly.
- **prerequisites**: ["html/1-structure"]
- **estMinutes**: 25
- **concepts**: `<h1>`–`<h6>`, `<p>`, `<ul>`, `<ol>`, `<li>`, `<em>`, `<strong>`, `<br>`, `<hr>`, document outline
- **readMore**: none

### html/3-links

- **module**: html
- **order**: 3
- **slug**: links-and-navigation
- **title**: Links and navigation
- **goal**: Link between pages and to external sites, and jump within a page using anchors.
- **objectives**:
  - Write a link with `<a href>`.
  - Tell the difference between relative and absolute URLs.
  - Link to a section of the same page with `id` and `#fragment`.
  - Open a link in a new tab with `target="_blank"` and add `rel="noopener"`.
  - Write link text that makes sense out of context (accessibility).
- **prerequisites**: ["html/2-text"]
- **estMinutes**: 25
- **concepts**: `<a>`, `href`, relative vs absolute URLs, `id`, fragment links, `target`, `rel="noopener"`
- **readMore**: none

### html/4-images-media

- **module**: html
- **order**: 4
- **slug**: images-and-media
- **title**: Images and media
- **goal**: Add images with correct `src` and `alt`, and embed basic audio/video.
- **objectives**:
  - Add an image with `<img src>` and a meaningful `alt`.
  - Use relative paths to local images.
  - Explain when `alt` should be empty (decorative images).
  - Embed audio and video with `<audio>` and `<video controls>`.
  - Note width/height and why they reduce layout shift.
- **prerequisites**: ["html/3-links"]
- **estMinutes**: 25
- **concepts**: `<img>`, `src`, `alt`, decorative images, file paths, `<audio>`, `<video>`, `controls`
- **readMore**: none

### html/5-semantics

- **module**: html
- **order**: 5
- **slug**: semantic-structure
- **title**: Semantic structure
- **goal**: Lay out a page with semantic landmarks instead of generic boxes.
- **objectives**:
  - Use `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>` for their meaning.
  - Choose `<div>` and `<span>` only when no semantic element fits.
  - Tell block from inline elements.
  - Explain why semantics help accessibility and SEO.
  - Build a page skeleton from landmarks.
- **prerequisites**: ["html/4-images-media"]
- **estMinutes**: 30
- **concepts**: `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`, `<div>`, `<span>`, block vs inline, landmarks
- **readMore**: none

### html/6-forms

- **module**: html
- **order**: 6
- **slug**: forms-and-inputs
- **title**: Forms and inputs
- **goal**: Build an accessible form with labelled inputs, a textarea, a select, and a button.
- **objectives**:
  - Build a `<form>` and explain what `action` and `method` do.
  - Pair every input with a `<label>` (via `for`/`id`).
  - Use common `<input>` types: text, email, password, checkbox, radio, number.
  - Add `<textarea>` and `<select>` with `<option>`.
  - Use `<button>` types and basic validation attributes (`required`, `placeholder`).
- **prerequisites**: ["html/5-semantics"]
- **estMinutes**: 35
- **concepts**: `<form>`, `action`, `method`, `<input>` types, `<label>`, `for`/`id`, `<textarea>`, `<select>`, `<option>`, `<button>`, `required`, `placeholder`
- **readMore**: none

### html/7-tables

- **module**: html
- **order**: 7
- **slug**: tables
- **title**: Tables
- **goal**: Build a simple data table with proper headers — and know when not to use one.
- **objectives**:
  - Build a table with `<table>`, `<tr>`, `<th>`, `<td>`.
  - Group rows with `<thead>` and `<tbody>`.
  - Add a `<caption>`.
  - Explain that tables are for data, not layout.
- **prerequisites**: ["html/6-forms"]
- **estMinutes**: 20
- **concepts**: `<table>`, `<tr>`, `<th>`, `<td>`, `<thead>`, `<tbody>`, `<caption>`, data vs layout
- **readMore**: none

### html/8-page-project

- **module**: html
- **order**: 8
- **slug**: putting-it-together
- **title**: Putting it together — a multi-section page
- **goal**: Combine everything into one well-structured, semantic, multi-section HTML page (no CSS yet).
- **objectives**:
  - Plan a page from semantic landmarks.
  - Combine headings, text, lists, links, images, a form, and a table into one page.
  - Use in-page navigation linking to section `id`s.
  - Check the page for valid, accessible markup.
- **prerequisites**: ["html/7-tables"]
- **estMinutes**: 40
- **concepts**: composing a full page, in-page navigation, markup review, accessibility check
- **readMore**: JSX/React components, web components, and templating — how modern tools build HTML from reusable pieces instead of one long file.

---

## Module 2 — css

Lighter touch — enough to style and lay out the Module 1 page without over-explaining the cascade.

### css/1-how-css-works

- **module**: css
- **order**: 1
- **slug**: how-css-works
- **title**: How CSS works, selectors, and where it lives
- **goal**: Write CSS rules with element, class, and id selectors, and attach styles via an external stylesheet.
- **objectives**:
  - Read a rule as selector + declaration block (property: value).
  - Use element, class, and id selectors.
  - Compare inline, internal, and external CSS, and prefer external.
  - Link a stylesheet with `<link rel="stylesheet">`.
  - Explain the cascade and specificity at a basic level.
- **prerequisites**: ["html/8-page-project"]
- **estMinutes**: 30
- **concepts**: selector, declaration, property/value, class selector, id selector, inline/internal/external CSS, `<link>`, cascade, specificity (basic)
- **readMore**: none

### css/2-box-model-typography

- **module**: css
- **order**: 2
- **slug**: box-model-color-typography
- **title**: Box model, colors, units, and typography
- **goal**: Control spacing, color, and text using the box model and sensible units.
- **objectives**:
  - Use the box model: content, padding, border, margin.
  - Set colors with named, hex, and `rgb`/`hsl` values.
  - Choose units: `px`, `em`, `rem`, `%`.
  - Style text: `font-family`, `font-size`, `font-weight`, `line-height`.
  - Apply `box-sizing: border-box` and explain why it helps.
- **prerequisites**: ["css/1-how-css-works"]
- **estMinutes**: 35
- **concepts**: content/padding/border/margin, `box-sizing`, color formats, `px`/`em`/`rem`/`%`, `font-family`, `font-size`, `font-weight`, `line-height`
- **readMore**: none

### css/3-layout-flexbox

- **module**: css
- **order**: 3
- **slug**: layout-and-flexbox
- **title**: Layout: display and flexbox
- **goal**: Arrange elements in rows and columns with flexbox, and recognize when grid fits better.
- **objectives**:
  - Use `display`: `block`, `inline`, `inline-block`, `none`.
  - Build a flex container and control direction, wrapping, and alignment.
  - Use `justify-content`, `align-items`, and `gap`.
  - Recognize a 2D layout where `display: grid` is the better tool (peek only).
- **prerequisites**: ["css/2-box-model-typography"]
- **estMinutes**: 35
- **concepts**: `display`, flexbox, `flex-direction`, `flex-wrap`, `justify-content`, `align-items`, `gap`, grid (preview)
- **readMore**: none

### css/4-responsive

- **module**: css
- **order**: 4
- **slug**: responsive-basics
- **title**: Responsive basics
- **goal**: Make a layout adapt to screen size with the viewport meta tag and media queries.
- **objectives**:
  - Add the `<meta name="viewport">` tag and explain its job.
  - Write a media query for a breakpoint.
  - Adapt a flex layout from mobile to desktop.
  - Prefer relative units and `max-width` for fluid sizing.
- **prerequisites**: ["css/3-layout-flexbox"]
- **estMinutes**: 30
- **concepts**: viewport meta tag, `@media`, breakpoints, mobile-first, fluid sizing, `max-width`
- **readMore**: Tailwind CSS (utility classes that read a bit like inline styles), CSS-in-JS, and Sass — how teams write CSS today without large hand-managed stylesheets.

### css/5-grid-in-depth

- **module**: css
- **order**: 5
- **slug**: grid-in-depth
- **title**: CSS Grid in depth
- **goal**: Build real two-dimensional layouts with CSS Grid, and choose between Grid and flexbox with confidence.
- **objectives**:
  - Turn an element into a grid with `display: grid`.
  - Define columns and rows with `grid-template-columns`, the `fr` unit, and `repeat()`.
  - Space the tracks with `gap`.
  - Place items across columns and rows with `grid-column` and `grid-row` span.
  - Name regions with `grid-template-areas`.
  - Build a responsive grid with `repeat(auto-fit, minmax(...))`.
  - Decide between Grid (2D) and flexbox (1D).
- **prerequisites**: ["css/3-layout-and-flexbox"]
- **estMinutes**: 40
- **concepts**: `display: grid`, grid items, `grid-template-columns`, `fr` unit, `repeat()`, `gap`, `grid-column`/`grid-row` span, `grid-template-areas`, `grid-area`, `repeat(auto-fit, minmax())`, grid vs flexbox
- **readMore**: subgrid and container queries — newer grid features now supported across modern browsers, for aligning nested grids and letting components respond to their container's size.

---

## Module 3 — javascript

Pure JavaScript language fundamentals. No DOM work until the bridge chapter, which sets up Module 4.

### javascript/1-what-is-js

- **module**: javascript
- **order**: 1
- **slug**: what-is-js-and-running-it
- **title**: What JavaScript is and how to run it
- **goal**: Add a script to a page and run JavaScript, viewing output in the browser console.
- **objectives**:
  - Explain what JavaScript adds to a page (behavior).
  - Add JS with `<script src>` and explain why it goes before `</body>`.
  - Write to the console with `console.log`.
  - Open and read the browser devtools console.
  - Add a code comment.
- **prerequisites**: ["html/1-structure"]
- **estMinutes**: 25
- **concepts**: `<script>`, `src`, script placement, `console.log`, devtools console, comments
- **readMore**: none

### javascript/2-variables-types

- **module**: javascript
- **order**: 2
- **slug**: variables-and-types
- **title**: Variables, data types, and operators
- **goal**: Declare variables and use the core data types and operators.
- **objectives**:
  - Declare variables with `let` and `const` (and why not `var`).
  - Name the primitive types: string, number, boolean, `null`, `undefined`.
  - Use arithmetic and assignment operators.
  - Choose `const` by default, `let` when reassigning.
- **prerequisites**: ["javascript/1-what-is-js"]
- **estMinutes**: 30
- **concepts**: `let`, `const`, string, number, boolean, `null`, `undefined`, arithmetic operators, assignment, reassignment
- **readMore**: none

### javascript/3-strings-numbers-booleans

- **module**: javascript
- **order**: 3
- **slug**: strings-numbers-booleans
- **title**: Strings, numbers, and booleans
- **goal**: Manipulate strings and numbers and understand truthiness.
- **objectives**:
  - Build strings with concatenation and template literals.
  - Use common string methods: `length`, `toUpperCase`, `includes`, `slice`.
  - Do basic number work and convert with `Number`/`parseInt`.
  - Explain truthy and falsy values.
- **prerequisites**: ["javascript/2-variables-types"]
- **estMinutes**: 30
- **concepts**: template literals, concatenation, string methods, `Number`, `parseInt`, truthy/falsy
- **readMore**: none

### javascript/4-arrays-objects

- **module**: javascript
- **order**: 4
- **slug**: arrays-and-objects
- **title**: Arrays and objects
- **goal**: Store and read collections of data in arrays and objects.
- **objectives**:
  - Create an array and read items by index.
  - Use `push`, `pop`, and `length`.
  - Create an object with key/value pairs.
  - Read and update properties with dot and bracket notation.
  - Nest arrays and objects.
- **prerequisites**: ["javascript/3-strings-numbers-booleans"]
- **estMinutes**: 35
- **concepts**: array, index, `push`/`pop`, `length`, object, key/value, dot vs bracket notation, nesting
- **readMore**: none

### javascript/5-conditionals

- **module**: javascript
- **order**: 5
- **slug**: conditionals-and-comparison
- **title**: Conditionals and comparison
- **goal**: Branch program flow with comparisons and conditional statements.
- **objectives**:
  - Compare values with `===`, `!==`, `<`, `>` (and why `===` over `==`).
  - Combine conditions with `&&`, `||`, `!`.
  - Branch with `if`/`else if`/`else`.
  - Use a ternary for a simple choice.
- **prerequisites**: ["javascript/4-arrays-objects"]
- **estMinutes**: 30
- **concepts**: `===`/`!==`, relational operators, `&&`/`||`/`!`, `if`/`else if`/`else`, ternary
- **readMore**: none

### javascript/6-loops

- **module**: javascript
- **order**: 6
- **slug**: loops
- **title**: Loops
- **goal**: Repeat work and iterate over arrays with loops.
- **objectives**:
  - Write a `for` loop with a counter.
  - Loop over an array with `for...of`.
  - Use a `while` loop and avoid infinite loops.
  - Iterate with `forEach`.
- **prerequisites**: ["javascript/5-conditionals"]
- **estMinutes**: 30
- **concepts**: `for`, `for...of`, `while`, `forEach`, iteration, loop termination
- **readMore**: none

### javascript/7-functions

- **module**: javascript
- **order**: 7
- **slug**: functions
- **title**: Functions
- **goal**: Write reusable functions that take parameters and return values.
- **objectives**:
  - Declare a function and call it.
  - Pass parameters and read arguments.
  - Return a value and use it.
  - Explain scope: local vs global.
  - Write a function expression (and meet arrow function syntax).
- **prerequisites**: ["javascript/6-loops"]
- **estMinutes**: 35
- **concepts**: function declaration, parameters, arguments, `return`, scope, function expression, arrow functions (intro)
- **readMore**: none

### javascript/8-dom-concept

- **module**: javascript
- **order**: 8
- **slug**: dom-concept
- **title**: The DOM, conceptually
- **goal**: Explain what the DOM is and how JavaScript can reach into a page — the bridge to integration.
- **objectives**:
  - Describe the DOM as a live tree the browser builds from HTML.
  - Locate the `document` object as the entry point.
  - Explain that changing the DOM changes what the user sees.
  - Preview how the next module selects and changes elements.
- **prerequisites**: ["javascript/7-functions", "html/5-semantics"]
- **estMinutes**: 20
- **concepts**: DOM, DOM tree, nodes, `document`, live document, HTML-to-DOM relationship
- **readMore**: none

### javascript/9-devtools-and-debugging

- **module**: javascript
- **order**: 9
- **slug**: devtools-and-debugging
- **title**: DevTools and debugging
- **goal**: Use browser DevTools to inspect the page, run JavaScript in the console, read common error messages, and debug with `console.log` and breakpoints.
- **objectives**:
  - Open DevTools and find the Elements and Console panels.
  - Inspect and live-edit the DOM and CSS in the Elements panel.
  - Run JavaScript and read errors in the Console.
  - Recognize common error messages like `ReferenceError` and `TypeError`.
  - Take a first look at breakpoints in the Sources panel.
- **prerequisites**: ["javascript/1-what-is-js-and-running-it", "javascript/8-dom-concept"]
- **estMinutes**: 30
- **concepts**: DevTools, Elements/Inspector panel, live DOM editing, Console as a JS prompt, reading errors, `ReferenceError`, `TypeError`, breakpoints, Sources/Debugger panel, Scope pane, debugging workflow
- **readMore**: none

---

## Module 4 — integration

HTML + JS together via the DOM. Builds to a capstone that combines every prior module.

### integration/1-selecting-elements

- **module**: integration
- **order**: 1
- **slug**: selecting-elements
- **title**: Selecting elements
- **goal**: Find elements on a page from JavaScript.
- **objectives**:
  - Select one element with `getElementById`.
  - Select with `querySelector` using CSS selectors.
  - Select many with `querySelectorAll`.
  - Store a selected element in a variable and check for `null`.
- **prerequisites**: ["javascript/8-dom-concept", "css/1-how-css-works"]
- **estMinutes**: 30
- **concepts**: `document.getElementById`, `querySelector`, `querySelectorAll`, CSS selectors in JS, `null` checks
- **readMore**: none

### integration/2-changing-content-styles

- **module**: integration
- **order**: 2
- **slug**: changing-content-and-styles
- **title**: Changing content and styles
- **goal**: Update the text, classes, and inline styles of selected elements.
- **objectives**:
  - Read and change text with `textContent`.
  - Toggle and swap classes with `classList`.
  - Set inline styles with the `style` property.
  - Read and set attributes (`getAttribute`/`setAttribute`).
  - Prefer class changes over inline styles, and explain why.
- **prerequisites**: ["integration/1-selecting-elements"]
- **estMinutes**: 30
- **concepts**: `textContent`, `classList` (`add`/`remove`/`toggle`), `style`, `getAttribute`/`setAttribute`
- **readMore**: none

### integration/3-events

- **module**: integration
- **order**: 3
- **slug**: events-and-listeners
- **title**: Events and event listeners
- **goal**: Run code in response to user actions.
- **objectives**:
  - Attach a handler with `addEventListener`.
  - Handle `click`, `input`, and `submit` events.
  - Read the `event` object.
  - Stop a form reload with `event.preventDefault`.
- **prerequisites**: ["integration/2-changing-content-styles"]
- **estMinutes**: 35
- **concepts**: `addEventListener`, `click`/`input`/`submit`, event object, `preventDefault`, callback handler
- **readMore**: none

### integration/4-reading-form-input

- **module**: integration
- **order**: 4
- **slug**: reading-form-input
- **title**: Reading form input and responding
- **goal**: Read what a user typed or selected and respond on the page.
- **objectives**:
  - Read an input's `value`.
  - Read checkbox/radio state with `checked`.
  - Read a `<select>` value.
  - Validate input and show a message in the DOM (not an alert).
- **prerequisites**: ["integration/3-events", "html/6-forms"]
- **estMinutes**: 35
- **concepts**: `input.value`, `checked`, `<select>` value, client-side validation, DOM feedback
- **readMore**: none

### integration/5-creating-elements

- **module**: integration
- **order**: 5
- **slug**: creating-and-removing-elements
- **title**: Creating and removing elements
- **goal**: Build and remove page elements from JavaScript at runtime.
- **objectives**:
  - Create an element with `createElement`.
  - Add it to the page with `append`/`appendChild`.
  - Remove an element with `remove`.
  - Render a list by looping over an array.
- **prerequisites**: ["integration/4-reading-form-input", "javascript/6-loops"]
- **estMinutes**: 35
- **concepts**: `createElement`, `append`/`appendChild`, `remove`, rendering a list from data
- **readMore**: none

### integration/6-capstone

- **module**: integration
- **order**: 6
- **slug**: capstone-interactive-app
- **title**: Capstone — build an interactive app
- **goal**: Build a working to-do list (or quiz) app that combines selection, events, form input, and dynamic rendering.
- **objectives**:
  - Plan the app: data shape, user actions, and what each renders.
  - Capture input and add items to an array.
  - Render the array to the DOM and re-render on change.
  - Handle add, complete/check, and remove actions.
  - Style the app and confirm it works end to end.
- **prerequisites**: ["integration/5-creating-elements", "css/3-layout-flexbox", "javascript/7-functions"]
- **estMinutes**: 60
- **concepts**: app state in an array, render-from-state, event-driven updates, composing all prior modules
- **readMore**: Why frameworks exist — manual DOM updates vs React's declarative state and virtual DOM, and where Next.js fits.

### integration/7-json-fetch-apis

- **module**: integration
- **order**: 7
- **slug**: json-fetch-apis
- **title**: JSON, fetch, and APIs
- **goal**: Fetch JSON data from a public API and render it into the page, reusing the render-from-array pattern.
- **objectives**:
  - Explain what an API is and what it returns.
  - Read JSON and tie it back to JavaScript objects and arrays.
  - Make a request with `fetch()` using `async`/`await`.
  - Turn a response into data with `response.json()`.
  - Render fetched data into the DOM with the render-from-array pattern.
  - Add one line of error handling with `.catch` / `try...catch`.
- **prerequisites**: ["integration/6-capstone-interactive-app", "javascript/4-arrays-and-objects", "javascript/8-dom-concept"]
- **estMinutes**: 45
- **concepts**: API, JSON, `fetch()`, promise, `async`/`await`, `Response` object, `response.json()`, render-from-array, `try...catch`, `.catch`
- **readMore**: promises and `async`/`await` underneath — the promise model (pending/fulfilled/rejected) and `.then()` chaining that `await` is sugar over, which generalizes to every future async API.

---

## Module 5 — workflow (Git & Collaboration)

The everyday collaboration loop in GitHub Desktop and VS Code: branch, commit, open a pull request, and resolve a conflict. Runs on the project the learner already has; Git terms are named under each button.

### workflow/1-branches-and-commits

- **module**: workflow
- **order**: 1
- **slug**: branches-and-commits
- **title**: Branches and focused commits
- **goal**: Create and switch branches in GitHub Desktop, make focused commits with clear messages, and publish a branch to GitHub.
- **objectives**:
  - Explain what a branch is and why you would make one.
  - Create and switch branches with the Current Branch dropdown.
  - Make small, focused commits with clear messages.
  - Publish a branch to GitHub so it can be shared.
- **prerequisites**: ["setup/1-tools-and-first-page"]
- **estMinutes**: 25
- **concepts**: branch, `main`, Current Branch dropdown, creating/switching branches, focused commits, commit messages, publishing a branch
- **readMore**: none

### workflow/2-pull-requests

- **module**: workflow
- **order**: 2
- **slug**: pull-requests
- **title**: Pull requests: review and merge
- **goal**: Open a pull request from a published branch, understand its purpose, merge it on GitHub, and pull the merged result back.
- **objectives**:
  - Explain what a pull request is for.
  - Open a pull request from a published branch via GitHub Desktop.
  - Review the changes and merge the pull request on github.com.
  - Pull the merged `main` branch back to your computer.
- **prerequisites**: ["workflow/1-branches-and-commits"]
- **estMinutes**: 25
- **concepts**: pull request (PR), diff, review/comments, base branch, merge, Preview/Create Pull Request, Files changed tab, Fetch origin, Pull origin
- **readMore**: none

### workflow/3-merge-conflicts

- **module**: workflow
- **order**: 3
- **slug**: merge-conflicts
- **title**: Resolving merge conflicts
- **goal**: Understand what causes a merge conflict, read the conflict markers, and resolve one in VS Code, then commit the resolution from GitHub Desktop.
- **objectives**:
  - Explain what causes a merge conflict.
  - Recognize how GitHub Desktop surfaces a conflict.
  - Read the conflict markers and pick the right result in VS Code.
  - Commit the resolution and finish the merge.
- **prerequisites**: ["workflow/2-pull-requests"]
- **estMinutes**: 25
- **concepts**: merge conflict, conflicting lines, conflict markers (`<<<<<<< HEAD`, `=======`, `>>>>>>>`), Accept Current/Incoming/Both, resolving in VS Code, committing the resolution
- **readMore**: none
