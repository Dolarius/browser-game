type StatsPlaceholderProps = {
  onClose: () => void;
};

export function StatsPlaceholder({ onClose }: StatsPlaceholderProps) {
  return (
    <div
      aria-modal="true"
      className="fixed inset-0 z-10 grid place-items-center bg-black/45 px-4"
      role="dialog"
    >
      <section className="w-full max-w-sm rounded-lg border border-surface-border bg-surface p-5 text-page-foreground shadow-xl">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-lg font-black">Stats</h2>
            <p className="mt-2 text-sm leading-6 text-page-foreground/75">
              Detailed statistics will be added later. Today, your progress is
              saved only for the daily puzzle on this device.
            </p>
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
      </section>
    </div>
  );
}
