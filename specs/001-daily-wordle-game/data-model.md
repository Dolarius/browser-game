# Data Model: Offline Daily Wordle Game

## LocalPlayerProfile

Represents the single active local player profile for the current browser/device.

### Fields

- `nickname`: string, trimmed, 1-20 characters
- `createdAt`: ISO timestamp string

### Validation Rules

- `nickname` MUST be trimmed before saving.
- `nickname` MUST NOT be empty after trimming.
- `nickname` MUST be 20 characters or fewer.
- Only one active profile is supported for this feature.

### Persistence

- Storage key: `wordle:profile`
- Stored as JSON in browser `localStorage`.

## DailyPuzzleState

Represents the player's saved progress for one local calendar day.

### Fields

- `dateKey`: string in local `YYYY-MM-DD` format
- `answer`: uppercase five-letter string selected from the answer list
- `guesses`: array of `Guess`
- `status`: `playing` | `won` | `lost`
- `completedAt`: ISO timestamp string or `null`

### Validation Rules

- `dateKey` MUST match the local calendar day used to select the answer.
- `answer` MUST exist in the curated bundled answer list.
- `guesses` MUST contain at most six entries.
- `status` MUST be `won` when any guess word equals `answer`.
- `status` MUST be `lost` when six valid guesses have been submitted without a match.
- Completed puzzles MUST NOT accept additional daily guesses.

### Persistence

- Storage key: `wordle:daily:<dateKey>`
- Stored as JSON in browser `localStorage`.

## Guess

Represents one submitted guess row and its feedback.

### Fields

- `word`: uppercase five-letter string
- `feedback`: array of five `TileFeedback` values
- `submittedAt`: ISO timestamp string

### Validation Rules

- `word` MUST be exactly five letters.
- `word` MUST exist in the bundled allowed-guess list.
- `feedback` MUST contain exactly five values.

## TileFeedback

Represents the visual result for one letter after a valid guess.

### Values

- `correct`: letter is in the answer at the same position
- `present`: letter is in the answer at a different position
- `absent`: letter is not available in the answer after accounting for correct and present matches

### Validation Rules

- Duplicate letters MUST be evaluated against the actual count of that letter in the answer.
- Feedback is assigned only after a valid guess is submitted.

## WordLists

Represents bundled local word data.

### Fields

- `answers`: curated array of lowercase five-letter words
- `allowedGuesses`: broader array of lowercase five-letter words

### Validation Rules

- Every answer MUST be accepted as a valid guess.
- Every word MUST be lowercase alphabetic and exactly five letters.
- Daily selection uses `dayOffset % answers.length`.

## StatsPlaceholder

Represents the visible placeholder opened from the stats button.

### Fields

- `isOpen`: boolean UI state
- `message`: static text indicating detailed statistics will be added later

### Validation Rules

- MUST NOT calculate or display fabricated detailed statistics in this feature.

## State Transitions

```text
No profile
  -> nickname saved
Profile ready
  -> daily puzzle loaded or initialized for dateKey
Playing
  -> valid non-answer guess submitted, guesses < 6 -> Playing
Playing
  -> answer guessed -> Won
Playing
  -> sixth non-answer guess submitted -> Lost
Won/Lost
  -> same date reopen -> Completed state restored
Won/Lost
  -> new date open -> New daily puzzle initialized
```

## Local Storage Failure

If `localStorage` read/write fails or is unavailable, the UI must show a clear
message that local profile and puzzle progress cannot be saved on this device.
The feature should not fall back to remote persistence.
