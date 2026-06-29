"use client";

import { useEffect, useId, useState } from "react";
import Link from "next/link";
import type { QuizQuestion } from "@/lib/types";
import {
  useReviewItems,
  removeReviewItem,
  type ReviewItem,
} from "@/lib/review";
import { useHasMounted } from "@/lib/useProgress";

/**
 * Spaced-review surface (/review). Re-asks the quiz questions the learner has
 * missed, one at a time, reusing the Quiz multiple-choice / fill-in feedback
 * style. A CORRECT answer removes the item from the queue (retrieval succeeded);
 * a wrong answer keeps it for next time. Empty → encouraging empty state.
 *
 * Hydration-safe: returns a stable placeholder until mounted (useHasMounted),
 * since the queue lives in localStorage and is empty on the server.
 *
 * PILOT SCOPE: no spacing schedule — every stored miss is eligible immediately.
 */
export default function ReviewQueue() {
  const mounted = useHasMounted();
  const items = useReviewItems();

  if (!mounted) {
    // Stable first-paint placeholder (matches server: empty). Avoids a flash of
    // the empty state before localStorage is read.
    return <div aria-hidden style={{ minHeight: 220 }} />;
  }

  if (items.length === 0) {
    return <ReviewEmpty />;
  }

  return <ReviewSession items={items} />;
}

// ─── Empty state ──────────────────────────────────────────────────────────────
function ReviewEmpty() {
  return (
    <div className="review-empty">
      <div className="review-empty-icon" aria-hidden>
        ✓
      </div>
      <h2 className="review-empty-title">Nothing to review</h2>
      <p className="review-empty-body">
        Questions you miss in chapter quizzes land here so you can re-try them
        until they stick. Nothing waiting right now — keep going, and any quiz
        question you miss will show up here.
      </p>
      <Link href="/" className="review-empty-link">
        Back to the curriculum
      </Link>
    </div>
  );
}

// ─── Active session ───────────────────────────────────────────────────────────
function ReviewSession({ items }: { items: ReviewItem[] }) {
  const total = items.length;

  // Index into the live `items` array. When an item is removed (answered
  // correctly), the array shrinks; we clamp the cursor so it keeps pointing at
  // a valid item (or wraps to the start of what remains).
  const [cursor, setCursor] = useState(0);
  const safeCursor = total === 0 ? 0 : cursor % total;
  const current = items[safeCursor];

  // Per-attempt UI state, reset whenever we move to a different question.
  const [selected, setSelected] = useState<number | string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  // Stable key for the question currently shown — reset attempt state on change.
  const currentKey = current ? `${current.chapterId}::${current.question.id}` : null;
  useEffect(() => {
    setSelected(null);
    setSubmitted(false);
  }, [currentKey]);

  if (!current) return <ReviewEmpty />;

  const q = current.question;
  const isCorrect = submitted ? checkCorrect(q, selected) : null;

  function handleSubmit() {
    if (submitted || selected === null) return;
    setSubmitted(true);
  }

  function handleNext() {
    const correct = checkCorrect(q, selected);
    if (correct) {
      // Mastered for now — drop it. The array shrinks; cursor stays put so it
      // naturally lands on the next item (clamped by safeCursor above).
      removeReviewItem(current.chapterId, q.id);
    } else {
      // Keep it; advance past it so the learner cycles through the rest first.
      setCursor((c) => c + 1);
    }
    // Attempt state resets via the currentKey effect once the item changes; if
    // the same item somehow remains, reset explicitly.
    setSelected(null);
    setSubmitted(false);
  }

  return (
    <div className="review-session">
      <header className="review-session-head">
        <span className="review-session-count">
          {total} question{total !== 1 ? "s" : ""} to review
        </span>
        <Link href={`/learn/${current.chapterId}`} className="review-session-source">
          {current.chapterTitle ?? prettyChapter(current.chapterId)} ↗
        </Link>
      </header>

      <ReviewQuestion
        key={currentKey ?? "none"}
        question={q}
        selected={selected}
        submitted={submitted}
        isCorrect={isCorrect}
        onSelect={setSelected}
        onSubmit={handleSubmit}
      />

      <div className="review-session-actions">
        {!submitted && (
          <button
            type="button"
            className="review-btn-primary"
            disabled={selected === null}
            onClick={handleSubmit}
          >
            Check answer
          </button>
        )}
        {submitted && (
          <button type="button" className="review-btn-primary" onClick={handleNext}>
            {isCorrect ? "Got it — next" : "Keep for later — next"}
          </button>
        )}
      </div>
    </div>
  );
}

// ─── One question (mirrors Quiz QuestionItem styling) ──────────────────────────
function ReviewQuestion({
  question,
  selected,
  submitted,
  isCorrect,
  onSelect,
  onSubmit,
}: {
  question: QuizQuestion;
  selected: number | string | null;
  submitted: boolean;
  isCorrect: boolean | null;
  onSelect: (val: number | string) => void;
  onSubmit: () => void;
}) {
  const uid = useId();

  return (
    <div className="review-question">
      <p className="review-question-prompt">{question.prompt}</p>

      {question.type === "multiple-choice" ? (
        <div
          role="radiogroup"
          aria-label={question.prompt}
          style={{ display: "flex", flexDirection: "column", gap: 8 }}
        >
          {question.options.map((opt, i) => {
            const optId = `${uid}-opt${i}`;
            const isSelected = selected === i;
            const isAnswer = i === question.answer;

            let cls = "review-option";
            if (submitted) {
              if (isAnswer) cls += " is-answer";
              else if (isSelected && !isAnswer) cls += " is-wrong";
            } else if (isSelected) {
              cls += " is-selected";
            }

            return (
              <label key={i} htmlFor={optId} className={cls}>
                <input
                  type="radio"
                  id={optId}
                  name={`${uid}-group`}
                  value={i}
                  checked={isSelected}
                  disabled={submitted}
                  onChange={() => onSelect(i)}
                  style={{ accentColor: "var(--brand)" }}
                />
                <span>{opt}</span>
                {submitted && isAnswer && (
                  <span className="review-option-tag">Correct</span>
                )}
              </label>
            );
          })}
        </div>
      ) : (
        <input
          type="text"
          className="review-fill"
          value={(selected as string) ?? ""}
          disabled={submitted}
          onChange={(e) => onSelect(e.target.value)}
          placeholder="Type your answer…"
          aria-label={question.prompt}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !submitted && String(selected ?? "").trim() !== "") {
              e.preventDefault();
              onSubmit();
            }
          }}
        />
      )}

      {submitted && (
        <div
          role="status"
          aria-live="polite"
          className={`review-feedback ${isCorrect ? "is-correct" : "is-wrong"}`}
        >
          <strong>{isCorrect ? "Correct!" : "Not quite."}</strong>
          {question.explanation && (
            <span className="review-feedback-explain">{question.explanation}</span>
          )}
        </div>
      )}
    </div>
  );
}

// ─── Helpers ──────────────────────────────────────────────────────────────────
// Same correctness rule as Quiz.tsx (MC index match; fill-in trimmed,
// case-insensitive, with optional `accept` synonyms).
function checkCorrect(question: QuizQuestion, selected: number | string | null): boolean {
  if (selected === null) return false;
  if (question.type === "multiple-choice") {
    return (selected as number) === question.answer;
  }
  const normalized = String(selected).trim().toLowerCase();
  const accepted = [question.answer, ...(question.accept ?? [])].map((a) =>
    a.trim().toLowerCase()
  );
  return accepted.includes(normalized);
}

// "javascript/6-loops" → "JavaScript · Loops"-ish fallback label when the
// stored item predates chapterTitle capture.
function prettyChapter(chapterId: string): string {
  const [mod, slug = ""] = chapterId.split("/");
  const title = slug
    .replace(/^\d+-/, "")
    .replace(/-/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
  return title || mod;
}
