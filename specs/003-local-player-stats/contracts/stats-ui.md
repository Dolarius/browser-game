# Stats UI Contract: Local Player Statistics

This feature exposes no backend API. The contract is the browser-visible stats
behavior for the existing Daily Wordle game.

## Entry Point

- Existing stats button in the game header opens the stats surface.
- The stats surface replaces the current placeholder content.
- The stats surface remains dismissible through the existing close action.

## Display Contract

The stats surface shows only:

- games played
- wins
- losses
- current streak
- max streak
- guess distribution for wins in 1 through 6 guesses

The stats surface does not show:

- reset controls
- sign-in prompts
- Google account integration
- backend or sync messaging
- analytics, sharing, leaderboards, or paid-service messaging
- detailed historical game list
- latest-result summary unless it is required only to clarify the core totals

## Zero-State Contract

- When no games have been counted, all totals are shown as zero values.
- The view must not imply that already-completed pre-feature puzzles were
  counted.
- The view must remain concise and understandable.

## Counting Contract

- Completing a new daily puzzle after this feature is available updates stats
  exactly once.
- Refreshing or reopening after a counted completion does not change stats.
- Winning games update games played, wins, streaks, and exactly one guess
  distribution bucket.
- Losing games update games played and losses, reset current streak, and do not
  update guess distribution.
- Streaks are consecutive local calendar-day wins; skipped days break current
  streak when the next result is counted.

## Local Persistence Contract

- Stats belong to the current local nickname profile in this browser.
- Stats remain available after normal refresh when browser site data remains.
- Stats remain visible after the existing PWA offline reload flow when browser
  site data remains.
- Clearing browser site data may remove profile, puzzle progress, and stats.

## Responsive Contract

- Mobile and desktop layouts must show labels and values without overlap.
- Guess distribution buckets must remain readable without horizontal scrolling.
- The modal/surface must fit common narrow mobile widths and desktop viewports.

## Manual Validation Contract

- Validate at least one win count, one loss count, duplicate prevention after
  refresh, skipped-day streak restart, zero state, mobile layout, desktop
  layout, and offline reload visibility.
- Do not use automated tests, fixtures, coverage tools, or TDD workflows.
