# Implementation Plan: Local Player Statistics

**Branch**: `003-local-player-stats` | **Date**: 2026-06-23 | **Spec**: [spec.md](./spec.md)

**Input**: Feature specification from `/specs/003-local-player-stats/spec.md`

## Summary

Replace the existing stats placeholder with local-only Daily Wordle statistics
for the current nickname profile. The implementation will add a compact
browser-local statistics record, update it only on new puzzle completion
events, prevent duplicate counting with `lastCountedDateKey`, and render core
totals, streaks, and guess distribution in the existing stats surface. The
feature remains dependency-free, offline-compatible, and aligned with the
current single-profile, single-daily-puzzle model.

## Technical Context

**Language/Version**: TypeScript ^5 with Next.js 16.2.9

**Primary Dependencies**: Next.js 16.2.9, React 19.2.4, React DOM 19.2.4, Tailwind CSS ^4

**Storage**: Existing browser `localStorage` helpers in `lib/wordle/storage.ts`; add a compact local stats record tied to the current local nickname profile

**Validation**: Manual browser review, static analysis, linting, type checking, and `npm run build` only. Automated tests are prohibited.

**Target Platform**: Responsive web browser on mobile and desktop; offline reload validation uses the existing PWA support after the app shell is cached

**Project Type**: Next.js web application

**Performance Goals**: Stats update and render should be immediate for the player; local stats reads/writes should not introduce perceptible delay during guess submission or stats opening.

**Constraints**: Clean code, simple UX, responsive layout, minimal dependencies, package versions fixed by `package.json`, no automated tests, no backend, no auth, no Google account integration, no remote sync, no analytics, no external runtime API calls, no paid services, no reset controls, no leaderboards, no profile switching.

**Scale/Scope**: One active local profile per browser, one active daily puzzle, aggregate stats only, six guess-distribution buckets, one `lastCountedDateKey`, and no historical counted-date list.

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- Clean Code: PASS - Plan keeps statistics in focused local helpers and a small stats UI, avoiding broad refactors or unnecessary abstractions.
- Simple UX: PASS - Player-facing scope is a compact stats surface with core totals only; no reset, account, sharing, or onboarding flows.
- Responsive Design: PASS - Stats surface is planned for mobile and desktop readability with no clipped labels, overlapping values, or horizontal scrolling.
- Minimal Dependencies: PASS - Existing browser storage and current React/Next code are sufficient; no new dependency is planned.
- Fixed Versions: PASS - Next.js, React, React DOM, Tailwind CSS, TypeScript, and ESLint remain as declared in `package.json`.
- No Automated Tests: PASS - Plan uses manual browser scenarios plus lint/type/build checks only.

## Project Structure

### Documentation (this feature)

```text
specs/003-local-player-stats/
|-- plan.md
|-- research.md
|-- data-model.md
|-- quickstart.md
|-- contracts/
|   `-- stats-ui.md
`-- tasks.md
```

### Source Code (repository root)

```text
components/
`-- wordle/
    |-- DailyWordleGame.tsx      # Count completed results and pass stats to UI
    `-- StatsPlaceholder.tsx     # Replace placeholder copy with stats view

lib/
`-- wordle/
    |-- storage.ts               # Add stats read/write helpers beside existing local storage helpers
    |-- stats.ts                 # Add local stats creation/update logic
    `-- types.ts                 # Add local stats types
```

**Structure Decision**: Keep statistics inside the existing Wordle feature
boundary. `lib/wordle` owns local data shapes and update rules; `components/wordle`
owns presentation and interactions. The stats UI replaces the placeholder
component instead of introducing a new route, modal system, backend, or global
state manager.

## Complexity Tracking

No constitution violations.

## Phase 0: Research

See [research.md](./research.md).

## Phase 1: Design & Contracts

See [data-model.md](./data-model.md), [contracts/stats-ui.md](./contracts/stats-ui.md), and [quickstart.md](./quickstart.md).

## Post-Design Constitution Check

- Clean Code: PASS - Data model separates stats calculation from presentation, while preserving existing local storage patterns.
- Simple UX: PASS - Contract requires only core totals, streaks, and guess distribution with a zero state.
- Responsive Design: PASS - Contract defines mobile and desktop readability constraints for labels, values, and distribution rows.
- Minimal Dependencies: PASS - Research confirms browser-local storage and existing UI patterns satisfy the feature.
- Fixed Versions: PASS - No package version changes or new libraries are introduced.
- No Automated Tests: PASS - Quickstart contains only manual browser checks, linting, type checking through build, and production build validation.
