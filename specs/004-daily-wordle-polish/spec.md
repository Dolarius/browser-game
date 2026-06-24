# Feature Specification: Daily Wordle Polish, Accessibility, Word Curation, and PWA Update UX

**Feature Branch**: `004-daily-wordle-polish`

**Created**: 2026-06-24

**Status**: Draft

**Input**: User description: "Improve the existing Daily Wordle browser game with focused UI/UX polish, accessibility improvements, answer-list curation rules, and minimal PWA update handling. Keep the feature local-only, dependency-free, responsive, and aligned with the current no-automated-tests constitution. The feature should polish interaction quality without changing the core Wordle rules. Add pointer cursors for all clickable controls and make hover, active, disabled, and focus-visible states clear and consistent. Improve keyboard and modal accessibility: stats modal should support predictable keyboard behavior such as Escape-to-close and sensible focus handling; interactive controls should have clear accessible names; status/result updates should remain understandable for assistive technology without noisy duplicate announcements. Add restrained feedback animations for submitted guesses. When a guess is submitted, tile feedback should reveal in a short readable sequence instead of all feedback and keyboard colors changing instantly. Keyboard feedback should not update before the corresponding tile feedback is visible. Correct-position letters should receive a stronger brief emphasis such as a subtle glow/pulse. Present-but-wrong-position letters should receive a dimmer emphasis. Absent letters should receive no special glow beyond normal reveal. When a row is solved, the row may receive one brief success emphasis. Respect reduced-motion preferences: animations should be disabled or reduced while preserving all meaning through color, labels, and assistive text. If practical, adjacent correct tiles in the same submitted row should be visually grouped by a single contiguous highlight during the reveal/success emphasis instead of separate borders around each tile. Add lightweight word curation rules for the bundled answer list. Add minimal PWA update UX if it remains simple. Out of scope: automated tests, new dependencies, backend answer service, accounts/auth/sync, notifications, major redesign, new routes, settings page, large word-list expansion, full historical stats, or changing the daily puzzle rules."

## Clarifications

### Session 2026-06-24

- Q: How should the app handle a newer available PWA/app version? → A: Show a small non-blocking "Update available" prompt with a refresh action.

## User Scenarios & Validation *(mandatory)*

### User Story 1 - Clear Interaction Feedback (Priority: P1)

A player submits guesses and receives polished, readable feedback that makes the result of each letter easy to follow without changing the core puzzle rules.

**Why this priority**: Guess feedback is the central game loop. If tile and keyboard feedback feel abrupt or confusing, every play session is affected.

**Independent Validation**: Can be verified by entering guesses with correct, present, and absent letters, then confirming tile feedback is revealed in a readable sequence and keyboard feedback follows the visible tile result.

**Acceptance Scenarios**:

1. **Given** a player has entered a valid guess, **When** the guess is submitted, **Then** the row reveals each tile's result in a short, readable sequence rather than changing the whole row instantly.
2. **Given** a submitted guess contains correct-position letters, **When** those letters are revealed, **Then** they receive a stronger brief emphasis that helps the player notice them without obscuring the letter or result color.
3. **Given** a submitted guess contains present-but-wrong-position letters, **When** those letters are revealed, **Then** they receive a subtler emphasis than correct-position letters.
4. **Given** a submitted guess contains absent letters, **When** those letters are revealed, **Then** they use the normal reveal treatment without a special glow or success emphasis.
5. **Given** a submitted guess solves the puzzle, **When** the final result is visible, **Then** the solved row may receive one brief success emphasis without looping or distracting from the result message.
6. **Given** keyboard feedback is shown for used letters, **When** a guess is submitted, **Then** keyboard colors do not reveal a letter result before the corresponding tile feedback is visible.

---

### User Story 2 - Accessible Keyboard and Modal Use (Priority: P1)

A keyboard-only or assistive-technology player can play the game, open and close the stats modal, and understand status changes without relying on pointer-only interactions.

**Why this priority**: Accessibility and keyboard behavior determine whether the core game can be used predictably by all players.

**Independent Validation**: Can be verified by playing with only the physical keyboard, opening the stats surface, closing it with keyboard actions, and confirming status/result messages remain understandable.

**Acceptance Scenarios**:

1. **Given** a player uses the physical keyboard, **When** they type letters, delete letters, and submit guesses, **Then** the game responds consistently with the visible on-screen controls.
2. **Given** the stats modal is open, **When** the player presses Escape, **Then** the modal closes and focus returns to a sensible game control.
3. **Given** the stats modal is open, **When** the player navigates with the keyboard, **Then** focus remains predictable and does not move behind the modal in a confusing way.
4. **Given** a player uses assistive technology, **When** controls and status messages are encountered, **Then** each control has a clear name and status/result updates are understandable without duplicate noisy announcements.
5. **Given** a player has requested reduced motion, **When** guess feedback would normally animate, **Then** motion is disabled or shortened while all tile, keyboard, and result meanings remain clear.

---

### User Story 3 - Consistent Clickable and Focus States (Priority: P2)

A player can immediately tell which controls are clickable, focused, active, or unavailable across mobile and desktop layouts.

**Why this priority**: Small interaction cues reduce hesitation and make the game feel finished without adding new gameplay.

**Independent Validation**: Can be verified by moving a pointer over clickable controls, using keyboard focus, activating controls, and checking disabled or unavailable interactions on mobile and desktop widths.

**Acceptance Scenarios**:

1. **Given** a visible control can be clicked or tapped, **When** a pointer hovers over it on a pointer-capable device, **Then** it uses a pointer cursor and a clear hover state.
2. **Given** a control receives keyboard focus, **When** focus is visible, **Then** the focus indication is strong enough to identify the active control and is not hidden by other visual effects.
3. **Given** a control is being pressed or activated, **When** the action occurs, **Then** the active state provides immediate feedback.
4. **Given** an interaction is unavailable, **When** the player encounters it, **Then** it appears unavailable and does not look like a normal clickable action.

---

### User Story 4 - Curated Daily Answer Quality (Priority: P2)

A player experiences daily answers that feel varied, recognizable, and fairly curated rather than obviously alphabetic or clustered by spelling pattern.

**Why this priority**: Predictable or weak answer ordering can make the puzzle feel less fair and easier to game.

**Independent Validation**: Can be verified by reviewing the answer list and daily order for uniqueness, recognizable words, non-alphabetic ordering, and absence of obvious short-window clusters.

**Acceptance Scenarios**:

1. **Given** the answer list is reviewed, **When** all entries are checked, **Then** every answer is unique.
2. **Given** the daily answer order is reviewed, **When** consecutive answers are inspected, **Then** the order is not alphabetic.
3. **Given** a short window of upcoming answers is reviewed, **When** neighboring answers are compared, **Then** the sequence avoids obvious clusters such as repeated first two letters, repeated endings, highly similar spellings, or obvious themed groups.
4. **Given** the answer list is reviewed for quality, **When** a word is obscure, offensive, a proper noun, a cheap-feeling plural, or an unusual letter-pattern word, **Then** it is removed or explicitly accepted before release.

---

### User Story 5 - Simple App Update Awareness (Priority: P3)

A returning player is not left confused by stale cached UI after a newer version of the game is available, while offline play remains intact.

**Why this priority**: Update confusion is real but less central than the core play loop and accessibility improvements.

**Independent Validation**: Can be verified by using an older cached app version, making a newer version available, and confirming the player gets a small non-blocking refresh prompt without losing local data.

**Acceptance Scenarios**:

1. **Given** a newer app version is available, **When** a returning player opens the game with an older cached version, **Then** the game provides a small non-blocking "Update available" prompt with a refresh action.
2. **Given** an update is available during play, **When** the player continues playing, **Then** the update behavior does not interrupt an active guess or clear local progress.
3. **Given** a player accepts or receives an app update, **When** the updated game is loaded, **Then** the local nickname profile, daily puzzle progress, and local statistics remain available when browser site data has not been cleared.
4. **Given** the app shell is already prepared for offline use, **When** the player reloads offline, **Then** the existing offline reload behavior still works.

### Edge Cases

- A player has reduced motion enabled before opening the game.
- A player opens the stats modal, tabs through controls, and presses Escape from different focused controls.
- A player submits a winning guess with two or more adjacent correct-position letters.
- A player submits repeated guesses with mixed correct, present, and absent letters.
- A player rapidly types or submits while reveal feedback is still visible.
- A player uses a narrow mobile viewport where focus rings, glow effects, and grouped highlights could overlap.
- A player opens an older cached version of the app with no network connection.
- A player updates the app after completing a puzzle but before opening the stats view.
- A future word-list edit accidentally introduces duplicate answers or obvious nearby spelling clusters.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The game MUST preserve the existing Daily Wordle rules, daily puzzle model, local profile behavior, and local statistics behavior.
- **FR-002**: Every clickable or tappable game control MUST present a clear interactive affordance on pointer-capable devices.
- **FR-003**: Clickable controls MUST have clear hover, active, focus-visible, and unavailable states where those states apply.
- **FR-004**: Focus-visible states MUST remain visually stronger and clearer than decorative hover or animation effects.
- **FR-005**: The stats modal MUST support closing through a keyboard action.
- **FR-006**: The stats modal MUST keep keyboard navigation predictable while open and return focus to a sensible game control when closed.
- **FR-007**: Interactive controls MUST have understandable accessible names.
- **FR-008**: Status and result updates MUST remain understandable to assistive technology without repeated noisy announcements for the same event.
- **FR-009**: Submitted guess feedback MUST reveal in a short readable sequence.
- **FR-010**: Keyboard letter feedback MUST NOT visually reveal a submitted letter's result before the matching tile result is visible.
- **FR-011**: Correct-position tile feedback MUST receive a stronger brief emphasis than present-but-wrong-position tile feedback.
- **FR-012**: Present-but-wrong-position tile feedback MUST receive a subtler brief emphasis than correct-position tile feedback.
- **FR-013**: Absent tile feedback MUST NOT receive a special glow or success emphasis beyond the normal reveal treatment.
- **FR-014**: A solved row MAY receive one brief success emphasis after the winning result is visible.
- **FR-015**: Motion effects MUST be disabled or reduced when the player has requested reduced motion, while preserving all meaning through non-motion cues.
- **FR-016**: Adjacent correct-position tiles in the same submitted row SHOULD receive a single contiguous grouped highlight when this can be delivered without layout instability, overlap, or readability loss.
- **FR-017**: The grouped highlight, if included, MUST work on mobile and desktop widths without changing grid layout.
- **FR-018**: The bundled answer list MUST contain only unique answers.
- **FR-019**: The daily answer order MUST NOT be alphabetic.
- **FR-020**: The answer order SHOULD avoid obvious short-window clusters such as repeated first two letters, repeated endings, similar spellings, or themed groups close together.
- **FR-021**: Answer-list entries SHOULD be recognizable common words and SHOULD exclude obscure words, offensive words, proper nouns, cheap-feeling plurals, and unusual letter-pattern words unless explicitly accepted.
- **FR-022**: The feature MUST NOT add runtime random answer selection or recent-answer tracking.
- **FR-023**: The game MUST provide a small non-blocking "Update available" prompt with a refresh action when a newer app version is available and can be detected.
- **FR-024**: App update behavior MUST be non-blocking and MUST NOT interrupt active play.
- **FR-025**: App update behavior MUST NOT clear the local nickname profile, daily puzzle progress, or local statistics when browser site data remains intact.
- **FR-026**: Existing offline reload behavior MUST continue working after this feature.
- **FR-027**: The feature MUST NOT add accounts, sign-in, remote sync, backend services, analytics, notifications, install-prompt flows, settings pages, new routes, large word-list expansion, full historical stats, new dependencies, or automated tests.

### Key Entities

- **Submitted Guess Feedback**: The visible per-letter result for a submitted guess, including correct-position, present-but-wrong-position, and absent states.
- **Keyboard Feedback**: The visible state of physical/on-screen keyboard letters after submitted guesses.
- **Interaction State**: The visible condition of a control, including hover, active, focus-visible, and unavailable states.
- **Stats Modal**: The existing modal surface that shows local player statistics and must remain accessible through keyboard and pointer input.
- **Answer List**: The curated set of possible daily answers and its deterministic daily order.
- **App Update Notice**: A small non-blocking player-facing prompt that helps refresh to a newer available app version.
- **Local Player Data**: The local nickname profile, daily puzzle progress, and local statistics stored in the current browser.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: During manual review, 100% of clickable visible controls show a pointer affordance on pointer-capable devices and a visible focus state during keyboard navigation.
- **SC-002**: A keyboard-only player can start from the game screen, enter a guess, open the stats modal, close it, and return to gameplay without using a pointer.
- **SC-003**: In manual reveal checks, keyboard feedback appears no earlier than the matching tile feedback for every submitted letter reviewed.
- **SC-004**: Correct, present, and absent feedback remain distinguishable in 100% of reviewed guess submissions, including when motion is reduced.
- **SC-005**: The stats modal and game board show no clipped controls, overlapping focus indicators, or horizontal scrolling on reviewed mobile and desktop widths.
- **SC-006**: The answer list review confirms 100% uniqueness and no alphabetic daily ordering.
- **SC-007**: A review of at least 30 consecutive daily answers finds no obvious clusters of repeated first two letters, repeated endings, highly similar spellings, or themed groups.
- **SC-008**: If an update is available and detectable, a returning player can identify the update prompt and refresh to the newer app version in one clear action.
- **SC-009**: After an app update validation, local nickname profile, daily puzzle progress, and local statistics remain available when browser site data has not been cleared.
- **SC-010**: Manual validation confirms no automated tests, new dependencies, backend services, accounts, sync, notifications, settings page, or core rule changes were introduced.

## Assumptions

- The target user is the existing Daily Wordle player using one local browser profile.
- The game remains a local-only browser game with one active daily puzzle.
- The existing stats surface remains the only modal that needs accessibility polish in this feature.
- Grouped adjacent-correct highlights are desirable but secondary to core reveal timing, accessibility, and responsive readability.
- App update awareness should stay minimal; if it cannot be delivered simply, it should be split into a later feature rather than expanding scope.
- Word-list review can be manual and checklist-based; this feature does not require automated word validation tooling.
- Existing local browser data may be removed only when the player clears site data, not because of normal app updates.
