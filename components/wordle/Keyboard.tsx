import type { KeyboardFeedback, TileFeedback } from "@/lib/wordle/types";

type KeyboardProps = {
  feedback: KeyboardFeedback;
  onDelete: () => void;
  onLetter: (letter: string) => void;
  onSubmit: () => void;
};

const KEY_ROWS = ["QWERTYUIOP", "ASDFGHJKL", "ZXCVBNM"];

const feedbackClassName: Record<TileFeedback, string> = {
  correct: "bg-tile-correct text-white",
  present: "bg-tile-present text-white",
  absent: "bg-tile-absent text-white",
};

function keyClassName(value: string, feedback: KeyboardFeedback): string {
  const state = feedback[value];

  return state
    ? feedbackClassName[state]
    : "bg-key text-key-foreground hover:bg-surface-border";
}

export function Keyboard({
  feedback,
  onDelete,
  onLetter,
  onSubmit,
}: Readonly<KeyboardProps>) {
  return (
    <div aria-label="On-screen keyboard" className="w-full max-w-130 space-y-1">
      {KEY_ROWS.map((row, rowIndex) => (
        <div className="flex justify-center gap-1" key={row}>
          {rowIndex === 2 ? (
            <button
              className="h-12 min-w-12 rounded-md bg-page-foreground px-1 text-xs font-black uppercase text-page"
              onClick={onSubmit}
              type="button"
            >
              Enter
            </button>
          ) : null}
          {row.split("").map((letter) => (
            <button
              aria-label={`Letter ${letter}${feedback[letter] ? `, ${feedback[letter]}` : ""}`}
              className={`h-12 flex-1 rounded-md px-1 text-sm font-black uppercase transition sm:text-base ${keyClassName(letter, feedback)}`}
              key={letter}
              onClick={() => onLetter(letter)}
              type="button"
            >
              {letter}
            </button>
          ))}
          {rowIndex === 2 ? (
            <button
              className="h-12 min-w-12 rounded-md bg-key px-1 text-xs font-black uppercase text-key-foreground transition hover:bg-surface-border"
              onClick={onDelete}
              type="button"
            >
              Delete
            </button>
          ) : null}
        </div>
      ))}
    </div>
  );
}
