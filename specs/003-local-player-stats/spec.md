# Feature Specification: Local Player Statistics

**Feature Branch**: `003-local-player-stats`

**Created**: 2026-06-23

**Status**: Draft

**Input**: User description: "Add local player statistics for the existing Daily Wordle browser game. Stats should begin counting only after this feature ships. Do not backfill or count any already-completed puzzle currently saved in localStorage before the feature exists. The next completed daily puzzle after implementation should be counted. Stats are tied to the local nickname profile in this browser. The feature remains local-only: no backend, no auth, no remote sync, no analytics, no external API calls, no paid services, and no automated tests. Track only core aggregate statistics: games played, wins, losses, current streak, max streak, guess distribution for wins in 1 through 6 guesses. Persist stats in localStorage using a compact shape. Use `lastCountedDateKey` to prevent double-counting the same daily puzzle after refresh or app reload. Because the app has only one active daily puzzle, do not store a full counted-date history. Keep this simple and easy to inspect or manipulate during manual validation. When a daily puzzle becomes completed: if its date key differs from `lastCountedDateKey`, update aggregate stats exactly once and set `lastCountedDateKey` to that puzzle date; if its date key equals `lastCountedDateKey`, do not update stats again; count both wins and losses; for wins, increment the guess distribution bucket matching the number of submitted guesses; for losses, increment losses and games played, but not guess distribution. Show the stats in the existing stats UI area currently represented by `StatsPlaceholder`. The UI should show only core totals, streaks, and guess distribution. Do not add reset controls in this feature. Do not add a latest-result summary unless needed to support the core stats display. The UI must remain simple, responsive, and readable on mobile and desktop. It should work offline after the app shell has been cached by the existing PWA feature. Clearing browser site data may remove profile, puzzle progress, and stats. Manual validation should verify a puzzle completed after this feature ships updates stats once; refreshing after completion does not double-count; the next daily puzzle can update stats when completed; stats persist across refresh and offline reload; stats are associated with the local nickname profile; existing solved puzzles from before the feature are not counted; no automated tests are created or run."

## Clarifications

### Session 2026-06-23

- Q: How should current streak behave when the player skips one or more calendar days? → A: Streak counts consecutive calendar-day wins; skipped days break the streak when the next result is counted.

## User Scenarios & Validation *(mandatory)*

### User Story 1 - Count New Completed Games (Priority: P1)

A player completes a daily puzzle after statistics are available and sees their local record update exactly once, so their results accumulate without manual bookkeeping.

**Why this priority**: The core value of statistics is accurate counting of completed daily games. Without this, the stats view would either be empty forever or misleading.

**Independent Validation**: Start from a local profile with no counted statistics, complete the next daily puzzle, open the stats view, and confirm games played, win/loss totals, streak values, and guess distribution reflect that single completed result.

**Acceptance Scenarios**:

1. **Given** a local player has not yet counted today's puzzle in statistics, the current streak is active, and the last counted daily date was the immediately preceding calendar day, **When** the player completes today's puzzle with a win, **Then** games played and wins increase by one, current streak increases by one, max streak updates when applicable, and the matching guess distribution bucket increases by one.
2. **Given** a local player has not yet counted today's puzzle in statistics, **When** the player completes today's puzzle with a loss, **Then** games played and losses increase by one, current streak resets, max streak remains unchanged unless already higher, and guess distribution does not change.
3. **Given** the current daily puzzle was already completed before this statistics feature existed, **When** the player opens the app after this feature is added, **Then** that already-completed puzzle is not added to statistics.

---

### User Story 2 - Prevent Duplicate Counting (Priority: P1)

A player can refresh, reopen, or reload the app after completing a daily puzzle without the same result being counted again.

**Why this priority**: Duplicate counting would quickly make the statistics untrustworthy because refreshing is a normal part of browser use and offline validation.

**Independent Validation**: Complete a daily puzzle once, record the displayed statistics, refresh or reopen the app multiple times, and confirm the statistics remain unchanged until a later daily puzzle is completed.

**Acceptance Scenarios**:

1. **Given** a completed daily puzzle has already been counted for its date, **When** the player refreshes the page, **Then** the statistics do not change.
2. **Given** a completed daily puzzle has already been counted for its date, **When** the player reopens the app later on the same date, **Then** the statistics do not change.
3. **Given** the player completes a later daily puzzle with a different daily date, **When** that result is completed, **Then** the later result is counted once.

---

### User Story 3 - View Core Local Statistics (Priority: P2)

A player opens the existing stats area and sees a compact summary of their local performance for the current nickname profile.

**Why this priority**: Counting results has player value only if the player can inspect the totals. The UI should replace the placeholder with useful statistics while staying simple.

**Independent Validation**: With a local profile and at least one counted completed game, open the stats area and verify the displayed totals, streaks, and guess distribution are readable on mobile and desktop.

**Acceptance Scenarios**:

1. **Given** a local player profile exists, **When** the player opens the stats area, **Then** the stats view shows games played, wins, losses, current streak, max streak, and guess distribution for one through six guesses.
2. **Given** no games have been counted yet, **When** the player opens the stats area, **Then** the stats view shows a clear empty state using zero values without implying prior results.
3. **Given** the player uses a mobile or desktop viewport, **When** the stats view is open, **Then** the content remains readable without clipped labels, overlapping values, or horizontal scrolling.

---

### User Story 4 - Keep Statistics Local and Offline-Compatible (Priority: P3)

A player can continue using the game and statistics locally, including after a cached offline reload, without accounts or remote services.

**Why this priority**: The game intentionally uses a local-only model. Statistics should preserve that model and not introduce sign-in, sync, or service dependencies.

**Independent Validation**: Count at least one completed game, refresh online and through the existing offline reload flow, and confirm the same local statistics are available without account prompts or remote service requirements.

**Acceptance Scenarios**:

1. **Given** local statistics exist for the current nickname profile, **When** the player refreshes the app online, **Then** the same statistics remain available.
2. **Given** local statistics exist and the app shell has been prepared for offline reload, **When** the player reloads the app offline, **Then** the stats view remains available with the same local values.
3. **Given** browser site data is cleared, **When** the player opens the app again, **Then** local profile, puzzle progress, and statistics may be absent and the app starts from the local setup flow.

### Edge Cases

- If a player has an already-completed daily puzzle from before this feature, that result is not backfilled into statistics.
- If a player refreshes after a completed puzzle has been counted, the result is not counted again.
- If the player completes a losing game, losses and games played update, current streak resets, and guess distribution remains unchanged.
- If the player completes a winning game in one through six guesses, only the matching guess distribution bucket updates.
- If the player skips one or more calendar days before the next counted win, current streak starts again from one for that next counted win.
- If local browser storage is unavailable or blocked, the app shows a clear local-storage failure state rather than fabricated statistics.
- If the local nickname profile is missing, statistics are not shown as belonging to an anonymous remote account.
- If browser site data is cleared, local statistics may be removed along with profile and puzzle progress.
- If the app is reloaded offline after the existing PWA offline support has cached the app shell, statistics remain readable from local browser data.
- If a future feature adds replayable past puzzles or archived days, the duplicate-counting rule may need to be revisited because this feature supports only one active daily puzzle.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The system MUST track local player statistics for the single active local nickname profile in the current browser.
- **FR-002**: The system MUST NOT backfill or count a daily puzzle that was already completed before this statistics feature is available.
- **FR-003**: The system MUST count a daily puzzle result only when a new completion occurs after this feature is available.
- **FR-004**: The system MUST track games played, wins, losses, current streak, max streak, and win guess distribution for one through six guesses.
- **FR-005**: The system MUST count each completed daily puzzle date no more than once for the local profile.
- **FR-006**: The system MUST use one last-counted daily date marker, named `lastCountedDateKey`, to prevent duplicate counting for the current one-puzzle-per-day model.
- **FR-007**: The system MUST NOT store a full history of counted daily dates in this feature.
- **FR-008**: When a completed puzzle date differs from `lastCountedDateKey`, the system MUST update aggregate statistics exactly once and then mark that date as counted.
- **FR-009**: When a completed puzzle date equals `lastCountedDateKey`, the system MUST leave aggregate statistics unchanged.
- **FR-010**: For a winning result, the system MUST increase games played, wins, max streak when applicable, and the guess distribution bucket matching the number of submitted guesses.
- **FR-011**: For a losing result, the system MUST increase games played and losses, reset current streak, and leave guess distribution unchanged.
- **FR-012**: The system MUST treat current streak as consecutive calendar-day wins.
- **FR-013**: If a winning result is counted while current streak is active and the result date is the calendar day immediately after `lastCountedDateKey`, the system MUST increase current streak by one.
- **FR-014**: If a winning result is counted after one or more skipped calendar days, the system MUST set current streak to one.
- **FR-015**: The system MUST show statistics in the existing stats area that currently communicates statistics are coming later.
- **FR-016**: The stats view MUST show only core totals, streaks, and guess distribution for this feature.
- **FR-017**: The stats view MUST provide a clear zero-value state when no completed games have been counted.
- **FR-018**: The stats view MUST remain readable and usable on mobile and desktop without overlapping text, clipped values, or horizontal scrolling.
- **FR-019**: The system MUST preserve the local-only model and MUST NOT add passwords, account sign-in, backend services, remote databases, remote sync, analytics, runtime external API calls, paid services, or Google account integration.
- **FR-020**: The system MUST NOT add reset controls, profile switching, detailed history, latest-result summaries, leaderboards, sharing, or cloud sync in this feature.
- **FR-021**: The system MUST keep statistics available after normal refreshes and after offline reloads supported by the existing offline app behavior, when browser site data has not been cleared.
- **FR-022**: The system MUST treat cleared browser site data as removing local statistics, just as it may remove local profile and puzzle progress.
- **FR-023**: The system MUST NOT create, require, or run automated tests, test fixtures, coverage workflows, or TDD artifacts for this feature.

### Key Entities

- **Local Player Statistics**: The aggregate performance record tied to the current local nickname profile, including games played, wins, losses, streaks, guess distribution, and the last counted daily date marker.
- **Last Counted Daily Date**: The single daily date marker used to identify whether the current daily puzzle result has already been counted.
- **Guess Distribution**: Six count buckets representing wins completed in one, two, three, four, five, or six guesses.
- **Counted Daily Result**: A completed daily puzzle outcome that updates aggregate statistics exactly once.
- **Local Nickname Profile**: The existing single local profile that owns the displayed statistics in the current browser.
- **Stats View**: The player-facing area opened from the stats button, replacing the current placeholder with core local statistics.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: After one new completed daily puzzle, the stats view reflects exactly one additional game played and the correct win or loss outcome.
- **SC-002**: After refreshing or reopening the app five times following a completed daily puzzle, the counted totals remain unchanged from the first count.
- **SC-003**: A daily puzzle completed before this feature is available contributes zero games to the initial statistics shown after the feature is added.
- **SC-004**: A later daily puzzle completed after this feature is available updates statistics exactly once.
- **SC-005**: For manually validated winning games, 100% of results increment exactly one guess distribution bucket matching the number of submitted guesses.
- **SC-006**: For manually validated losing games, 100% of results increment losses and games played without changing guess distribution.
- **SC-007**: After a manually validated skipped calendar day followed by a win, current streak restarts at one instead of continuing the earlier streak.
- **SC-008**: The stats view displays all required totals, streak values, and six guess-distribution buckets without clipped labels or overlapping values on common mobile and desktop widths.
- **SC-009**: Local statistics remain visible after normal refresh and after the existing offline reload flow when browser site data has not been cleared.
- **SC-010**: Manual validation confirms no account sign-in, backend, remote sync, analytics, external service, paid service, or automated testing workflow is introduced for statistics.

## Assumptions

- The app continues to support one active local nickname profile per browser.
- Statistics belong to that single local profile and are not shared across browsers or devices.
- Statistics start empty for this feature unless a new puzzle is completed after the feature is available.
- The current game model has only one active daily puzzle, so one last-counted daily date marker is enough to prevent duplicate counting.
- Streaks are based on consecutive local calendar-day wins, not merely consecutive played games.
- Changing the device or browser date during manual validation may expose a different daily puzzle, which is acceptable for this local-only feature.
- Clearing browser site data may remove nickname profile, daily puzzle progress, and statistics.
- Reset controls, account integration, cloud sync, detailed historical charts, and replayable archive support are intentionally left for future features.
