# Feature Specification: Offline Daily Wordle Game

**Feature Branch**: `001-daily-wordle-game`

**Created**: 2026-06-20

**Status**: Draft

**Input**: User description: "Create the first feature for an offline daily Wordle-style browser game. The app must use a local player profile stored in the browser. If no username exists, the home screen must show a simple nickname form. No password, no server authentication, no backend, and no remote database. After a username is saved, the home screen must show the daily Wordle-style game. The game uses a local bundled word list, selects one daily answer deterministically by date, accepts valid five-letter guesses, gives tile feedback after each guess, and ends after win or loss. The current daily puzzle progress must persist locally so refreshing the page keeps the board state. The feature must include a small stats button in the game header, but the detailed stats screen can be a placeholder for a later feature. Do not implement real login, global leaderboards, remote sync, multiplayer, automated tests, or paid services. Design requirements: clean, minimal, mobile-first layout; centered board; restrained high-contrast palette; distinct tile states; familiar Wordle-style grid and keyboard patterns with original visual style; responsive without overlap, clipped controls, or unnecessary scrolling; obvious compact controls."

## Clarifications

### Session 2026-06-21

- Q: Should this feature support one local profile or multiple local profiles on the same device? → A: Single active local profile only; one nickname per browser/device for this feature.
- Q: What input method should the first feature support for guesses? → A: On-screen keyboard plus physical keyboard support.
- Q: Should daily answers and valid guesses use the same word list or separate lists? → A: Separate bundled answer list and broader allowed-guess list.

## User Scenarios & Validation *(mandatory)*

### User Story 1 - Create Local Player Profile (Priority: P1)

A first-time player opens the app and creates a local profile by entering a nickname, so the game can associate local daily progress with that player without requiring an account.

**Why this priority**: The game screen depends on knowing the local player. This is the smallest usable replacement for login while preserving the no-server constraint.

**Independent Validation**: Clear local player data, open the app, enter a valid nickname, and verify the app moves from the nickname form to the game screen without asking for a password or contacting a remote service.

**Acceptance Scenarios**:

1. **Given** no local profile exists, **When** the player opens the app, **Then** the home screen shows a compact nickname form instead of the game board.
2. **Given** the nickname form is visible, **When** the player submits a valid nickname, **Then** the nickname is saved locally and the daily game appears on the home screen.
3. **Given** a local profile already exists, **When** the player reopens or refreshes the app, **Then** the daily game appears without asking for the nickname again.

---

### User Story 2 - Play the Daily Word Puzzle (Priority: P1)

A returning player sees the daily word puzzle on the home screen and can make five-letter guesses with an on-screen keyboard or physical keyboard until they win or use all allowed guesses.

**Why this priority**: This is the core game loop and the primary value of the feature.

**Independent Validation**: With a saved local profile, open the home screen, submit valid and invalid guesses, and verify the board gives clear feedback, blocks invalid input, and reaches a win or loss result.

**Acceptance Scenarios**:

1. **Given** a local profile exists, **When** the player opens the home screen, **Then** the centered daily puzzle board and compact on-screen keyboard are immediately playable.
2. **Given** the player enters a valid five-letter guess, **When** the guess is submitted, **Then** the game shows distinct feedback for correct-position, present-wrong-position, and absent letters.
3. **Given** the player enters an invalid guess, **When** the guess is submitted, **Then** the game keeps the current row active and shows a concise error message.
4. **Given** the player guesses the answer, **When** the guess is submitted, **Then** the game enters a won state and prevents further guesses for that daily puzzle.
5. **Given** the player uses all allowed guesses without finding the answer, **When** the last guess is submitted, **Then** the game enters a lost state and reveals the answer.
6. **Given** the player is using a device with a physical keyboard, **When** the player types letters, deletes letters, or submits a guess, **Then** the game mirrors those actions in the active row.

---

### User Story 3 - Resume Daily Progress (Priority: P2)

A player can refresh or close the app and later return to the same daily puzzle state, preserving their local progress for the current day.

**Why this priority**: Daily play feels reliable only if progress is not lost during a refresh or browser restart.

**Independent Validation**: Start a daily puzzle, submit one or more guesses, refresh the page, and verify the saved board state, active result state, and player nickname are restored.

**Acceptance Scenarios**:

1. **Given** the player has submitted guesses for today, **When** the page is refreshed, **Then** all submitted guesses and tile feedback are restored.
2. **Given** the player has won or lost today's puzzle, **When** the app is reopened on the same day, **Then** the completed result state is restored and no additional daily guesses are allowed.
3. **Given** a new calendar day begins, **When** the player opens the app, **Then** a new daily puzzle is available while the local profile remains saved.

---

### User Story 4 - Access Stats Placeholder (Priority: P3)

A player can see a small stats button in the game header and open a placeholder that communicates detailed statistics are coming later.

**Why this priority**: The button establishes the expected navigation for the next feature without expanding this feature into the full statistics system.

**Independent Validation**: Open the game screen, activate the stats button, and verify a compact placeholder appears without showing fabricated or incomplete statistics.

**Acceptance Scenarios**:

1. **Given** the game screen is visible, **When** the player looks at the header, **Then** a small stats button is available without distracting from the game board.
2. **Given** the player activates the stats button, **When** the placeholder opens, **Then** it clearly indicates that detailed statistics will be added later.

### Edge Cases

- If local browser storage is unavailable or blocked, the app shows a clear message that local profile and puzzle progress cannot be saved on this device.
- If the player submits fewer or more than five letters, the active row remains unchanged and the player receives concise feedback.
- If the player submits a five-letter word that is not in the allowed word list, the active row remains unchanged and the player receives concise feedback.
- If the daily answer selection reaches the end of the bundled answer list, selection continues by cycling through the list.
- If the player refreshes during a won or lost result state, the same result state and answer are restored.
- If the viewport is narrow, controls remain usable without overlapping the board, clipping text, or forcing horizontal scrolling.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The system MUST show a local nickname form when no local player profile exists.
- **FR-002**: The system MUST accept a non-empty nickname and save it as the single active local player profile in the browser.
- **FR-003**: The system MUST NOT require passwords, real authentication, server sessions, backend services, remote databases, paid services, global leaderboards, multiplayer, or remote sync.
- **FR-004**: The system MUST show the daily word puzzle on the home screen after a local profile exists.
- **FR-005**: The system MUST use separate bundled local word lists: a curated answer list for daily answers and a broader allowed-guess list for valid guesses.
- **FR-006**: The system MUST select the daily answer deterministically by calendar date so the same date maps to the same answer on the same device.
- **FR-007**: The system MUST accept only five-letter guesses that appear in the allowed word list.
- **FR-008**: The system MUST show tile feedback after each submitted valid guess with distinct states for correct-position, present-wrong-position, and absent letters.
- **FR-009**: The system MUST end the daily puzzle in a won state when the player guesses the answer.
- **FR-010**: The system MUST end the daily puzzle in a lost state after the maximum allowed guesses are used without guessing the answer.
- **FR-011**: The system MUST reveal the correct answer after a lost result.
- **FR-012**: The system MUST persist the current daily puzzle progress locally, including submitted guesses, feedback, completion state, and date.
- **FR-013**: The system MUST restore saved local profile and daily puzzle progress after page refresh or app reopen.
- **FR-014**: The system MUST provide a small stats button in the game header.
- **FR-015**: The system MUST show a stats placeholder when the stats button is activated, without implementing detailed statistics in this feature.
- **FR-016**: The system MUST use a clean, minimal, mobile-first layout with the game board centered and immediately playable after profile setup.
- **FR-017**: The system MUST use a restrained, high-contrast visual palette with distinct visual states for empty, active, correct, present, and absent tiles.
- **FR-018**: The system MUST use familiar word-grid and keyboard/input patterns while maintaining an original visual style that does not copy Wordle branding.
- **FR-019**: The system MUST remain usable on mobile and desktop without overlapping text, clipped controls, horizontal scrolling, or unnecessary vertical scrolling for the primary game flow.
- **FR-020**: The system MUST NOT include automated tests, test fixtures, coverage workflows, or TDD artifacts for this feature.
- **FR-021**: The system MUST support only one active local player profile per browser/device for this feature; multiple local profiles and profile switching are out of scope.
- **FR-022**: The system MUST provide an on-screen keyboard for guess entry and also support physical keyboard input for letters, delete, and submit.

### Key Entities

- **Local Player Profile**: A single active locally stored player identity containing the player's nickname and profile creation state for the current browser/device.
- **Daily Puzzle**: The date-specific game instance containing the selected answer, allowed guess count, submitted guesses, feedback, and completion state.
- **Word Lists**: Separate bundled local collections used without network access: a curated answer list for daily answers and a broader allowed-guess list for valid guesses.
- **Guess**: A submitted five-letter word with per-letter feedback and row position.
- **Input Keyboard**: The player-facing input control containing letter keys, delete, and submit actions, with feedback states that reflect guessed letters.
- **Stats Placeholder**: A temporary UI state opened from the stats button that reserves the future statistics area without calculating detailed metrics.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: A first-time player can create a local nickname and reach the playable game screen in under 30 seconds.
- **SC-002**: A returning player with a saved local profile reaches the playable daily puzzle immediately on app load.
- **SC-003**: After at least two submitted guesses, refreshing the page restores all previous guesses and feedback with no visible loss of progress.
- **SC-004**: 100% of invalid guess attempts leave the current active row unchanged and show feedback explaining why the guess was rejected.
- **SC-005**: The game reaches a clear won or lost result within the configured maximum number of guesses.
- **SC-006**: The primary game screen fits common mobile and desktop viewport widths without horizontal scrolling, clipped controls, or overlapping text.
- **SC-007**: The stats button can be found and activated from the game screen, and the resulting placeholder clearly communicates that detailed stats are planned for a later feature.

## Assumptions

- The first version uses English five-letter words only.
- The daily puzzle allows six guesses.
- The nickname is stored only on the current browser and device, with one active local profile supported for this feature.
- The daily puzzle is based on the user's local calendar date.
- The bundled answer list is curated for fair daily answers and large enough to support daily play by cycling when needed.
- The bundled allowed-guess list is broader than the answer list and includes all accepted guess words.
- Detailed statistics, practice mode, account sync, and a Play Again option are out of scope for this feature.
