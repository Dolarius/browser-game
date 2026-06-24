import type { DailyPuzzleState } from "@/lib/wordle/types";

type ResultPanelProps = {
  puzzle: DailyPuzzleState;
};

export function ResultPanel({ puzzle }: ResultPanelProps) {
  if (puzzle.status === "playing") {
    return null;
  }

  const won = puzzle.status === "won";

  return (
    <section
      className="w-full rounded-lg border border-surface-border bg-surface p-4 text-center shadow-sm"
    >
      <h2 className="text-lg font-black">{won ? "Solved" : "Puzzle complete"}</h2>
      <p className="mt-1 text-sm text-page-foreground/75">
        {won
          ? `Finished in ${puzzle.guesses.length} ${puzzle.guesses.length === 1 ? "guess" : "guesses"}.`
          : `The answer was ${puzzle.answer}.`}
      </p>
    </section>
  );
}
