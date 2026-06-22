# Implementation Plan: Offline Daily Wordle Game

**Branch**: `001-daily-wordle-game` | **Date**: 2026-06-21 | **Spec**: [spec.md](./spec.md)

**Input**: Feature specification from `/specs/001-daily-wordle-game/spec.md`

## Summary

Build the first playable offline daily Wordle-style experience as the home
screen. The feature gates first-time users behind a single local nickname
profile, then shows a daily five-letter puzzle with separate bundled answer and
allowed-guess lists, local progress persistence, on-screen and physical
keyboard input, a result state, and a stats placeholder. The implementation uses
existing Next.js, React, Tailwind CSS, and browser APIs only.

## Technical Context

**Language/Version**: TypeScript ^5 with Next.js 16.2.9

**Primary Dependencies**: Next.js 16.2.9, React 19.2.4, React DOM 19.2.4, Tailwind CSS ^4

**Storage**: Browser `localStorage` for the single active local profile and daily puzzle progress

**Validation**: Manual browser review, static analysis, linting, type checking, and `npm run build` only. Automated tests are prohibited.

**Target Platform**: Responsive web browser on mobile and desktop

**Project Type**: Next.js web application

**Performance Goals**: Home game screen becomes usable immediately after client hydration; guess feedback is applied without perceptible delay; local storage reads/writes stay limited to profile and current daily puzzle state.

**Constraints**: Clean code, simple UX, responsive layout, minimal dependencies, package versions fixed by `package.json`, no automated tests, no backend, no database, no auth provider, no remote sync, no paid services.

**Scale/Scope**: One local browser/device, one active local profile, one daily puzzle at a time, English five-letter words only, six guesses per puzzle.

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- Clean Code: PASS - Plan separates pure word/game logic from React UI and local persistence.
- Simple UX: PASS - First screen is either the nickname form or immediately playable game; stats remains a placeholder.
- Responsive Design: PASS - Mobile-first board and keyboard are planned as fixed-format responsive elements with no horizontal scrolling.
- Minimal Dependencies: PASS - No new dependencies; no shadcn install because it is not present in the project.
- Fixed Versions: PASS - Next.js, React, React DOM, Tailwind CSS, TypeScript, and ESLint remain as declared in `package.json`.
- No Automated Tests: PASS - Plan includes manual validation, lint/type/build checks only.

## Project Structure

### Documentation (this feature)

```text
specs/001-daily-wordle-game/
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
├── contracts/
│   └── ui-contract.md
└── tasks.md
```

### Source Code (repository root)

```text
app/
├── globals.css              # Tailwind import and @theme color tokens
├── layout.tsx               # App metadata and shell
└── page.tsx                 # Home route hosting the game feature

components/
└── wordle/
    ├── DailyWordleGame.tsx  # Client feature orchestrator
    ├── NicknameForm.tsx     # Local profile gate
    ├── GameHeader.tsx       # Title, date, stats button
    ├── GuessGrid.tsx        # Board rows and tile states
    ├── Keyboard.tsx         # On-screen keyboard
    ├── ResultPanel.tsx      # Win/loss result display
    └── StatsPlaceholder.tsx # Temporary stats UI

lib/
└── wordle/
    ├── date.ts              # Daily key and display date helpers using Date/Intl
    ├── feedback.ts          # Guess feedback calculation
    ├── game-state.ts        # State transitions and completion checks
    ├── storage.ts           # localStorage read/write wrappers
    ├── types.ts             # Shared feature types
    └── words.ts             # Word list normalization and lookup helpers

data/
└── words/
    ├── answers.ts           # Curated bundled answer words
    └── allowed-guesses.ts   # Broader bundled accepted guess words
```

**Structure Decision**: Use a small App Router feature composed of React client
components plus pure TypeScript helpers. The current project has no shadcn/ui
installation, so compact accessible controls will be built with Tailwind CSS.
Tailwind theme colors will live in `app/globals.css` via `@theme`.

## Complexity Tracking

No constitution violations.

## Phase 0: Research

See [research.md](./research.md).

## Phase 1: Design & Contracts

See [data-model.md](./data-model.md), [contracts/ui-contract.md](./contracts/ui-contract.md), and [quickstart.md](./quickstart.md).

## Post-Design Constitution Check

- Clean Code: PASS - Entity and helper boundaries are explicit and small.
- Simple UX: PASS - UI contract keeps the primary path compact and avoids extra screens.
- Responsive Design: PASS - UI contract defines mobile and desktop layout constraints.
- Minimal Dependencies: PASS - Native `Date`/`Intl`, `localStorage`, React, and Tailwind are sufficient.
- Fixed Versions: PASS - No package changes planned.
- No Automated Tests: PASS - Quickstart uses manual scenarios and allowed build/lint validation only.
