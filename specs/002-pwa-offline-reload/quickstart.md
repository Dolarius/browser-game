# Quickstart: PWA Offline Reload

## Prerequisites

- Dependencies installed from the existing lockfile.
- Existing daily Wordle feature available.
- Browser with service worker and Cache Storage support.
- No backend, database, auth provider, external service, or paid service
  required.
- No automated tests are created or run for this feature.

## Allowed Verification Commands

```bash
npm run lint
npm run build
```

Use these commands plus manual browser inspection and production-mode runtime
checks. Do not run or add unit, integration, contract, end-to-end, coverage,
fixture, or TDD workflows.

## Production Offline Reload Validation

1. Build the app:

   ```bash
   npm run build
   ```

2. Start the production server:

   ```bash
   npm run start
   ```

3. Open:

   ```text
   http://localhost:3000
   ```

4. Create or use a local nickname profile.
5. Submit at least one valid guess.
6. Confirm the browser application panel shows the app's offline reload
   registration and current cache version.
7. In browser DevTools, set Network to Offline.
8. Refresh `http://localhost:3000` in the same browser session.
9. Confirm the game screen loads instead of the browser network error page.
10. Confirm nickname, submitted guess, tile feedback, and current puzzle status
    are restored.
11. Confirm gameplay actions that rely only on local bundled data continue to
    work.
12. Confirm no external word, auth, analytics, remote sync, or paid-service
    requests are required.

## Development Mode Non-Registration Validation

1. Stop the production server if it is running.
2. Clear browser service workers and site data for `localhost` where practical
   to avoid confusing prior production registrations.
3. Start development mode:

   ```bash
   npm run dev
   ```

4. Open:

   ```text
   http://localhost:3000
   ```

5. Inspect the browser application panel.
6. Confirm normal development mode did not register offline reload behavior for
   this feature.
7. Edit or inspect app files as usual and refresh; confirm development updates
   are not hidden by offline cached app files from this feature.

## Offline Fallback Validation

1. In production mode, simulate or inspect the fallback path for a missing app
   shell while offline.
2. Confirm a concise fallback message appears instead of a blank page.
3. Confirm the message explains that the app must be opened once while
   available before offline reload can work reliably.
4. Confirm the fallback does not suggest login, remote sync, backend recovery,
   database recovery, or paid services.
5. Inspect narrow mobile and desktop widths; confirm the fallback text is not
   clipped or overlapping.

## Cache Version Maintenance Check

When future work changes offline caching behavior, offline fallback behavior,
app metadata, or cached app-shell/static asset expectations:

1. Bump the manually maintained cache version string.
2. Confirm old cache groups are removed after the new version activates.
3. Update README notes if the maintenance rule changes.
