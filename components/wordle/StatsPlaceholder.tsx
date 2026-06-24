import { useEffect, useRef } from "react";
import type { LocalPlayerStats } from "@/lib/wordle/types";

type StatsPlaceholderProps = {
  onClose: () => void;
  stats: LocalPlayerStats;
};

const DISTRIBUTION_LABELS = ["1", "2", "3", "4", "5", "6"] as const;

export function StatsPlaceholder({ onClose, stats }: StatsPlaceholderProps) {
  const dialogRef = useRef<HTMLElement | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  const maxBucket = Math.max(...stats.guessDistribution, 1);
  const isEmpty = stats.gamesPlayed === 0;

  useEffect(() => {
    closeButtonRef.current?.focus();

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }

      if (event.key !== "Tab" || !dialogRef.current) {
        return;
      }

      const focusableElements = Array.from(
        dialogRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
        ),
      ).filter((element) => !element.hasAttribute("disabled"));

      if (focusableElements.length === 0) {
        return;
      }

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <div
      aria-modal="true"
      className="fixed inset-0 z-10 grid place-items-center bg-black/45 px-3 py-4"
      aria-labelledby="stats-title"
      role="dialog"
    >
      <section
        className="max-h-full w-full max-w-lg overflow-y-auto rounded-lg border border-surface-border bg-surface p-5 text-page-foreground shadow-xl"
        ref={dialogRef}
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-lg font-black" id="stats-title">
              Stats
            </h2>
            {isEmpty ? (
              <p className="mt-2 text-sm leading-6 text-page-foreground/75">
                New completed games will appear here.
              </p>
            ) : null}
          </div>
          <button
            aria-label="Close stats"
            className="game-control h-10 rounded-md bg-page-foreground px-3 text-sm font-bold uppercase text-page"
            ref={closeButtonRef}
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
