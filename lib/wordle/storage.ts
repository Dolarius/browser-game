import type {
  DailyPuzzleState,
  LocalPlayerProfile,
  LocalPlayerStats,
  StorageFailure,
} from "./types";

export const PROFILE_STORAGE_KEY = "wordle:profile";
export const STATS_STORAGE_KEY = "wordle:stats";

type StorageResult<T> =
  | { ok: true; value: T }
  | { ok: false; error: StorageFailure };

function unavailable(): StorageFailure {
  return {
    kind: "unavailable",
    message: "Local storage is unavailable on this device.",
  };
}

export function dailyPuzzleStorageKey(dateKey: string): string {
  return `wordle:daily:${dateKey}`;
}

export function canUseLocalStorage(): boolean {
  if (typeof window === "undefined") {
    return false;
  }

  try {
    const key = "wordle:storage-check";
    window.localStorage.setItem(key, key);
    window.localStorage.removeItem(key);
    return true;
  } catch {
    return false;
  }
}

export function readJson<T>(key: string): StorageResult<T | null> {
  if (!canUseLocalStorage()) {
    return { ok: false, error: unavailable() };
  }

  try {
    const item = window.localStorage.getItem(key);

    return { ok: true, value: item ? (JSON.parse(item) as T) : null };
  } catch {
    return {
      ok: false,
      error: {
        kind: "parse",
        message: "Saved local game data could not be read.",
      },
    };
  }
}

export function writeJson<T>(key: string, value: T): StorageResult<true> {
  if (!canUseLocalStorage()) {
    return { ok: false, error: unavailable() };
  }

  try {
    window.localStorage.setItem(key, JSON.stringify(value));

    return { ok: true, value: true };
  } catch {
    return {
      ok: false,
      error: {
        kind: "write",
        message: "Saved local game data could not be updated.",
      },
    };
  }
}

export function removeItem(key: string): StorageResult<true> {
  if (!canUseLocalStorage()) {
    return { ok: false, error: unavailable() };
  }

  try {
    window.localStorage.removeItem(key);

    return { ok: true, value: true };
  } catch {
    return {
      ok: false,
      error: {
        kind: "write",
        message: "Saved local game data could not be removed.",
      },
    };
  }
}

export function readProfile(): StorageResult<LocalPlayerProfile | null> {
  return readJson<LocalPlayerProfile>(PROFILE_STORAGE_KEY);
}

export function saveProfile(profile: LocalPlayerProfile): StorageResult<true> {
  return writeJson(PROFILE_STORAGE_KEY, profile);
}

export function readDailyPuzzle(
  dateKey: string,
): StorageResult<DailyPuzzleState | null> {
  return readJson<DailyPuzzleState>(dailyPuzzleStorageKey(dateKey));
}

export function saveDailyPuzzle(state: DailyPuzzleState): StorageResult<true> {
  return writeJson(dailyPuzzleStorageKey(state.dateKey), state);
}

export function readLocalPlayerStats(): StorageResult<LocalPlayerStats | null> {
  return readJson<LocalPlayerStats>(STATS_STORAGE_KEY);
}

export function saveLocalPlayerStats(
  stats: LocalPlayerStats,
): StorageResult<true> {
  return writeJson(STATS_STORAGE_KEY, stats);
}
