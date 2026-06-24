# Word Curation Review

Reviewed `/Users/alexvrabie/Sites/browser-game/data/words/answers.ts` for the
Daily Wordle polish feature.

## Outcome

- Answer count: 389.
- Duplicate answers: none found.
- Daily order: intentionally non-alphabetic.
- Runtime random selection: not introduced.
- Recent-answer tracking: not introduced.

## Thirty-Day Window

Reviewed the first 30 scheduled answers:

`order`, `guess`, `scene`, `phone`, `sweet`, `color`, `ready`, `bench`,
`dance`, `super`, `cable`, `novel`, `image`, `usual`, `chase`, `anger`,
`motor`, `earth`, `theme`, `truth`, `alike`, `fruit`, `price`, `those`,
`valid`, `sight`, `bread`, `joint`, `scale`, `value`.

The review found no repeated first-two-letter pairs and no adjacent highly
similar spellings. `scene` and `phone` share the final two letters, but they
were accepted because they do not form an obvious spelling, sound, or theme
cluster.

## Edits

- Swapped `alone` with `fruit` to separate the adjacent `alike` / `alone`
  similarity while preserving the same bundled answer set and deterministic
  order.
