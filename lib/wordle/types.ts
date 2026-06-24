export type TileFeedback = "correct" | "present" | "absent";

export type TileState = TileFeedback | "active" | "empty";

export type PuzzleStatus = "playing" | "won" | "lost";

export type KeyboardFeedback = Partial<Record<string, TileFeedback>>;

export type LocalPlayerProfile = {
  nickname: string;
  createdAt: string;
};

export type Guess = {
  word: string;
  feedback: TileFeedback[];
  submittedAt: string;
};

export type DailyPuzzleState = {
  dateKey: string;
  answer: string;
  guesses: Guess[];
  status: PuzzleStatus;
  completedAt: string | null;
};

export type GuessDistribution = [number, number, number, number, number, number];

export type LocalPlayerStats = {
  gamesPlayed: number;
  wins: number;
  losses: number;
  currentStreak: number;
  maxStreak: number;
  guessDistribution: GuessDistribution;
  lastCountedDateKey: string | null;
};

export type CountedDailyResult = {
  dateKey: string;
  status: Exclude<PuzzleStatus, "playing">;
  guessCount: number;
  completedAt: string;
};

export type StorageFailure = {
  kind: "unavailable" | "parse" | "write";
  message: string;
};
