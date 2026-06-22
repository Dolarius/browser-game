# Quickstart: Offline Daily Wordle Game

## Prerequisites

- Dependencies installed with the existing lockfile.
- No backend, database, auth provider, or external service required.
- No automated tests are created or run for this feature.

## Run Locally

```bash
npm run dev
```

Open the local development URL shown by Next.js, usually:

```text
http://localhost:3000
```

## Allowed Verification Commands

```bash
npm run lint
npm run build
```

Use these commands plus manual browser inspection. Do not run or add unit,
integration, contract, end-to-end, coverage, fixture, or TDD workflows.

## Manual Validation Scenarios

### 1. First-Time Profile Gate

1. Clear local browser storage for the app.
2. Open `/`.
3. Confirm the nickname form appears instead of the game board.
4. Submit only whitespace.
5. Confirm a concise validation message appears and no profile is saved.
6. Submit a nickname longer than 20 characters.
7. Confirm a concise validation message appears and no profile is saved.
8. Submit a valid nickname.
9. Confirm the daily game appears without any password, auth, or remote sync prompt.

### 2. Daily Puzzle Input

1. Confirm the game shows a centered six-row, five-column board.
2. Enter letters with the on-screen keyboard.
3. Remove a letter with Delete.
4. Submit with the on-screen Submit key.
5. Repeat with a physical keyboard using letter keys, Backspace/Delete, and Enter.
6. Confirm invalid guesses keep the active row unchanged and show concise feedback.

### 3. Tile Feedback and Completion

1. Submit a valid non-answer guess.
2. Confirm tile colors and accessible labels distinguish correct, present, and absent letters.
3. Continue until a win or loss.
4. Confirm a won result prevents further daily guesses.
5. Confirm a lost result reveals the answer and prevents further daily guesses.

### 4. Persistence

1. Submit at least two valid guesses.
2. Refresh the page.
3. Confirm nickname, submitted guesses, feedback, active status, and date are restored.
4. Complete the puzzle.
5. Refresh again.
6. Confirm the completed result state is restored and additional daily guesses are blocked.

### 5. Stats Placeholder

1. Open the game screen.
2. Activate the stats button.
3. Confirm the placeholder opens and says detailed statistics are planned later.
4. Confirm no fabricated win rate, streak, guess distribution, or totals are displayed.
5. Close the placeholder.

### 6. Responsive Layout

1. Inspect a narrow mobile viewport.
2. Confirm the board, keyboard, header, stats button, result panel, and nickname form do not overlap or clip text.
3. Confirm there is no horizontal scrolling in the primary game flow.
4. Inspect a desktop viewport.
5. Confirm the experience remains centered, compact, and immediately playable.

### 7. Local Storage Failure

1. Simulate blocked or unavailable local storage using browser settings/devtools where practical.
2. Open `/`.
3. Confirm the app shows a clear message that profile and puzzle progress cannot be saved.
4. Confirm the app does not suggest remote sync, login, database, or paid services as fallback.
