# Data Model: Local Player Statistics

## LocalPlayerStats

Represents aggregate performance for the single active local nickname profile
in the current browser.

### Fields

- `gamesPlayed`: number of counted completed daily puzzles
- `wins`: number of counted winning results
- `losses`: number of counted losing results
- `currentStreak`: number of consecutive local calendar-day wins through the
  latest counted result
- `maxStreak`: highest current streak ever reached by the local profile
- `guessDistribution`: six numeric buckets for wins completed in 1, 2, 3, 4,
  5, or 6 guesses
- `lastCountedDateKey`: the latest daily puzzle date counted in statistics, or
  null before any result is counted

### Relationships

- Belongs to the current Local Nickname Profile in the current browser.
- Is updated from a Counted Daily Result.
- Does not store a full counted-date history.

### Validation Rules

- New stats start at zero values and `lastCountedDateKey` null.
- `gamesPlayed` equals `wins + losses`.
- `guessDistribution` has exactly six buckets.
- Only winning results increment a guess distribution bucket.
- A completed puzzle whose date equals `lastCountedDateKey` MUST NOT update
  aggregate values.
- A completed puzzle whose date differs from `lastCountedDateKey` MAY update
  aggregate values if the completion happens after this feature is available.
- Site data clearing may remove the stats record.

## CountedDailyResult

Represents one completed daily puzzle result that is eligible to update local
statistics.

### Fields

- `dateKey`: local daily puzzle date
- `status`: won or lost
- `guessCount`: number of submitted guesses at completion
- `completedAt`: completion timestamp from the daily puzzle state

### Validation Rules

- Result MUST be completed before it can be counted.
- Result MUST be ignored if its `dateKey` equals `lastCountedDateKey`.
- Winning result MUST have a `guessCount` from 1 through 6.
- Losing result MUST NOT affect guess distribution.
- Results completed before this feature is available MUST NOT be backfilled.

### State Transitions

```text
playing daily puzzle
  -> won result
  -> count once if dateKey differs from lastCountedDateKey

playing daily puzzle
  -> lost result
  -> count once if dateKey differs from lastCountedDateKey

completed result
  -> refresh/reopen
  -> ignored if dateKey equals lastCountedDateKey
```

## StreakState

Represents how current and max streak values change after a counted result.

### Fields

- `currentStreak`: current consecutive calendar-day win count
- `maxStreak`: maximum consecutive calendar-day win count reached
- `lastCountedDateKey`: latest counted daily date used to determine whether a
  win follows the immediately preceding calendar day

### Validation Rules

- A loss sets `currentStreak` to 0.
- A win on the calendar day immediately after `lastCountedDateKey`, while
  current streak is active, increments `currentStreak` by 1.
- A win after one or more skipped calendar days sets `currentStreak` to 1.
- A win when no prior result has been counted sets `currentStreak` to 1.
- `maxStreak` is updated only when `currentStreak` exceeds the previous max.

## StatsViewModel

Represents the values shown in the stats surface.

### Fields

- `gamesPlayed`
- `wins`
- `losses`
- `currentStreak`
- `maxStreak`
- `guessDistribution`
- zero-state indicator when no games have been counted

### Validation Rules

- Must show zero values clearly when no stats exist.
- Must not show reset controls, sharing controls, account prompts, leaderboards,
  detailed history, or latest-result summaries.
- Must remain readable on mobile and desktop without clipped labels,
  overlapping values, or horizontal scrolling.
