# Tasks: Daily Wordle Polish, Accessibility, Word Curation, and PWA Update UX

**Input**: Design documents from `/Users/alexvrabie/Sites/browser-game/specs/004-daily-wordle-polish/`

**Prerequisites**: [plan.md](/Users/alexvrabie/Sites/browser-game/specs/004-daily-wordle-polish/plan.md), [spec.md](/Users/alexvrabie/Sites/browser-game/specs/004-daily-wordle-polish/spec.md), [research.md](/Users/alexvrabie/Sites/browser-game/specs/004-daily-wordle-polish/research.md), [data-model.md](/Users/alexvrabie/Sites/browser-game/specs/004-daily-wordle-polish/data-model.md), [contracts/polish-accessibility-pwa.md](/Users/alexvrabie/Sites/browser-game/specs/004-daily-wordle-polish/contracts/polish-accessibility-pwa.md), [quickstart.md](/Users/alexvrabie/Sites/browser-game/specs/004-daily-wordle-polish/quickstart.md)

**Validation**: Automated tests are prohibited. Use only manual browser review, static analysis, linting, type checking through build, and production build checks.

**Organization**: Tasks are grouped by independently deliverable user story. Accessibility and keyboard polish is ordered before animation work per the active plan priorities.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel after prerequisite phases because it touches a different file or independent surface
- **[Story]**: Maps task to the spec user story: US1 clear interaction feedback, US2 accessibility, US3 control states, US4 word curation, US5 PWA update UX
- Every task includes an exact file path

## Phase 1: Setup (Shared Context)

**Purpose**: Confirm constraints, existing implementation shape, and source locations before changing behavior.

- [ ] T001 Review project constraints and fixed stack versions in `/Users/alexvrabie/Sites/browser-game/AGENTS.md` and `/Users/alexvrabie/Sites/browser-game/package.json`
- [ ] T002 Review active feature requirements and manual validation scope in `/Users/alexvrabie/Sites/browser-game/specs/004-daily-wordle-polish/spec.md` and `/Users/alexvrabie/Sites/browser-game/specs/004-daily-wordle-polish/quickstart.md`
- [ ] T003 [P] Inspect existing game orchestration, keyboard handling, modal toggles, and local state flow in `/Users/alexvrabie/Sites/browser-game/components/wordle/DailyWordleGame.tsx`
- [ ] T004 [P] Inspect existing tile and keyboard feedback rendering in `/Users/alexvrabie/Sites/browser-game/components/wordle/GuessGrid.tsx` and `/Users/alexvrabie/Sites/browser-game/components/wordle/Keyboard.tsx`
- [ ] T005 [P] Inspect existing stats modal and result announcement behavior in `/Users/alexvrabie/Sites/browser-game/components/wordle/StatsPlaceholder.tsx` and `/Users/alexvrabie/Sites/browser-game/components/wordle/ResultPanel.tsx`
- [ ] T006 [P] Inspect existing service worker registration and cache lifecycle in `/Users/alexvrabie/Sites/browser-game/components/pwa/ServiceWorkerRegister.tsx` and `/Users/alexvrabie/Sites/browser-game/public/sw.js`
- [ ] T007 [P] Inspect existing deterministic word selection and bundled answers in `/Users/alexvrabie/Sites/browser-game/lib/wordle/words.ts` and `/Users/alexvrabie/Sites/browser-game/data/words/answers.ts`
- [ ] T008 [P] Review relevant local Next.js documentation before code changes in `/Users/alexvrabie/Sites/browser-game/node_modules/next/dist/docs/`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Establish shared UI-state and style foundations that all user stories depend on.

**CRITICAL**: No user story implementation should begin until this phase is complete.

- [ ] T009 Define the transient reveal and update-notice state shape needed by the UI in `/Users/alexvrabie/Sites/browser-game/components/wordle/DailyWordleGame.tsx`
- [ ] T010 [P] Add or confirm reusable TypeScript types for transient UI-only state in `/Users/alexvrabie/Sites/browser-game/lib/wordle/types.ts`
- [ ] T011 [P] Establish shared focus-visible, pointer, active, unavailable, animation, and reduced-motion CSS foundations in `/Users/alexvrabie/Sites/browser-game/app/globals.css`
- [ ] T012 Confirm the feature introduces no persistent storage schema changes in `/Users/alexvrabie/Sites/browser-game/lib/wordle/game-state.ts`
- [ ] T013 Confirm the feature introduces no package or version changes in `/Users/alexvrabie/Sites/browser-game/package.json`

**Checkpoint**: Foundation ready - user story implementation can now begin.

---

## Phase 3: User Story 2 - Accessible Keyboard and Modal Use (Priority: P1)

**Goal**: A keyboard-only or assistive-technology player can play, open/close stats, and understand status changes without pointer-only interactions.

**Independent Validation**: Use only the physical keyboard to type, delete, submit, open stats, navigate inside stats, press Escape, and confirm focus returns sensibly with understandable announcements.

### Implementation for User Story 2

- [ ] T014 [US2] Implement Escape-to-close handling and return-focus tracking for the stats modal in `/Users/alexvrabie/Sites/browser-game/components/wordle/DailyWordleGame.tsx`
- [ ] T015 [US2] Add predictable dialog semantics, labelling, close behavior, and keyboard navigation support to `/Users/alexvrabie/Sites/browser-game/components/wordle/StatsPlaceholder.tsx`
- [ ] T016 [P] [US2] Review and refine status/result announcement markup to avoid noisy duplicate updates in `/Users/alexvrabie/Sites/browser-game/components/wordle/ResultPanel.tsx`
- [ ] T017 [P] [US2] Ensure on-screen keyboard controls have clear accessible names for letters, Enter, and Delete in `/Users/alexvrabie/Sites/browser-game/components/wordle/Keyboard.tsx`
- [ ] T018 [P] [US2] Ensure header controls have clear accessible names and focus behavior in `/Users/alexvrabie/Sites/browser-game/components/wordle/GameHeader.tsx`
- [ ] T019 [P] [US2] Ensure nickname entry controls have clear labels, focus states, and submission affordances in `/Users/alexvrabie/Sites/browser-game/components/wordle/NicknameForm.tsx`
- [ ] T020 [US2] Verify reduced-motion fallback remains understandable for keyboard and assistive-technology users in `/Users/alexvrabie/Sites/browser-game/app/globals.css`
- [ ] T021 [US2] Manually validate keyboard-only play, stats Escape close, focus return, and announcement behavior using `/Users/alexvrabie/Sites/browser-game/specs/004-daily-wordle-polish/quickstart.md`

**Checkpoint**: US2 is independently usable and manually validated before animation work changes feedback timing.

---

## Phase 4: User Story 1 - Clear Interaction Feedback (Priority: P1)

**Goal**: Submitted guesses reveal tile feedback in a readable sequence, with keyboard feedback synchronized to visible tile feedback.

**Independent Validation**: Submit guesses containing correct, present, and absent letters and confirm tile reveal order, delayed keyboard feedback, differentiated emphasis, solved-row behavior, and reduced-motion fallback.

### Implementation for User Story 1

- [ ] T022 [US1] Implement submitted-row reveal sequencing state and timing in `/Users/alexvrabie/Sites/browser-game/components/wordle/DailyWordleGame.tsx`
- [ ] T023 [US1] Prevent rapid typing or submitting from corrupting reveal progress in `/Users/alexvrabie/Sites/browser-game/components/wordle/DailyWordleGame.tsx`
- [ ] T024 [US1] Pass per-row reveal progress and completed-row state into the grid from `/Users/alexvrabie/Sites/browser-game/components/wordle/DailyWordleGame.tsx`
- [ ] T025 [US1] Render pending, revealing, revealed, and solved-row tile states in `/Users/alexvrabie/Sites/browser-game/components/wordle/GuessGrid.tsx`
- [ ] T026 [US1] Derive on-screen keyboard feedback only from tile results that are already visible in `/Users/alexvrabie/Sites/browser-game/components/wordle/DailyWordleGame.tsx`
- [ ] T027 [US1] Apply delayed keyboard result styling without changing letter priority rules in `/Users/alexvrabie/Sites/browser-game/components/wordle/Keyboard.tsx`
- [ ] T028 [US1] Add CSS-simple reveal, correct emphasis, present emphasis, absent normal reveal, and solved-row success styles in `/Users/alexvrabie/Sites/browser-game/app/globals.css`
- [ ] T029 [US1] Add reduced-motion variants that preserve feedback meaning without full motion in `/Users/alexvrabie/Sites/browser-game/app/globals.css`
- [ ] T030 [US1] Confirm reveal sequencing does not alter saved puzzle state or daily rules in `/Users/alexvrabie/Sites/browser-game/lib/wordle/game-state.ts`
- [ ] T031 [US1] Manually validate reveal timing, keyboard timing, mixed feedback, solved-row emphasis, rapid input handling, and reduced-motion behavior using `/Users/alexvrabie/Sites/browser-game/specs/004-daily-wordle-polish/quickstart.md`

**Checkpoint**: US1 feedback is independently functional and manually validated.

---

## Phase 5: User Story 3 - Consistent Clickable and Focus States (Priority: P2)

**Goal**: Players can immediately tell which controls are clickable, focused, active, or unavailable on desktop and mobile.

**Independent Validation**: Hover, focus, activate, and inspect unavailable controls on desktop and narrow mobile widths.

### Implementation for User Story 3

- [ ] T032 [US3] Apply shared pointer, hover, active, focus-visible, and unavailable styles to game-level controls in `/Users/alexvrabie/Sites/browser-game/app/globals.css`
- [ ] T033 [US3] Apply consistent clickable and focus states to header actions in `/Users/alexvrabie/Sites/browser-game/components/wordle/GameHeader.tsx`
- [ ] T034 [US3] Apply consistent clickable, pressed, focused, and unavailable states to keyboard buttons in `/Users/alexvrabie/Sites/browser-game/components/wordle/Keyboard.tsx`
- [ ] T035 [US3] Apply consistent clickable and focus states to nickname form controls in `/Users/alexvrabie/Sites/browser-game/components/wordle/NicknameForm.tsx`
- [ ] T036 [US3] Apply consistent clickable, focus, and close-button states to stats modal controls in `/Users/alexvrabie/Sites/browser-game/components/wordle/StatsPlaceholder.tsx`
- [ ] T037 [US3] Manually validate pointer cursor, hover, active, focus-visible, unavailable states, and responsive no-overlap behavior using `/Users/alexvrabie/Sites/browser-game/specs/004-daily-wordle-polish/quickstart.md`

**Checkpoint**: US3 controls are independently polished and manually validated.

---

## Phase 6: User Story 4 - Curated Daily Answer Quality (Priority: P2)

**Goal**: The bundled daily answer order remains deterministic, unique, non-alphabetic, and free of obvious short-window quality issues.

**Independent Validation**: Review the bundled answer list and at least 30 consecutive scheduled answers for uniqueness, non-alphabetic order, common-word quality, and short-window clusters.

### Implementation for User Story 4

- [ ] T038 [US4] Review uniqueness, deterministic order, and non-alphabetic ordering in `/Users/alexvrabie/Sites/browser-game/data/words/answers.ts`
- [ ] T039 [US4] Review at least 30 consecutive answers for repeated first two letters, repeated endings, similar spellings, themed clusters, and weak words in `/Users/alexvrabie/Sites/browser-game/data/words/answers.ts`
- [ ] T040 [US4] Make only small obvious answer-list edits if needed while preserving deterministic bundled order in `/Users/alexvrabie/Sites/browser-game/data/words/answers.ts`
- [ ] T041 [US4] Confirm runtime random selection and recent-answer tracking were not introduced in `/Users/alexvrabie/Sites/browser-game/lib/wordle/words.ts`
- [ ] T042 [US4] Document review outcome, any accepted words, and any small edits in `/Users/alexvrabie/Sites/browser-game/specs/004-daily-wordle-polish/word-curation-review.md`
- [ ] T043 [US4] Manually validate answer-list uniqueness, non-alphabetic order, short-window review, and no runtime randomization using `/Users/alexvrabie/Sites/browser-game/specs/004-daily-wordle-polish/quickstart.md`

**Checkpoint**: US4 curation is independently reviewed, documented, and manually validated.

---

## Phase 7: User Story 5 - Simple App Update Awareness (Priority: P3)

**Goal**: Returning players get a small non-blocking top-right refresh action when a newer app version is available and detectable.

**Independent Validation**: In production mode, cache an older app shell, make a newer version available through the local PWA workflow, confirm the top-right update button appears, refreshes, preserves local data, and offline reload still works.

### Implementation for User Story 5

- [ ] T044 [US5] Add service-worker update detection and a safe refresh action path in `/Users/alexvrabie/Sites/browser-game/components/pwa/ServiceWorkerRegister.tsx`
- [ ] T045 [US5] Expose update availability to the game UI without adding routes, settings, notifications, or install prompts in `/Users/alexvrabie/Sites/browser-game/components/wordle/DailyWordleGame.tsx`
- [ ] T046 [US5] Add a small non-blocking top-right "Update available" button state to `/Users/alexvrabie/Sites/browser-game/components/wordle/GameHeader.tsx`
- [ ] T047 [US5] Ensure update button placement does not interrupt play or overlap header controls on mobile and desktop in `/Users/alexvrabie/Sites/browser-game/app/globals.css`
- [ ] T048 [US5] Preserve existing offline reload and cache behavior while adding update awareness in `/Users/alexvrabie/Sites/browser-game/public/sw.js`
- [ ] T049 [US5] Confirm update behavior never clears nickname profile, puzzle progress, or stats in `/Users/alexvrabie/Sites/browser-game/components/pwa/ServiceWorkerRegister.tsx`
- [ ] T050 [US5] Manually validate production-mode update prompt, refresh action, local data preservation, and offline reload using `/Users/alexvrabie/Sites/browser-game/specs/004-daily-wordle-polish/quickstart.md`

**Checkpoint**: US5 update awareness is independently functional when update detection is practical.

---

## Phase 8: Nice-To-Have Polish (Optional)

**Purpose**: Attempt scoped visual enhancements only if they remain simple, responsive, and non-fragile.

- [ ] T051 Attempt adjacent-correct grouped highlight rendering only if it can be implemented without layout shifts or fragile positioning in `/Users/alexvrabie/Sites/browser-game/components/wordle/GuessGrid.tsx`
- [ ] T052 Add grouped-highlight CSS only if it stays responsive, non-overlapping, and lower priority than focus-visible styling in `/Users/alexvrabie/Sites/browser-game/app/globals.css`
- [ ] T053 Document grouped highlight as implemented or deferred with the reason in `/Users/alexvrabie/Sites/browser-game/specs/004-daily-wordle-polish/quickstart.md`
- [ ] T054 Manually validate grouped highlight on desktop and mobile if implemented using `/Users/alexvrabie/Sites/browser-game/specs/004-daily-wordle-polish/quickstart.md`

---

## Phase 9: Polish & Cross-Cutting Verification

**Purpose**: Final cleanup and allowed validation across all delivered stories.

- [ ] T055 [P] Review final source changes for no new dependencies, no package version changes, and no automated-test artifacts in `/Users/alexvrabie/Sites/browser-game/package.json`
- [ ] T056 [P] Review final source changes for no backend, auth, sync, analytics, notifications, settings page, new routes, large word-list expansion, or core rule changes in `/Users/alexvrabie/Sites/browser-game/app/page.tsx`
- [ ] T057 Run allowed lint verification with `npm run lint` from `/Users/alexvrabie/Sites/browser-game`
- [ ] T058 Run allowed production build verification with `npm run build` from `/Users/alexvrabie/Sites/browser-game`
- [ ] T059 Complete final manual mobile and desktop browser review across accessibility, reveal timing, control states, word curation, PWA update behavior, and offline reload using `/Users/alexvrabie/Sites/browser-game/specs/004-daily-wordle-polish/quickstart.md`

---

## Dependencies & Execution Order

### Phase Dependencies

- **Phase 1 Setup**: No dependencies; start immediately.
- **Phase 2 Foundational**: Depends on Phase 1; blocks all user stories.
- **Phase 3 US2 Accessibility**: Depends on Phase 2; intentionally first because accessibility constrains later animation and focus styling.
- **Phase 4 US1 Reveal Feedback**: Depends on Phase 2 and should follow US2 so animation respects modal, focus, announcement, and reduced-motion constraints.
- **Phase 5 US3 Control States**: Depends on Phase 2 and can proceed after or alongside US1 once shared focus styles are stable.
- **Phase 6 US4 Word Curation**: Depends on Phase 1 and can proceed independently after the deterministic word-selection flow is understood.
- **Phase 7 US5 PWA Update UX**: Depends on Phase 2 and can proceed independently from reveal and word curation.
- **Phase 8 Nice-To-Have Polish**: Depends on US1 completion; may be deferred without blocking must-have stories.
- **Phase 9 Cross-Cutting Verification**: Depends on all delivered stories.

### User Story Dependencies

- **US2 (P1)**: Starts after Foundational; no dependency on other stories.
- **US1 (P1)**: Starts after Foundational; should follow US2 implementation decisions for focus, announcements, and reduced motion.
- **US3 (P2)**: Starts after Foundational; integrates with US2/US1 CSS foundations but remains manually verifiable on its own.
- **US4 (P2)**: Starts after Setup; no dependency on UI stories.
- **US5 (P3)**: Starts after Foundational; no dependency on UI animation or word curation.

### Within Each User Story

- State shape before components that consume it.
- Component semantics before styling polish.
- Core behavior before responsive review.
- Manual validation at the end of each story.
- Optional grouped highlight only after must-have reveal behavior works.

---

## Parallel Opportunities

- Setup inspection tasks T003-T008 can run in parallel.
- Foundational tasks T010-T011 can run in parallel after T009 is understood.
- US2 tasks T016-T019 can run in parallel after T014-T015 define modal behavior.
- US4 word-list review tasks T038-T039 can run while UI work proceeds.
- US5 service-worker tasks T044 and header placement tasks T046-T047 can be split once the update signal shape is agreed.
- Final review tasks T055-T056 can run in parallel before T057-T059.

---

## Parallel Example: User Story 2

```text
Task: "Review and refine status/result announcement markup to avoid noisy duplicate updates in /Users/alexvrabie/Sites/browser-game/components/wordle/ResultPanel.tsx"
Task: "Ensure on-screen keyboard controls have clear accessible names for letters, Enter, and Delete in /Users/alexvrabie/Sites/browser-game/components/wordle/Keyboard.tsx"
Task: "Ensure header controls have clear accessible names and focus behavior in /Users/alexvrabie/Sites/browser-game/components/wordle/GameHeader.tsx"
Task: "Ensure nickname entry controls have clear labels, focus states, and submission affordances in /Users/alexvrabie/Sites/browser-game/components/wordle/NicknameForm.tsx"
```

## Parallel Example: User Story 4

```text
Task: "Review uniqueness, deterministic order, and non-alphabetic ordering in /Users/alexvrabie/Sites/browser-game/data/words/answers.ts"
Task: "Review at least 30 consecutive answers for repeated first two letters, repeated endings, similar spellings, themed clusters, and weak words in /Users/alexvrabie/Sites/browser-game/data/words/answers.ts"
```

## Parallel Example: User Story 5

```text
Task: "Add service-worker update detection and a safe refresh action path in /Users/alexvrabie/Sites/browser-game/components/pwa/ServiceWorkerRegister.tsx"
Task: "Add a small non-blocking top-right Update available button state to /Users/alexvrabie/Sites/browser-game/components/wordle/GameHeader.tsx"
Task: "Ensure update button placement does not interrupt play or overlap header controls on mobile and desktop in /Users/alexvrabie/Sites/browser-game/app/globals.css"
```

---

## Implementation Strategy

### MVP First

1. Complete Phase 1 and Phase 2.
2. Complete Phase 3 (US2 accessibility and keyboard polish).
3. Manually validate keyboard-only play, stats modal Escape behavior, focus return, accessible names, announcements, and reduced-motion fallback.
4. Continue to Phase 4 (US1 reveal sequencing) only after accessibility constraints are stable.

### Incremental Delivery

1. Deliver US2: keyboard/modal/accessibility foundation.
2. Deliver US1: reveal sequencing and delayed keyboard feedback.
3. Deliver US3: consistent interaction states across controls.
4. Deliver US4: answer-list review and documentation.
5. Deliver US5: small update button if update detection stays simple.
6. Attempt Phase 8 only if it does not risk must-have delivery.

### Manual Validation Rules

- Do not create or run automated tests, test directories, fixtures, e2e flows, contract test harnesses, coverage, or TDD workflows.
- Use manual browser checks from `/Users/alexvrabie/Sites/browser-game/specs/004-daily-wordle-polish/quickstart.md`.
- Use only allowed verification commands: `npm run lint` and `npm run build`.
- If a local dev or production server needs `localhost:3000` and it is already in use, ask the project owner to close the existing server before continuing.
