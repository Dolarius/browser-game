# Research: PWA Offline Reload

## Decision: Use a custom minimal service worker instead of Serwist

**Rationale**: The feature needs a narrow behavior: cache enough app files after
one successful production visit so `/` can reload offline in the same browser
session, then preserve existing `localStorage` game progress. Browser service
worker and Cache Storage APIs are sufficient for this without introducing a new
dependency.

Serwist was evaluated first because it is a current PWA/service-worker library
for Next.js. The current `@serwist/next` package reports compatibility with
Next.js `>=14`, React `>=18`, and TypeScript `>=5`, so the version range can
include this project. However, its setup adds `@serwist/next`, `serwist`, a
required CLI peer, generated worker build output, TypeScript config changes,
and Next config wrapping. Its documentation also presents webpack and Turbopack
paths and the Next.js bundled PWA guide notes the Serwist plugin currently
requires webpack configuration. For this project, that surface area is broader
than the feature scope and makes the minimal-dependencies gate harder to
justify.

**Alternatives considered**:

- Serwist: rejected for this feature because the scope is small and the extra
  dependency/configuration surface is not justified.
- `next-pwa` or similar alternatives: rejected without deeper evaluation
  because they share the same broad library tradeoff and are not needed for the
  required behavior.
- No service worker: rejected because browser-level offline refresh would still
  show a network failure after the server or network is unavailable.

## Decision: Register offline behavior only in production mode

**Rationale**: Development assets change frequently. Registering offline
caching during normal development can hide local code changes and create stale
asset confusion. The feature explicitly targets production-mode validation with
`npm run build` and `npm run start`, including localhost production runs.

**Alternatives considered**:

- Register in both development and production: rejected because it increases
  stale development asset risk.
- Environment-variable toggle: rejected for this feature because it adds more
  mental overhead than the production-only requirement needs.

## Decision: Cache app shell and static assets with manual versioning

**Rationale**: The player-facing requirement is offline reload after first
successful visit, not install prompts or advanced background sync. A manual
cache name such as `daily-wordle-v1` provides an understandable update point.
Future agents must bump it when offline caching behavior, fallback behavior,
manifest metadata, or cached app-shell/static asset expectations change.

**Alternatives considered**:

- Build-time generated cache versions: rejected because the spec excludes
  build-time version generation for this feature.
- Pre-commit cache version automation: rejected because the spec excludes
  pre-commit hooks and the project favors simple workflows.
- No cache version: rejected because old app files could remain indefinitely.

## Decision: Use a simple offline fallback route/message

**Rationale**: The ideal path is the real game shell from cache. If required
cached files are missing, a clear fallback message is enough to explain that
the app must be opened once while available. This aligns with the simple UX
principle and avoids adding new navigation or onboarding.

**Alternatives considered**:

- Browser default offline failure: rejected because the spec requires a clear
  fallback.
- Rich offline onboarding: rejected because install prompts and onboarding are
  out of scope.

## Decision: Keep game state outside service worker caches

**Rationale**: The existing game already stores nickname and daily puzzle
progress in browser `localStorage`. The service worker should only make app
files available offline. Mixing game state into Cache Storage would duplicate
responsibility and complicate recovery behavior.

**Alternatives considered**:

- Store puzzle state in Cache Storage: rejected because `localStorage` already
  satisfies the persistence requirements.
- Add IndexedDB: rejected as unnecessary for the current small data model.
