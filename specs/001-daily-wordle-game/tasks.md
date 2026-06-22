# Tasks: Offline Daily Wordle Game

**Input**: Design documents from `/specs/001-daily-wordle-game/`

**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/ui-contract.md, quickstart.md

**Validation**: Automated tests are prohibited. Use manual browser review, static analysis, linting, type checking, and `npm run build` only.

**Organization**: Tasks are grouped by user story to enable independent implementation and manual validation of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Establish feature folders, bundled word data, theme tokens, and page shell.

- [X] T001 Create feature directories `components/wordle/`, `lib/wordle/`, and `data/words/`
- [X] T002 Replace default home placeholder in `app/page.tsx` with a shell that renders `components/wordle/DailyWordleGame.tsx`
- [X] T003 Update `app/layout.tsx` metadata title and description for the offline daily word game
- [X] T004 Define Tailwind `@theme` color tokens for page, tile, keyboard, result, and focus states in `app/globals.css`
- [X] T005 Create bundled curated answer words in `data/words/answers.ts`
- [X] T006 Create bundled allowed guess words in `data/words/allowed-guesses.ts`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core types, local date helpers, word helpers, game state, and localStorage wrappers required by all user stories.

**CRITICAL**: No user story work can begin until this phase is complete.

- [X] T007 Define shared TypeScript types for profile, puzzle state, guesses, tile feedback, keyboard feedback, and storage failures in `lib/wordle/types.ts`
- [X] T008 Implement local date key and display date helpers using native `Date` and `Intl.DateTimeFormat` in `lib/wordle/date.ts`
- [X] T009 Implement word list normalization, answer selection, and allowed-guess lookup helpers in `lib/wordle/words.ts`
- [X] T010 Implement duplicate-letter-aware tile feedback calculation in `lib/wordle/feedback.ts`
- [X] T011 Implement daily puzzle initialization, guess submission, win/loss transitions, and completed-puzzle guard logic in `lib/wordle/game-state.ts`
- [X] T012 Implement safe `localStorage` read/write/remove helpers with unavailable-storage detection in `lib/wordle/storage.ts`
- [X] T013 Create the client orchestrator component skeleton in `components/wordle/DailyWordleGame.tsx`

**Checkpoint**: Pure helpers and the client orchestrator shell exist, and user story components can consume stable types and state helpers.

---

## Phase 3: User Story 1 - Create Local Player Profile (Priority: P1)

**Goal**: First-time players create one local nickname profile before entering the game.

**Independent Validation**: Clear local browser storage, open `/`, submit invalid and valid nicknames, and verify the app moves from the nickname form to the game without any password, backend, or remote sync prompt.

### Implementation for User Story 1

- [X] T014 [P] [US1] Build compact nickname form UI with accessible label, submit button, and validation message in `components/wordle/NicknameForm.tsx`
- [X] T015 [US1] Add built-in nickname validation for trim, required value, and 20-character max length in `components/wordle/NicknameForm.tsx`
- [X] T016 [US1] Add single active profile load/save flow in `components/wordle/DailyWordleGame.tsx` using `lib/wordle/storage.ts`
- [X] T017 [US1] Add local-storage-unavailable screen state in `components/wordle/DailyWordleGame.tsx`
- [X] T018 [US1] Connect `app/page.tsx` to show the profile gate before the game when no profile exists
- [X] T019 [US1] Manually validate first-time profile gate, invalid nickname feedback, successful nickname save, and no password/auth prompts using `specs/001-daily-wordle-game/quickstart.md`

**Checkpoint**: A first-time player can create a local profile and reach the game shell independently.

---

## Phase 4: User Story 2 - Play the Daily Word Puzzle (Priority: P1)

**Goal**: Returning players can play the daily puzzle with on-screen and physical keyboard input until win or loss.

**Independent Validation**: With a saved profile, open `/`, enter valid and invalid guesses with both input methods, and verify feedback, win, and loss states.

### Implementation for User Story 2

- [X] T020 [P] [US2] Build responsive six-row, five-column guess grid with empty, active, correct, present, and absent states in `components/wordle/GuessGrid.tsx`
- [X] T021 [P] [US2] Build on-screen keyboard with letter keys, Delete, Submit, and feedback states in `components/wordle/Keyboard.tsx`
- [X] T022 [P] [US2] Build compact game header with title, display date, and stats button placeholder trigger in `components/wordle/GameHeader.tsx`
- [X] T023 [P] [US2] Build concise win/loss result panel that keeps the completed board visible in `components/wordle/ResultPanel.tsx`
- [X] T024 [US2] Wire daily answer selection, active row input, valid guess submission, and error messages in `components/wordle/DailyWordleGame.tsx`
- [X] T025 [US2] Add physical keyboard handling for letters, Backspace/Delete, and Enter in `components/wordle/DailyWordleGame.tsx`
- [X] T026 [US2] Apply board and keyboard tile feedback from `lib/wordle/feedback.ts` in `components/wordle/DailyWordleGame.tsx`
- [X] T027 [US2] Block invalid guesses, too-short guesses, too-long input, and guesses after win/loss in `components/wordle/DailyWordleGame.tsx`
- [X] T028 [US2] Manually validate daily puzzle input, invalid feedback, tile feedback, win state, and loss state using `specs/001-daily-wordle-game/quickstart.md`

**Checkpoint**: A returning player can complete the daily puzzle independently.

---

## Phase 5: User Story 3 - Resume Daily Progress (Priority: P2)

**Goal**: Players can refresh or reopen the app and continue or view the same daily puzzle state.

**Independent Validation**: Submit guesses, refresh, and confirm nickname, board, feedback, status, and completed result state are restored for the same local date.

### Implementation for User Story 3

- [X] T029 [US3] Persist daily puzzle state after each accepted guess and completion transition in `components/wordle/DailyWordleGame.tsx`
- [X] T030 [US3] Restore existing daily puzzle state by `dateKey` on app load in `components/wordle/DailyWordleGame.tsx`
- [X] T031 [US3] Initialize a new daily puzzle when the local date key changes in `components/wordle/DailyWordleGame.tsx`
- [X] T032 [US3] Preserve completed won/lost state and block additional daily guesses after refresh in `components/wordle/DailyWordleGame.tsx`
- [X] T033 [US3] Manually validate refresh persistence, completed-state restoration, and new-date initialization behavior using `specs/001-daily-wordle-game/quickstart.md`

**Checkpoint**: Daily progress is reliable across refreshes and browser restarts.

---

## Phase 6: User Story 4 - Access Stats Placeholder (Priority: P3)

**Goal**: Players can open a stats placeholder from the header without showing incomplete statistics.

**Independent Validation**: Activate the stats button and verify a compact placeholder opens, communicates that stats are coming later, shows no fabricated stats, and closes cleanly.

### Implementation for User Story 4

- [X] T034 [P] [US4] Build stats placeholder UI with clear message and close action in `components/wordle/StatsPlaceholder.tsx`
- [X] T035 [US4] Connect stats button open/close state between `components/wordle/GameHeader.tsx`, `components/wordle/DailyWordleGame.tsx`, and `components/wordle/StatsPlaceholder.tsx`
- [X] T036 [US4] Confirm the stats placeholder displays no fabricated totals, streaks, win rates, or guess distributions in `components/wordle/StatsPlaceholder.tsx`
- [X] T037 [US4] Manually validate stats button discoverability, placeholder content, and close behavior using `specs/001-daily-wordle-game/quickstart.md`

**Checkpoint**: The stats entry point exists without expanding scope into detailed statistics.

---

## Phase 7: Polish & Cross-Cutting Concerns

**Purpose**: Responsive, accessibility, theme, documentation, and allowed validation passes across all stories.

- [X] T038 [P] Refine page-level layout, background, typography, and responsive spacing in `app/page.tsx`
- [X] T039 [P] Refine global theme tokens, focus styles, and color contrast in `app/globals.css`
- [X] T040 Add accessible names, live-region messaging, and non-color-only tile feedback labels across `components/wordle/GuessGrid.tsx`, `components/wordle/Keyboard.tsx`, and `components/wordle/DailyWordleGame.tsx`
- [X] T041 Confirm no new dependencies were added to `package.json` or `package-lock.json`
- [X] T042 Run allowed lint validation with `npm run lint` using the script declared in `package.json`
- [X] T043 Run allowed production build validation with `npm run build` using the script declared in `package.json`
- [X] T044 Manually inspect mobile and desktop layouts for overlap, clipped text, horizontal scrolling, and touch target usability using `specs/001-daily-wordle-game/quickstart.md`
- [X] T045 Update `README.md` with local run instructions and a short no-backend/no-database feature note

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - blocks all user stories
- **User Story 1 (Phase 3)**: Depends on Foundational
- **User Story 2 (Phase 4)**: Depends on Foundational and benefits from User Story 1 profile flow
- **User Story 3 (Phase 5)**: Depends on User Story 2 game state and completion behavior
- **User Story 4 (Phase 6)**: Depends on User Story 2 header integration
- **Polish (Phase 7)**: Depends on all desired user stories being complete

### User Story Dependencies

- **US1 Create Local Player Profile**: Can be delivered first as the MVP entry gate
- **US2 Play Daily Word Puzzle**: Core gameplay; requires profile-ready shell and foundational helpers
- **US3 Resume Daily Progress**: Requires puzzle state and completion transitions from US2
- **US4 Access Stats Placeholder**: Requires game header from US2

### Within Each User Story

- Build pure helpers before UI wiring
- Build independent components before integrating them in `DailyWordleGame.tsx`
- Wire state transitions before manual validation
- Keep each story manually verifiable before moving to the next priority

## Parallel Opportunities

- T005 and T006 can run in parallel after T001 because they touch separate word data files
- T008, T009, T010, and T012 can run in parallel after T007 because they touch separate helper files
- T014 can run in parallel with T013 after T007 because it is an isolated UI component
- T020, T021, T022, and T023 can run in parallel because they create separate UI components
- T034 can run in parallel with final refinements once header integration expectations are clear
- T038 and T039 can run in parallel during polish because they touch separate files

## Parallel Example: User Story 2

```bash
Task: "T020 [P] [US2] Build responsive six-row, five-column guess grid with empty, active, correct, present, and absent states in components/wordle/GuessGrid.tsx"
Task: "T021 [P] [US2] Build on-screen keyboard with letter keys, Delete, Submit, and feedback states in components/wordle/Keyboard.tsx"
Task: "T022 [P] [US2] Build compact game header with title, display date, and stats button placeholder trigger in components/wordle/GameHeader.tsx"
Task: "T023 [P] [US2] Build concise win/loss result panel that keeps the completed board visible in components/wordle/ResultPanel.tsx"
```

## Implementation Strategy

### MVP First

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational
3. Complete Phase 3: User Story 1
4. Complete Phase 4: User Story 2
5. Stop and manually validate first-time profile creation plus daily puzzle completion

### Incremental Delivery

1. Deliver profile gate and game shell
2. Deliver playable daily puzzle
3. Add persistence and completed-state restoration
4. Add stats placeholder
5. Polish responsive layout and accessibility

### Validation Approach

Use `specs/001-daily-wordle-game/quickstart.md` for manual validation. Automated
tests, fixtures, coverage, and TDD workflows are prohibited by the constitution.

## Notes

- Do not install shadcn/ui, date-fns, Yup, Zod, state-management libraries, or testing libraries.
- Keep all persistence local to the browser.
- Keep one active local profile per browser/device.
- Keep detailed statistics and Play Again out of scope for this feature.
