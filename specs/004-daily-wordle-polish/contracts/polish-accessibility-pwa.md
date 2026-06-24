# UI Contract: Daily Wordle Polish, Accessibility, Word Curation, and PWA Update UX

This feature exposes no backend API. The contract is the browser-visible
behavior of the existing Daily Wordle game.

## Accessibility and Keyboard Contract

- Physical keyboard play continues to support letter entry, delete, and submit.
- On-screen keyboard buttons remain clickable/tappable and have clear accessible names.
- The stats modal can be closed with Escape.
- When the stats modal closes, focus returns to a sensible game control.
- Keyboard navigation remains predictable while the stats modal is open.
- Focus-visible styling is clear and not hidden by tile, row, hover, or update-prompt styling.
- Status and result messages remain understandable without duplicate noisy announcements.

## Control Affordance Contract

- Clickable controls use pointer cursor on pointer-capable devices.
- Clickable controls have visible hover and active states.
- Unavailable interactions appear unavailable and do not look like normal actions.
- Controls remain readable and usable on mobile and desktop widths.

## Reveal Feedback Contract

- Submitted guess feedback appears in a short ordered tile reveal sequence.
- Keyboard feedback does not reveal a letter result before its matching tile result is visible.
- Correct-position tile feedback receives stronger brief emphasis.
- Present-but-wrong-position tile feedback receives subtler brief emphasis.
- Absent tile feedback uses only normal reveal styling.
- A solved row may receive one brief success emphasis.
- Reduced-motion users receive disabled or shortened motion without losing feedback meaning.

## Optional Grouped Highlight Contract

- Adjacent correct-position tiles may receive one contiguous highlight.
- Grouped highlight is optional and should be skipped if it creates fragile positioning, layout shifts, overlap, or delayed delivery of must-have work.
- If included, it must not change grid layout or reduce mobile/desktop readability.

## Word Curation Contract

- Answer list remains bundled, deterministic, unique, and offline-compatible.
- Daily answer order remains non-alphabetic.
- Review should check at least 30 consecutive answers for obvious clusters.
- Only small answer-list edits are allowed when obvious quality issues are found.
- Runtime random selection and recent-answer tracking remain out of scope.

## PWA Update Contract

- When a newer app version is available and detectable, the game shows a small non-blocking "Update available" button in the top-right area of the game UI.
- The update action refreshes to the newer app version.
- The update button must not be a modal.
- Update awareness must not interrupt active play.
- Update behavior must not clear local nickname profile, daily puzzle progress, or local statistics.
- Existing offline reload behavior remains available after the app shell has been cached.

## Manual Validation Contract

- Validate keyboard-only play.
- Validate stats modal Escape close and focus return.
- Validate focus-visible, hover, active, pointer, and unavailable states.
- Validate tile reveal order and keyboard feedback timing.
- Validate correct, present, absent, solved-row, and reduced-motion feedback.
- Validate mobile and desktop layout with no overlap, clipping, or horizontal scrolling.
- Validate answer-list uniqueness, non-alphabetic order, and short-window curation review.
- Validate update prompt behavior in a production-mode PWA scenario when practical.
- Validate offline reload still works after app shell caching.
- Do not use automated tests, fixtures, coverage tools, or TDD workflows.
