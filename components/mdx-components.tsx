// Central MDX component map.
// RSC-compatible: async components (CodeExample) live on server,
// client components (Quiz, Exercise) are Client Components.
// This file itself has no 'use client' — it exports a plain object.

import CodeExample from "./CodeExample";
import Quiz from "./Quiz";
import ExerciseServer from "./ExerciseServer";
import ReadMore from "./ReadMore";
import DocsLinks from "./DocsLinks";
import DocRef from "./DocRef";
import InShort from "./InShort";
import WhyItMatters from "./WhyItMatters";
import { lookupReference } from "@/lib/references";

export function getMDXComponents(chapterId: string) {
  // Chapter module ("html" | "css" | "javascript" | …) disambiguates inline-code
  // doc references (a bare token can be both a CSS property and a JS identifier).
  const module = chapterId.split("/")[0];

  return {
    // Custom components available in .mdx files
    CodeExample: (props: React.ComponentProps<typeof CodeExample>) => (
      <CodeExample {...props} />
    ),
    Quiz: (props: Omit<React.ComponentProps<typeof Quiz>, "chapterId">) => (
      <Quiz {...props} chapterId={chapterId} />
    ),
    Exercise: (
      props: Omit<React.ComponentProps<typeof ExerciseServer>, "chapterId">
    ) => <ExerciseServer {...props} chapterId={chapterId} />,
    ReadMore: (props: React.ComponentProps<typeof ReadMore>) => (
      <ReadMore {...props} />
    ),
    InShort: (props: React.ComponentProps<typeof InShort>) => (
      <InShort {...props} />
    ),
    WhyItMatters: (props: React.ComponentProps<typeof WhyItMatters>) => (
      <WhyItMatters {...props} />
    ),
    DocsLinks: (props: React.ComponentProps<typeof DocsLinks>) => (
      <DocsLinks {...props} />
    ),
    // Heading remap: the lesson page <h1> (frontmatter title) is the single
    // authoritative h1. MDX `#`..`####` are shifted down one semantic level so
    // document outline stays logical, while keeping their original visual rank
    // via the .prose-h* classes.
    h1: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
      <h2 className="prose-h1" {...props} />
    ),
    h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
      <h3 className="prose-h2" {...props} />
    ),
    h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
      <h4 className="prose-h3" {...props} />
    ),
    h4: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
      <h5 className="prose-h4" {...props} />
    ),
    // Inline `code` in prose. If the token is a known HTML tag / CSS property /
    // JS reference, render the interactive <DocRef> (links to MDN + W3Schools);
    // otherwise render plain styled inline code.
    code: ({ children, ...props }: React.HTMLAttributes<HTMLElement>) => {
      if (typeof children === "string") {
        const ref = lookupReference(children, module);
        if (ref) return <DocRef text={children} reference={ref} />;
      }
      return (
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
      );
    },
  };
}
