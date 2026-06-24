"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { getDisplayDate, getLocalDateKey } from "@/lib/wordle/date";
import {
  coercePuzzleForToday,
  createDailyPuzzle,
  getKeyboardFeedback,
  submitGuess,
  WORD_LENGTH,
} from "@/lib/wordle/game-state";
import { createDefaultStats, updateLocalPlayerStats } from "@/lib/wordle/stats";
import {
  canUseLocalStorage,
  readDailyPuzzle,
  readLocalPlayerStats,
  readProfile,
  saveDailyPuzzle,
  saveLocalPlayerStats,
  saveProfile,
} from "@/lib/wordle/storage";
import type {
  DailyPuzzleState,
  LocalPlayerProfile,
  LocalPlayerStats,
  RevealPresentationState,
  StorageFailure,
} from "@/lib/wordle/types";
import { GameHeader } from "./GameHeader";
import { GuessGrid } from "./GuessGrid";
import { Keyboard } from "./Keyboard";
import { NicknameForm } from "./NicknameForm";
import { ResultPanel } from "./ResultPanel";
import { StatsPlaceholder } from "./StatsPlaceholder";

type LoadState = "loading" | "ready" | "storage-error";

const REVEAL_STEP_MS = 260;
const REVEAL_SETTLE_MS = 220;

function usePrefersReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(() =>
    typeof window === "undefined"
      ? false
      : window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    function handleChange(event: MediaQueryListEvent) {
      setPrefersReducedMotion(event.matches);
    }

    mediaQuery.addEventListener("change", handleChange);

    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  return prefersReducedMotion;
}

export function DailyWordleGame() {
  const [loadState, setLoadState] = useState<LoadState>("loading");
  const [storageError, setStorageError] = useState<StorageFailure | null>(null);
  const [profile, setProfile] = useState<LocalPlayerProfile | null>(null);
  const [puzzle, setPuzzle] = useState<DailyPuzzleState | null>(null);
  const [stats, setStats] = useState<LocalPlayerStats>(createDefaultStats);
  const [activeGuess, setActiveGuess] = useState("");
  const [message, setMessage] = useState("");
  const [isStatsOpen, setIsStatsOpen] = useState(false);
  const [revealState, setRevealState] =
    useState<RevealPresentationState | null>(null);
  const [isUpdateAvailable, setIsUpdateAvailable] = useState(false);
  const [isUpdateApplying, setIsUpdateApplying] = useState(false);
  const returnFocusRef = useRef<HTMLElement | null>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  const dateKey = useMemo(() => getLocalDateKey(), []);
  const dateLabel = useMemo(() => getDisplayDate(), []);
  const visibleGuesses = useMemo(() => {
    if (!puzzle || !revealState?.isRevealing) {
      return puzzle?.guesses ?? [];
    }

    return puzzle.guesses.map((guess, rowIndex) => {
      if (rowIndex !== revealState.rowIndex) {
        return guess;
      }

      return {
        ...guess,
        feedback: guess.feedback.slice(0, revealState.visibleTileCount),
      };
    });
  }, [puzzle, revealState]);
  const keyboardFeedback = useMemo(
    () => getKeyboardFeedback(visibleGuesses),
    [visibleGuesses],
  );
  const isRevealInProgress = revealState?.isRevealing ?? false;

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
        const statsResult = readLocalPlayerStats();
        if (!statsResult.ok) {
          setStorageError(statsResult.error);
          setLoadState("storage-error");
          return;
        }

        setStats(statsResult.value ?? createDefaultStats());

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

  useEffect(() => {
    function handleUpdateAvailable() {
      setIsUpdateAvailable(true);
      setIsUpdateApplying(false);
    }

    window.addEventListener("daily-wordle-update-available", handleUpdateAvailable);

    return () =>
      window.removeEventListener(
        "daily-wordle-update-available",
        handleUpdateAvailable,
      );
  }, []);

  useEffect(() => {
    if (!revealState?.isRevealing) {
      return;
    }

    if (prefersReducedMotion) {
      const reducedMotionTimer = window.setTimeout(() => {
        setRevealState({
          rowIndex: revealState.rowIndex,
          visibleTileCount: WORD_LENGTH,
          isRevealing: false,
          completedRowIndex: revealState.rowIndex,
        });
      }, 1);

      return () => window.clearTimeout(reducedMotionTimer);
    }

    if (revealState.visibleTileCount >= WORD_LENGTH) {
      const settleTimer = window.setTimeout(() => {
        setRevealState({
          rowIndex: revealState.rowIndex,
          visibleTileCount: WORD_LENGTH,
          isRevealing: false,
          completedRowIndex: revealState.rowIndex,
        });
      }, REVEAL_SETTLE_MS);

      return () => window.clearTimeout(settleTimer);
    }

    const revealTimer = window.setTimeout(() => {
      setRevealState((current) =>
        current?.isRevealing && current.rowIndex === revealState.rowIndex
          ? {
              ...current,
              visibleTileCount: Math.min(
                current.visibleTileCount + 1,
                WORD_LENGTH,
              ),
            }
          : current,
      );
    }, REVEAL_STEP_MS);

    return () => window.clearTimeout(revealTimer);
  }, [prefersReducedMotion, revealState]);

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
      if (isRevealInProgress) {
        return;
      }

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
    [isRevealInProgress, puzzle],
  );

  const deleteLetter = useCallback(() => {
    if (isRevealInProgress) {
      return;
    }

    if (puzzle?.status !== "playing") {
      return;
    }

    setActiveGuess((current) => current.slice(0, -1));
    setMessage("");
  }, [isRevealInProgress, puzzle]);

  const submitActiveGuess = useCallback(() => {
    if (isRevealInProgress) {
      return;
    }

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

    if (puzzle.status === "playing" && result.state.status !== "playing") {
      const nextStats = updateLocalPlayerStats(stats, {
        dateKey: result.state.dateKey,
        status: result.state.status,
        guessCount: result.state.guesses.length,
        completedAt: result.state.completedAt ?? new Date().toISOString(),
      });
      const statsResult = saveLocalPlayerStats(nextStats);
      if (!statsResult.ok) {
        setStorageError(statsResult.error);
        setLoadState("storage-error");
        return;
      }

      setStats(nextStats);
    }

    setPuzzle(result.state);
    setActiveGuess("");
    setRevealState({
      rowIndex: result.state.guesses.length - 1,
      visibleTileCount: prefersReducedMotion ? WORD_LENGTH : 0,
      isRevealing: !prefersReducedMotion,
      completedRowIndex: prefersReducedMotion ? result.state.guesses.length - 1 : null,
    });
    setMessage(
      result.state.status === "won"
        ? "Solved."
        : result.state.status === "lost"
          ? `The answer was ${result.state.answer}.`
        : "Guess accepted.",
    );
  }, [activeGuess, isRevealInProgress, prefersReducedMotion, puzzle, stats]);

  const openStats = useCallback(() => {
    returnFocusRef.current =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;
    setIsStatsOpen(true);
  }, []);

  const closeStats = useCallback(() => {
    setIsStatsOpen(false);
    window.requestAnimationFrame(() => {
      returnFocusRef.current?.focus();
      returnFocusRef.current = null;
    });
  }, []);

  const applyUpdate = useCallback(() => {
    setIsUpdateApplying(true);
    window.dispatchEvent(new Event("daily-wordle-apply-update"));
  }, []);

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
        isUpdateApplying={isUpdateApplying}
        isUpdateAvailable={isUpdateAvailable}
        nickname={profile.nickname}
        onApplyUpdate={applyUpdate}
        onOpenStats={openStats}
      />
      <GuessGrid
        activeGuess={activeGuess}
        guesses={puzzle.guesses}
        revealState={revealState}
      />
      <p
        aria-live="polite"
        className="min-h-6 text-center text-sm font-semibold text-page-foreground"
      >
        {message}
      </p>
      <ResultPanel puzzle={puzzle} />
      <Keyboard
        disabled={isRevealInProgress}
        feedback={keyboardFeedback}
        onDelete={deleteLetter}
        onLetter={addLetter}
        onSubmit={submitActiveGuess}
      />
      {isStatsOpen ? (
        <StatsPlaceholder
          onClose={closeStats}
          stats={stats}
        />
      ) : null}
    </section>
  );
}
