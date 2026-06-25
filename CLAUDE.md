# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

An interactive HTML/CSS/JS learning guide for learners with some prior exposure. Lessons are authored as MDX files; the app renders them with live code examples, quizzes, and exercises, and tracks per-chapter progress in the browser. Built with Next.js 16 (App Router, RSC), React 19, Tailwind v4, MDX via `next-mdx-remote`, and Shiki for syntax highlighting.

## Commands

```bash
npm run dev      # dev server (localhost:3000)
npm run build    # production build — ALSO the typecheck; there is no separate lint/test
npm start        # prod server on $PORT (default 8080) — used by OSC deployment
```

There is no test suite, linter, or `tsc` script. `npm run build` is the verification gate — it typechecks the whole project. Run it after non-trivial changes. Use `bun` in place of `npm` if available.

## Architecture

### Content pipeline (the core mental model)

Lessons live at `content/<module>/<order>-<slug>.mdx`. The filename's integer prefix is the in-module sort order; the rest is the URL slug. Modules render in the fixed order set by `MODULE_ORDER` in `lib/types.ts` (`setup, html, css, javascript, integration, workflow`) — a module folder not in that list is skipped.

`lib/content.ts` is the only thing that touches the filesystem. It globs `content/**/*.mdx`, parses YAML frontmatter with `gray-matter`, and exposes the loaders everything else uses: `getAllChapters()`, `getChaptersByModule()`, `getChapter(module, slug)`, `getPrevNext(module, slug)`, and `getAllParams()` (feeds `generateStaticParams`).

Render path: `app/learn/[module]/[slug]/page.tsx` (async RSC) → `getChapter()` returns `{ source, frontmatter }` → `getMDXComponents(chapterId)` builds the component map → `<MDXRemote>` (from `next-mdx-remote/rsc`) compiles the MDX with that map. Frontmatter is parsed by gray-matter, so MDXRemote runs with `parseFrontmatter: false`. JS/expression props in MDX are intentionally allowed (`blockJS: false`) because all content is first-party — do not load untrusted MDX through this path.

The page renders the single `<h1>` from `frontmatter.title`. In MDX, `#` maps to `<h2>`, `##` to `<h3>`, etc. (semantic level shifted down one, visual rank preserved via `prose-h*` classes) to keep one h1 per page — see `components/mdx-components.tsx`.

### Custom MDX components

Authored content uses these (wired in `components/mdx-components.tsx`):

- `<CodeExample>` (`components/CodeExample.tsx`, RSC) — code display + optional live `preview`. Single-file via `language` + children, or multi-file via `files={[{name,lang,code}]}`. Highlights on the server; preview is assembled into one HTML doc and run in a sandboxed iframe.
- `<Quiz>` (client) — `questions` array of multiple-choice (`answer` = option index) or fill-in (`answer` string, trimmed/case-insensitive). `chapterId` is injected by the component map; persists score.
- `<Exercise>` — authored as `<Exercise>`, routed to `ExerciseServer.tsx` (RSC) which pre-highlights the solution, then renders the client `Exercise.tsx`. Solution can be a code string, multi-file `CodeFile[]`, or prose (`solutionLang="text"`).
- `<ReadMore>` / `<DocsLinks>` — "contemporary / further reading" and per-chapter MDN/W3Schools links.

Data shapes for quizzes/exercises and frontmatter live in `lib/types.ts`. **Before authoring or changing content, read the skills** `.claude/skills/lesson-authoring/SKILL.md` (frontmatter schema, chapter structure, tone, code conventions) and `.claude/skills/interactive-content/SKILL.md` (Quiz/Exercise prop shapes) — that's the source of truth for content conventions; don't duplicate it here.

### Syntax highlighting (`lib/highlight.ts`)

Shiki runs server-side only (`serverExternalPackages: ["shiki"]` in `next.config.ts`). A custom "Webcraft" TextMate theme is defined inline. Key exports: `highlightCode`, `highlightFiles`, `assembleProject` (combine multi-file into one iframe doc — inlines/injects CSS & JS per `<link>`/`<script>` references), `buildSingleSrcDoc`.

### Progress tracking (client-only, localStorage)

`lib/progress.ts` owns all reads/writes under the `guide:progress:v1` namespace; shape is `{ read, exerciseDone, quizScore }` per chapter plus a `lastVisited` meta. Every write dispatches a `guide:progress` `CustomEvent` and updates a version counter; a `storage` listener syncs across tabs. Components subscribe through `lib/useProgress.ts` hooks (`useChapterProgress`, `useLastVisited`, `useHasMounted`) built on `useSyncExternalStore`. All access is `window`-guarded and try/catch-wrapped for SSR safety and quota errors. `MarkRead.tsx` marks read + lastVisited on mount; `ChapterReset` / home "Reset all" clear it.

### Styling

Tailwind v4, configured in CSS — `app/globals.css` holds all design tokens (`@theme inline` block) and prose/layout/responsive styles. Light/dark switch via `[data-theme="dark"]`; an inline script in `app/layout.tsx` sets the attribute before paint to avoid a theme flash. No hardcoded colors — use the tokens.

## Conventions

- Server-by-default: components are RSC unless they need interactivity. Client components are marked `"use client"` (Quiz, Exercise, sidebar interactivity, theme toggle, anything touching `localStorage`). Interactive components are wrapped by an RSC (e.g. `ExerciseServer`) so they compose inside `MDXRemote`.
- `chapterId` is the `"module/slug"` string and is the key for progress + the id passed into Quiz/Exercise. The component map injects it; authors don't write it.
- Code in lessons must be correct and runnable (no `…` placeholders), 2-space indent, semantic HTML, `alt` on images.
- Specialized subagents exist for this repo under `.claude/agents/` (curriculum-architect, lesson-author, content-reviewer, frontend-engineer, interactive-engineer, osc-deployer). Prefer delegating matching work to them.

## Deployment

Targets the Eyevinn Open Source Cloud (OSC) "My Apps" Node.js runner — a long-running server, **not** a static export (no `output: 'export'`). `npm start` binds `$PORT` (default 8080). See `.claude/skills/osc-deploy/SKILL.md` for the deploy runbook.
