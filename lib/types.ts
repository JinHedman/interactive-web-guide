// Lesson frontmatter shape — matches lesson-authoring SKILL.md exactly
export interface LessonFrontmatter {
  title: string;
  module: string;
  order: number;
  goal: string;
  objectives?: string[];
  estMinutes?: number;
  prerequisites?: string[];
}

// Canonical module order for sidebar grouping
export const MODULE_ORDER = [
  "setup",
  "html",
  "css",
  "javascript",
  "integration",
  "workflow",
] as const;

export type ModuleId = (typeof MODULE_ORDER)[number];

// A resolved chapter for navigation / sidebar use
export interface ChapterMeta {
  module: string;
  slug: string;
  href: string; // /learn/<module>/<slug>
  frontmatter: LessonFrontmatter;
}

// Quiz question types — matches interactive-content SKILL.md exactly
export interface MultipleChoiceQuestion {
  id: string;
  type: "multiple-choice";
  prompt: string;
  options: string[];
  answer: number; // index of correct option
  explanation?: string;
}

export interface FillInQuestion {
  id: string;
  type: "fill-in";
  prompt: string;
  answer: string; // trimmed, case-insensitive match
  accept?: string[]; // optional extra accepted strings
  explanation?: string;
}

export type QuizQuestion = MultipleChoiceQuestion | FillInQuestion;

// Per-chapter progress shape
export interface ChapterProgress {
  read: boolean;
  exerciseDone: boolean;
  quizScore: number | null;
}

// Global progress metadata (not tied to a single chapter)
export interface ProgressMeta {
  // Chapter id ("<module>/<slug>") of the most recently opened chapter, or null.
  lastVisited: string | null;
}
