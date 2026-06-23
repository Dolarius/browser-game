# Implementation Plan: PWA Offline Reload

**Branch**: `002-pwa-offline-reload` | **Date**: 2026-06-22 | **Spec**: [spec.md](./spec.md)

**Input**: Feature specification from `/specs/002-pwa-offline-reload/spec.md`

## Summary

Add production-only PWA offline reload support for the existing daily Wordle
game. A player who opens the app once in local production mode can switch the
browser offline in the same session, refresh, and continue from saved local
progress. The implementation uses a minimal custom service worker and web app
manifest with no new dependencies. Serwist was evaluated as the first candidate
library, but rejected for this feature because the app needs a narrow offline
reload behavior and the library adds build/configuration surface area beyond
the current scope.

## Technical Context

**Language/Version**: TypeScript ^5 with Next.js 16.2.9

**Primary Dependencies**: Next.js 16.2.9, React 19.2.4, React DOM 19.2.4, Tailwind CSS ^4

**Storage**: Browser Cache Storage for app-shell/static file caching; existing browser `localStorage` remains responsible for nickname and puzzle progress

**Validation**: Manual browser review, static analysis, linting, type checking, and `npm run build` only. Automated tests are prohibited.

**Target Platform**: Responsive web browser on mobile and desktop; offline reload validation targets local production mode on `localhost`

**Project Type**: Next.js web application

**Performance Goals**: After one successful production-mode visit, offline refresh in the same browser session shows the playable game within 5 seconds on a typical local development machine.

**Constraints**: Clean code, simple UX, responsive layout, minimal dependencies, package versions fixed by `package.json`, no automated tests, no backend, no database, no auth provider, no remote sync, no paid services, no runtime external API calls.

**Scale/Scope**: One app shell route (`/`), one offline fallback, one manually maintained cache version string, existing single-browser local profile and daily puzzle state.

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- Clean Code: PASS - Plan adds one small registration boundary and one small service worker, without broad application refactors.
- Simple UX: PASS - Player-facing change is only offline reload plus a fallback message; no install prompts or update prompts.
- Responsive Design: PASS - Existing game UI remains unchanged; fallback is a simple responsive message.
- Minimal Dependencies: PASS - Serwist evaluated and rejected; no new dependency planned because browser APIs satisfy this feature.
- Fixed Versions: PASS - Next.js, React, React DOM, Tailwind CSS, TypeScript, and ESLint remain as declared in `package.json`.
- No Automated Tests: PASS - Plan includes manual browser checks, lint/type/build checks only.

## Project Structure

### Documentation (this feature)

```text
specs/002-pwa-offline-reload/
|-- plan.md
|-- research.md
|-- data-model.md
|-- quickstart.md
|-- contracts/
|   `-- offline-behavior.md
`-- tasks.md
```

### Source Code (repository root)

```text
app/
|-- layout.tsx                 # Existing metadata; add PWA-related metadata if needed
|-- manifest.ts                # Basic app metadata for browser recognition
`-- offline/
    `-- page.tsx               # Simple offline fallback route

components/
`-- pwa/
    `-- ServiceWorkerRegister.tsx # Production-only client registration boundary

public/
`-- sw.js                      # Minimal custom service worker with manual cache version

next.config.ts                 # Headers for service worker response where needed
README.md                      # Offline validation and cache-version maintenance notes
```

**Structure Decision**: Keep PWA support isolated from game logic. The daily
Wordle components and `lib/wordle` helpers remain unchanged because service
worker caching loads the application shell while `localStorage` continues to
hold game progress. Use a small `components/pwa` registration component so
development mode can avoid service worker registration. Use `public/sw.js` for
the manual, dependency-free worker and `app/manifest.ts` for built-in app
metadata.

## Complexity Tracking

No constitution violations.

## Phase 0: Research

See [research.md](./research.md).

## Phase 1: Design & Contracts

See [data-model.md](./data-model.md), [contracts/offline-behavior.md](./contracts/offline-behavior.md), and [quickstart.md](./quickstart.md).

## Post-Design Constitution Check

- Clean Code: PASS - Design keeps offline support in small, named artifacts and avoids touching game-state logic.
- Simple UX: PASS - Offline fallback is the only new user-facing state.
- Responsive Design: PASS - Fallback contract requires mobile and desktop readability without overlap.
- Minimal Dependencies: PASS - Research selects a custom service worker over Serwist for the current narrow scope.
- Fixed Versions: PASS - No package version changes are planned.
- No Automated Tests: PASS - Quickstart uses manual production-mode browser validation plus allowed static/build checks.
