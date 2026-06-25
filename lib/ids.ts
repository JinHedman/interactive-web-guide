// Stable per-exercise id derived from its title. Used in two places that must
// agree exactly: the content loader (lib/content.ts) enumerates a chapter's
// exercises to size the sidebar progress dots, and the Exercise component
// (components/Exercise.tsx) marks/reads its own completion. Exercise titles are
// unique within a chapter, so the slug is a reliable key with no authoring
// changes. Pure + dependency-free so it can run on the server and the client.
export function exerciseId(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
