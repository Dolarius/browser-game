# UI Contract: Offline Daily Wordle Game

This feature exposes no backend API. The contract is the user-facing interface
and local behavior expected from the home screen.

## Route

- `/`: Daily Wordle home screen

## Page States

### Local Storage Unavailable

- Show a clear message that local profile and daily progress cannot be saved.
- Do not show password, sign-in, database, or remote sync prompts.

### No Local Profile

- Show a compact nickname form.
- Form contains:
  - nickname input
  - submit button
  - concise validation message area
- Validation:
  - trim whitespace
  - reject empty value
  - reject values longer than 20 characters

### Daily Puzzle Playing

- Show a compact header with:
  - game title
  - human-readable date
  - small stats button
- Show centered six-row, five-column guess grid.
- Show on-screen keyboard with:
  - A-Z letter keys
  - Delete
  - Submit
- Support physical keyboard input:
  - letters add to active row
  - Backspace/Delete removes a letter
  - Enter submits the current row

### Daily Puzzle Won

- Keep the completed board visible.
- Show a concise result panel.
- Prevent additional daily guesses.
- Keep stats button available.

### Daily Puzzle Lost

- Keep the completed board visible.
- Show a concise result panel including the correct answer.
- Prevent additional daily guesses.
- Keep stats button available.

### Stats Placeholder

- Open from the stats button.
- Communicate that detailed statistics will be added later.
- Do not show fabricated totals, streaks, win rates, or guess distributions.
- Provide an obvious close action.

## Tile States

- `empty`: no committed or active letter
- `active`: current row letter before submission
- `correct`: submitted letter is correct at that position
- `present`: submitted letter exists in the answer at another position
- `absent`: submitted letter is not available in the answer

The board and keyboard must use matching feedback colors after guesses are
submitted.

## Error States

- Too few letters: keep active row unchanged and show concise feedback.
- Too many letters: prevent extra input and keep the active row stable.
- Word not in allowed list: keep active row unchanged and show concise feedback.
- Completed puzzle: ignore additional guess input and keep result state visible.

## Responsive Requirements

- Mobile-first layout.
- No horizontal scrolling for the primary game flow.
- Board, keyboard, header, form, and result panel must not overlap.
- Text must not be clipped inside buttons, keys, tiles, or result messages.
- Keyboard keys must remain large enough for touch input on narrow screens.
- Desktop layout remains centered and compact rather than stretched.

## Accessibility Expectations

- Nickname input has an accessible label.
- Buttons have clear accessible names.
- Stats button has an accessible name such as "Open stats".
- Status and error messages are announced through an appropriate live region.
- Tile color is not the only signal; labels or accessible text describe tile feedback.
- Physical keyboard support does not trap focus or block normal browser shortcuts unnecessarily.
