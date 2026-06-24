# Tasks: Local Player Statistics

**Input**: Design documents from `/specs/003-local-player-stats/`
**Prerequisites**: plan.md (required), spec.md (required), research.md, data-model.md, contracts/

**Tests**: Automated tests are intentionally omitted. The project constitution requires validation through manual browser checks, static analysis, linting, type checking, and `npm run build` only.

**Organization**: Tasks are grouped by user story to enable independent implementation and validation.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependency on another incomplete task)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Phase 1: Setup (Shared Context)

**Purpose**: Confirm current constraints and existing implementation shape before editing.

- [X] T001 Review `/Users/alexvrabie/Sites/browser-game/.specify/memory/constitution.md`, `/Users/alexvrabie/Sites/browser-game/specs/003-local-player-stats/spec.md`, and `/Users/alexvrabie/Sites/browser-game/specs/003-local-player-stats/plan.md` for the no-automated-tests, local-only, dependency-free constraints
- [X] T002 Inspect `/Users/alexvrabie/Sites/browser-game/package.json` to confirm the declared Next.js, React, TypeScript, Tailwind CSS, and ESLint versions and avoid dependency changes
- [X] T003 [P] Inspect the existing daily puzzle state and completion flow in `/Users/alexvrabie/Sites/browser-game/components/wordle/DailyWordleGame.tsx`
- [X] T004 [P] Inspect the existing localStorage helpers in `/Users/alexvrabie/Sites/browser-game/lib/wordle/storage.ts`
- [X] T005 [P] Inspect the existing placeholder stats UI in `/Users/alexvrabie/Sites/browser-game/components/wordle/StatsPlaceholder.tsx`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Add the shared statistics model and helpers required by all user stories.

**Critical**: No user story work should begin until these tasks are complete.

- [X] T006 Add compact `LocalPlayerStats` and related statistics types to `/Users/alexvrabie/Sites/browser-game/lib/wordle/types.ts`
- [X] T007 Add localStorage read/write helpers for local player statistics in `/Users/alexvrabie/Sites/browser-game/lib/wordle/storage.ts`
- [X] T008 Create default stats, duplicate-count guard, win/loss aggregation, guess distribution, and streak calculation helpers in `/Users/alexvrabie/Sites/browser-game/lib/wordle/stats.ts`
- [X] T009 Ensure statistics helpers in `/Users/alexvrabie/Sites/browser-game/lib/wordle/stats.ts` use `lastCountedDateKey` only and do not store a full counted-date history
- [X] T010 Ensure statistics storage in `/Users/alexvrabie/Sites/browser-game/lib/wordle/storage.ts` uses a compact local-only shape and does not introduce backend, auth, sync, analytics, external API calls, or dependencies

**Checkpoint**: Statistics data model and pure update behavior are ready for integration.

---

## Phase 3: User Story 1 - Count New Completed Games (Priority: P1)

**Goal**: Count the first new completed daily puzzle after implementation without backfilling already-completed saved puzzles.

**Independent Test**: Complete a new daily puzzle and verify games played plus win or loss values update exactly once; load an already-completed pre-feature puzzle and verify it is not counted.

- [X] T011 [US1] Load local player statistics alongside the existing nickname profile and daily puzzle state in `/Users/alexvrabie/Sites/browser-game/components/wordle/DailyWordleGame.tsx`
- [X] T012 [US1] Update statistics only when a submitted guess changes the current daily puzzle into a completed win or loss in `/Users/alexvrabie/Sites/browser-game/components/wordle/DailyWordleGame.tsx`
- [X] T013 [US1] Persist updated statistics after a newly completed puzzle using `/Users/alexvrabie/Sites/browser-game/lib/wordle/storage.ts` from `/Users/alexvrabie/Sites/browser-game/components/wordle/DailyWordleGame.tsx`
- [X] T014 [US1] Ensure already-completed puzzle state loaded from localStorage is not backfilled into statistics in `/Users/alexvrabie/Sites/browser-game/components/wordle/DailyWordleGame.tsx`
- [X] T015 [US1] Manually validate first new completed win, first new completed loss, and existing solved puzzle no-backfill behavior using `/Users/alexvrabie/Sites/browser-game/specs/003-local-player-stats/quickstart.md`

**Checkpoint**: New post-feature completions update local aggregate stats once from the gameplay flow.

---

## Phase 4: User Story 2 - Prevent Duplicate Counting and Preserve Streak Rules (Priority: P1)

**Goal**: Prevent refresh/reopen double-counting and enforce consecutive local calendar-day win streak behavior.

**Independent Test**: Complete a puzzle, refresh or reopen the app, and verify stats do not change; simulate a skipped local calendar day followed by a win and verify current streak restarts at one.

- [X] T016 [US2] Apply the `lastCountedDateKey` guard in `/Users/alexvrabie/Sites/browser-game/lib/wordle/stats.ts` so a date already counted returns unchanged statistics
- [X] T017 [US2] Preserve `lastCountedDateKey` across refresh and app reload through `/Users/alexvrabie/Sites/browser-game/lib/wordle/storage.ts`
- [X] T018 [US2] Implement consecutive local calendar-day win streak handling in `/Users/alexvrabie/Sites/browser-game/lib/wordle/stats.ts`, including skipped-day break and win-after-skip restart at one
- [X] T019 [US2] Ensure losses reset `currentStreak` and do not update guess distribution in `/Users/alexvrabie/Sites/browser-game/lib/wordle/stats.ts`
- [X] T020 [US2] Manually validate refresh/reopen duplicate prevention, next-day counting, skipped-day streak restart, and loss streak reset using `/Users/alexvrabie/Sites/browser-game/specs/003-local-player-stats/quickstart.md`

**Checkpoint**: Each daily date is counted at most once and streaks match the local calendar-day rules.

---

## Phase 5: User Story 3 - View Core Local Statistics (Priority: P2)

**Goal**: Replace the existing placeholder with a simple responsive stats view showing only core totals, streaks, and guess distribution.

**Independent Test**: Open the stats UI before any counted game and after counted wins/losses; verify zero-state, totals, streaks, and six guess buckets are readable on mobile and desktop without clipping, overlap, or horizontal scrolling.

- [X] T021 [P] [US3] Replace placeholder-only content with a stats view layout in `/Users/alexvrabie/Sites/browser-game/components/wordle/StatsPlaceholder.tsx`
- [X] T022 [US3] Pass current local statistics into the stats UI from `/Users/alexvrabie/Sites/browser-game/components/wordle/DailyWordleGame.tsx`
- [X] T023 [US3] Render games played, wins, losses, current streak, and max streak in `/Users/alexvrabie/Sites/browser-game/components/wordle/StatsPlaceholder.tsx`
- [X] T024 [US3] Render six win guess distribution buckets for guesses 1 through 6 in `/Users/alexvrabie/Sites/browser-game/components/wordle/StatsPlaceholder.tsx`
- [X] T025 [US3] Add a clear zero-state for no counted games in `/Users/alexvrabie/Sites/browser-game/components/wordle/StatsPlaceholder.tsx`
- [X] T026 [US3] Manually validate the stats UI on mobile and desktop widths using `/Users/alexvrabie/Sites/browser-game/specs/003-local-player-stats/quickstart.md`

**Checkpoint**: The player can inspect core local statistics in the existing stats UI area.

---

## Phase 6: User Story 4 - Keep Statistics Local and Offline-Compatible (Priority: P3)

**Goal**: Keep statistics tied to the single local nickname profile and visible after existing PWA offline reload when site data remains intact.

**Independent Test**: Complete a puzzle, refresh online, reload after the existing PWA app shell is cached and offline, and verify stats remain visible; clear browser site data and verify profile, progress, and stats may be removed.

- [X] T027 [US4] Ensure statistics are associated with the existing single local nickname profile flow in `/Users/alexvrabie/Sites/browser-game/components/wordle/DailyWordleGame.tsx`
- [X] T028 [US4] Ensure statistics remain browser-local and use only localStorage helpers in `/Users/alexvrabie/Sites/browser-game/lib/wordle/storage.ts`
- [X] T029 [US4] Confirm no reset controls, profile switching, history, sharing, leaderboard, auth, backend, sync, analytics, external API, or paid-service UI is introduced in `/Users/alexvrabie/Sites/browser-game/components/wordle/StatsPlaceholder.tsx`
- [X] T030 [US4] Manually validate stats persistence across refresh and existing PWA offline reload using `/Users/alexvrabie/Sites/browser-game/specs/003-local-player-stats/quickstart.md`
- [X] T031 [US4] Manually validate that clearing browser site data may remove profile, puzzle progress, and statistics using `/Users/alexvrabie/Sites/browser-game/specs/003-local-player-stats/quickstart.md`

**Checkpoint**: Local stats behave consistently with the existing local-only PWA model.

---

## Phase 7: Polish and Validation

**Purpose**: Final quality checks allowed by the constitution.

- [X] T032 [P] Review `/Users/alexvrabie/Sites/browser-game/lib/wordle/stats.ts` and `/Users/alexvrabie/Sites/browser-game/lib/wordle/storage.ts` for simple names, compact data shape, and no unrelated abstractions
- [X] T033 [P] Review `/Users/alexvrabie/Sites/browser-game/components/wordle/StatsPlaceholder.tsx` for responsive layout, readable labels, and no clipped or overlapping values
- [X] T034 Run `npm run lint` from `/Users/alexvrabie/Sites/browser-game`
- [X] T035 Run `npm run build` from `/Users/alexvrabie/Sites/browser-game`
- [X] T036 Perform the full manual validation checklist in `/Users/alexvrabie/Sites/browser-game/specs/003-local-player-stats/quickstart.md`

---

## Dependencies and Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies
- **Foundational (Phase 2)**: Depends on Setup
- **US1 (Phase 3)**: Depends on Foundational
- **US2 (Phase 4)**: Depends on Foundational and shares the counting path from US1
- **US3 (Phase 5)**: Depends on Foundational; final integration depends on US1 statistics state being loaded
- **US4 (Phase 6)**: Depends on US1, US2, and US3
- **Polish (Phase 7)**: Depends on all desired user stories

### Story Dependencies

- **US1 (P1)**: Establishes new completion counting and is the MVP
- **US2 (P1)**: Hardens the same counting path against duplicates and skipped-day streak errors
- **US3 (P2)**: Displays the statistics generated by US1 and US2
- **US4 (P3)**: Confirms local profile and offline behavior after the core feature works

### Parallel Opportunities

- T003, T004, and T005 can run in parallel during setup
- T021 can start after T006 defines the stats shape, while T011-T020 continue
- T032 and T033 can run in parallel during polish

---

## Parallel Example: User Story 3

```bash
# One agent can build the stats presentation component:
Task: "Replace placeholder-only content with a stats view layout in /Users/alexvrabie/Sites/browser-game/components/wordle/StatsPlaceholder.tsx"

# Another agent can integrate the data flow:
Task: "Pass current local statistics into the stats UI from /Users/alexvrabie/Sites/browser-game/components/wordle/DailyWordleGame.tsx"
```

---

## Implementation Strategy

### MVP First (US1 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational
3. Complete Phase 3: User Story 1
4. Manually validate first new win/loss counting and no backfill behavior

### Incremental Delivery

1. Add US1 to count new completions
2. Add US2 to prevent duplicate counting and enforce streak rules
3. Add US3 to replace the stats placeholder with readable core stats
4. Add US4 to validate local profile and offline persistence behavior
5. Run lint, build, and full manual validation

### Notes

- Do not create, plan, request, or run automated tests.
- Do not add dependencies or change package versions.
- Do not add backend, auth, Google account integration, remote sync, analytics, external API calls, paid services, reset controls, leaderboards, sharing, detailed history, or profile switching.
- Keep the implementation simple, local-only, responsive, and easy to inspect in browser storage.
