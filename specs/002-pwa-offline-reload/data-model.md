# Data Model: PWA Offline Reload

## OfflineCache

Represents the saved app-shell/static file group that allows the game to reload
after a successful production-mode visit.

### Fields

- `cacheName`: manually maintained string, e.g. `daily-wordle-v1`
- `cachedUrls`: app shell, offline fallback, manifest/icon assets, and static
  resources saved by the service worker
- `createdByVisit`: implicit browser cache state created during a successful
  production-mode visit

### Validation Rules

- `cacheName` MUST change when offline caching behavior, offline fallback
  behavior, manifest metadata, or cached app-shell/static asset expectations
  change.
- Old caches with names that do not match the current cache version MUST be
  removed when the current service worker activates.
- The cache MUST NOT store nickname or puzzle progress; those remain in
  `localStorage`.

## OfflineFallback

Represents the simple user-facing state shown when the full game cannot be
loaded from saved files while offline.

### Fields

- `message`: concise text explaining that the app must be opened once while
  available before offline reload can work reliably
- `route`: fallback page or response used for document requests when the game
  shell is unavailable

### Validation Rules

- Message MUST be understandable without technical service-worker language.
- Message MUST NOT mention login, remote sync, paid services, or backend
  recovery.
- Layout MUST remain readable on mobile and desktop.

## AppMetadata

Represents browser-readable app information for basic PWA recognition.

### Fields

- `name`: full app name
- `shortName`: compact app name
- `description`: short purpose statement
- `startUrl`: `/`
- `display`: standalone-style app presentation metadata
- `themeColor`: color matching the app palette
- `backgroundColor`: color matching the app palette
- `icons`: existing favicon or placeholder app assets

### Validation Rules

- Metadata MUST use existing or placeholder assets only in this feature.
- Metadata MUST NOT introduce custom icon design requirements.

## ServiceWorkerRegistrationState

Represents whether offline reload behavior is active for the current browser
session.

### States

- `not-supported`: browser does not support required offline app behavior
- `not-registered`: normal development mode or unsupported context
- `registering`: production-mode visit is preparing offline reload behavior
- `ready`: app shell has been prepared for offline reload
- `failed`: registration or caching failed; fallback behavior applies where
  possible

### State Transitions

```text
Production visit
  -> registering
  -> ready
Ready
  -> offline refresh
  -> app shell served from cache
Ready
  -> newer cache version activates
  -> old cache removed
Development visit
  -> not-registered
Unsupported browser
  -> not-supported
Missing cached shell while offline
  -> fallback shown
```

## Existing Local Game Progress

Represents the already implemented profile and daily puzzle state.

### Persistence

- Profile remains stored under the existing browser-local profile key.
- Daily puzzle state remains stored under the existing browser-local daily
  puzzle key.

### Validation Rules

- Offline reload MUST restore these values when they exist and browser site
  data has not been cleared.
- Service worker caches MUST NOT become the source of truth for gameplay
  progress.
