import type { LocalPlayerStats } from "@/lib/wordle/types";

type StatsPlaceholderProps = {
  onClose: () => void;
  stats: LocalPlayerStats;
};

const DISTRIBUTION_LABELS = ["1", "2", "3", "4", "5", "6"] as const;

export function StatsPlaceholder({ onClose, stats }: StatsPlaceholderProps) {
  const maxBucket = Math.max(...stats.guessDistribution, 1);
  const isEmpty = stats.gamesPlayed === 0;

  return (
    <div
      aria-modal="true"
      className="fixed inset-0 z-10 grid place-items-center bg-black/45 px-3 py-4"
      role="dialog"
    >
      <section className="max-h-full w-full max-w-lg overflow-y-auto rounded-lg border border-surface-border bg-surface p-5 text-page-foreground shadow-xl">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-lg font-black">Stats</h2>
            {isEmpty ? (
              <p className="mt-2 text-sm leading-6 text-page-foreground/75">
                New completed games will appear here.
              </p>
            ) : null}
          </div>
          <button
            aria-label="Close stats"
            className="h-10 rounded-md bg-page-foreground px-3 text-sm font-bold uppercase text-page"
            onClick={onClose}
            type="button"
          >
            Close
          </button>
        </div>
        <dl className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-5">
          <StatValue label="Played" value={stats.gamesPlayed} />
          <StatValue label="Wins" value={stats.wins} />
          <StatValue label="Losses" value={stats.losses} />
          <StatValue label="Current streak" value={stats.currentStreak} />
          <StatValue label="Max streak" value={stats.maxStreak} />
        </dl>
        <div className="mt-6">
          <h3 className="text-sm font-black uppercase text-page-foreground/75">
            Guess distribution
          </h3>
          <div className="mt-3 grid gap-2">
            {stats.guessDistribution.map((count, index) => (
              <div
                className="grid grid-cols-[1.5rem_minmax(0,1fr)_2rem] items-center gap-2 text-sm"
                key={DISTRIBUTION_LABELS[index]}
              >
                <span className="font-black">{DISTRIBUTION_LABELS[index]}</span>
                <div className="h-7 overflow-hidden rounded-sm bg-surface-muted">
                  <div
                    className="h-full bg-tile-correct"
                    style={{
                      width:
                        count === 0
                          ? "0%"
                          : `${Math.max((count / maxBucket) * 100, 10)}%`,
                    }}
                  />
                </div>
                <span className="text-right font-bold tabular-nums">
                  {count}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

function StatValue({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-md border border-surface-border bg-surface-muted p-3 text-center">
      <dt className="text-xs font-bold uppercase text-page-foreground/65">
        {label}
      </dt>
      <dd className="mt-1 text-2xl font-black tabular-nums">{value}</dd>
    </div>
  );
}
