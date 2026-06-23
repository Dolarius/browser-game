# Browser Game

A Next.js browser game project. The home screen is an offline daily
Wordle-style five-letter puzzle with one local nickname profile, bundled word
lists, on-screen and physical keyboard input, daily progress persistence, and a
stats placeholder.

The game has no backend, database, login, remote sync, or paid service
dependency. Profile and puzzle progress are stored in this browser only.

The expanded allowed-guess list was generated from Datamuse `/words` pattern
queries, filtered, and bundled with the app so gameplay does not call the
network at runtime.

## Getting Started

Install dependencies from the existing lockfile, then run the development
server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

Allowed validation commands:

```bash
npm run lint
npm run build
```

## Offline Reload Validation

Offline reload support is active only in production builds. To validate it,
run `npm run build`, then `npm run start`, and open
[http://localhost:3000](http://localhost:3000). Create or use a local nickname,
submit at least one valid guess, then set the browser network state to Offline
in DevTools and refresh the page in the same browser session. The game should
load from saved files and restore the nickname, guesses, tile feedback, and
current puzzle state from this browser's local storage.

Normal development mode should stay uncached. After clearing prior localhost
site data where practical, run `npm run dev`, open
[http://localhost:3000](http://localhost:3000), and confirm the browser did not
register this feature's service worker. Development refreshes should show local
edits without being hidden by offline cached app files.

If an offline reload is attempted before the game shell has been saved, the
browser should show the simple `/offline` fallback instead of a blank page or a
network error.

## Offline Cache Maintenance

The service worker uses a manually maintained cache version string in
`public/sw.js`. Bump `daily-wordle-v1` whenever offline caching behavior,
offline fallback behavior, manifest metadata, or cached app-shell/static asset
expectations change. The activation step removes older Daily Wordle cache
groups after a new version takes control.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
