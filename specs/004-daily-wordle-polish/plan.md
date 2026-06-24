# Implementation Plan: Daily Wordle Polish, Accessibility, Word Curation, and PWA Update UX

**Branch**: `004-daily-wordle-polish` | **Date**: 2026-06-24 | **Spec**: [spec.md](./spec.md)

**Input**: Feature specification from `/specs/004-daily-wordle-polish/spec.md`

## Summary

Improve the existing Daily Wordle experience through focused interaction polish:
keyboard and accessibility behavior first, then restrained tile reveal feedback,
answer-list curation review, and a small top-right update prompt for newer PWA
versions. The implementation stays inside the existing local-only Wordle app,
uses existing browser and styling capabilities, avoids new dependencies, and
preserves all current puzzle, profile, storage, stats, and offline behavior.

## Technical Context

**Language/Version**: TypeScript ^5 with Next.js 16.2.9

**Primary Dependencies**: Next.js 16.2.9, React 19.2.4, React DOM 19.2.4, Tailwind CSS ^4

**Storage**: Existing browser `localStorage` helpers for profile, daily puzzle state, and local stats; existing service worker cache storage for offline app shell/static assets

**Validation**: Manual browser review, static analysis, linting, type checking, and `npm run build` only. Automated tests are prohibited.

**Target Platform**: Responsive web browser on mobile and desktop, including keyboard-only and reduced-motion users; PWA behavior in production-mode browser sessions

**Project Type**: Next.js web application

**Performance Goals**: Guess reveal feedback should feel immediate and readable; per-tile reveal should complete quickly enough to avoid blocking normal play, and update-awareness checks must not add perceptible delay to initial gameplay.

**Constraints**: Clean code, simple UX, responsive layout, minimal dependencies, package versions fixed by `package.json`, no automated tests, no backend, no auth, no sync, no analytics, no notifications, no settings page, no new routes, no rule changes

**Scale/Scope**: One existing Daily Wordle screen, one stats modal, one on-screen keyboard, one bundled answer list, one existing service worker flow, one local browser profile, and one active daily puzzle

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- Clean Code: PASS - Plan keeps polish in the existing Wordle components, small helper state, and focused PWA registration behavior rather than broad refactors.
- Simple UX: PASS - Work improves existing game controls and feedback without onboarding, settings, new routes, or extra flows.
- Responsive Design: PASS - Plan requires mobile and desktop manual review for focus indicators, reveal animation, grouped highlight if attempted, modal behavior, and update prompt placement.
- Minimal Dependencies: PASS - Existing React, CSS, browser APIs, localStorage, and service worker capabilities are sufficient; no new dependency is planned.
- Fixed Versions: PASS - Next.js, React, React DOM, Tailwind CSS, TypeScript, and ESLint remain as declared in `package.json`.
- No Automated Tests: PASS - Validation uses manual browser checks, linting, type checking through build, and production build checks only.

## Project Structure

### Documentation (this feature)

```text
specs/004-daily-wordle-polish/
|-- plan.md
|-- research.md
|-- data-model.md
|-- quickstart.md
|-- contracts/
|   `-- polish-accessibility-pwa.md
`-- tasks.md
```

### Source Code (repository root)

```text
app/
|-- globals.css                    # Shared interaction states, reveal animations, reduced-motion styling
|-- layout.tsx                     # Existing service worker registration host remains unchanged unless needed
`-- page.tsx                       # Existing Daily Wordle page host remains unchanged unless needed

components/
|-- pwa/
|   `-- ServiceWorkerRegister.tsx  # Detect newer app version and expose update availability
`-- wordle/
    |-- DailyWordleGame.tsx        # Keyboard/modal flow, reveal state timing, update button placement
    |-- GameHeader.tsx             # Top-right update button area and accessible controls
    |-- GuessGrid.tsx              # Tile reveal states and optional grouped highlight
    |-- Keyboard.tsx               # Delayed keyboard feedback, pointer/focus/active states
    |-- NicknameForm.tsx           # Control affordance/focus polish
    |-- ResultPanel.tsx            # Announcement behavior review
    `-- StatsPlaceholder.tsx       # Escape close, focus behavior, modal accessibility polish

data/
`-- words/
    `-- answers.ts                 # Review/document curated deterministic answer order; small edits only if needed

public/
`-- sw.js                          # Existing offline/update lifecycle support, only if needed for update prompt

lib/
`-- wordle/
    |-- game-state.ts              # Existing rules preserved
    |-- types.ts                   # Add small UI state types only if needed
    `-- words.ts                   # Existing deterministic answer selection preserved
```

**Structure Decision**: Keep all work inside the existing Wordle feature boundary and existing PWA files. The feature does not need a new route, backend, dependency, persistent settings model, or separate animation framework. Must-have work should land in existing components and CSS; nice-to-have grouped highlights should be isolated enough to skip if they become layout-fragile.

## Implementation Priority

### Must-Have

1. Accessibility and keyboard polish: Escape-to-close for stats, predictable focus behavior, clear accessible names, status/result announcement review, pointer cursors, hover/active/focus-visible/unavailable states.
2. Basic reveal sequencing: classic Wordle-like but CSS-simple tile reveal, delayed keyboard feedback until tile feedback appears, differentiated correct/present/absent emphasis, and reduced-motion support.
3. PWA update awareness: small non-blocking top-right "Update available" button when a newer app version can be detected, without interrupting play or clearing local data.
4. Word curation: document/review answer-list quality rules and make only small answer-list edits if obvious issues are found.

### Nice-To-Have

1. Adjacent correct-tile grouped highlight, attempted only if it remains simple, responsive, and non-fragile.
2. Additional visual flourish beyond the core reveal/emphasis behavior, only if it does not affect accessibility, timing, or delivery.

## Complexity Tracking

No constitution violations.

## Phase 0: Research

See [research.md](./research.md).

## Phase 1: Design & Contracts

See [data-model.md](./data-model.md), [contracts/polish-accessibility-pwa.md](./contracts/polish-accessibility-pwa.md), and [quickstart.md](./quickstart.md).

## Post-Design Constitution Check

- Clean Code: PASS - Design artifacts keep accessibility, reveal timing, update awareness, and word curation as focused surfaces with optional work clearly deferrable.
- Simple UX: PASS - Contracts define non-blocking prompts, restrained animation, and no new settings/modal/update-management flows.
- Responsive Design: PASS - Quickstart requires mobile and desktop manual checks for focus, modal, tile reveal, update prompt, and optional grouped highlights.
- Minimal Dependencies: PASS - Research confirms existing browser and CSS capabilities are enough.
- Fixed Versions: PASS - No package or framework version changes are planned.
- No Automated Tests: PASS - Quickstart contains manual validation, linting, type checking through build, and production build validation only.
