"use client";

import { useEffect, useId, useReducer } from "react";
import type { QuizQuestion } from "@/lib/types";
import { setQuizScore, type ProgressEventDetail } from "@/lib/progress";

export interface QuizProps {
  questions: QuizQuestion[];
  chapterId?: string; // e.g. "html/1-structure" — used to persist score
}

// ─── State machine ───────────────────────────────────────────────────────────
interface QuestionState {
  answered: boolean;
  correct: boolean | null;
  selected: number | string | null; // selected option index (MC) or typed value (fill-in)
}

interface State {
  questions: QuestionState[];
  finished: boolean;
}

type Action =
  | { type: "SELECT"; qi: number; value: number | string }
  | { type: "FINISH" }
  | { type: "RESET" };

function initState(count: number): State {
  return {
    questions: Array.from({ length: count }, () => ({
      answered: false,
      correct: null,
      selected: null,
    })),
    finished: false,
  };
}

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "SELECT": {
      const qs = [...state.questions];
      qs[action.qi] = { ...qs[action.qi], selected: action.value };
      return { ...state, questions: qs };
    }
    case "FINISH":
      return { ...state, finished: true };
    case "RESET":
      return initState(state.questions.length);
    default:
      return state;
  }
}

// ─── Component ────────────────────────────────────────────────────────────────
export default function Quiz({ questions = [], chapterId }: QuizProps) {
  const uid = useId();
  const [state, dispatch] = useReducer(reducer, questions.length, initState);

  // Track per-question submitted state locally (outside reducer for simplicity)
  const [submitted, setSubmitted] = useMapState<boolean>(questions.length);

  const score = computeScore(questions, state.questions);

  // Persist score when quiz is finished
  useEffect(() => {
    if (state.finished && chapterId) {
      setQuizScore(chapterId, score);
    }
  }, [state.finished, chapterId, score]);

  // Return to a fresh, re-takeable state when this chapter is reset (per-chapter
  // "Reset this section" or the global "Reset all progress").
  useEffect(() => {
    function onProgress(e: Event) {
      const detail = (e as CustomEvent<ProgressEventDetail>).detail;
      if (!detail) return;
      const affectsUs =
        detail.kind === "clear-all" ||
        (detail.kind === "reset-chapter" && detail.chapterId === chapterId);
      if (affectsUs) {
        dispatch({ type: "RESET" });
        setSubmitted(-1, false); // clear all per-question submitted flags
      }
    }
    window.addEventListener("guide:progress", onProgress);
    return () => window.removeEventListener("guide:progress", onProgress);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chapterId]);

  function handleSelect(qi: number, value: number | string) {
    if (submitted.get(qi)) return;
    dispatch({ type: "SELECT", qi, value });
  }

  function handleSubmitQuestion(qi: number) {
    if (submitted.get(qi)) return;
    if (state.questions[qi].selected === null) return;
    setSubmitted(qi, true);
  }

  function handleFinish() {
    dispatch({ type: "FINISH" });
  }

  function handleReset() {
    dispatch({ type: "RESET" });
    setSubmitted(-1, false); // reset all
  }

  const allAnswered = state.questions.every((_, i) => submitted.get(i));

  return (
    <section
      aria-label="Chapter quiz"
      style={{
        margin: "2rem 0",
        background: "var(--bg-surface)",
        border: "1px solid var(--border)",
        borderRadius: "10px",
        overflow: "hidden",
      }}
    >
      {/* Header */}
      <div
        style={{
          padding: "14px 20px",
          background: "var(--brand-light)",
          borderBottom: "1px solid var(--border)",
          display: "flex",
          alignItems: "center",
          gap: "10px",
        }}
      >
        <span style={{ fontSize: "1.1rem" }} aria-hidden>
          &#x2753;
        </span>
        <span
          style={{ fontWeight: 600, fontSize: "0.95rem", color: "var(--brand)" }}
        >
          Quiz — {questions.length} question{questions.length !== 1 ? "s" : ""}
        </span>
      </div>

      {/* Questions */}
      <div style={{ padding: "20px" }}>
        {questions.map((q, qi) => {
          const qState = state.questions[qi];
          const isSubmitted = submitted.get(qi);
          const isCorrect = isSubmitted
            ? checkCorrect(q, qState.selected)
            : null;

          return (
            <QuestionItem
              key={q.id}
              question={q}
              qi={qi}
              uid={uid}
              selected={qState.selected}
              submitted={!!isSubmitted}
              isCorrect={isCorrect}
              finished={state.finished}
              onSelect={(val) => handleSelect(qi, val)}
              onSubmit={() => handleSubmitQuestion(qi)}
            />
          );
        })}

        {/* Actions */}
        <div
          style={{
            marginTop: "16px",
            display: "flex",
            alignItems: "center",
            gap: "12px",
            flexWrap: "wrap",
          }}
        >
          {!state.finished && allAnswered && (
            <button
              onClick={handleFinish}
              style={primaryBtn}
            >
              See final score
            </button>
          )}

          {state.finished && (
            <>
              <div
                style={{
                  fontWeight: 600,
                  fontSize: "1rem",
                  color: score >= 80 ? "var(--progress-read)" : "var(--brand)",
                }}
                role="status"
              >
                Score: {score}% ({Math.round((score / 100) * questions.length)}/{questions.length})
              </div>
              <button onClick={handleReset} style={secondaryBtn}>
                Try again
              </button>
            </>
          )}
        </div>
      </div>
    </section>
  );
}

// ─── QuestionItem ─────────────────────────────────────────────────────────────
function QuestionItem({
  question,
  qi,
  uid,
  selected,
  submitted,
  isCorrect,
  finished,
  onSelect,
  onSubmit,
}: {
  question: QuizQuestion;
  qi: number;
  uid: string;
  selected: number | string | null;
  submitted: boolean;
  isCorrect: boolean | null;
  finished: boolean;
  onSelect: (val: number | string) => void;
  onSubmit: () => void;
}) {
  return (
    <div
      style={{
        marginBottom: "24px",
        paddingBottom: "20px",
        borderBottom: "1px solid var(--border)",
      }}
    >
      <p
        style={{ fontWeight: 500, marginBottom: "12px", fontSize: "0.95rem" }}
      >
        <span style={{ color: "var(--fg-muted)", marginRight: "6px" }}>
          {qi + 1}.
        </span>
        {question.prompt}
      </p>

      {question.type === "multiple-choice" ? (
        <McOptions
          question={question}
          qi={qi}
          uid={uid}
          selected={selected as number | null}
          submitted={submitted}
          finished={finished}
          onSelect={(i) => onSelect(i)}
        />
      ) : (
        <FillInInput
          question={question}
          qi={qi}
          uid={uid}
          value={(selected as string) ?? ""}
          submitted={submitted}
          onChange={(v) => onSelect(v)}
          onSubmit={onSubmit}
        />
      )}

      {/* Submit button per question */}
      {!submitted && (
        <button
          onClick={onSubmit}
          disabled={selected === null}
          style={{
            ...secondaryBtn,
            marginTop: "10px",
            opacity: selected === null ? 0.45 : 1,
          }}
        >
          Check answer
        </button>
      )}

      {/* Feedback */}
      {submitted && (
        <div
          role="status"
          aria-live="polite"
          style={{
            marginTop: "10px",
            padding: "10px 14px",
            borderRadius: "6px",
            fontSize: "0.875rem",
            background: isCorrect
              ? "color-mix(in srgb, var(--progress-read) 12%, transparent)"
              : "color-mix(in srgb, #ef4444 12%, transparent)",
            color: isCorrect ? "var(--progress-read)" : "#dc2626",
            border: `1px solid ${isCorrect ? "var(--progress-read)" : "#fca5a5"}`,
          }}
        >
          <strong>{isCorrect ? "Correct!" : "Not quite."}</strong>
          {question.explanation && (
            <span style={{ display: "block", marginTop: "4px", color: "var(--fg-muted)", fontWeight: 400 }}>
              {question.explanation}
            </span>
          )}
        </div>
      )}
    </div>
  );
}

// ─── Multiple choice options ───────────────────────────────────────────────────
function McOptions({
  question,
  qi,
  uid,
  selected,
  submitted,
  finished,
  onSelect,
}: {
  question: Extract<QuizQuestion, { type: "multiple-choice" }>;
  qi: number;
  uid: string;
  selected: number | null;
  submitted: boolean;
  finished: boolean;
  onSelect: (i: number) => void;
}) {
  const groupName = `${uid}-q${qi}`;

  return (
    <div role="radiogroup" aria-label={question.prompt} style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
      {question.options.map((opt, i) => {
        const optId = `${groupName}-opt${i}`;
        const isSelected = selected === i;
        const isAnswer = i === question.answer;

        let borderColor = "var(--border)";
        let bgColor = "transparent";
        if (submitted) {
          if (isAnswer) { borderColor = "var(--progress-read)"; bgColor = "color-mix(in srgb, var(--progress-read) 10%, transparent)"; }
          else if (isSelected && !isAnswer) { borderColor = "#ef4444"; bgColor = "color-mix(in srgb, #ef4444 10%, transparent)"; }
        } else if (isSelected) {
          borderColor = "var(--brand)";
          bgColor = "var(--brand-light)";
        }

        return (
          <label
            key={i}
            htmlFor={optId}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              padding: "8px 12px",
              borderRadius: "6px",
              border: `1px solid ${borderColor}`,
              background: bgColor,
              cursor: submitted ? "default" : "pointer",
              fontSize: "0.9rem",
              transition: "border-color 0.12s, background 0.12s",
            }}
          >
            <input
              type="radio"
              id={optId}
              name={groupName}
              value={i}
              checked={isSelected}
              disabled={submitted}
              onChange={() => onSelect(i)}
              style={{ accentColor: "var(--brand)" }}
            />
            <span>{opt}</span>
            {submitted && isAnswer && (
              <span style={{ marginLeft: "auto", color: "var(--progress-read)", fontWeight: 600, fontSize: "0.8rem" }}>
                Correct
              </span>
            )}
          </label>
        );
      })}
    </div>
  );
}

// ─── Fill-in input ────────────────────────────────────────────────────────────
function FillInInput({
  question,
  qi,
  uid,
  value,
  submitted,
  onChange,
  onSubmit,
}: {
  question: Extract<QuizQuestion, { type: "fill-in" }>;
  qi: number;
  uid: string;
  value: string;
  submitted: boolean;
  onChange: (v: string) => void;
  onSubmit: () => void;
}) {
  const inputId = `${uid}-q${qi}-fill`;
  return (
    <div>
      <label htmlFor={inputId} style={{ display: "none" }}>
        {question.prompt}
      </label>
      <input
        id={inputId}
        type="text"
        value={value}
        disabled={submitted}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Type your answer…"
        style={{
          width: "100%",
          maxWidth: "320px",
          padding: "8px 12px",
          borderRadius: "6px",
          border: "1px solid var(--border)",
          fontSize: "0.9rem",
          fontFamily: "var(--font-mono)",
          background: "var(--bg-base)",
          color: "var(--fg-base)",
          outline: "none",
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !submitted && value.trim() !== "") {
            e.preventDefault();
            onSubmit();
          }
        }}
      />
    </div>
  );
}

// ─── Helpers ──────────────────────────────────────────────────────────────────
function checkCorrect(
  question: QuizQuestion,
  selected: number | string | null
): boolean {
  if (selected === null) return false;
  if (question.type === "multiple-choice") {
    return (selected as number) === question.answer;
  }
  // fill-in: trimmed, case-insensitive
  const normalized = String(selected).trim().toLowerCase();
  const accepted = [
    question.answer,
    ...(question.accept ?? []),
  ].map((a) => a.trim().toLowerCase());
  return accepted.includes(normalized);
}

function computeScore(
  questions: QuizQuestion[],
  states: QuestionState[]
): number {
  if (questions.length === 0) return 0;
  const correct = questions.filter((q, i) =>
    checkCorrect(q, states[i].selected)
  ).length;
  return Math.round((correct / questions.length) * 100);
}

// Simple hook for per-question boolean map
function useMapState<T>(count: number) {
  const [map, setMap] = useReducer(
    (prev: Map<number, T>, action: { key: number; val: T; resetAll?: boolean }) => {
      const next = new Map(prev);
      if (action.resetAll) {
        for (let i = 0; i < count; i++) next.delete(i);
      } else {
        next.set(action.key, action.val);
      }
      return next;
    },
    new Map<number, T>()
  );

  function set(key: number, val: T) {
    if (key === -1) {
      setMap({ key: -1, val, resetAll: true });
    } else {
      setMap({ key, val });
    }
  }

  return [map, set] as const;
}

// ─── Shared button styles ─────────────────────────────────────────────────────
const primaryBtn: React.CSSProperties = {
  padding: "9px 18px",
  background: "var(--brand)",
  color: "#fff",
  border: "none",
  borderRadius: "6px",
  fontWeight: 600,
  fontSize: "0.875rem",
  cursor: "pointer",
};

const secondaryBtn: React.CSSProperties = {
  padding: "7px 14px",
  background: "none",
  color: "var(--brand)",
  border: "1px solid var(--brand)",
  borderRadius: "6px",
  fontWeight: 500,
  fontSize: "0.875rem",
  cursor: "pointer",
};
