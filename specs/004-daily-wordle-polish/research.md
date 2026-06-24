# Research: Daily Wordle Polish, Accessibility, Word Curation, and PWA Update UX

## Decision: Prioritize accessibility and keyboard polish before animation

**Rationale**: Keyboard play, modal close behavior, focus visibility, and understandable announcements affect basic usability. They also create the constraints animation must respect, especially reduced-motion and focus-visible requirements.

**Alternatives considered**:

- Animation-first polish: rejected because it could create inaccessible or noisy behavior that would need rework.
- Visual-only polish: rejected because the feature explicitly includes keyboard-only and assistive-technology use.

## Decision: Use restrained CSS-based reveal feedback

**Rationale**: A classic Wordle-like reveal can be achieved with simple visual state timing and CSS transitions/animations. This keeps the game responsive, avoids new dependencies, and supports reduced-motion fallbacks.

**Alternatives considered**:

- Animation library: rejected because the project constitution favors minimal dependencies and the needed effects are small.
- No animation: rejected because the spec asks for readable reveal sequencing and delayed keyboard feedback.
- Complex physics or 3D effects: rejected as out of scope and inconsistent with the simple game surface.

## Decision: Delay keyboard feedback until matching tile feedback is visible

**Rationale**: Updating the keyboard immediately can reveal information before the row animation communicates it. A small visible-feedback timing state can keep the keyboard and row in sync while preserving the current game rules and saved puzzle state.

**Alternatives considered**:

- Keep current instant keyboard updates: rejected because it conflicts with the spec's timing requirement.
- Persist reveal timing state: rejected because reveal state is presentation-only and should not change saved puzzle progress.

## Decision: Treat adjacent correct-tile grouped highlight as optional

**Rationale**: A contiguous highlight around adjacent correct letters can improve feedback, but it risks fragile positioning across responsive sizes and can delay must-have accessibility/reveal work. The plan should attempt it only if it can be done simply without layout instability.

**Alternatives considered**:

- Make grouped highlight mandatory: rejected because it could dominate the implementation and jeopardize core polish.
- Drop grouped highlight entirely: rejected because the visual idea is desirable and can be attempted after core work.

## Decision: Use a top-right non-blocking update button

**Rationale**: A top-right "Update available" button is visible without interrupting play and matches the clarification. It avoids modal fatigue, settings pages, notification permissions, and install prompts.

**Alternatives considered**:

- Modal update prompt: rejected because it interrupts play.
- Silent next-load update only: rejected because it does not address user confusion about stale cached UI.
- Toast at bottom: rejected because the user clarified the prompt should be a top-right button.

## Decision: Keep PWA updates local-data preserving

**Rationale**: The existing app stores nickname, daily puzzle progress, and stats locally. Update awareness must refresh the app shell without clearing browser site data or changing the local-only model.

**Alternatives considered**:

- Clear site data on update: rejected because it would remove user progress and stats.
- Add settings or cache-management UI: rejected as too broad for this feature.

## Decision: Review word curation manually and make small edits only if obvious issues are found

**Rationale**: The answer list is already bundled, unique, deterministic, shuffled, and offline-compatible. The right next step is a lightweight quality review and documentation of future editing rules, not runtime randomization or history tracking.

**Alternatives considered**:

- Runtime random picker: rejected because it would weaken deterministic daily behavior and could create repeats.
- Recent-answer tracking: rejected because a fixed unique schedule already prevents repeats until the list cycles.
- Large word-list expansion: rejected as out of scope.

## Decision: Validate through manual scenarios and approved checks only

**Rationale**: The constitution prohibits automated tests, fixtures, coverage, and TDD. Manual browser scenarios can verify keyboard behavior, animation timing, reduced motion, PWA update behavior, offline reload, and responsive layout.

**Alternatives considered**:

- Unit tests for reveal state: rejected by the no-automated-tests rule.
- End-to-end browser automation: rejected by the no-automated-tests rule.
