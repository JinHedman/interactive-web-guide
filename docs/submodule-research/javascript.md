# JavaScript — Extra Practice Submodules (Research)

> Research for **additive practice "submodules"** for the JavaScript module of Webcraft. These are exercise- and quiz-focused, and sit *alongside* the eight existing lessons (which stay unchanged). Every item below is **new** practice — none duplicates a current per-chapter `<Exercise>` or `<Quiz>`.
>
> **Audience:** learners with some prior coding exposure, working in VS Code + GitHub Desktop.
>
> **Runtime constraint:** the in-page JS preview captures `console.log` output only (no DOM render, no return-value display). So every "build/fix/extend" item is framed to **log its result**, or to be completed in the learner's own editor (where they can also use the existing devtools workflow). Quiz items favor **predict-the-output**, which the existing `<Quiz>` component supports as multiple-choice / fill-in.

---

## What the eight lessons already cover (so we stay additive)

| # | Lesson | Skills already drilled by its built-in Exercise/Quiz |
| --- | --- | --- |
| 1 | What JS is + running it | external script + 3 `console.log`s; comment syntax; console-as-output |
| 2 | Variables & types | `const`/`let`, primitives, `typeof`, arithmetic, `+=`/`-=`/`*=`, `%` |
| 3 | Strings/numbers/booleans | concatenation vs template literals, `length`/`toUpperCase`/`includes`/`slice`, `Number`/`parseInt`, truthy/falsy |
| 4 | Arrays & objects | index access, `push`/`pop`/`length`, object literals, dot vs bracket, nesting, `const` mutation |
| 5 | Conditionals & comparison | `===`/`!==`/`<`/`>`, `&&`/`||`/`!`, `if`/`else if`/`else`, ternary |
| 6 | Loops | `for` counter, `for...of`, `while` + infinite-loop trap, `forEach` |
| 7 | Functions | declare/call, params vs args, `return`, local vs global scope, function expression + arrow |
| 8 | DOM concept | (concept only) live tree, `document`, `getElementById().textContent` |
| 9 | DevTools & debugging | Elements/Console/Sources, `ReferenceError`/`TypeError`, off-by-one loop fix, `console.log` workflow |

**Existing exercise contexts to avoid re-using verbatim:** "tiny receipt" (price × qty), "format a profile line", "model a profile" object, "grade reporter", "sum and list a cart", "tiny calculator" (add/multiply/square), the `priceWithTax` / `Sum: 12` debug scripts. New items below use fresh scenarios (temperature, FizzBuzz, word counting, tip splitting, inventory, etc.).

**Confidence note on sources:** all source URLs below were fetched and confirmed live during this research (2026-06-25). Codewars kata *descriptions* render client-side, so for those I verified the **title, kyu rank, tags, and canonical URL** but could not scrape the prose body via the fetch tool — **Confirmed** for identity/difficulty, **Likely** for exact wording. MDN's Learn area was reorganized under `/Learn_web_development/Core/Scripting/` — the lessons' current `DocsLinks` point at the older `/Web/JavaScript/Guide/` pages, so these Learn pages (with "Test your skills" sub-pages) are genuinely new references.

---

## Proposed submodule map (4 themed sets)

| Set | Submodule theme | Items | Mix |
| --- | --- | --- | --- |
| A | **Data & types drills** (vars, strings, numbers, arrays, objects) | 5 | 2 build, 1 fix-this, 1 extend, 1 quiz |
| B | **Logic gym** (conditionals + loops) | 5 | 2 build, 1 fix-this, 1 extend, 1 quiz |
| C | **Functions workshop** (params, return, scope, arrows) | 5 | 2 build, 1 fix-this, 1 extend, 1 quiz |
| D | **Predict & debug** (read-the-code, coercion, error-spotting) | 6 | 1 fix-this, 5 quiz (predict-the-output heavy) |

Difficulty legend: **intro** (re-applies one idea in a new context) · **core** (combines 2–3 ideas) · **stretch** (asks for a small leap beyond the lesson).

---

## Set A — Data & types drills

*Maps to: lessons 2, 3, 4. Drills declaration discipline, string/number methods, conversion, and array/object shape.*

### A1. Temperature converter line
- **Type:** build
- **Skill drilled:** number conversion (`Number`) + arithmetic + template literal output
- **Difficulty:** intro
- **Task:** Given a Celsius value stored as a string (e.g. `"25"`), convert it to a number, compute Fahrenheit with `c * 9/5 + 32`, and log one sentence like `25°C is 77°F`.
- **Deliverable:** a script logging the formatted conversion line; result visible in the preview.
- **Source:** [MDN Learn — Basic math in JavaScript](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/Math) · [javascript.info — Data types](https://javascript.info/types)

### A2. Word and character counter
- **Type:** build
- **Skill drilled:** `.length`, `.split(" ")`, `.trim()`, `.toLowerCase()`/`.includes()`
- **Difficulty:** core
- **Task:** Given a sentence string, log its character count (`.length`), its word count (`.split(" ").length`), and whether it contains the word `"javascript"` (case-insensitive via `.toLowerCase().includes(...)`).
- **Deliverable:** three `console.log` lines: char count, word count, and a boolean.
- **Source:** [MDN Learn — Useful string methods](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/Useful_string_methods) · [javascript.info — Strings](https://javascript.info/string)

### A3. Fix-this: the string-vs-number total
- **Type:** fix-this
- **Skill drilled:** spotting accidental string concatenation; `Number()` conversion
- **Difficulty:** intro
- **Task:** A script reads two `"price"` strings from "form input" and adds them, logging `"1020"` instead of `30`. Find why and fix it so the total is a real number.
- **Deliverable:** corrected script logging the numeric total `30`, plus a one-line comment explaining the bug.
- **Source:** [javascript.info — Type Conversions](https://javascript.info/type-conversions) (matches the lesson-3 `"5" + 1` gotcha, applied to a new two-input case)

### A4. Extend: shopping-list array report
- **Type:** extend
- **Skill drilled:** array index, `push`/`pop`, `.length`, then *extend* with `.at(-1)` / `.indexOf`
- **Difficulty:** core
- **Task:** Start from a 3-item array of grocery strings. `push` two items, `pop` one, then log the first item, the last item (try `.at(-1)`), the current length, and the index of `"milk"` via `.indexOf("milk")`.
- **Deliverable:** a script logging first/last/length/index, demonstrating one method beyond the lesson (`.at` or `.indexOf`).
- **Source:** [MDN Learn — Arrays](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/Arrays) · [javascript.info — Arrays](https://javascript.info/array)

### A5. Quiz: data types & coercion (predict-the-output)
- **Type:** quiz
- **Concept:** `typeof`, string-vs-number `+`, truthy/falsy, array `.length`
- **Sample questions:**
  - *Predict the output:* `console.log(typeof (10 + "5"));` → **"string"** (number coerced to string by `+`).
  - *Predict the output:* `console.log(Boolean(""), Boolean("0"));` → **false true** (empty string falsy; `"0"` is a non-empty string, truthy).
  - *Fill-in:* `["a","b","c"].length` evaluates to ___ → **3**.
- **Source:** [javascript.info — Type Conversions](https://javascript.info/type-conversions) · [MDN — Truthy (glossary)](https://developer.mozilla.org/en-US/docs/Glossary/Truthy)

---

## Set B — Logic gym (conditionals + loops)

*Maps to: lessons 5, 6. Drills branching, comparison, the four loop forms, and the off-by-one / infinite-loop traps — using new scenarios (FizzBuzz, even/odd, max-finding) rather than the grade reporter / cart sum already in the lessons.*

### B1. FizzBuzz (1–20)
- **Type:** build
- **Skill drilled:** `for` loop + `%` modulo + `if`/`else if`/`else`
- **Difficulty:** core
- **Task:** Loop from 1 to 20. Log `"Fizz"` for multiples of 3, `"Buzz"` for multiples of 5, `"FizzBuzz"` for multiples of both, otherwise the number. (Check the `&&`/both-multiples case *first* — reinforces lesson-5's "order matters".)
- **Deliverable:** 20 logged lines with the correct FizzBuzz pattern.
- **Source:** [The Odin Project — Loops & Arrays lesson](https://www.theodinproject.com/lessons/foundations-javascript-basics-fundamentals-part-4) · [MDN Learn — Looping code](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/Loops)

### B2. Find the largest number in an array
- **Type:** build
- **Skill drilled:** loop + comparison + a running "best so far" variable
- **Difficulty:** core
- **Task:** Given `const nums = [12, 7, 25, 3, 19];`, use a `for...of` loop and a `let largest` to find and log the maximum without using `Math.max`.
- **Deliverable:** a script logging `25`, plus (stretch) the smallest in the same pass.
- **Source:** [MDN Learn — Loops](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/Loops) · [javascript.info — Loops: while and for](https://javascript.info/while-for)

### B3. Fix-this: the infinite / off-by-one loop
- **Type:** fix-this
- **Skill drilled:** loop-condition correctness; the `i <= length` off-by-one (distinct from lesson-9's `Sum:12` example — here the symptom is a frozen loop, not `NaN`)
- **Difficulty:** core
- **Task:** A `while` loop is missing its counter update (and a sibling `for` uses `i <= arr.length`). Identify both bugs, fix them so the loop terminates and reads only valid indexes, and explain in a comment what made it run forever / read `undefined`.
- **Deliverable:** corrected, terminating loops with a short comment on each fix.
- **Source:** [MDN Learn — Loops (avoiding infinite loops)](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/Loops) · [javascript.info — while and for](https://javascript.info/while-for)

### B4. Extend: ticket-price decision table
- **Type:** extend
- **Skill drilled:** combine `&&`/`||`, ternary, and `if`/`else if` in one decision; then refactor one branch to a ternary
- **Difficulty:** stretch
- **Task:** Given `age` and `isStudent`, compute a ticket price: under 5 free, 5–17 or student = 8, 65+ = 10, otherwise 15. Log the price, then rewrite the simplest branch as a ternary and confirm the output is unchanged.
- **Deliverable:** a script logging the price for several sample inputs, with one branch expressed as a ternary.
- **Source:** [MDN Learn — Making decisions (conditionals)](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/Conditionals) · [javascript.info — Conditional branching](https://javascript.info/ifelse)

### B5. Quiz: loops & conditionals (predict-the-output)
- **Type:** quiz
- **Concept:** loop bounds, `%`, `&&`/`||` short-circuit, `===` vs `==`
- **Sample questions:**
  - *Predict the output:* `for (let i = 0; i < 3; i++) { console.log(i); }` → **0, 1, 2** (stops before 3).
  - *Predict the output:* `console.log(0 === "0");` → **false** (strict: different types) — contrast with `==`.
  - *Multiple-choice:* What does `(5 > 3) && (2 > 4)` evaluate to? → **false** (AND needs both true).
- **Source:** [MDN Learn — Conditionals](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/Conditionals) · [javascript.info — Comparisons](https://javascript.info/comparison)

---

## Set C — Functions workshop

*Maps to: lesson 7. Drills params/args, `return` (vs `console.log`), scope, and arrow syntax — with new tasks (isEven, average, greeting builder) distinct from the lesson's add/multiply/square calculator.*

### C1. Pure helper functions
- **Type:** build
- **Skill drilled:** declare functions, `return` a value, call and log the result
- **Difficulty:** intro
- **Task:** Write `isEven(n)` returning a boolean (using `% 2 === 0`) and `celsiusToF(c)` returning a number. Call each twice and log the returned values. Reinforces that a function *returns* (caller logs), it does not `console.log` inside.
- **Deliverable:** two functions plus four logged results.
- **Source:** [MDN Learn — Functions](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/Functions) · [javascript.info — Function basics](https://javascript.info/function-basics)

### C2. Average of an array (function + loop)
- **Type:** build
- **Skill drilled:** parameter is an array; loop inside; `return` the computed average
- **Difficulty:** core
- **Task:** Write `average(numbers)` that loops over the array, sums it, and returns `sum / numbers.length`. Log `average([4, 8, 15, 16, 23, 42])`.
- **Deliverable:** a reusable function returning the mean, demonstrated with one logged call.
- **Source:** [Exercism (JS track) — practice exercises](https://exercism.org/tracks/javascript/exercises) · [The Odin Project — javascript-exercises repo (`sumAll`, `findTheOldest`)](https://github.com/TheOdinProject/javascript-exercises)

### C3. Fix-this: the function that prints but won't add up
- **Type:** fix-this
- **Skill drilled:** the `console.log`-inside vs `return` confusion; using a function's result
- **Difficulty:** core
- **Task:** A `double(n)` function `console.log`s `n * 2` instead of returning it, so `const result = double(5) + 1;` logs `NaN`. Fix it to `return`, and confirm `double(5) + 1` is `11`.
- **Deliverable:** corrected function with a `return`, and a logged expression proving the result is now usable.
- **Source:** [MDN Learn — Function return values](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/Return_values) · [javascript.info — Function basics](https://javascript.info/function-basics)

### C4. Extend: refactor declarations to arrow functions
- **Type:** extend
- **Skill drilled:** convert `function`-declaration and function-expression forms to arrow functions; recognize implicit return
- **Difficulty:** stretch
- **Task:** Given three small functions written with the `function` keyword, rewrite each as an arrow function — one with a block body + `return`, one as a single-expression implicit return — and confirm outputs are identical. Add a one-line note on when the implicit-return shorthand is allowed.
- **Deliverable:** three arrow-function equivalents with matching logged output and a short explanatory comment.
- **Source:** [MDN — Arrow function expressions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions) · [javascript.info — Arrow functions, the basics](https://javascript.info/arrow-functions-basics)

### C5. Quiz: functions, return & scope (predict-the-output)
- **Type:** quiz
- **Concept:** missing `return` → `undefined`; local vs global scope; arrow implicit return
- **Sample questions:**
  - *Predict the output:* `function f(){ let x = 2; } f(); console.log(typeof x);` → **"undefined"** (`x` is local; referenced name doesn't exist outside — note this logs `"undefined"` only because `typeof` swallows the ReferenceError; a bare `console.log(x)` would throw).
  - *Predict the output:* `const add = (a, b) => a + b; console.log(add(3, 4));` → **7** (implicit return).
  - *Multiple-choice:* What does a function with no `return` evaluate to when called? → **`undefined`**.
- **Source:** [MDN Learn — Functions](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/Functions) · [javascript.info — Function basics (Tasks)](https://javascript.info/function-basics)

---

## Set D — Predict & debug

*Maps to: lessons 2–9, with emphasis on lesson 9 (DevTools/errors). A read-the-code set: heavy on predict-the-output and error-spotting. Great as a low-stakes "can you read JS?" checkpoint. The lessons' own quizzes are mostly definitional; this set is almost entirely trace-the-execution, which is new.*

### D1. Fix-this: read the error, name the cause
- **Type:** fix-this
- **Skill drilled:** mapping `ReferenceError` vs `TypeError` to a root cause (lesson-9 skill, new snippets)
- **Difficulty:** core
- **Task:** Two short snippets each throw — one a `ReferenceError` (typo'd variable), one a `TypeError` (`undefined` is not a function via a misspelled method like `.toUppercase()`). For each, state the error type, the exact cause, and the fix.
- **Deliverable:** both snippets corrected, each annotated with the error type it originally threw.
- **Source:** [MDN — JavaScript error reference](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Errors) · [MDN Learn — What went wrong? Troubleshooting JavaScript](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/What_went_wrong)

### D2. Quiz: array & object access (predict-the-output)
- **Type:** quiz
- **Concept:** zero-based indexing, out-of-range → `undefined`, nested access, dot vs bracket
- **Sample questions:**
  - *Predict the output:* `const a = [10, 20, 30]; console.log(a[3]);` → **undefined** (no index 3).
  - *Predict the output:* `const p = { hobbies: ["a","b"] }; console.log(p.hobbies[1]);` → **b**.
  - *Fill-in:* given `const o = { "full name": "Ada" };`, the only way to read it is `o[___]` → **"full name"** (bracket notation; the space blocks dot access).
- **Source:** [javascript.info — Objects](https://javascript.info/object) · [MDN Learn — Arrays](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/Arrays)

### D3. Quiz: string methods return new values (predict-the-output)
- **Type:** quiz
- **Concept:** string immutability — methods return, don't mutate; `slice` bounds
- **Sample questions:**
  - *Predict the output:* `let s = "hello"; s.toUpperCase(); console.log(s);` → **hello** (original unchanged; the return value was discarded).
  - *Predict the output:* `console.log("javascript".slice(0, 4));` → **java** (index 0 up to *but not including* 4).
  - *Multiple-choice:* Which logs `"WORLD"`? → `console.log("world".toUpperCase())` (not `s.toUpperCase()` alone).
- **Source:** [MDN Learn — Useful string methods](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/Useful_string_methods) · [javascript.info — Strings](https://javascript.info/string)

### D4. Quiz: loop counters & bounds (predict-the-output)
- **Type:** quiz
- **Concept:** how many times a loop runs; `i++` timing; `length` as the stop bound
- **Sample questions:**
  - *Predict the output:* `let n = 0; for (let i = 1; i <= 4; i++) { n += i; } console.log(n);` → **10** (1+2+3+4).
  - *Predict the output:* how many lines does `for (let i = 0; i < arr.length; i++)` print for a 3-item `arr`? → **3**.
  - *Multiple-choice:* changing `i < arr.length` to `i <= arr.length` for a 3-item array makes the last read be... → `arr[3]`, which is **undefined**.
- **Source:** [javascript.info — Loops: while and for](https://javascript.info/while-for) · [MDN Learn — Looping code](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/Loops)

### D5. Quiz: truthy/falsy in conditions (predict-the-output)
- **Type:** quiz
- **Concept:** which `if (value)` branches run, given the six falsy values
- **Sample questions:**
  - *Predict the output:* `if ("") { console.log("A"); } else { console.log("B"); }` → **B** (empty string is falsy).
  - *Predict the output:* `if (0) { console.log("yes"); } else { console.log("no"); }` → **no**.
  - *Multiple-choice:* which of `[], "0", "false", 0` is falsy? → **`0`** (the rest are truthy — array, non-empty strings).
- **Source:** [MDN — Falsy (glossary)](https://developer.mozilla.org/en-US/docs/Glossary/Falsy) · [javascript.info — Logical operators](https://javascript.info/logical-operators)

### D6. Quiz: `===` vs `==` and type coercion (predict-the-output)
- **Type:** quiz
- **Concept:** strict vs loose equality, the surprise conversions the lesson warns about
- **Sample questions:**
  - *Predict the output:* `console.log(1 === "1", 1 == "1");` → **false true** (strict checks type; loose coerces).
  - *Predict the output:* `console.log(null === undefined, null == undefined);` → **false true**.
  - *Multiple-choice:* which comparison should you use in production code? → **`===`** (avoids coercion surprises).
- **Source:** [javascript.info — Comparisons](https://javascript.info/comparison) · [MDN — Equality comparisons and sameness](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Equality_comparisons_and_sameness)

---

## External practice pointers (for "go deeper" links, not authored items)

If a submodule wants a "now try these on a real practice platform" footer, these are verified-live, beginner-appropriate, and **no-account-needed to read** (Exercism/Codewars require a free login to *submit*):

| Platform | What it gives | Link | Verified |
| --- | --- | --- | --- |
| MDN Learn — Dynamic scripting | Lessons + "Test your skills" pages per topic (free, primary source) | https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting | Confirmed (2026-06-25) |
| javascript.info | Each article ends with **Tasks + full solutions** | https://javascript.info/ (e.g. `/function-basics`, `/array-methods`) | Confirmed |
| freeCodeCamp — JS Algorithms & Data Structures | Interactive in-browser challenges, free | https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures | Confirmed (curriculum exists; URL via fCC search) |
| Exercism — JavaScript track | 159 exercises w/ tests + mentoring; `lasagna`, `two-fer` are beginner | https://exercism.org/tracks/javascript/exercises | Confirmed; `lasagna` & `two-fer` pages load |
| The Odin Project — javascript-exercises | Jest-tested starter exercises (`sumAll`, `removeFromArray`, `findTheOldest`) | https://github.com/TheOdinProject/javascript-exercises | Confirmed |
| Codewars — 8 kyu Fundamentals | Bite-size katas; verified beginner kata "Remove exclamation marks" (8 kyu) | https://www.codewars.com/kata/57a0885cbb9944e24c00008e | Confirmed (title/8-kyu/tags) |

---

## Limitations & gaps

- **Codewars kata bodies:** descriptions load client-side, so the exact task prose wasn't scrapeable via the fetch tool. Title/kyu/tags/URL are **Confirmed**; verify the specific wording in-browser before quoting a kata directly. Avoid the 7-kyu "Regex validate PIN" kata (regex is beyond this module); the 8-kyu string/number Fundamentals katas fit.
- **Exercism/Codewars require a free login to *submit*** solutions; reading is open. If the course wants strictly no-login practice, lean on **javascript.info Tasks** (solutions inline) and **MDN "Test your skills"** pages.
- **MDN Learn URL churn:** MDN moved Learn content to `/Learn_web_development/Core/Scripting/...` (the old `/Learn/JavaScript/...` paths redirect today but are deprecated). I used the new paths. A couple of sub-page slugs (`Return_values`, `What_went_wrong`) follow MDN's standard pattern and were inferred from the confirmed module index — **Likely**; spot-check before publishing as a `DocsLinks` href.
- **No DOM-render practice proposed.** The preview captures only `console.log`, and the DOM lesson is concept-only, so DOM *manipulation* practice belongs to the integration module, not here. All Set items are log-or-editor friendly by design.
- I did **not** invent new `<Exercise>`/`<Quiz>` MDX — per scope, this is research only. Predict-the-output items are written so they map cleanly onto the existing `multiple-choice` / `fill-in` quiz schema.

## Recommendation

Four submodules (A–D), 21 items total (8 build, 3 fix-this, 3 extend, 7 quiz/quiz-heavy plus D's predict-the-output focus). Sets A–C each end with a quiz so a learner can self-check after drilling; **Set D** is the standout addition — a pure "read and predict" checkpoint that the current lessons lack entirely (their quizzes are mostly definitional, not trace-the-execution). If only one set ships first, ship **D** (highest novelty) and **B** (FizzBuzz + loop-debugging are the canonical missing reps).
