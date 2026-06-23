# Research: Local Player Statistics

## Decision: Keep statistics local and profile-scoped

**Rationale**: The game already uses one local nickname profile and daily puzzle
state in the browser. Statistics should preserve that model so the feature
works offline, requires no account setup, and does not introduce backend,
remote sync, analytics, or paid services. This also keeps validation simple:
manual browser checks can inspect a single local profile and its aggregate
stats.

**Alternatives considered**:

- Account-based stats: rejected for this feature because sign-in alone would
  not provide durable cross-device storage and would require auth, backend
  decisions, privacy considerations, and sync behavior outside the feature
  scope.
- Browser-wide stats not tied to the nickname: rejected because the spec
  explicitly says statistics belong to the local nickname profile.

## Decision: Start stats empty and count only new completion events

**Rationale**: The feature must not backfill an already-completed puzzle from
before the stats feature exists. Counting only the moment when a puzzle
transitions from playing to won or lost avoids scanning existing completed
state on load and prevents surprise inflation for current players.

**Alternatives considered**:

- Backfill the current completed puzzle when stats are first available:
  rejected because the spec explicitly excludes already-solved puzzles.
- Infer missing historical stats from saved puzzle data: rejected because the
  current app stores only the active daily puzzle and has no reliable history.

## Decision: Use `lastCountedDateKey` as the duplicate-count guard

**Rationale**: The game has one active daily puzzle. A single last-counted date
is enough to prevent refresh/reopen double-counting while keeping local data
small and easy to inspect during manual validation.

**Alternatives considered**:

- Store all counted date keys: rejected because it is unnecessary for the
  current one-daily-puzzle model and adds avoidable local data growth.
- Store no duplicate marker: rejected because refreshes and app reloads could
  count the same completed result multiple times.

## Decision: Treat streaks as consecutive calendar-day wins

**Rationale**: The game is date-based, and the clarification states skipped
calendar days break the current streak when the next result is counted. A win
after a skipped day starts the current streak at one; a loss resets current
streak to zero.

**Alternatives considered**:

- Consecutive played-game wins: rejected because skipped days would not break
  streaks and would conflict with the clarification.
- Consecutive completed days regardless of outcome: rejected because losses
  must reset the current streak.

## Decision: Replace the stats placeholder with a compact stats surface

**Rationale**: The existing stats button and placeholder already establish the
player journey. Replacing that surface with core totals avoids adding routes,
navigation, reset controls, detailed history, sharing, or other out-of-scope
features. The stats view should remain readable on mobile and desktop.

**Alternatives considered**:

- Dedicated stats page: rejected because it adds navigation surface not needed
  for compact aggregate stats.
- Rich charts/history: rejected because the spec requires only core totals,
  streaks, and guess distribution.

## Decision: Validate with manual browser flows only

**Rationale**: The constitution prohibits automated tests, fixtures, coverage,
and TDD. The feature can be validated with controlled manual puzzle completion,
refresh/reopen checks, date changes for skipped-day scenarios, offline reload
inspection, linting, and production build checks.

**Alternatives considered**:

- Unit tests for stats calculation: rejected by the no-automated-tests rule.
- End-to-end browser automation: rejected by the no-automated-tests rule.
