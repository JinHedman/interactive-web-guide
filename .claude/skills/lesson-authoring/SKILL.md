---
name: lesson-authoring
description: Format, frontmatter schema, chapter structure, tone, and code conventions for authoring MDX lessons in the HTML/CSS/JS interactive guide. Use when writing or reviewing lesson content.
---

# Lesson authoring

How to write a chapter for the interactive HTML/CSS/JS guide.

## Audience & voice
- Readers have **some prior coding exposure** (no real HTML/CSS/JS). Don't explain what a browser/file is.
- **English**, plain and direct. Short sentences. Show a concrete example, then state the rule.
- Second person ("you"). Encouraging, not chatty. No filler.

## File location & frontmatter
Lessons live in `content/<module>/<order>-<slug>.mdx`. Frontmatter:

```yaml
---
title: "Headings, paragraphs, and lists"
module: "html"            # setup | html | css | javascript | integration
order: 2                  # order within the module
goal: "One sentence: what the learner can do after this chapter."
objectives:
  - "Use heading levels correctly"
  - "Write paragraphs and lists"
estMinutes: 20
prerequisites: ["html/1-structure"]
---
```

## Chapter structure (in this order)
1. **Intro** (2–4 sentences): what this chapter covers and why it matters.
2. **Concepts**: short sections, each a heading + explanation + a `<CodeExample>`.
3. **Try it** (optional): an inline `<CodeExample preview>` whose rendered result the reader can see.
4. **Exercise**: exactly one `<Exercise>` — a VS Code task building on the chapter.
5. **Quiz**: exactly one `<Quiz>` (3–6 questions).
6. **Contemporary / Read more**: a `<ReadMore>` panel where applicable.

## Component usage
- `<CodeExample language="html" preview>` …fenced code… `</CodeExample>` — `preview` renders the sandboxed result for html/css/js.
- `<Quiz>` and `<Exercise>` take data per the **interactive-content** skill.
- `<ReadMore title="…">` for the contemporary/framework pointer.

## Code conventions
- Every snippet correct, runnable, minimal. No `…` placeholders inside runnable examples.
- 2-space indent. Lowercase HTML tags. Use semantic HTML.
- Keep a consistent running example/theme within a module where it helps.
- Always include `alt` on images; model good accessibility habits by example.

## Contemporary / Read more (where applicable)
- Purpose: orient the learner to the modern tool that superseded the basics — NOT a tutorial.
- HTML → JSX/components & web components.
- CSS → **Tailwind CSS** (utility classes; note they read a bit like inline styles), CSS-in-JS, Sass.
- JavaScript → modern JS (modules, arrow fns, async/await), TypeScript, **React & Next.js**.
- Keep to ~3–6 sentences + 1–3 real links. Verify version-specific claims with Context7.
