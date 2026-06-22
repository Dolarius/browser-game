import type { TileFeedback } from "./types";

export function calculateTileFeedback(
  guess: string,
  answer: string,
): TileFeedback[] {
  const guessLetters = guess.toUpperCase().split("");
  const answerLetters = answer.toUpperCase().split("");
  const feedback: TileFeedback[] = Array(guessLetters.length).fill("absent");
  const remaining = new Map<string, number>();

  answerLetters.forEach((letter, index) => {
    if (guessLetters[index] === letter) {
      feedback[index] = "correct";
      return;
    }

    remaining.set(letter, (remaining.get(letter) ?? 0) + 1);
  });

  guessLetters.forEach((letter, index) => {
    if (feedback[index] === "correct") {
      return;
    }

    const count = remaining.get(letter) ?? 0;
    if (count > 0) {
      feedback[index] = "present";
      remaining.set(letter, count - 1);
    }
  });

  return feedback;
}
