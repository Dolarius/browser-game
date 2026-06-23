# Quickstart: Local Player Statistics

## Prerequisites

- Dependencies installed from the existing lockfile.
- Existing Daily Wordle game available.
- Existing PWA offline reload support available for offline validation.
- Browser with local storage enabled.
- No backend, database, auth provider, Google account, external service, or
  paid service required.
- No automated tests are created or run for this feature.

## Allowed Verification Commands

```bash
npm run lint
npm run build
```

Use these commands plus manual browser inspection and production-mode runtime
checks. Do not run or add unit, integration, contract, end-to-end, coverage,
fixture, or TDD workflows.

## Zero-State Validation

1. Clear local browser site data for the app or use a fresh browser profile.
2. Open the app.
3. Create a local nickname profile.
4. Open the stats surface.
5. Confirm games played, wins, losses, current streak, max streak, and all six
   guess distribution buckets show zero values.
6. Confirm no reset, sign-in, sync, sharing, leaderboard, or paid-service
   controls are present.

## New Win Counting Validation

1. Start from a local profile whose stats show no counted games.
2. Complete a daily puzzle with a win after this feature is available.
3. Open the stats surface.
4. Confirm games played is 1, wins is 1, losses is 0, current streak is 1, max
   streak is 1, and exactly one guess distribution bucket increased for the
   number of submitted guesses.
5. Refresh the page five times.
6. Open the stats surface after each refresh and confirm totals do not change.

## New Loss Counting Validation

1. Use a local profile and an uncounted daily puzzle.
2. Complete the daily puzzle with a loss.
3. Open the stats surface.
4. Confirm games played and losses increased by one.
5. Confirm current streak is 0.
6. Confirm max streak did not decrease.
7. Confirm guess distribution did not change.

## Skipped-Day Streak Validation

1. Count a winning daily result.
2. Move to a later local calendar day that is not the immediate next day, or use
   the project owner's manual date-adjustment workflow.
3. Complete that later daily puzzle with a win.
4. Open the stats surface.
5. Confirm current streak is 1 instead of continuing the earlier streak.
6. Confirm max streak updates only if the restarted streak exceeds the prior max.

## Existing Completed Puzzle Non-Backfill Validation

1. Start from a browser profile that already has a completed daily puzzle from
   before this feature is implemented.
2. Open the app after the feature is available.
3. Open the stats surface.
4. Confirm the already-completed puzzle has not been counted.
5. Complete a later daily puzzle and confirm that later result is counted once.

## Offline Reload Validation

1. Build and start the app in production mode:

   ```bash
   npm run build
   npm run start
   ```

2. Open the app while online and ensure the existing offline app shell is
   prepared.
3. Count at least one completed game.
4. Open the stats surface and note the values.
5. Set browser DevTools Network to Offline.
6. Refresh the app in the same browser session.
7. Open the stats surface.
8. Confirm the same local stats values remain visible.

## Responsive Readability Validation

1. Open the stats surface on a narrow mobile viewport.
2. Confirm all labels, totals, streak values, and distribution rows are readable
   without overlap, clipping, or horizontal scrolling.
3. Repeat on a desktop viewport.

## Cleared Site Data Validation

1. Count at least one completed game.
2. Clear browser site data for the app.
3. Reopen the app.
4. Confirm local profile, puzzle progress, and statistics may be absent and the
   app returns to the local setup flow.
