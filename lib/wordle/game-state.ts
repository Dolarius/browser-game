import { calculateTileFeedback } from "./feedback";
import type { DailyPuzzleState, Guess, KeyboardFeedback, TileFeedback } from "./types";
import { isAllowedGuess, selectDailyAnswer, toGameWord } from "./words";

export const WORD_LENGTH = 5;
export const MAX_GUESSES = 6;

export type GuessResult =
  | { ok: true; state: DailyPuzzleState }
  | { ok: false; message: string };

const FEEDBACK_RANK: Record<TileFeedback, number> = {
  absent: 0,
  present: 1,
  correct: 2,
};

export function createDailyPuzzle(dateKey: string): DailyPuzzleState {
  return {
    dateKey,
    answer: selectDailyAnswer(dateKey),
    guesses: [],
    status: "playing",
    completedAt: null,
  };
}

export function submitGuess(
  state: DailyPuzzleState,
  value: string,
  now = new Date(),
): GuessResult {
  if (state.status !== "playing") {
    return { ok: false, message: "Today's puzzle is already complete." };
  }

  const word = toGameWord(value);

  if (word.length < WORD_LENGTH) {
    return { ok: false, message: "Enter 5 letters." };
  }

  if (word.length > WORD_LENGTH) {
    return { ok: false, message: "Only 5 letters fit." };
  }

  if (!/^[A-Z]{5}$/.test(word)) {
    return { ok: false, message: "Use letters only." };
  }

  if (!isAllowedGuess(word)) {
    return { ok: false, message: "That word is not in the list." };
  }

  const feedback = calculateTileFeedback(word, state.answer);
  const guess: Guess = {
    word,
    feedback,
    submittedAt: now.toISOString(),
  };
  const guesses = [...state.guesses, guess];
  const won = word === state.answer;
  const lost = !won && guesses.length >= MAX_GUESSES;
  const status = won ? "won" : lost ? "lost" : "playing";

  return {
    ok: true,
    state: {
      ...state,
      guesses,
      status,
      completedAt: status === "playing" ? null : now.toISOString(),
    },
  };
}

export function getKeyboardFeedback(guesses: Guess[]): KeyboardFeedback {
  return guesses.reduce<KeyboardFeedback>((feedback, guess) => {
    guess.word.split("").forEach((letter, index) => {
      const nextFeedback = guess.feedback[index];
      const currentFeedback = feedback[letter];

      if (
        !currentFeedback ||
        FEEDBACK_RANK[nextFeedback] > FEEDBACK_RANK[currentFeedback]
      ) {
        feedback[letter] = nextFeedback;
      }
    });

    return feedback;
  }, {});
}

export function coercePuzzleForToday(
  savedState: DailyPuzzleState | null,
  dateKey: string,
): DailyPuzzleState {
  if (!savedState || savedState.dateKey !== dateKey) {
    return createDailyPuzzle(dateKey);
  }

  return savedState;
}
