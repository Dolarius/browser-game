---

description: "Task list template for feature implementation"
---

# Tasks: [FEATURE NAME]

**Input**: Design documents from `/specs/[###-feature-name]/`

**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/

**Validation**: Automated tests are prohibited. Include only manual review, manual browser checks, static analysis, linting, type checking, and production build checks.

**Organization**: Tasks are grouped by user story to enable independent implementation and manual validation of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

- **Next.js app**: `app/`, `components/`, `lib/`, `public/`
- **Shared code**: `lib/` or feature-specific folders selected in plan.md
- **Styles**: Tailwind CSS ^4 and project CSS files already present in the app
- Do not create `tests/`, `__tests__/`, fixtures, coverage, or e2e directories
- Paths shown below are examples - adjust based on plan.md structure

<!--
  ============================================================================
  IMPORTANT: The tasks below are SAMPLE TASKS for illustration purposes only.

  The /speckit-tasks command MUST replace these with actual tasks based on:
  - User stories from spec.md (with their priorities P1, P2, P3...)
  - Feature requirements from plan.md
  - Entities from data-model.md
  - UI states and contracts from design artifacts

  Tasks MUST be organized by user story so each story can be:
  - Implemented independently
  - Manually validated independently
  - Delivered as an MVP increment

  DO NOT keep these sample tasks in the generated tasks.md file.
  DO NOT generate automated test tasks under any circumstance.
  ============================================================================
-->

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project structure and configuration needed by all stories

- [ ] T001 Confirm project uses package versions declared in package.json
- [ ] T002 Create or update feature folders per implementation plan
- [ ] T003 [P] Confirm Tailwind CSS styling entry points for the feature

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**CRITICAL**: No user story work can begin until this phase is complete

Examples of foundational tasks (adjust based on your project):

- [ ] T004 Create shared data model or state shape in [path]
- [ ] T005 [P] Create reusable UI primitives in [path]
- [ ] T006 [P] Define responsive layout constraints in [path]
- [ ] T007 Configure error handling and user feedback paths
- [ ] T008 Confirm no new dependencies are needed, or document approved waiver in plan.md

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - [Title] (Priority: P1) MVP

**Goal**: [Brief description of what this story delivers]

**Independent Validation**: [How to manually verify this story works on its own]

### Implementation for User Story 1

- [ ] T009 [P] [US1] Create [component/model] in [path]
- [ ] T010 [P] [US1] Create [supporting component/state] in [path]
- [ ] T011 [US1] Implement [interaction/service] in [path] (depends on T009, T010)
- [ ] T012 [US1] Implement responsive UI for [feature] in [path]
- [ ] T013 [US1] Add validation, error states, and empty states
- [ ] T014 [US1] Manually validate US1 on mobile and desktop viewport sizes

**Checkpoint**: At this point, User Story 1 should be functional and manually validated independently

---

## Phase 4: User Story 2 - [Title] (Priority: P2)

**Goal**: [Brief description of what this story delivers]

**Independent Validation**: [How to manually verify this story works on its own]

### Implementation for User Story 2

- [ ] T015 [P] [US2] Create [component/model] in [path]
- [ ] T016 [US2] Implement [interaction/service] in [path]
- [ ] T017 [US2] Implement responsive UI for [feature] in [path]
- [ ] T018 [US2] Integrate with User Story 1 components (if needed)
- [ ] T019 [US2] Manually validate US2 on mobile and desktop viewport sizes

**Checkpoint**: At this point, User Stories 1 AND 2 should both work independently

---

## Phase 5: User Story 3 - [Title] (Priority: P3)

**Goal**: [Brief description of what this story delivers]

**Independent Validation**: [How to manually verify this story works on its own]

### Implementation for User Story 3

- [ ] T020 [P] [US3] Create [component/model] in [path]
- [ ] T021 [US3] Implement [interaction/service] in [path]
- [ ] T022 [US3] Implement responsive UI for [feature] in [path]
- [ ] T023 [US3] Manually validate US3 on mobile and desktop viewport sizes

**Checkpoint**: All user stories should now be functional and manually validated

---

[Add more user story phases as needed, following the same pattern]

---

## Phase N: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories

- [ ] TXXX [P] Documentation updates in docs/
- [ ] TXXX Code cleanup and refactoring
- [ ] TXXX Performance optimization across all stories
- [ ] TXXX Responsive design pass for mobile, tablet, and desktop
- [ ] TXXX Dependency audit confirming no unapproved packages were added
- [ ] TXXX Run allowed verification commands such as `npm run build` and lint/type checks
- [ ] TXXX Manual browser inspection of primary flows

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phase 3+)**: All depend on Foundational phase completion
  - User stories can then proceed in parallel (if staffed)
  - Or sequentially in priority order (P1 -> P2 -> P3)
- **Polish (Final Phase)**: Depends on all desired user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational (Phase 2) - No dependencies on other stories
- **User Story 2 (P2)**: Can start after Foundational (Phase 2) - May integrate with US1 but should remain independently verifiable
- **User Story 3 (P3)**: Can start after Foundational (Phase 2) - May integrate with US1/US2 but should remain independently verifiable

### Within Each User Story

- Shared models/state before components that consume them
- Components before page-level integration
- Core implementation before responsive polish
- Error, empty, and loading states before manual validation
- Story complete before moving to next priority

### Parallel Opportunities

- All Setup tasks marked [P] can run in parallel
- All Foundational tasks marked [P] can run in parallel (within Phase 2)
- Once Foundational phase completes, all user stories can start in parallel (if team capacity allows)
- Components within a story marked [P] can run in parallel
- Different user stories can be worked on in parallel by different team members

---

## Parallel Example: User Story 1

```bash
# Launch all independent component/model tasks for User Story 1 together:
Task: "Create [component] in [path]"
Task: "Create [state/model] in [path]"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational (CRITICAL - blocks all stories)
3. Complete Phase 3: User Story 1
4. STOP and VALIDATE: manually inspect User Story 1 independently
5. Deploy/demo if ready

### Incremental Delivery

1. Complete Setup + Foundational -> Foundation ready
2. Add User Story 1 -> manually validate -> Deploy/Demo (MVP)
3. Add User Story 2 -> manually validate -> Deploy/Demo
4. Add User Story 3 -> manually validate -> Deploy/Demo
5. Each story adds value without breaking previous stories

### Parallel Team Strategy

With multiple developers:

1. Team completes Setup + Foundational together
2. Once Foundational is done:
   - Developer A: User Story 1
   - Developer B: User Story 2
   - Developer C: User Story 3
3. Stories complete and integrate independently

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- Each user story should be independently completable and manually verifiable
- Do not create or run automated tests
- Commit after each task or logical group
- Stop at any checkpoint to validate story independently
- Avoid: vague tasks, same file conflicts, cross-story dependencies that break independence
