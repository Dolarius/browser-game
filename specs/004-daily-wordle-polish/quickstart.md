# Quickstart: Daily Wordle Polish, Accessibility, Word Curation, and PWA Update UX

## Prerequisites

- Dependencies installed from the existing lockfile.
- Browser with local storage enabled.
- Existing Daily Wordle game available.
- Existing PWA offline reload support available for production-mode validation.
- No backend, auth provider, remote service, notification permission, account, or paid service required.
- No automated tests are created or run for this feature.

## Allowed Verification Commands

```bash
npm run lint
npm run build
```

Use these commands plus manual browser inspection and production-mode runtime
checks. Do not run or add unit, integration, contract, end-to-end, coverage,
fixture, or TDD workflows.

## Manual Development Server

Use the default local development URL when needed:

```bash
npm run dev
```

If `localhost:3000` is already in use, stop and ask the project owner to close
the existing server before continuing. Do not switch to another port without
explicit approval.

## Accessibility and Keyboard Validation

1. Open the game in a browser.
2. Create or use a local nickname profile.
3. Play with only the physical keyboard: type letters, delete letters, and submit a guess.
4. Open the stats modal.
5. Navigate within the modal by keyboard.
6. Press Escape.
7. Confirm the modal closes and focus returns to a sensible game control.
8. Confirm controls have clear visible focus states.
9. Confirm status and result messages are understandable and not repeated noisily.

## Control Affordance Validation

1. Review all clickable controls on desktop with a pointer.
2. Confirm each clickable control uses a pointer cursor.
3. Confirm hover and active states are visible.
4. Confirm disabled or unavailable interactions do not look like normal active controls.
5. Repeat layout review on a narrow mobile viewport.
6. Confirm focus indicators, controls, and labels do not overlap or clip.

## Reveal Feedback Validation

1. Submit a valid guess with absent, present, and correct letters.
2. Confirm tile feedback reveals in a short readable sequence.
3. Confirm keyboard feedback does not update before the matching tile result is visible.
4. Confirm correct-position letters receive stronger emphasis.
5. Confirm present-but-wrong-position letters receive subtler emphasis.
6. Confirm absent letters do not receive special glow beyond normal reveal.
7. Submit or inspect a winning row.
8. Confirm solved-row emphasis occurs at most once and does not loop.

## Reduced-Motion Validation

1. Enable reduced motion in the browser or operating system.
2. Reload the game.
3. Submit a valid guess.
4. Confirm motion is disabled or shortened.
5. Confirm all tile, keyboard, and result meanings remain clear.

## Optional Grouped Highlight Validation

Run this only if adjacent correct-tile grouped highlight is implemented.

Status for this implementation: deferred. The must-have reveal sequencing,
correct/present emphasis, solved-row emphasis, focus-visible styling, and
reduced-motion behavior were prioritized. A contiguous adjacent-tile highlight
should be revisited only if it can be added without positional fragility,
layout shifts, overlap, or weaker focus indicators.

1. Submit or inspect a row with adjacent correct-position letters.
2. Confirm adjacent correct tiles are wrapped by one contiguous highlight.
3. Confirm the highlight does not shift the grid, overlap text, or clip at mobile or desktop widths.
4. Confirm the feature is absent or gracefully skipped if grouped highlight was deferred.

## Word Curation Validation

1. Review the bundled answer list.
2. Confirm every answer is unique.
3. Confirm the daily answer order is not alphabetic.
4. Inspect at least 30 consecutive daily answers.
5. Confirm no obvious repeated first-two-letter clusters, repeated endings, highly similar spellings, or themed clusters are present.
6. Confirm any obvious weak answer is removed or explicitly accepted.
7. Confirm no runtime random selection or recent-answer tracking was added.

## PWA Update Prompt Validation

1. Build and start the app in production mode:

   ```bash
   npm run build
   npm run start
   ```

2. Open the app while online and allow the app shell to cache.
3. Simulate or deploy a newer app version using the project owner's local PWA update workflow.
4. Open the older cached app version.
5. Confirm a small non-blocking "Update available" button appears in the top-right area when an update is detectable.
6. Confirm the button is not a modal and does not interrupt active play.
7. Activate the update action.
8. Confirm the newer app version loads.
9. Confirm local nickname profile, daily puzzle progress, and local stats remain available.

## Offline Reload Validation

1. Build and start the app in production mode.
2. Open the app while online and ensure the existing offline app shell is prepared.
3. Set browser DevTools Network to Offline.
4. Refresh the app in the same browser session.
5. Confirm the game shell remains available.
6. Confirm local profile, puzzle progress, and stats remain visible when browser site data has not been cleared.

## Final Review

1. Run `npm run lint`.
2. Run `npm run build`.
3. Confirm no automated tests, test directories, fixtures, or coverage workflows were created.
4. Confirm no new dependencies, backend, auth, sync, analytics, notifications, settings page, new routes, or core rule changes were introduced.
