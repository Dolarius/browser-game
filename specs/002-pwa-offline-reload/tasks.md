# Tasks: PWA Offline Reload

**Input**: Design documents from `/specs/002-pwa-offline-reload/`

**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/offline-behavior.md, quickstart.md

**Validation**: Automated tests are prohibited. Use only manual review, manual browser checks, static analysis, linting, type checking, and production build checks.

**Organization**: Tasks are grouped by user story so each story can be implemented and manually validated as an independent increment.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel because it touches different files and does not depend on incomplete tasks
- **[Story]**: User story label, used only in user story phases
- Every task includes an exact file path

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Confirm project constraints and prepare the PWA implementation surface.

- [X] T001 Perform the pre-implementation constitution compliance review and read the bundled Next.js PWA guidance in `/Users/alexvrabie/Sites/browser-game/.specify/memory/constitution.md` and `/Users/alexvrabie/Sites/browser-game/node_modules/next/dist/docs/01-app/02-guides/progressive-web-apps.md`
- [X] T002 Confirm no PWA dependency will be added and preserve the existing dependency set in `/Users/alexvrabie/Sites/browser-game/package.json`
- [X] T003 [P] Create the PWA component folder for the production registration boundary in `/Users/alexvrabie/Sites/browser-game/components/pwa/`
- [X] T004 [P] Create the offline fallback route folder in `/Users/alexvrabie/Sites/browser-game/app/offline/`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Add shared PWA primitives that all user stories depend on.

**CRITICAL**: No user story work should begin until this phase is complete.

- [X] T005 Define the basic web app manifest metadata using existing or placeholder assets in `/Users/alexvrabie/Sites/browser-game/app/manifest.ts`
- [X] T006 Create the initial custom service worker file with manual cache version `daily-wordle-v1` in `/Users/alexvrabie/Sites/browser-game/public/sw.js`
- [X] T007 Configure service worker response headers for `/sw.js`, including no-store cache behavior, in `/Users/alexvrabie/Sites/browser-game/next.config.ts`
- [X] T008 Add a production-only service worker registration component scaffold in `/Users/alexvrabie/Sites/browser-game/components/pwa/ServiceWorkerRegister.tsx`
- [X] T009 Integrate the production-only registration component into the root app shell in `/Users/alexvrabie/Sites/browser-game/app/layout.tsx`

**Checkpoint**: Manifest, service worker, headers, and registration boundary exist; user story implementation can proceed.

---

## Phase 3: User Story 1 - Reload Game While Offline (Priority: P1) MVP

**Goal**: After one successful production-mode visit, refreshing `/` while offline loads the playable game and restores existing local nickname and puzzle progress.

**Independent Validation**: Run `npm run build`, run `npm run start`, open `http://localhost:3000`, create or use a nickname, submit at least one guess, set DevTools Network to Offline in the same browser session, refresh, and confirm the game reloads with saved progress.

### Implementation for User Story 1

- [X] T010 [US1] Implement install-time caching for `/`, `/offline`, the manifest, and existing public placeholder assets in `/Users/alexvrabie/Sites/browser-game/public/sw.js`
- [X] T011 [US1] Implement runtime caching for same-origin `/_next/static/` assets needed by the production app shell in `/Users/alexvrabie/Sites/browser-game/public/sw.js`
- [X] T012 [US1] Implement navigation handling that serves cached `/` for offline reloads of the home route in `/Users/alexvrabie/Sites/browser-game/public/sw.js`
- [X] T013 [US1] Implement activation cleanup that deletes old cache groups when the manual cache version changes in `/Users/alexvrabie/Sites/browser-game/public/sw.js`
- [X] T014 [US1] Complete production-only registration and readiness behavior without registering during `npm run dev` in `/Users/alexvrabie/Sites/browser-game/components/pwa/ServiceWorkerRegister.tsx`
- [X] T015 [US1] Verify the service worker does not read or write nickname or puzzle progress, leaving gameplay state in `/Users/alexvrabie/Sites/browser-game/lib/wordle/storage.ts`
- [X] T016 [US1] Manually validate production offline reload within 5 seconds and saved progress restoration using `/Users/alexvrabie/Sites/browser-game/specs/002-pwa-offline-reload/quickstart.md`

**Checkpoint**: User Story 1 is functional and manually validated as the MVP.

---

## Phase 4: User Story 2 - Keep Development Mode Uncached (Priority: P2)

**Goal**: Normal development mode does not register this feature's offline behavior and does not hide local code changes behind cached assets.

**Independent Validation**: Clear prior localhost service workers/site data where practical, run `npm run dev`, open `http://localhost:3000`, inspect browser Application state, and confirm no service worker registration was created by this feature.

### Implementation for User Story 2

- [X] T017 [US2] Harden the registration guard so service worker registration exits outside production builds in `/Users/alexvrabie/Sites/browser-game/components/pwa/ServiceWorkerRegister.tsx`
- [X] T018 [US2] Keep development-mode caching behavior out of Next configuration and avoid dev-only service worker rewrites in `/Users/alexvrabie/Sites/browser-game/next.config.ts`
- [X] T019 [US2] Document the development non-registration validation steps in `/Users/alexvrabie/Sites/browser-game/README.md`
- [X] T020 [US2] Manually validate `npm run dev` does not register offline reload behavior using `/Users/alexvrabie/Sites/browser-game/specs/002-pwa-offline-reload/quickstart.md`

**Checkpoint**: User Story 2 is functional and manually validated without depending on offline game reload success.

---

## Phase 5: User Story 3 - Show Offline Fallback When Needed (Priority: P3)

**Goal**: If the cached game shell is missing or incomplete while offline, the player sees a concise offline fallback instead of a blank page or browser network error.

**Independent Validation**: Simulate or inspect an offline state where the full cached app shell is unavailable and confirm `/offline` or the service worker fallback response shows clear, readable copy on mobile and desktop.

### Implementation for User Story 3

- [X] T021 [P] [US3] Build the simple responsive offline fallback page in `/Users/alexvrabie/Sites/browser-game/app/offline/page.tsx`
- [X] T022 [US3] Add fallback routing for failed navigation requests when cached `/` is unavailable in `/Users/alexvrabie/Sites/browser-game/public/sw.js`
- [X] T023 [US3] Confirm fallback copy avoids login, remote sync, backend recovery, database recovery, paid services, and service-worker jargon in `/Users/alexvrabie/Sites/browser-game/app/offline/page.tsx`
- [X] T024 [US3] Manually validate the fallback behavior and mobile/desktop readability using `/Users/alexvrabie/Sites/browser-game/specs/002-pwa-offline-reload/quickstart.md`

**Checkpoint**: All user stories are implemented and manually validated.

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Documentation, maintenance notes, and allowed verification across the completed feature.

- [X] T025 [P] Document production offline reload validation steps in `/Users/alexvrabie/Sites/browser-game/README.md`
- [X] T026 [P] Document the manual cache version bump rule for future agents in `/Users/alexvrabie/Sites/browser-game/README.md`
- [X] T027 [P] Confirm no runtime external API, auth, analytics, remote sync, paid-service, or word-list requests were introduced in `/Users/alexvrabie/Sites/browser-game/public/sw.js`
- [X] T028 Run linting with `npm run lint` from `/Users/alexvrabie/Sites/browser-game`
- [X] T029 Run the production build with `npm run build` from `/Users/alexvrabie/Sites/browser-game`
- [X] T030 Manually perform the full production offline reload checklist in `/Users/alexvrabie/Sites/browser-game/specs/002-pwa-offline-reload/quickstart.md`

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies; can start immediately.
- **Foundational (Phase 2)**: Depends on Setup completion; blocks all user stories.
- **User Story 1 (Phase 3)**: Depends on Foundational completion; delivers the MVP.
- **User Story 2 (Phase 4)**: Depends on Foundational completion; can be implemented after or alongside US1, but should be validated separately.
- **User Story 3 (Phase 5)**: Depends on Foundational completion and uses the service worker from US1 plus the fallback route from its own phase.
- **Polish (Phase 6)**: Depends on all desired user stories being complete.

### User Story Dependencies

- **User Story 1 (P1)**: Starts after Foundational; no dependency on US2 or US3.
- **User Story 2 (P2)**: Starts after Foundational; no dependency on US1 behavior, but should preserve the same registration component.
- **User Story 3 (P3)**: Starts after Foundational; fallback service worker behavior integrates with US1 navigation handling.

### Within Each User Story

- Service worker cache constants before cache install/fetch behavior.
- Registration guard before root layout integration changes are considered complete.
- Fallback UI before service worker fallback routing is manually validated.
- Manual validation after implementation for that story is complete.

### Parallel Opportunities

- T003 and T004 can run in parallel after Setup starts.
- T021 can run in parallel with service worker refinement because it is isolated to the fallback route.
- T025, T026, and T027 can run in parallel after the implementation behavior is stable.
- After Phase 2, US1 and US2 can be worked on in parallel if developers coordinate changes to `components/pwa/ServiceWorkerRegister.tsx`.

---

## Parallel Example: User Story 1

```bash
# Coordinate carefully because most US1 work is in public/sw.js.
Task: "T014 [US1] Complete production-only registration and readiness behavior without registering during npm run dev in /Users/alexvrabie/Sites/browser-game/components/pwa/ServiceWorkerRegister.tsx"
Task: "T015 [US1] Verify the service worker does not read or write nickname or puzzle progress, leaving gameplay state in /Users/alexvrabie/Sites/browser-game/lib/wordle/storage.ts"
```

## Parallel Example: User Story 2

```bash
Task: "T018 [US2] Keep development-mode caching behavior out of Next configuration and avoid dev-only service worker rewrites in /Users/alexvrabie/Sites/browser-game/next.config.ts"
Task: "T019 [US2] Document the development non-registration validation steps in /Users/alexvrabie/Sites/browser-game/README.md"
```

## Parallel Example: User Story 3

```bash
Task: "T021 [P] [US3] Build the simple responsive offline fallback page in /Users/alexvrabie/Sites/browser-game/app/offline/page.tsx"
Task: "T022 [US3] Add fallback routing for failed navigation requests when cached / is unavailable in /Users/alexvrabie/Sites/browser-game/public/sw.js"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup.
2. Complete Phase 2: Foundational.
3. Complete Phase 3: User Story 1.
4. Stop and manually validate production offline reload with saved nickname and puzzle progress.

### Incremental Delivery

1. Add User Story 1 to make production offline reload work after first visit.
2. Add User Story 2 to protect normal development mode from stale cached assets.
3. Add User Story 3 to provide the offline fallback path for missing cached shell cases.
4. Finish documentation and allowed verification in Phase 6.

### Manual Validation Scope

- Production mode: `npm run build`, `npm run start`, first online visit, saved nickname and guess, DevTools Offline, refresh.
- Development mode: `npm run dev`, browser Application panel inspection, no service worker registration from this feature.
- Fallback: missing or incomplete cached app shell simulation or inspection, readable fallback message on mobile and desktop.

## Notes

- Do not create or run automated tests, fixtures, coverage, or TDD workflows.
- Do not add PWA dependencies unless the plan is explicitly revised first.
- Future changes to service worker caching behavior, offline fallback behavior, manifest metadata, or cached asset expectations must bump `daily-wordle-v1` in `/Users/alexvrabie/Sites/browser-game/public/sw.js`.
