// Central MDX component map.
// RSC-compatible: async components (CodeExample) live on server,
// client components (Quiz, Exercise) are Client Components.
// This file itself has no 'use client' — it exports a plain object.

import CodeExample from "./CodeExample";
import Quiz from "./Quiz";
import Exercise from "./Exercise";
import ReadMore from "./ReadMore";

export function getMDXComponents(chapterId: string) {
  return {
    // Custom components available in .mdx files
    CodeExample: (props: React.ComponentProps<typeof CodeExample>) => (
      <CodeExample {...props} />
    ),
    Quiz: (props: Omit<React.ComponentProps<typeof Quiz>, "chapterId">) => (
      <Quiz {...props} chapterId={chapterId} />
    ),
    Exercise: (
      props: Omit<React.ComponentProps<typeof Exercise>, "chapterId">
    ) => <Exercise {...props} chapterId={chapterId} />,
    ReadMore: (props: React.ComponentProps<typeof ReadMore>) => (
      <ReadMore {...props} />
    ),
    // Prose element overrides for in-prose `code` blocks (inline)
    code: ({ children, ...props }: React.HTMLAttributes<HTMLElement>) => (
      <code
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "0.875em",
          background: "var(--bg-subtle)",
          border: "1px solid var(--border)",
          borderRadius: "4px",
          padding: "0.1em 0.35em",
        }}
        {...props}
      >
        {children}
      </code>
    ),
  };
}
