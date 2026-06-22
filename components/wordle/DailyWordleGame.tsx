"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { getDisplayDate, getLocalDateKey } from "@/lib/wordle/date";
import {
  coercePuzzleForToday,
  createDailyPuzzle,
  getKeyboardFeedback,
  submitGuess,
  WORD_LENGTH,
} from "@/lib/wordle/game-state";
import {
  canUseLocalStorage,
  readDailyPuzzle,
  readProfile,
  saveDailyPuzzle,
  saveProfile,
} from "@/lib/wordle/storage";
import type {
  DailyPuzzleState,
  LocalPlayerProfile,
  StorageFailure,
} from "@/lib/wordle/types";
import { GameHeader } from "./GameHeader";
import { GuessGrid } from "./GuessGrid";
import { Keyboard } from "./Keyboard";
import { NicknameForm } from "./NicknameForm";
import { ResultPanel } from "./ResultPanel";
import { StatsPlaceholder } from "./StatsPlaceholder";

type LoadState = "loading" | "ready" | "storage-error";

export function DailyWordleGame() {
  const [loadState, setLoadState] = useState<LoadState>("loading");
  const [storageError, setStorageError] = useState<StorageFailure | null>(null);
  const [profile, setProfile] = useState<LocalPlayerProfile | null>(null);
  const [puzzle, setPuzzle] = useState<DailyPuzzleState | null>(null);
  const [activeGuess, setActiveGuess] = useState("");
  const [message, setMessage] = useState("");
  const [isStatsOpen, setIsStatsOpen] = useState(false);

  const dateKey = useMemo(() => getLocalDateKey(), []);
  const dateLabel = useMemo(() => getDisplayDate(), []);
  const keyboardFeedback = useMemo(
    () => getKeyboardFeedback(puzzle?.guesses ?? []),
    [puzzle?.guesses],
  );

  useEffect(() => {
    queueMicrotask(() => {
      if (!canUseLocalStorage()) {
        setStorageError({
          kind: "unavailable",
          message: "Local profile and puzzle progress cannot be saved here.",
        });
        setLoadState("storage-error");
        return;
      }

      const profileResult = readProfile();
      if (!profileResult.ok) {
        setStorageError(profileResult.error);
        setLoadState("storage-error");
        return;
      }

      setProfile(profileResult.value);

      if (profileResult.value) {
        const puzzleResult = readDailyPuzzle(dateKey);
        if (!puzzleResult.ok) {
          setStorageError(puzzleResult.error);
          setLoadState("storage-error");
          return;
        }

        const nextPuzzle = coercePuzzleForToday(puzzleResult.value, dateKey);
        if (puzzleResult.value?.dateKey !== dateKey) {
          const saveResult = saveDailyPuzzle(nextPuzzle);
          if (!saveResult.ok) {
            setStorageError(saveResult.error);
            setLoadState("storage-error");
            return;
          }
        }
        setPuzzle(nextPuzzle);
      }

      setLoadState("ready");
    });
  }, [dateKey]);

  const handleSaveProfile = useCallback(
    (nickname: string) => {
      const nextProfile = {
        nickname,
        createdAt: new Date().toISOString(),
      };
      const profileResult = saveProfile(nextProfile);
      if (!profileResult.ok) {
        setStorageError(profileResult.error);
        setLoadState("storage-error");
        return;
      }

      const nextPuzzle = createDailyPuzzle(dateKey);
      const puzzleResult = saveDailyPuzzle(nextPuzzle);
      if (!puzzleResult.ok) {
        setStorageError(puzzleResult.error);
        setLoadState("storage-error");
        return;
      }

      setProfile(nextProfile);
      setPuzzle(nextPuzzle);
    },
    [dateKey],
  );

  const addLetter = useCallback(
    (letter: string) => {
      if (puzzle?.status !== "playing") {
        setMessage("Today's puzzle is already complete.");
        return;
      }

      setActiveGuess((current) => {
        if (current.length >= WORD_LENGTH) {
          setMessage("Only 5 letters fit.");
          return current;
        }

        setMessage("");
        return `${current}${letter.toUpperCase()}`;
      });
    },
    [puzzle],
  );

  const deleteLetter = useCallback(() => {
    if (puzzle?.status !== "playing") {
      return;
    }

    setActiveGuess((current) => current.slice(0, -1));
    setMessage("");
  }, [puzzle]);

  const submitActiveGuess = useCallback(() => {
    if (!puzzle) {
      return;
    }

    const result = submitGuess(puzzle, activeGuess);
    if (!result.ok) {
      setMessage(result.message);
      return;
    }

    const saveResult = saveDailyPuzzle(result.state);
    if (!saveResult.ok) {
      setStorageError(saveResult.error);
      setLoadState("storage-error");
      return;
    }

    setPuzzle(result.state);
    setActiveGuess("");
    setMessage(
      result.state.status === "won"
        ? "Solved."
        : result.state.status === "lost"
          ? `The answer was ${result.state.answer}.`
          : "Guess accepted.",
    );
  }, [activeGuess, puzzle]);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (
        event.altKey ||
        event.ctrlKey ||
        event.metaKey ||
        event.target instanceof HTMLInputElement ||
        event.target instanceof HTMLTextAreaElement
      ) {
        return;
      }

      if (/^[a-zA-Z]$/.test(event.key)) {
        event.preventDefault();
        addLetter(event.key);
        return;
      }

      if (event.key === "Backspace" || event.key === "Delete") {
        event.preventDefault();
        deleteLetter();
        return;
      }

      if (event.key === "Enter") {
        event.preventDefault();
        submitActiveGuess();
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [addLetter, deleteLetter, submitActiveGuess]);

  if (loadState === "loading") {
    return <p className="text-sm text-page-foreground/70">Loading...</p>;
  }

  if (loadState === "storage-error") {
    return (
      <section className="w-full max-w-md rounded-lg border border-surface-border bg-surface p-5 text-center shadow-sm">
        <h1 className="text-xl font-black">Local storage unavailable</h1>
        <p className="mt-3 text-sm leading-6 text-page-foreground/75">
          {storageError?.message ??
            "Local profile and puzzle progress cannot be saved on this device."}
        </p>
      </section>
    );
  }

  if (!profile) {
    return (
      <section className="grid w-full justify-items-center gap-4">
        <div className="text-center">
          <h1 className="text-3xl font-black">Daily Wordle</h1>
          <p className="mt-2 text-sm text-page-foreground/70">
            Create one local profile for this browser.
          </p>
        </div>
        <NicknameForm onSave={handleSaveProfile} />
      </section>
    );
  }

  if (!puzzle) {
    return (
      <p className="text-sm text-page-foreground/70">Preparing puzzle...</p>
    );
  }

  return (
    <section className="flex w-full max-w-140 flex-col items-center gap-4">
      <GameHeader
        dateLabel={dateLabel}
        nickname={profile.nickname}
        onOpenStats={() => setIsStatsOpen(true)}
      />
      <GuessGrid activeGuess={activeGuess} guesses={puzzle.guesses} />
      <p
        aria-live="polite"
        className="min-h-6 text-center text-sm font-semibold text-page-foreground"
      >
        {message}
      </p>
      <ResultPanel puzzle={puzzle} />
      <Keyboard
        feedback={keyboardFeedback}
        onDelete={deleteLetter}
        onLetter={addLetter}
        onSubmit={submitActiveGuess}
      />
      {isStatsOpen ? (
        <StatsPlaceholder onClose={() => setIsStatsOpen(false)} />
      ) : null}
    </section>
  );
}
