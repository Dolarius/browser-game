# Research: Offline Daily Wordle Game

## Decision: Use existing dependencies only

**Rationale**: The constitution requires minimal dependencies and fixed package
versions. This feature can be delivered with Next.js, React, Tailwind CSS,
TypeScript, browser `localStorage`, and native date formatting.

**Alternatives considered**:

- Add shadcn/ui: rejected because shadcn is not installed and this feature only
  needs simple buttons, a nickname form, and a small placeholder dialog/panel.
- Add Yup or Zod: rejected because nickname validation is limited to trim,
  required, and max-length checks.
- Add date-fns: rejected because daily keys and display dates can be handled
  with native `Date` and `Intl.DateTimeFormat`.

## Decision: Tailwind CSS with `@theme` color tokens

**Rationale**: Tailwind CSS ^4 is already installed and `app/globals.css`
already uses `@theme inline`. Feature colors should be defined as theme tokens
for board, keyboard, status, and page colors, then consumed through Tailwind
classes. This keeps styling centralized without adding a component library.

**Alternatives considered**:

- Inline component-specific colors: rejected because tile state colors need to
  stay consistent across board, keyboard, and result states.
- External design system: rejected as unnecessary for the first feature.

## Decision: Store local profile and daily progress in `localStorage`

**Rationale**: The feature needs browser-local persistence only: one active
nickname and one current daily puzzle state. `localStorage` is sufficient,
simple, synchronous, and available without a backend or database.

**Alternatives considered**:

- IndexedDB: rejected because the data model is small and does not need large
  object storage, indexing, or async transactional writes.
- Server database: rejected by feature scope and constitution constraints.

## Decision: Separate bundled answer and allowed-guess lists

**Rationale**: A curated answer list makes daily words fair and recognizable.
A broader allowed-guess list lets players enter more valid five-letter words
without making obscure words daily answers.

**Alternatives considered**:

- Single list for answers and guesses: rejected because it either narrows valid
  guesses too much or makes daily answers less curated.
- API-provided words: rejected because the game must work offline and without
  external services.

## Decision: Native date key and display formatting

**Rationale**: The game only needs a stable daily key and a human-readable
date. Native date handling can produce a local `YYYY-MM-DD` key and
`Intl.DateTimeFormat` can display the date without adding dependencies.

**Alternatives considered**:

- date-fns: rejected because no complex date math, time zones, durations, or
  localization helpers are needed for this feature.

## Decision: Pure helpers for word logic and state transitions

**Rationale**: Guess feedback, daily answer selection, validation, and state
transitions are easier to reason about as small pure TypeScript helpers outside
React components. This supports clean code without adding a state-management
library.

**Alternatives considered**:

- Put all logic in the page component: rejected because it would mix UI,
  persistence, and game rules.
- Add a state management library: rejected because the feature state is local
  to one page and can be managed with React state plus pure helpers.
