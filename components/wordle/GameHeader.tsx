type GameHeaderProps = {
  dateLabel: string;
  nickname: string;
  onOpenStats: () => void;
};

export function GameHeader({
  dateLabel,
  nickname,
  onOpenStats,
}: Readonly<GameHeaderProps>) {
  return (
    <header className="flex w-full items-center justify-between gap-3">
      <div className="min-w-0">
        <h1 className="text-2xl font-black leading-none sm:text-3xl">
          Daily Wordle
        </h1>
        <p className="mt-1 truncate text-sm text-page-foreground/70">
          {dateLabel} | {nickname}
        </p>
      </div>
      <button
        aria-label="Open stats"
        className="h-11 shrink-0 rounded-md border border-surface-border bg-surface px-3 text-sm font-bold uppercase text-page-foreground shadow-sm transition hover:bg-surface-muted"
        onClick={onOpenStats}
        type="button"
      >
        Stats
      </button>
    </header>
  );
}
