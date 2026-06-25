# Setup module — extra practice submodule research

> Research for an **optional, separate** practice submodule attached to `setup/1-tools-and-first-page`.
> The main lesson is unchanged. This is exercise/quiz-focused enrichment for learners with some prior coding exposure, on **VS Code + GitHub Desktop**.
> All links below were verified to resolve (not 404/redirect) on 2026-06-25.

## Summary (bottom line up front)

**Recommendation: Setup warrants at most ONE small practice set — a "readiness + recovery" drill — plus a short shortcuts mini-quiz. No more.**

Setup/tooling is genuinely the weakest module for hands-on drilling, and I am being deliberate about not padding. Here is the honest reasoning:

- The existing exercise already makes the learner *do* the whole happy path once: install both extensions, set Prettier as default + Format On Save, clone, create `index.html`, Live Server reload, commit, push. Re-asking any of that is pure duplication.
- Tooling competence is **binary and one-time** ("is it installed and configured correctly?"), not a skill that improves with reps. You can't meaningfully "drill" clicking Install.
- The only setup activities with real transfer value beyond the first run are: (a) **verifying** the environment is actually correct (catches silent misconfig before it bites in the HTML module), and (b) **recovering** when something is wrong (the realistic failure modes: Live Server not reloading, Prettier not firing on save, wrong default formatter, "Open with Live Server" missing, commit-not-pushed). These are diagnostic, not procedural — they teach a mental model, so they earn their place.
- A small shortcuts quiz is cheap, has lasting payoff (every later module uses Save / Command Palette / Quick Open / Format), and does not overlap the existing quiz (which tests *concepts*: what Live Server does, `index.html`, commit-vs-push, what Prettier is — not key bindings).

So the proposal below is **two small sets**: one practical "fix-it / verify" set (the core value) and one short shortcuts mini-quiz (cheap, high-retention). If you want to cut further, **keep Set A and drop Set B** — Set A is the one that genuinely de-risks the rest of the course. A learner who completes the main exercise and skips this submodule entirely will be fine; this is true enrichment, not a gap-filler.

Confidence on the *scope* judgment: **High.** It is corroborated by the project's own `extension-ideas.md`, which lists Setup's real gaps as branches/PRs/conflicts/`.gitignore` — i.e. a separate **`workflow`** module (which already exists in the curriculum), not more single-file tooling drills.

---

## Set A — "Is my setup actually working?" (verify + fix-the-broken-setup)

**Why this set exists:** It is the only Setup practice with transfer value. It promotes the learner from "I followed the steps" to "I can tell whether my environment is correct and fix it when it isn't." Every item is diagnostic — distinct from the main exercise, which only walks the happy path. Difficulty is intentionally low-to-moderate; this is a warm-up, not a challenge.

| # | Title | Type | Skill | Difficulty | Task | Deliverable | Verified link |
|---|-------|------|-------|------------|------|-------------|---------------|
| A1 | Environment-readiness checklist | self-check / checklist | Verifying tool state | Easy | Run a 6-point self-audit **without re-installing anything**: (1) Extensions view filtered by `@installed` shows both **Live Server** and **Prettier - Code formatter**; (2) Settings shows **Editor: Format On Save** = on; (3) **Default Formatter** = Prettier; (4) the project folder opened in VS Code is the **cloned** repo (a `.git` folder / Source Control shows the repo, not "no source control"); (5) GitHub Desktop shows the repo with **no uncommitted changes** and **"Push origin"** greyed out (everything pushed); (6) the status bar shows **"Go Live"** / the Live Server port. | A filled checklist (6/6 ticked) or a note of which item failed + which fix in A2/A3 applies. | VS Code Extension Marketplace (the `@installed` filter): https://code.visualstudio.com/docs/configure/extensions/extension-marketplace · VS Code User Interface (Explorer, status bar, layout): https://code.visualstudio.com/docs/getstarted/userinterface |
| A2 | Fix the broken setup: "Live Server won't reload" | scenario / debug | Diagnosing the preview loop | Moderate | Given a described-broken state — edits to `index.html` are saved but the browser does **not** auto-refresh — list the likely causes and the fix. Expected reasoning: the tab was opened as a `file://` path (not the `http://127.0.0.1:5500/...` Live Server URL); the file wasn't actually saved (no Format-On-Save / dot on the tab); or the Live Server session was stopped (status bar shows "Go Live" instead of the port). Fix: re-open via right-click → **Open with Live Server**, confirm the address bar shows `127.0.0.1:5500`, save and watch the reload. | A 2–3 sentence diagnosis naming the `file://` vs `127.0.0.1:5500` distinction and the corrective action. | VS Code Basic Editing (Save / dirty indicator / Auto Save): https://code.visualstudio.com/docs/editing/codebasics · VS Code User Interface (status bar): https://code.visualstudio.com/docs/getstarted/userinterface |
| A3 | Fix the broken setup: "Prettier isn't formatting on save" | scenario / debug | Diagnosing the formatter | Moderate | Given: saving does not reformat the file. Identify the two most common causes and fix them: **Default Formatter** isn't set to *Prettier - Code formatter*, or **Format On Save** is off. Verify by deliberately mangling the indentation in `index.html`, saving, and confirming Prettier re-tidies it. Bonus: trigger a one-off format with **Format Document** to prove Prettier itself works even if save-formatting is off. | Before/after of a mangled-then-saved file showing Prettier re-indented it, plus a one-line statement of which setting was wrong. | VS Code Basic Editing (Formatting + Format On Save): https://code.visualstudio.com/docs/editing/codebasics |
| A4 | "Did it actually reach GitHub?" — verify the commit landed | scenario / verify | Closing the commit→push→remote loop | Easy–Moderate | After making any small edit (e.g. change the `<title>`), commit it in GitHub Desktop, then **prove it's on the remote**, not just local: confirm **Push origin** is greyed out / shows nothing to push, open **History** (Cmd+2) to see the commit, then open the repo on github.com and confirm the same commit/message appears. Reinforces that *commit ≠ pushed* — the single most common beginner trap. | A screenshot or note confirming the commit message visible BOTH in GitHub Desktop History and on github.com. | GitHub Desktop — committing & reviewing changes: https://docs.github.com/en/desktop/making-changes-in-a-branch/committing-and-reviewing-changes-to-your-project-in-github-desktop · GitHub Desktop keyboard shortcuts (Cmd+2 = History): https://docs.github.com/en/desktop/overview/github-desktop-keyboard-shortcuts |
| A5 | Safe-undo warm-up: revert a throwaway commit | guided exercise | Recovering from a bad commit | Moderate | Make a deliberately bad edit (e.g. delete the `<h1>`), commit it, then use GitHub Desktop **History → right-click the commit → Revert** to undo it as a *new* commit (original stays in history). Confirm `index.html` is restored. Teaches that mistakes are recoverable — lowers the fear that makes beginners avoid committing often. | A History view showing both the bad commit and the "Revert ..." commit, and a restored `index.html`. | GitHub Desktop — reverting a commit: https://docs.github.com/en/desktop/managing-commits/reverting-a-commit-in-github-desktop |

**Notes on scope of Set A:**
- A1 is the keystone — if you only ship one item, ship A1.
- A2 and A3 are the two "fix the broken setup" scenarios. They are intentionally framed as *described* broken states the learner reasons about + reproduces, so no instructor needs to pre-break a machine.
- A4/A5 lightly extend GitHub Desktop usage **without** entering branch/PR territory (that's deliberately reserved for the existing `workflow` module — do not pull it forward here). They stay strictly within clone/commit/push/history/revert, which the learner already has the context for.

---

## Set B — VS Code shortcuts mini-quiz (optional, cheap, high-retention)

**Why this set exists:** Keyboard fluency compounds across every later module (Save, Format, Command Palette, Quick Open are used constantly). It is quiz-only (no setup work), takes ~3 minutes, and does **not** overlap the existing quiz, which tests concepts rather than key bindings. If trimming, this is the set to cut first — but it's nearly free to include.

**Format:** multiple-choice + one fill-in, matching the existing `<Quiz>` component shape. Keep it short (4–6 items). Use the macOS / Windows-Linux dual notation already used in the lesson body.

**Quiz concepts (verified default bindings):**

1. **Save the current file** — `Cmd + S` (Mac) / `Ctrl + S` (Win/Linux). *(Already in lesson prose; reinforce as recall.)*
2. **Format Document on demand** — `Shift + Option + F` (Mac) / `Shift + Alt + F` (Win/Linux). *(Stated in the lesson; good recall check that pairs with A3.)*
3. **Open the Command Palette** — `Shift + Cmd + P` (Mac) / `Ctrl + Shift + P` (Win/Linux). Concept to test: "everything in VS Code is reachable from here, including commands without a shortcut." (Verified on VS Code *User interface* docs.)
4. **Open the Extensions view** — `Cmd + Shift + X` / `Ctrl + Shift + X`. *(Already in lesson prose; pairs with A1.)*
5. **Distractor-style concept item** — "Which of these does Live Server's keyboard/status-bar control do?" Correct: starts/stops the local server ("Go Live" ↔ port in the status bar). Distractors: deploys online, formats code, commits. (Reinforces the main quiz's q1 from a different angle without copying it.)
6. *(Optional fill-in)* — "What is the canonical local address Live Server opens?" Accept: `127.0.0.1:5500` / `http://127.0.0.1:5500` / `localhost:5500`. Directly reinforces A2's `file://`-vs-server insight.

**Sourcing / verification for Set B:**
- Save, Format Document, Command Palette, multi-cursor and the like are documented on VS Code **Basic editing**: https://code.visualstudio.com/docs/editing/codebasics
- Command Palette binding (`Shift+Cmd+P` / `Ctrl+Shift+P`) confirmed on VS Code **User interface**: https://code.visualstudio.com/docs/getstarted/userinterface
- The authoritative, printable per-OS default-shortcut reference (use to double-check any binding before publishing): VS Code **Keyboard shortcuts** page links the macOS / Windows / Linux PDFs via *Help → Keyboard Shortcut Reference*: https://code.visualstudio.com/docs/configure/keybindings

> Caveat: VS Code keybindings can be remapped by keymap extensions or user settings; the quiz should ask for **default** bindings and say so. Confidence on the specific values above: **High** (cross-checked against VS Code docs and the in-lesson prose, which already uses `Cmd/Ctrl+S`, `Shift+Alt/Option+F`, `Cmd/Ctrl+Shift+X`).

---

## What I deliberately did NOT propose (and why)

- **Re-install / re-configure drills** — duplicates the main exercise's happy path. Zero transfer value as a "rep."
- **A second full clone/commit/push exercise** — same; the main exercise already does the full loop end-to-end.
- **Branches, pull requests, merge-conflict resolution, `.gitignore`** — these are real Setup *gaps*, but the project already routes them to a dedicated **`workflow`** module (see `content/curriculum.md` and `docs/extension-ideas.md` §1.1). Pulling them into a Setup warm-up would break the course's dependency-ordering discipline and the "branching is meaningful only once you have multi-file pages" rationale.
- **Terminal / CLI git** — out of scope; the course is explicitly GitHub Desktop + VS Code, no command line.
- **A large quiz bank** — tooling has a small finite surface; padding it would be filler.

## Limitations & gaps

- I did not test the proposed scenarios on a live machine; A2/A3 broken-state descriptions are based on the documented behavior of Live Server (serves on `127.0.0.1:5500`, requires the server tab not a `file://` tab) and Prettier-on-save (depends on Default Formatter + Format On Save). These are the well-known failure modes, but the exact UI strings ("Go Live", greyed "Push origin") can shift between versions — re-confirm against the installed versions before publishing.
- Live Server is a third-party extension (Ritwick Dey); its docs live on the VS Code Marketplace, not on code.visualstudio.com. I cited the first-party VS Code pages (Extension Marketplace, User Interface, Basic Editing) for the *VS Code-side* behavior the learner interacts with, which is the verifiable, stable surface. If you want a Live-Server-specific citation, link its Marketplace page — but Marketplace listing copy is less stable than first-party docs.
- GitHub Desktop shortcut values (Cmd+Enter commit, Cmd+P push, Cmd+2 history, Shift+Cmd+N new branch) are confirmed for **macOS** from the official shortcuts page; Windows equivalents are on the same page if you add a dual-OS quiz item.

## Verified links (all resolved 2026-06-25)

- VS Code — Extension Marketplace (`@installed` filter, install/manage): https://code.visualstudio.com/docs/configure/extensions/extension-marketplace
- VS Code — User interface (Explorer, status bar, Command Palette, layout): https://code.visualstudio.com/docs/getstarted/userinterface
- VS Code — Basic editing (Save, Auto Save, Formatting / Format On Save, multi-cursor): https://code.visualstudio.com/docs/editing/codebasics
- VS Code — Keyboard shortcuts (links the per-OS default-shortcut PDFs): https://code.visualstudio.com/docs/configure/keybindings
- GitHub Desktop — Committing & reviewing changes: https://docs.github.com/en/desktop/making-changes-in-a-branch/committing-and-reviewing-changes-to-your-project-in-github-desktop
- GitHub Desktop — Reverting a commit: https://docs.github.com/en/desktop/managing-commits/reverting-a-commit-in-github-desktop
- GitHub Desktop — Keyboard shortcuts: https://docs.github.com/en/desktop/overview/github-desktop-keyboard-shortcuts
- GitHub Desktop — Setting up GitHub Desktop (auth, Git name/email, default editor): https://docs.github.com/en/desktop/installing-and-authenticating-to-github-desktop/setting-up-github-desktop
