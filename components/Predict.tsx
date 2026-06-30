"use client";

import { useEffect, useId, useRef, useState, type ReactNode } from "react";

export interface PredictProps {
  /** The question posed to the reader, e.g. "What does this log to the console?" */
  prompt: string;
  /** The answer content (MDX children) — revealed only after the reader commits. */
  children: ReactNode;
}

/**
 * Predict-the-output card (retrieval practice).
 *
 * Flow: the reader sees the `prompt`, optionally types a prediction, then
 * presses "Reveal answer" to expose the `children` (the real answer). After
 * reveal a lightweight self-check row ("Were you right?") appears. The
 * thumbs are visual-only for this pilot — no persistence.
 *
 * Pairs with a preceding <CodeExample> that shows the code WITHOUT a `preview`,
 * so the reader has to reason about the output before seeing it run.
 *
 * Styling lives in `.predict` (app/globals.css), token-based for both themes.
 */
export default function Predict({ prompt, children }: PredictProps) {
  const uid = useId();
  const inputId = `${uid}-predict-input`;

  const [revealed, setRevealed] = useState(false);
  // Visual-only self-check; not persisted (pilot scope).
  const [verdict, setVerdict] = useState<"right" | "wrong" | null>(null);

  // The reveal button unmounts on click, so move focus into the revealed answer
  // — otherwise keyboard / screen-reader users get dropped to <body>.
  const answerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (revealed) answerRef.current?.focus();
  }, [revealed]);

  return (
    <section className="predict" aria-label="Predict the output">
      <span className="predict-eyebrow">Predict</span>
      <p className="predict-prompt">{prompt}</p>

      {!revealed && (
        <>
          <label htmlFor={inputId} className="predict-input-label">
            Your prediction (optional)
          </label>
          <textarea
            id={inputId}
            className="predict-input"
            rows={2}
            placeholder="Type your prediction…"
            spellCheck={false}
          />
          <div className="predict-actions">
            <button
              type="button"
              className="predict-reveal"
              onClick={() => setRevealed(true)}
            >
              Reveal answer
            </button>
          </div>
        </>
      )}

      {revealed && (
        <>
          <div className="predict-answer" ref={answerRef} tabIndex={-1}>
            <span className="predict-answer-label">Answer</span>
            {children}
          </div>

          <div className="predict-selfcheck" role="group" aria-label="Were you right?">
            <span className="predict-selfcheck-q">Were you right?</span>
            <button
              type="button"
              className="predict-thumb"
              aria-pressed={verdict === "right"}
              data-active={verdict === "right" ? "true" : undefined}
              onClick={() => setVerdict("right")}
            >
              <span aria-hidden>👍</span> Yes
            </button>
            <button
              type="button"
              className="predict-thumb"
              aria-pressed={verdict === "wrong"}
              data-active={verdict === "wrong" ? "true" : undefined}
              onClick={() => setVerdict("wrong")}
            >
              <span aria-hidden>👎</span> Not quite
            </button>
          </div>
        </>
      )}
    </section>
  );
}
