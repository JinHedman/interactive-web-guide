---
name: interactive-content
description: Data shapes and conventions for the <Quiz> and <Exercise> interactive components in the HTML/CSS/JS guide. Use when authoring quizzes/exercises or building/altering those components.
---

# Interactive content shapes

Stable contracts so authors and engineers agree on the same props.

## Quiz
One quiz per chapter, 3–6 questions. Types: `multiple-choice` (one correct) and `fill-in` (string match, trimmed, case-insensitive).

```mdx
<Quiz questions={[
  {
    id: "q1",
    type: "multiple-choice",
    prompt: "Which tag creates the largest heading?",
    options: ["<h1>", "<h6>", "<head>", "<big>"],
    answer: 0,                        // index of correct option
    explanation: "<h1> is the top-level heading; <h6> is the smallest."
  },
  {
    id: "q2",
    type: "fill-in",
    prompt: "Which attribute gives an image alternative text?",
    answer: "alt",                    // accepted answer (trimmed, case-insensitive)
    accept: ["alt", "alt attribute"], // optional extra accepted strings
    explanation: "The alt attribute describes the image."
  }
]} />
```

Behavior: instant per-question feedback on submit; reveal correct answer + explanation; show a final score. Accessible (radio groups, labels, `aria-live` for feedback).

## Exercise
One exercise per chapter — a guided VS Code task.

```mdx
<Exercise
  title="Build a profile card"
  goal="Create an index.html that shows your name, a photo, and a short bio."
  steps={[
    "In VS Code, create a new file named index.html.",
    "Add the basic HTML document structure.",
    "Add an <h1> with your name and a <p> with a one-line bio.",
    "Add an <img> with a real src and descriptive alt text.",
    "Open it with Live Server to view the result."
  ]}
  expected="A page showing a heading, a paragraph, and an image."
  solution={`<!doctype html>
<html lang="en">
  <head><meta charset="utf-8"><title>Profile</title></head>
  <body>
    <h1>Ada Lovelace</h1>
    <p>I like algorithms.</p>
    <img src="ada.jpg" alt="Portrait of Ada Lovelace">
  </body>
</html>`}
/>
```

Behavior: show goal + numbered steps + expected result; "Reveal solution" expands the `solution` (rendered in a `<CodeExample>`); a "Mark complete" toggle persists to progress.

## Progress (localStorage)
- Key namespace: `guide:progress:v1`.
- Per chapter: `{ read: boolean, exerciseDone: boolean, quizScore: number | null }`.
- Guard all access for SSR (no `window` on the server). Treat missing/corrupt data as empty progress.
