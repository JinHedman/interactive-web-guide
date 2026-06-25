# Workflow (Git & GitHub) — Extra Practice Submodule Research

> Research for **optional EXTRA practice** submodule(s) attached to the `workflow` module.
> Audience: learners with some prior coding exposure, on **VS Code + GitHub Desktop**.
> These are exercise/quiz drills, **separate** from the three main lessons, which stay unchanged.
> Every task below is doable in GitHub Desktop + VS Code (no terminal required), and runs on the
> learner's existing `profile-page` project.

---

## Summary (bottom line up front)

Git practice is mostly **scenario/process drills**, not code katas — so the honest answer is to
keep this **lean**. The three existing lessons already include one hands-on exercise each
(branch→commit→publish, open→merge→pull a PR, create→resolve a conflict on purpose) plus a 5-question
quiz each. The highest-value *additional* practice is therefore **(a) one consolidated end-to-end
loop** that strings the whole rhythm together under mild time pressure, **(b) a couple of
"recover from a mistake" drills** the lessons never cover (undo a commit, revert a merged change,
discard local changes), and **(c) a `.gitignore` task**, which the lessons name as a gap but never
teach. A short **"read this history — what happened?"** diagnostic quiz rounds it out and exercises
reading rather than doing.

**Recommendation on scope:** **one** extra practice submodule of **6–9 items** (≈25–35 min), split
into the three small sets below. Do **not** build a second submodule — there isn't enough genuinely
new, GitHub-Desktop-doable material to fill one without padding or duplicating the lessons.

---

## What already exists (so we stay additive)

| Lesson | Hands-on exercise it already has | Quiz focus |
| --- | --- | --- |
| `1-branches-and-commits` | Create `add-skills-section`, two focused commits, publish | branch purpose, Current Branch dropdown, commit messages, publish, "main" |
| `2-pull-requests` | Preview→Create PR, read Files changed, merge, switch to main + Fetch/Pull | PR purpose, where PR finishes, Files changed tab, why pull is needed, "pull" |
| `3-merge-conflicts` | Deliberately conflict a `<title>` line, resolve in VS Code, commit merge | conflict cause, marker meaning, all markers removed, GHD surfacing, "=======" |

**Gaps the lessons explicitly leave open (verified by reading the three `.mdx` files):**

- **Undoing / recovering from mistakes** — never covered. No undo-last-commit, no revert, no discard.
- **`.gitignore`** — named as a gap in the course's own `extension-ideas.md`, but never taught or drilled.
- **History as a reading skill** — lessons *write* history but never ask the learner to *read* a
  commit graph and infer what happened.
- **End-to-end fluency** — each lesson drills one stage; nothing rehearses the full loop in one go.

The sets below target exactly these gaps and reuse the established chapter shape
(`<Exercise>` / `<Quiz>` with `title` / `goal` / `steps` / `expected` / `solution`).

---

## Set A — End-to-end loop (consolidation)

**Why it's worth it:** Each lesson rehearses one stage. Real fluency is doing the *whole* rhythm —
branch → commit → publish → PR → merge → pull `main` — without step-by-step hand-holding. This is one
larger drill that removes the scaffolding, on a *new* edit so it isn't a replay of the skills-section
exercise. **Confidence: high** that this is non-duplicative — it's the same loop but assembled and
unscaffolded, which is a distinct skill from doing each piece in isolation.

| # | Title | Type | Skill | Difficulty | Task | Deliverable |
| --- | --- | --- | --- | --- | --- | --- |
| A1 | Ship a feature end-to-end | guided scenario | full collaboration loop, unscaffolded | medium | On `profile-page`, branch `add-contact-section` off `main`; add a `<h2>Contact</h2>` + an email link in `index.html`; make **two** focused commits; publish; open a PR on github.com with a real title + description; self-review the Files changed diff; merge; delete the branch; switch to `main` and Fetch + Pull. Do it **without** re-reading the lesson steps. | A merged PR, `main` updated locally, branch deleted — the learner narrates each stage in their own words (1 line per stage). |
| A2 | The "I forgot to pull" trap | guided scenario | habit: pull `main` before branching | easy–medium | After A1, *before* starting new work, deliberately branch off a **stale** local `main` (skip the pull), notice the new branch is missing the just-merged Contact section, then recover: switch to `main`, Fetch + Pull, re-create the branch off fresh `main`. | A short written answer: "why was my branch missing the Contact section, and what's the one habit that prevents it?" (answer: branch off freshly-pulled `main`). |

**Quiz concepts for Set A**
- Correct order of the everyday loop (branch → commit → publish → PR → merge → pull). *(MC: reorder)*
- "You merged on github.com; the change isn't on your computer's `main`. What now?" → Fetch + Pull. *(reinforces lesson 2 q4 in a new frame)*
- Why two focused commits beat one big one (review/undo granularity). *(MC)*
- "Commit to **branch-name**" button label is proof of *what?* → the commit lands on the branch, not `main`. *(fill-in / MC)*

---

## Set B — Recover from common mistakes (the real gap)

**Why it's worth it:** This is the single most useful thing the lessons omit. Beginners' #1 Git fear is
"I broke something and can't undo it." All three drills below are **first-class GitHub Desktop UI
features** (no terminal), so they fit the course constraint exactly. **Confidence: high** — each UI
action below was verified against current GitHub Desktop docs (links in the table).

| # | Title | Type | Skill | Difficulty | Task | Deliverable |
| --- | --- | --- | --- | --- | --- | --- |
| B1 | Undo the last commit | drill | undo a not-yet-pushed commit, keep the work | easy | On a branch, make an edit and commit it with a deliberately bad message (`asdf`). Before pushing, use GitHub Desktop's **Undo** button (bottom of the sidebar, by the last commit) to undo it — confirm the changes return to the **Changes** list — then re-commit with a clear message. | One commit with a clear message; the `asdf` commit gone from History; the edit preserved. |
| B2 | Revert a change that's already on `main` | drill | revert a committed change safely | medium | Commit a change on `main` (e.g. a wrong tagline) and push it. Realize it was wrong. In the **History** tab, right-click that commit → **Revert Changes in Commit**. Observe Git creates a **new** commit that undoes it (the original stays in history). Push the revert. | A new "Revert …" commit on `main`; the tagline back to its previous value; History showing *both* the original and the revert (nothing rewritten). |
| B3 | Discard uncommitted changes | drill | abandon local edits cleanly | easy | Make several edits in VS Code you decide you don't want. In GitHub Desktop's **Changes** list, right-click a file → **Discard changes** (or **Discard all changes**) and confirm. Verify the file returns to its last-committed state. | The working files restored to the last commit; the learner can state the difference between *discard* (throw away uncommitted edits) and *undo*/*revert* (deal with commits). |

**Quiz concepts for Set B**
- Match the situation to the tool: *bad message, not pushed* → **Undo**; *bad commit already on `main`/pushed* → **Revert**; *unwanted edits never committed* → **Discard**. *(matching — the centerpiece question)*
- "Revert creates a **new** commit and leaves the original in history — true/false?" → true. *(MC; the safety property that makes revert safe on shared branches)*
- "**Discard changes** affects which changes?" → only uncommitted ones in the working directory. *(MC)*
- "Undo restores the commit's changes to ____" → the working directory / Changes list. *(fill-in)*
- Trap: "You already pushed a commit and shared it. Should you Undo (rewrite) it?" → No — prefer Revert, because Undo rewrites history others may have. *(MC, mild nuance — flag as "good to know")*

---

## Set C — `.gitignore` + reading history

**Why it's worth it:** `.gitignore` is named as a gap in the course's own planning doc and never taught;
it's a small, concrete, real task. "Read this history" exercises the *reading* half of Git, which the
lessons never drill. **Confidence: medium-high.** One caveat to flag in the build (see Limitations):
GitHub Desktop's exact right-click "Ignore file" labels are **not** in the official docs I could find,
so the task is written to also work via the documented `.gitignore`-editing path.

| # | Title | Type | Skill | Difficulty | Task | Deliverable |
| --- | --- | --- | --- | --- | --- | --- |
| C1 | Keep junk out of the repo with `.gitignore` | drill | ignoring files | easy–medium | Create a file that shouldn't be tracked (e.g. `notes.local.txt` or a `.DS_Store` appears on macOS). In GitHub Desktop's **Changes** list, right-click it → choose the **Ignore file** option (this adds a line to `.gitignore`); confirm the file disappears from Changes and a `.gitignore` change appears instead. Open `.gitignore` in VS Code to read the rule. Commit `.gitignore`. | A committed `.gitignore` containing the ignore rule; the junk file no longer showing up as a change. |
| C2 | "Already tracked" gotcha | concept + mini-drill | why ignoring a committed file doesn't work | medium | Add a rule to `.gitignore` for a file you **already committed** earlier, and observe it *keeps* showing up. Read the explanation: `.gitignore` only affects **untracked** files; an already-committed file must be untracked first. (Stretch, optional: this is the one spot where the terminal's `git rm --cached` is the documented fix — present as "what a teammate would run," not required.) | A one-line written answer: "why didn't adding it to `.gitignore` stop it from being tracked?" |
| C3 | Read this history — what happened? | diagnostic quiz | reading the commit graph | medium | Open the **History** tab in GitHub Desktop on `profile-page`. Click commits to read messages, authors, times, SHAs, and per-file diffs. Answer questions about the project's own real history: which commit added the skills section? which commit was a merge? what changed between two commits? | Correct answers grounded in the learner's actual repo history (self-checkable in the UI). |

**Quiz concepts for Set C**
- "`.gitignore` stops Git from tracking which files?" → **untracked** ones (not files already committed). *(MC — the key misconception)*
- "You should commit `.gitignore` into the repo so collaborators share the rules — true/false?" → true. *(MC)*
- Reading markers in History: which entry is a **merge commit** vs a normal commit? *(MC, given a small screenshot/diagram)*
- "In the History tab, clicking a commit shows ____" → its message, author, time, SHA, and a diff of changed files. *(fill-in / MC)*
- Trap: ".DS_Store / node_modules keep appearing in Changes — what's the fix?" → add them to `.gitignore`. *(MC, very practical on macOS)*

---

## Verified reference links (for the build's `<DocsLinks>`)

All checked during this research (June 2026). The three lessons already cite the
branch/PR/merge-conflict pages; the links below are the *new* ones the practice sets need.

| Topic | Link | Status |
| --- | --- | --- |
| Undo a commit (GitHub Desktop) | https://docs.github.com/en/desktop/managing-commits/undoing-a-commit-in-github-desktop | **Confirmed** — "Undo" button at the bottom of the sidebar; restores the commit's changes to the working directory |
| Revert a commit (GitHub Desktop) | https://docs.github.com/en/desktop/managing-commits/reverting-a-commit-in-github-desktop | **Confirmed** — History → right-click commit → **Revert Changes in Commit**; creates a new commit, original stays |
| View branch history (GitHub Desktop) | https://docs.github.com/en/desktop/making-changes-in-a-branch/viewing-the-branch-history-in-github-desktop | **Confirmed** — **History** tab; click a commit to see message, time, committer, SHA, per-file diff |
| Ignoring files (GitHub Docs, canonical) | https://docs.github.com/en/get-started/git-basics/ignoring-files | **Confirmed** — `.gitignore` in repo root; commit it to share; already-tracked files must be untracked first (`git rm --cached`) |
| Git ignore in GitHub Desktop (repo creation) | https://docs.github.com/en/desktop/overview/creating-your-first-repository-using-github-desktop | **Confirmed** — describes the "Git ignore" dropdown that "lets you add a custom file to ignore specific files" |
| Pro Git — Recording Changes / `.gitignore` syntax | https://git-scm.com/book/en/v2/Git-Basics-Recording-Changes-to-the-Repository | **Confirmed (conceptual)** — authoritative `.gitignore` pattern syntax; CLI-flavoured, use for the author's understanding, not learner steps |
| Pro Git — Undoing Things (revert vs reset concepts) | https://git-scm.com/book/en/v2/Git-Basics-Undoing-Things | **Confirmed (conceptual)** — background for B1/B2; CLI-based, author reference only |
| Learn Git Branching (sandbox) | https://learngitbranching.js.org/ | **Confirmed but CLI-based** — free interactive commit-graph visualizer where you *type* git commands. Great for *conceptually* seeing branch/merge as a graph, but it is **not** GitHub Desktop. Reference at most as an *optional "see the graph" explainer*, clearly flagged as command-line, so it doesn't contradict the GUI-only path. |

GitHub Docs pages already cited by the existing lessons (no need to re-verify; included for completeness):
managing branches, committing/reviewing changes, creating a PR from GitHub Desktop, about PR merges,
about merge conflicts, resolving a conflict via CLI, syncing your branch.

---

## Limitations & gaps (honest caveats for whoever builds this)

- **Right-click "Ignore file" labels are not in the docs I found.** The GitHub Desktop *feature*
  exists (it writes to `.gitignore`), and the canonical ignoring-files page + the repo-creation page's
  "Git ignore" dropdown are documented — but the exact context-menu wording ("Ignore file" /
  "Ignore all files with this extension") could not be verified against a current docs page. **Action:**
  write C1 to also work via the documented path (edit `.gitignore` directly in VS Code), and confirm the
  exact menu label against the installed GitHub Desktop version before publishing. *(Confidence on the
  feature existing: high; on the exact label: uncertain.)*
- **The `.gitignore` "already tracked" fix (C2 stretch) needs the terminal.** `git rm --cached` is the
  documented remedy and has no first-class GitHub Desktop button. This is the one place the GUI-only
  constraint genuinely can't cover, so C2 is framed as a *concept* ("why it happens") with the terminal
  fix presented as optional teammate context, not a required learner step.
- **`.DS_Store` appearing is platform-dependent.** It shows up on macOS, not Windows. If the cohort is
  mixed-OS, use a neutral junk file (`notes.local.txt`, `secrets.env`) as the primary example so every
  learner can reproduce it.
- **Undo vs Revert is a genuine nuance, not a beginner certainty.** The "don't Undo an already-pushed,
  shared commit" point (Set B trap) is correct but subtle. Keep it as a flagged "good to know," not a
  hard rule the quiz punishes — the lessons deliberately keep a gentle tone.
- **Risk of over-building.** I deliberately did **not** propose drills for stashing, cherry-pick,
  rebase, tags, forks, or `.gitattributes`: they're either not exposed cleanly in GitHub Desktop, or
  they're well beyond a course whose whole Git module is three 25-minute lessons. Adding them would be
  padding and would break the "no concept before it's taught" ordering rule the course enforces.
- **Learn Git Branching is CLI-based.** It's excellent pedagogy for *seeing* the graph, but it teaches
  typed git commands, which contradicts the course's GitHub-Desktop-only path. Use it only as an
  optional, clearly-labelled "see how branches look as a graph" explainer — never as a required step.

---

## Recommendation

- **Build one extra practice submodule**, organized as the three sets above:
  **Set A (consolidation, 2 items)** + **Set B (recovery, 3 items)** + **Set C (`.gitignore` + reading
  history, 3 items)** = **8 items**, ≈25–35 minutes total. If trimming, **Set B is the must-have**
  (it's the clearest gap), Set C second, Set A is the nice-to-have consolidation.
- **Do not build a second submodule for Workflow.** Beyond these gaps, additional Git practice would
  either duplicate the lessons or pull in concepts that don't fit GitHub Desktop / the course level.
  Git's nature — process over code — means this module warrants *less* extra practice than CSS/JS, and
  that's the honest call.
- **Format:** reuse the existing `<Exercise>` (with `solution` written as a numbered GitHub Desktop /
  github.com sequence, exactly as the three current lessons do for their no-code-to-"solve" steps) and
  `<Quiz>` components, and attach the verified `<DocsLinks>` above. Match the lessons' calm,
  "this isn't scary" tone — recovery drills especially benefit from it.
