# Offline Behavior Contract: PWA Offline Reload

This feature exposes no backend API. The contract is the browser-visible
offline behavior for the existing daily Wordle route.

## Route

- `/`: Daily Wordle home screen
- `/offline`: Simple offline fallback message

## Production Visit Contract

- When the app is opened in production mode, offline reload behavior becomes
  eligible to register.
- After the first successful production visit in the same browser session, the
  app shell and required static resources are prepared for offline refresh.
- The player should not need to complete an install flow or accept a prompt.
- The app must not make runtime calls to external word, auth, analytics, or
  paid-service endpoints.

## Offline Refresh Contract

- Given the player opened `/` successfully once in production mode during the
  current browser session, refreshing `/` while offline loads the game screen
  instead of the browser network error page.
- Existing nickname and daily puzzle progress are restored from browser-local
  storage when present.
- If required app-shell files are missing or incomplete, the fallback message
  appears instead of a blank screen.

## Development Mode Contract

- Normal development mode does not register offline reload behavior.
- Development refreshes must not be served from this feature's offline cache.
- Developers can inspect browser application state and confirm no development
  service worker registration was created by this feature.

## Fallback Message Contract

- Fallback copy is short and plain.
- Fallback explains that the game must be opened once while available before
  offline reload can work reliably.
- Fallback does not offer login, remote sync, database recovery, or paid
  service options.
- Fallback layout remains readable on mobile and desktop.

## Cache Version Contract

- The service worker uses one manually maintained cache version string.
- Future implementation agents must bump the version when changing offline
  caching behavior, fallback behavior, app metadata, or cached app-shell/static
  asset expectations.
- Outdated cache groups are removed when a newer cache version activates.

## Manual Validation Contract

- Production-mode validation uses:
  - `npm run build`
  - `npm run start`
  - one successful visit to `http://localhost:3000`
  - browser DevTools Network set to Offline
  - page refresh in the same browser session
- Development-mode validation uses normal development mode and confirms no
  service worker registration from this feature.
- Validation must not use automated tests, test fixtures, coverage tools, or
  TDD workflows.
