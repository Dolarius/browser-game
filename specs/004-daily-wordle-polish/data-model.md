# Data Model: Daily Wordle Polish, Accessibility, Word Curation, and PWA Update UX

This feature does not add durable gameplay entities. It uses existing local
profile, puzzle, and stats data, plus transient UI state for presentation and
service-worker update awareness.

## Reveal Presentation State

Represents temporary UI state used to control how a submitted guess is revealed.

### Fields

- `rowIndex`: submitted row being revealed
- `visibleTileCount`: number of tile results currently visible in the row
- `isRevealing`: whether a reveal sequence is in progress
- `completedRowIndex`: row that most recently completed reveal, if any

### Relationships

- Derived from the current `DailyPuzzleState` and submitted guesses.
- Controls when tile feedback and keyboard feedback become visible.
- Does not replace or change saved puzzle state.

### Validation Rules

- Must not persist to localStorage.
- Must reset or settle when the reveal completes.
- Must not allow keyboard feedback to show a submitted letter result before the matching tile result is visible.
- Must respect reduced-motion behavior by revealing immediately or with shortened motion while preserving result meaning.

## Accessible Modal State

Represents whether the stats modal is open and how keyboard focus behaves while it is open.

### Fields

- `isStatsOpen`: whether the stats modal is visible
- `returnFocusTarget`: the game control that should regain focus when the modal closes, if available

### Relationships

- Applies to the existing stats modal.
- Uses existing local statistics data for display.

### Validation Rules

- Escape closes the stats modal.
- Focus returns to a sensible game control after close.
- Keyboard navigation remains predictable while the modal is open.
- Modal behavior must not alter profile, puzzle, or stats data.

## App Update Notice

Represents player-facing awareness that a newer app version is available.

### Fields

- `isUpdateAvailable`: whether a newer app version can be applied
- `isUpdateApplying`: whether the player has activated the refresh action
- `label`: visible update action text

### Relationships

- Derived from existing service worker update lifecycle.
- Displayed as a small non-blocking top-right game UI action.
- Does not store player data.

### Validation Rules

- Must not interrupt active play.
- Must not clear local nickname profile, daily puzzle progress, or local statistics.
- Must not appear as a modal, settings page, notification prompt, or install prompt.
- Must remain absent or inert when update detection is not available.

## Answer List Review

Represents the curated bundled daily answer schedule.

### Fields

- `answers`: unique list of answer words
- `dailyOrder`: deterministic order used by daily selection
- `reviewNotes`: documentation-only notes for accepted curation decisions, if needed

### Relationships

- Used by existing daily answer selection.
- Works with existing allowed guess list.

### Validation Rules

- Every answer is unique.
- Daily order is not alphabetic.
- Runtime random selection is not introduced.
- Recent-answer tracking is not introduced.
- Obvious short-window clusters should be removed when found.
- Small answer-list edits are allowed only for obvious quality issues.

## Interaction State

Represents visible control affordances.

### Fields

- `hover`: pointer hover state where supported
- `active`: pressed/activated state
- `focusVisible`: keyboard focus state
- `unavailable`: disabled or unavailable interaction state

### Relationships

- Applies to existing game controls, modal controls, nickname form controls, and on-screen keyboard buttons.

### Validation Rules

- Clickable controls show pointer affordance on pointer-capable devices.
- Focus-visible states remain stronger than decorative animation.
- Unavailable states do not look like normal clickable actions.
- Styling works on mobile and desktop without overlap or clipping.
