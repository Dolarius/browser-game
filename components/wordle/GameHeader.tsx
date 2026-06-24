type GameHeaderProps = {
  dateLabel: string;
  isUpdateApplying: boolean;
  isUpdateAvailable: boolean;
  nickname: string;
  onApplyUpdate: () => void;
  onOpenStats: () => void;
};

export function GameHeader({
  dateLabel,
  isUpdateApplying,
  isUpdateAvailable,
  nickname,
  onApplyUpdate,
  onOpenStats,
}: Readonly<GameHeaderProps>) {
  return (
    <header className="flex w-full items-start justify-between gap-3">
      <div className="min-w-0">
        <h1 className="text-2xl font-black leading-none sm:text-3xl">
          Daily Wordle
        </h1>
        <p className="mt-1 truncate text-sm text-page-foreground/70">
          {dateLabel} | {nickname}
        </p>
      </div>
      <div className="flex shrink-0 flex-wrap justify-end gap-2">
        {isUpdateAvailable ? (
          <button
            aria-label="Refresh to update app"
            className="game-control min-h-10 rounded-md border border-success bg-success px-3 text-xs font-black uppercase text-white shadow-sm"
            disabled={isUpdateApplying}
            onClick={onApplyUpdate}
            type="button"
          >
            {isUpdateApplying ? "Updating" : "Update available"}
          </button>
        ) : null}
        <button
          aria-label="Open stats"
          className="game-control min-h-10 rounded-md border border-surface-border bg-surface px-3 text-sm font-bold uppercase text-page-foreground shadow-sm transition hover:bg-surface-muted"
          onClick={onOpenStats}
          type="button"
        >
          Stats
        </button>
      </div>
    </header>
  );
}
