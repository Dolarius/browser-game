<!--
Sync Impact Report
Version change: template -> 1.0.0
Modified principles:
- PRINCIPLE_1_NAME placeholder -> I. Clean Code
- PRINCIPLE_2_NAME placeholder -> II. Simple UX
- PRINCIPLE_3_NAME placeholder -> III. Responsive Design
- PRINCIPLE_4_NAME placeholder -> IV. Minimal Dependencies
- PRINCIPLE_5_NAME placeholder -> V. No Automated Tests
Added sections:
- Technology Baseline
- Development Workflow
Removed sections:
- Placeholder template sections
Templates requiring updates:
- ✅ .specify/templates/plan-template.md
- ✅ .specify/templates/spec-template.md
- ✅ .specify/templates/tasks-template.md
- ⚠ .specify/templates/commands/*.md (directory absent)
- ✅ AGENTS.md
Follow-up TODOs: None
-->

# Browser Game Constitution

## Core Principles

### I. Clean Code

Code MUST be readable, direct, and maintainable. Implementations MUST use clear
names, small focused modules, and straightforward control flow. Dead code,
unnecessary abstractions, broad refactors, and clever indirection MUST be
avoided unless they remove real complexity in the current feature. Rationale:
this project should stay easy to inspect and change as the browser game grows.

### II. Simple UX

User experience MUST prioritize obvious actions, concise copy, predictable
navigation, and immediate feedback. Screens MUST avoid unnecessary onboarding,
marketing-style filler, and decorative UI that does not help the player
understand or control the game. Rationale: browser games need fast
comprehension and low friction more than explanatory chrome.

### III. Responsive Design

Every user-facing screen MUST work on mobile and desktop viewports without
overlapping text, clipped controls, or layout shifts caused by normal content.
Interactive areas MUST remain usable with touch and pointer input. Responsive
behavior MUST be planned before implementation, not patched on after the
desktop layout is complete. Rationale: the game runs in a browser and cannot
assume a single screen size.

### IV. Minimal Dependencies

New runtime or development dependencies MUST NOT be added unless the feature
cannot be delivered clearly with the existing stack. Any approved dependency
MUST have a narrow purpose, active maintenance, and no reasonable simpler
alternative. The project MUST use the Next.js, React, React DOM, Tailwind CSS,
and related tool versions declared in `package.json`; plans MUST NOT upgrade,
downgrade, or replace them unless a separate constitution amendment allows it.
Rationale: fewer dependencies reduce maintenance cost and version drift.

### V. No Automated Tests

No automated tests are allowed in this project. Contributors and agents MUST
NOT create, request, plan, run, or require unit tests, integration tests,
contract tests, end-to-end tests, test coverage, TDD workflows, test fixtures,
or test directories. This principle supersedes all other project, template,
agent, and workflow guidance. Validation MUST use manual review, manual browser
checks, static analysis, linting, type checking, and production build checks
only. Rationale: the project owner has explicitly chosen a no-testing workflow.

## Technology Baseline

The required application stack is the one declared in `package.json`:

- Next.js `16.2.9`
- React `19.2.4`
- React DOM `19.2.4`
- Tailwind CSS `^4`
- TypeScript `^5`
- ESLint `^9` with `eslint-config-next` `16.2.9`

Feature plans MUST treat these versions as fixed project constraints. New
libraries, frameworks, state managers, styling systems, game engines, or test
tools are prohibited unless explicitly approved through a constitution
amendment or a feature plan waiver that explains why existing dependencies are
insufficient.

## Development Workflow

Specifications MUST define user-visible behavior, acceptance scenarios, UX
states, responsive constraints, and dependency impact. Plans MUST include a
Constitution Check covering clean code, simple UX, responsive design, minimal
dependencies, fixed package versions, and the no-automated-tests rule.

Tasks MUST be organized into independently deliverable user-story increments.
Each increment MUST include manual validation steps instead of automated test
tasks. Allowed verification commands are limited to non-test checks such as
`npm run build`, linting, type checking, and manual browser inspection.

## Governance

This constitution supersedes conflicting guidance in templates, generated
plans, skills, agent instructions, and feature documents. If any artifact asks
for automated testing or dependency changes that violate this constitution,
contributors and agents MUST follow this constitution instead and update the
artifact.

Amendments require an explicit project-owner request, a documented version
change, and updates to dependent templates or agent guidance in the same
change. Versioning follows semantic versioning: MAJOR for incompatible
principle changes or removals, MINOR for new principles or materially expanded
requirements, and PATCH for wording-only clarifications.

Every feature plan and task list MUST perform a constitution compliance review
before implementation begins. Any justified exception MUST be documented in the
plan's Complexity Tracking section, except the no-automated-tests rule, which
does not permit exceptions.

**Version**: 1.0.0 | **Ratified**: 2026-06-19 | **Last Amended**: 2026-06-19
