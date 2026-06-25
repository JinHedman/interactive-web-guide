import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getChapter, getPrevNext, getAllParams } from "@/lib/content";
import { getMDXComponents } from "@/components/mdx-components";
import PrevNext from "@/components/PrevNext";
import MarkRead from "@/components/MarkRead";

interface PageProps {
  params: Promise<{ module: string; slug: string }>;
}

export async function generateStaticParams() {
  return getAllParams();
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { module, slug } = await params;
  const chapter = getChapter(module, slug);
  if (!chapter) return {};
  return {
    title: chapter.frontmatter.title,
    description: chapter.frontmatter.goal,
  };
}

export default async function LessonPage({ params }: PageProps) {
  const { module, slug } = await params;
  const chapter = getChapter(module, slug);
  if (!chapter) notFound();

  const { source, frontmatter } = chapter;
  const chapterId = `${module}/${slug}`;
  const { prev, next } = getPrevNext(module, slug);
  const components = getMDXComponents(chapterId);

  return (
    <article
      style={{
        maxWidth: "820px",
        margin: "0 auto",
        padding: "40px 32px 64px",
        width: "100%",
      }}
    >
      {/* Mark as read on load */}
      <MarkRead chapterId={chapterId} />

      {/* Chapter header */}
      <header style={{ marginBottom: "32px" }}>
        <div
          style={{
            fontSize: "0.75rem",
            fontWeight: 600,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: "var(--brand)",
            marginBottom: "6px",
          }}
        >
          {frontmatter.module.toUpperCase()}
          {frontmatter.estMinutes && (
            <span
              style={{ color: "var(--fg-subtle)", fontWeight: 400, marginLeft: "12px" }}
            >
              {frontmatter.estMinutes} min
            </span>
          )}
        </div>
        <h1
          style={{
            fontSize: "2rem",
            fontWeight: 700,
            letterSpacing: "-0.02em",
            lineHeight: 1.2,
            margin: "0 0 12px",
            color: "var(--fg-base)",
          }}
        >
          {frontmatter.title}
        </h1>
        {frontmatter.goal && (
          <p
            style={{
              fontSize: "1.05rem",
              color: "var(--fg-muted)",
              margin: 0,
              lineHeight: 1.6,
            }}
          >
            {frontmatter.goal}
          </p>
        )}
      </header>

      {/* MDX body */}
      <div className="prose">
        <MDXRemote
          source={source}
          components={components}
          options={{
            parseFrontmatter: false, // already parsed by gray-matter
            mdxOptions: {
              remarkPlugins: [],
              rehypePlugins: [],
            },
          }}
        />
      </div>

      {/* Prev / Next navigation */}
      <PrevNext prev={prev} next={next} />
    </article>
  );
}
