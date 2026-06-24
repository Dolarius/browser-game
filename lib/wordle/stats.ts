import type { CountedDailyResult, LocalPlayerStats } from "./types";

const DAY_MS = 86_400_000;

export function createDefaultStats(): LocalPlayerStats {
  return {
    gamesPlayed: 0,
    wins: 0,
    losses: 0,
    currentStreak: 0,
    maxStreak: 0,
    guessDistribution: [0, 0, 0, 0, 0, 0],
    lastCountedDateKey: null,
  };
}

export function updateLocalPlayerStats(
  stats: LocalPlayerStats,
  result: CountedDailyResult,
): LocalPlayerStats {
  if (stats.lastCountedDateKey === result.dateKey) {
    return stats;
  }

  if (result.status === "lost") {
    return {
      ...stats,
      gamesPlayed: stats.gamesPlayed + 1,
      losses: stats.losses + 1,
      currentStreak: 0,
      lastCountedDateKey: result.dateKey,
    };
  }

  const currentStreak = isNextCalendarDay(
    stats.lastCountedDateKey,
    result.dateKey,
  )
    ? stats.currentStreak + 1
    : 1;
  const guessDistribution = [
    ...stats.guessDistribution,
  ] as LocalPlayerStats["guessDistribution"];
  const guessIndex = result.guessCount - 1;

  if (guessIndex >= 0 && guessIndex < guessDistribution.length) {
    guessDistribution[guessIndex] += 1;
  }

  return {
    ...stats,
    gamesPlayed: stats.gamesPlayed + 1,
    wins: stats.wins + 1,
    currentStreak,
    maxStreak: Math.max(stats.maxStreak, currentStreak),
    guessDistribution,
    lastCountedDateKey: result.dateKey,
  };
}

function isNextCalendarDay(
  previousDateKey: string | null,
  nextDateKey: string,
): boolean {
  if (!previousDateKey) {
    return false;
  }

  return (
    dateKeyToDayNumber(nextDateKey) - dateKeyToDayNumber(previousDateKey) === 1
  );
}

function dateKeyToDayNumber(dateKey: string): number {
  const [year, month, day] = dateKey.split("-").map(Number);

  return Math.floor(Date.UTC(year, month - 1, day) / DAY_MS);
}
