import type { Guess, TileState } from "@/lib/wordle/types";
import { MAX_GUESSES, WORD_LENGTH } from "@/lib/wordle/game-state";

type GuessGridProps = {
  guesses: Guess[];
  activeGuess: string;
};

const stateClassName: Record<TileState, string> = {
  empty: "border-surface-border bg-tile-empty text-page-foreground",
  active: "border-page-foreground bg-tile-active text-page-foreground",
  correct: "border-tile-correct bg-tile-correct text-white",
  present: "border-tile-present bg-tile-present text-white",
  absent: "border-tile-absent bg-tile-absent text-white",
};

function labelForTile(
  letter: string,
  state: TileState,
  position: number,
): string {
  if (!letter) {
    return `Row tile ${position + 1}, empty`;
  }

  if (state === "active") {
    return `${letter}, not submitted`;
  }

  if (state === "empty") {
    return `${letter}, empty`;
  }

  return `${letter}, ${state}`;
}

export function GuessGrid({ guesses, activeGuess }: Readonly<GuessGridProps>) {
  return (
    <div
      aria-label="Guess grid"
      className="grid w-full max-w-85 grid-rows-6 gap-1.5"
      role="grid"
    >
      {Array.from({ length: MAX_GUESSES }).map((_, rowIndex) => {
        const submittedGuess = guesses[rowIndex];
        const isActiveRow = rowIndex === guesses.length;

        return (
          <div className="grid grid-cols-5 gap-1.5" key={rowIndex} role="row">
            {Array.from({ length: WORD_LENGTH }).map((__, columnIndex) => {
              const letter =
                submittedGuess?.word[columnIndex] ??
                (isActiveRow ? activeGuess[columnIndex] : "") ??
                "";
              const state: TileState = submittedGuess
                ? submittedGuess.feedback[columnIndex]
                : letter
                  ? "active"
                  : "empty";

              return (
                <div
                  aria-label={labelForTile(letter, state, columnIndex)}
                  className={`grid aspect-square min-h-0 place-items-center rounded-md border-2 text-2xl font-black uppercase leading-none ${stateClassName[state]}`}
                  key={columnIndex}
                  role="gridcell"
                >
                  {letter}
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}
