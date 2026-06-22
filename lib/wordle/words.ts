import { ALLOWED_GUESSES } from "@/data/words/allowed-guesses";
import { ANSWER_WORDS } from "@/data/words/answers";
import { getDayOffset } from "./date";

const WORD_PATTERN = /^[a-z]{5}$/;

export function normalizeWord(value: string): string {
  return value.trim().toLowerCase();
}

export function toGameWord(value: string): string {
  return normalizeWord(value).toUpperCase();
}

export function isFiveLetterWord(value: string): boolean {
  return WORD_PATTERN.test(normalizeWord(value));
}

export function selectDailyAnswer(dateKey: string): string {
  const index = getDayOffset(dateKey) % ANSWER_WORDS.length;

  return ANSWER_WORDS[index].toUpperCase();
}

export function isAllowedGuess(value: string): boolean {
  const normalized = normalizeWord(value);

  return ALLOWED_GUESSES.includes(normalized) || ANSWER_WORDS.includes(normalized);
}

export function isAnswerWord(value: string): boolean {
  return ANSWER_WORDS.includes(normalizeWord(value));
}
