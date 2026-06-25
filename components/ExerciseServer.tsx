// RSC wrapper that pre-highlights the Exercise solution with Shiki (which only
// runs on the server) and hands the highlighted windows to the client Exercise.
// mdx-components routes <Exercise> here so authors keep writing <Exercise …>.
import Exercise, { type HighlightedSolutionFile } from "./Exercise";
import { highlightCode, type CodeFile } from "@/lib/highlight";

// ─── Solution authoring API ───────────────────────────────────────────────────
// `solution` accepts EITHER:
//
//  (a) a single string — one window. Language defaults to `solutionLang`
//      (which itself defaults to "html", the dominant case in existing
//      content; Shiki's html grammar also colours embedded <style>/<script>).
//      The window's filename defaults from the language unless `solutionName`
//      is given:
//        solution={`<!doctype html> … `}
//        solution={`/* styles.css */ … `}  solutionLang="css"
//
//  (b) an array of files — one labeled window each, in array order:
//        solution={[
//          { name: "index.html", lang: "html", code: `…` },
//          { name: "styles.css", lang: "css",  code: `…` },
//          { name: "script.js",  lang: "js",   code: `…` },
//        ]}
//
// PROSE mode (string only): set solutionLang="text" for explanatory,
// non-code solutions (Setup / Workflow / process drills). Rendered as normal
// body text — no code-window chrome, no filename bar, no Shiki — but still
// behind the BlurReveal gate:
//        solution={`Open the terminal and run … then verify …`} solutionLang="text"
export type SolutionInput = string | CodeFile[];

export interface ExerciseServerProps {
  title: string;
  goal: string;
  steps: string[];
  expected: string;
  solution: SolutionInput;
  /** Single-string mode only: highlight language. Default "html". */
  solutionLang?: string;
  /** Single-string mode only: window filename. Default derived from lang. */
  solutionName?: string;
  chapterId?: string;
}

const DEFAULT_NAME: Record<string, string> = {
  html: "index.html",
  css: "styles.css",
  js: "script.js",
  jsx: "script.jsx",
  ts: "script.ts",
  tsx: "script.tsx",
  json: "data.json",
  bash: "terminal",
};

function normalize(
  solution: SolutionInput,
  solutionLang: string,
  solutionName?: string
): CodeFile[] {
  if (Array.isArray(solution)) return solution;
  return [
    {
      name: solutionName ?? DEFAULT_NAME[solutionLang] ?? "solution.txt",
      lang: solutionLang,
      code: solution,
    },
  ];
}

export default async function ExerciseServer({
  solution,
  solutionLang = "html",
  solutionName,
  ...rest
}: ExerciseServerProps) {
  // Prose mode: explanatory, non-code solution. Skip Shiki entirely and let the
  // client render it as plain body text inside BlurReveal. Only valid for a
  // single string; an array is always treated as multi-file code.
  if (solutionLang === "text" && typeof solution === "string") {
    return <Exercise {...rest} solutionProse={solution.trimEnd()} />;
  }

  const files = normalize(solution, solutionLang, solutionName);

  const solutionFiles: HighlightedSolutionFile[] = await Promise.all(
    files.map(async (f) => ({
      name: f.name,
      code: f.code.trimEnd(),
      html: await highlightCode(f.code, f.lang),
    }))
  );

  return <Exercise {...rest} solutionFiles={solutionFiles} />;
}
