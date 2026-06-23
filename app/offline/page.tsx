export default function OfflinePage() {
  return (
    <main className="flex min-h-dvh flex-1 items-center justify-center bg-page px-4 py-8 text-page-foreground">
      <section className="w-full max-w-md rounded-lg border border-surface-border bg-surface p-6 text-center shadow-sm">
        <p className="text-sm font-bold uppercase tracking-wide text-success">
          Offline
        </p>
        <h1 className="mt-3 text-2xl font-black">Open the game online first</h1>
        <p className="mt-3 text-sm leading-6 text-page-foreground/75">
          This browser needs one successful visit while the game is available
          before it can reload reliably offline. Reconnect, open Daily Wordle,
          then try offline refresh again.
        </p>
      </section>
    </main>
  );
}
