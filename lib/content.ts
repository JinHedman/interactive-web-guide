import fs from "fs";
import path from "path";
import matter from "gray-matter";
import type { ChapterMeta, LessonFrontmatter } from "./types";
import { MODULE_ORDER } from "./types";
import { exerciseId } from "./ids";

const CONTENT_DIR = path.join(process.cwd(), "content");

// Glob all .mdx files under content/**/*.mdx
function getMdxFiles(): { module: string; filename: string; fullPath: string }[] {
  const results: { module: string; filename: string; fullPath: string }[] = [];

  if (!fs.existsSync(CONTENT_DIR)) return results;

  const modules = fs.readdirSync(CONTENT_DIR, { withFileTypes: true });
  for (const mod of modules) {
    if (!mod.isDirectory()) continue;
    const modPath = path.join(CONTENT_DIR, mod.name);
    const files = fs.readdirSync(modPath);
    for (const file of files) {
      if (!file.endsWith(".mdx")) continue;
      results.push({
        module: mod.name,
        filename: file,
        fullPath: path.join(modPath, file),
      });
    }
  }
  return results;
}

// Extract slug from filename: "1-structure.mdx" -> "1-structure"
function fileToSlug(filename: string): string {
  return filename.replace(/\.mdx$/, "");
}

// Scan an MDX body for the interactive components that drive the sidebar
// progress dots. Each <Exercise> contributes one id (the slug of its `title`,
// which is the first attribute on the tag and unique within a chapter); a
// <Quiz> contributes the single quiz dot. Anchored on `<Exercise`/`<Quiz` so
// `title=` on other components (e.g. <ReadMore title="…">) is ignored.
function scanInteractive(body: string): { exerciseIds: string[]; hasQuiz: boolean } {
  const exerciseIds: string[] = [];
  for (const m of body.matchAll(/<Exercise\b[^>]*?title="([^"]*)"/g)) {
    exerciseIds.push(exerciseId(m[1]));
  }
  return { exerciseIds, hasQuiz: /<Quiz\b/.test(body) };
}

// Return all chapters sorted by module order then chapter order
export function getAllChapters(): ChapterMeta[] {
  const files = getMdxFiles();

  const chapters: ChapterMeta[] = files.map(({ module, filename, fullPath }) => {
    const slug = fileToSlug(filename);
    const raw = fs.readFileSync(fullPath, "utf-8");
    const { data, content } = matter(raw);
    const { exerciseIds, hasQuiz } = scanInteractive(content);
    return {
      module,
      slug,
      href: `/learn/${module}/${slug}`,
      frontmatter: data as LessonFrontmatter,
      exerciseIds,
      hasQuiz,
    };
  });

  // Sort: first by canonical module order, then by `order` within module
  chapters.sort((a, b) => {
    const ai = MODULE_ORDER.indexOf(a.module as never);
    const bi = MODULE_ORDER.indexOf(b.module as never);
    const modDiff = (ai === -1 ? 999 : ai) - (bi === -1 ? 999 : bi);
    if (modDiff !== 0) return modDiff;
    return (a.frontmatter.order ?? 0) - (b.frontmatter.order ?? 0);
  });

  return chapters;
}

// Group chapters by module (preserving sorted order)
export function getChaptersByModule(): Map<string, ChapterMeta[]> {
  const chapters = getAllChapters();
  const map = new Map<string, ChapterMeta[]>();
  for (const chapter of chapters) {
    const list = map.get(chapter.module) ?? [];
    list.push(chapter);
    map.set(chapter.module, list);
  }
  return map;
}

// Read a single chapter's raw MDX source + frontmatter
export function getChapter(
  module: string,
  slug: string
): { source: string; frontmatter: LessonFrontmatter } | null {
  const filePath = path.join(CONTENT_DIR, module, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);

  return {
    source: content,
    frontmatter: data as LessonFrontmatter,
  };
}

// Get prev/next chapter given current position
export function getPrevNext(
  module: string,
  slug: string
): { prev: ChapterMeta | null; next: ChapterMeta | null } {
  const chapters = getAllChapters();
  const idx = chapters.findIndex((c) => c.module === module && c.slug === slug);
  if (idx === -1) return { prev: null, next: null };
  return {
    prev: idx > 0 ? chapters[idx - 1] : null,
    next: idx < chapters.length - 1 ? chapters[idx + 1] : null,
  };
}

// Generate all [module, slug] pairs for generateStaticParams (if ever needed)
export function getAllParams(): { module: string; slug: string }[] {
  return getAllChapters().map((c) => ({ module: c.module, slug: c.slug }));
}
