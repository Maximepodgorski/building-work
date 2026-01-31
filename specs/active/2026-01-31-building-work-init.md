---
title: Building Work - Initial Project Setup
status: active
created: 2026-01-31
estimate: 6h
tier: standard
---

# Building Work - Initial Project Setup

## Context

Building Work is a mobile-first web application designed to promote workplace well-being through engaging multiplayer quiz sessions. Unlike traditional gaming-style quiz apps, this platform emphasizes a clean, professional, and minimalist aesthetic suitable for corporate environments. The goal is to create an accessible, WCAG 2.1 AA compliant application that teams can use to connect around well-being topics while tracking engagement and providing feedback mechanisms.

## Codebase Impact (MANDATORY)

| Area | Impact | Detail |
|------|--------|--------|
| Project root | CREATE | Next.js 14+ project with App Router, TypeScript, Tailwind CSS |
| package.json | CREATE | Dependencies: next, react, react-dom, typescript, tailwindcss, zustand, framer-motion, @types/* |
| tailwind.config.ts | CREATE | Custom design system: black/white palette, accessibility-first utilities, touch target sizes |
| app/layout.tsx | CREATE | Root layout with mobile-first navbar (fixed bottom), metadata, PWA manifest link |
| app/page.tsx | CREATE | "Jouer" home page - session code input and join button |
| app/classement/page.tsx | CREATE | Global leaderboard with rankings, filters (week/month/all-time) |
| app/equipe/page.tsx | CREATE | Team directory with member cards, search/filter |
| app/quiz/[sessionId]/page.tsx | CREATE | Dynamic quiz game flow with timer, question display, real-time player count |
| app/resultats/page.tsx | CREATE | Post-game results screen with scores, podium-style top 3 |
| app/feedback/page.tsx | CREATE | Post-game feedback form with emoji scale and optional comment |
| components/ui/* | CREATE | Reusable UI primitives: Button, Input, Card with WCAG 2.1 AA compliance |
| components/quiz/* | CREATE | Quiz-specific: QuestionCard, Timer, ProgressBar |
| components/layout/* | CREATE | Navbar (bottom fixed), PageContainer wrapper |
| lib/store/* | CREATE | Zustand stores for game state, user state, leaderboard state |
| lib/data/* | CREATE | Mock data generators for players, questions (French, well-being themed) |
| lib/utils/* | CREATE | Utility functions for localStorage, scoring, formatting |
| public/manifest.json | CREATE | PWA manifest with icons, theme colors, mobile-first config |
| public/icons/* | CREATE | App icons for PWA (various sizes) |
| .env.local.example | CREATE | Environment variables template |

**Files:** 25+ create | 0 modify | 0 affected
**Reuse:** None identified (greenfield project)
**Breaking changes:** None (new project)
**New dependencies:**
- `next@14+` - Core framework (App Router required)
- `zustand` - Lightweight state management (alternative: Redux - rejected for simplicity)
- `framer-motion` - Subtle animations (alternative: CSS-only - rejected for reduced-motion support)
- `tailwindcss` - Utility-first CSS (no alternatives considered - requirement)

## User Journey (MANDATORY)

### Primary Journey

ACTOR: Team member (employee in an organization)
GOAL: Join a live quiz session, answer questions, and provide well-being feedback
PRECONDITION: Team member has received a session code from their organization

1. User opens app on mobile device
   → System displays "Jouer" page with prominent session code input field
   → User sees navigation bar at bottom (Classement / Jouer / Équipe)

2. User enters session code "ABC123" and taps "Rejoindre la partie"
   → System validates code, navigates to /quiz/ABC123
   → User sees first question with 4 answer options, timer countdown, and "5 players online"

3. User selects answer option
   → System provides instant visual feedback (green for correct, red for incorrect)
   → System auto-advances to next question after 2s delay
   → User sees progress indicator "Question 2/5"

4. User completes all 5 questions
   → System calculates score and navigates to /resultats
   → User sees animated score counter, podium with top 3 players, full ranking list

5. User reviews results and taps "Continuer"
   → System navigates to /feedback
   → User sees "Comment vous sentez-vous au travail aujourd'hui ?" with emoji slider

6. User selects emoji rating and optionally adds comment, then taps "Soumettre"
   → System saves feedback to localStorage
   → User sees confirmation message "Merci pour votre retour !"
   → User can tap "Rejouer" or navigate to other tabs

POSTCONDITION: User's score is recorded, feedback is saved, user can rejoin or explore leaderboard/team

### Error Journeys

E1. Invalid Session Code
Trigger: User enters non-existent session code
1. User enters "INVALID" and taps "Rejoindre la partie"
   → System detects invalid code
   → User sees error toast "Code de session invalide. Veuillez réessayer."
2. User corrects code and retries
   → System accepts valid code and proceeds to quiz
Recovery: User successfully joins quiz session

E2. Network Timeout During Quiz (Mock Simulation)
Trigger: Simulated connection loss during active quiz
1. User is on question 3/5, timer is running
   → System simulates timeout (mock delay exceeds threshold)
   → User sees error overlay "Connexion perdue. Tentative de reconnexion..."
2. System auto-recovers after 3s (mock reconnect)
   → Quiz resumes at same question with timer reset
Recovery: User continues quiz from last question

E3. Empty Feedback Submission
Trigger: User taps "Soumettre" without selecting emoji rating
1. User taps submit button with no emoji selected
   → System validates form and detects missing rating
   → User sees inline error message "Veuillez sélectionner votre ressenti"
2. User selects emoji and resubmits
   → System accepts form
Recovery: Feedback is saved successfully

### Edge Cases

EC1. **Empty leaderboard**: First-time user with no game history → Display empty state with "Aucun classement pour le moment. Jouez votre première partie !"
EC2. **Concurrent same-score players**: Multiple players finish with identical scores → Rank by completion time (fastest first)
EC3. **Very long player names**: Names exceeding 30 characters → Truncate with ellipsis "John Doe-Smithson..."
EC4. **Session code case sensitivity**: User enters "abc123" instead of "ABC123" → Normalize to uppercase before validation
EC5. **Timer expiration**: User doesn't answer within time limit → Auto-select no answer, mark as incorrect, advance to next question
EC6. **Multiple tabs open**: User opens app in 2 browser tabs → Each tab maintains independent state (no cross-tab sync in v1)

## Acceptance Criteria (MANDATORY)

### Must Have (BLOCKING — all must pass to ship)

- [ ] AC-1: GIVEN user is on home page WHEN they enter valid session code and tap "Rejoindre" THEN they navigate to /quiz/[sessionId] and see first question with timer and 4 options
- [ ] AC-2: GIVEN user is viewing a quiz question WHEN they select an answer THEN they see immediate visual feedback (green border for correct, red for incorrect) and auto-advance after 2s
- [ ] AC-3: GIVEN user has answered all 5 questions WHEN quiz completes THEN they see results page with their score, top 3 podium, and full player list
- [ ] AC-4: GIVEN user is on results page WHEN they tap "Continuer" THEN they navigate to feedback form with emoji scale
- [ ] AC-5: GIVEN user submits feedback WHEN form is valid THEN data saves to localStorage and confirmation message displays
- [ ] AC-6: GIVEN user is on any page WHEN they view the navbar THEN they see 3 tabs (Classement / Jouer / Équipe) fixed at bottom with active state highlighted
- [ ] AC-7: GIVEN user navigates to Classement WHEN page loads THEN they see ranked list of all players with rank, name, total points, games played, and top 3 highlighted
- [ ] AC-8: GIVEN user navigates to Équipe WHEN page loads THEN they see grid of team members with avatar, name, department
- [ ] AC-9: GIVEN user is keyboard navigating WHEN they tab through interactive elements THEN all buttons, inputs, and links show visible focus indicators with 4.5:1 contrast ratio
- [ ] AC-10: GIVEN user has screen reader enabled WHEN they navigate THEN all interactive elements have proper ARIA labels, semantic HTML, and quiz timer announces at 10s/5s/0s via aria-live
- [ ] AC-11: GIVEN all text content WHEN measured against background THEN contrast ratio is minimum 4.5:1 (WCAG 2.1 AA)
- [ ] AC-12: GIVEN user has prefers-reduced-motion enabled WHEN animations trigger THEN all animations are disabled or reduced to minimal transitions

### Error Criteria (BLOCKING — all must pass)

- [ ] AC-E1: GIVEN user enters invalid session code WHEN they tap "Rejoindre" THEN error toast displays "Code de session invalide" and input remains focused
- [ ] AC-E2: GIVEN user submits feedback form empty WHEN they tap "Soumettre" THEN inline error message displays "Veuillez sélectionner votre ressenti" below emoji scale
- [ ] AC-E3: GIVEN timer expires on a question WHEN countdown reaches 0 THEN question auto-advances with no answer selected and marked incorrect

### Should Have (ship without, fix soon)

- [ ] AC-13: GIVEN user taps on team member card WHEN navigation occurs THEN modal displays with member stats (games played, average score)
- [ ] AC-14: GIVEN leaderboard is filtered by "Semaine" WHEN filter applies THEN only scores from current week display

## Scope

- [ ] 1. Initialize Next.js 14+ project with TypeScript, Tailwind CSS, App Router configuration → AC-1, AC-6
- [ ] 2. Configure Tailwind design system with accessibility-first palette (black/white/grays, 44px touch targets, WCAG AA colors) → AC-9, AC-11
- [ ] 3. Create root layout with bottom-fixed mobile navbar (3 tabs: Classement / Jouer / Équipe) → AC-6
- [ ] 4. Build "Jouer" home page with session code input, validation, error handling, and focus management for toasts → AC-1, AC-E1
- [ ] 5. Implement quiz game flow (/quiz/[sessionId]) with QuestionCard, timestamp-based Timer, ProgressBar, answer feedback → AC-2, AC-E3
- [ ] 6. Create results page (/resultats) with animated score counter, podium top 3, full ranking → AC-3
- [ ] 7. Build feedback form (/feedback) with emoji scale, sanitized optional comment field, validation → AC-4, AC-5, AC-E2
- [ ] 8. Create Classement page with sortable ranking table, filters, top 3 highlights → AC-7
- [ ] 9. Build Équipe page with member grid, search/filter functionality → AC-8
- [ ] 10. Implement Zustand stores for game state, user state, leaderboard data → AC-2, AC-3, AC-7
- [ ] 11. Create seeded mock data generators for French well-being quiz questions (5 questions) and consistent player profiles → AC-1, AC-2
- [ ] 12. Build reusable UI components (Button, Input, Card) with WCAG 2.1 AA compliance → AC-9, AC-10, AC-11
- [ ] 13. Add Framer Motion animations with prefers-reduced-motion support → AC-12
- [ ] 14. Configure PWA manifest and basic service worker → (infrastructure)
- [ ] 15. Implement localStorage utilities for persisting scores and feedback → AC-5

### Out of Scope

- Backend API or real-time multiplayer (mock data only in v1)
- User authentication or account creation
- Dark mode (light mode only per requirements)
- Admin dashboard for creating quiz questions
- Cross-device session sync
- Analytics or tracking beyond localStorage
- Email notifications or reminders
- Mobile native app (PWA only)

## Quality Checklist

### Blocking (must pass to ship)

- [ ] All Must Have ACs passing (AC-1 through AC-12)
- [ ] All Error Criteria ACs passing (AC-E1, AC-E2, AC-E3)
- [ ] All scope items implemented (15 items)
- [ ] No regressions in existing tests (N/A - new project)
- [ ] Error states handled (invalid codes, empty forms, timer expiration)
- [ ] No hardcoded secrets or credentials (N/A - no backend)
- [ ] WCAG 2.1 AA compliance verified: contrast ratios 4.5:1+ including all opacity variants, keyboard navigation, screen reader labels, touch targets 44px+
- [ ] All interactive elements have visible focus indicators
- [ ] Animations respect prefers-reduced-motion
- [ ] French language throughout (no English fallbacks in UI)

### Advisory (should pass, not blocking)

- [ ] All Should Have ACs passing (AC-13, AC-14)
- [ ] Code follows Next.js 14 App Router conventions (server/client components)
- [ ] Tailwind classes organized with prettier-plugin-tailwindcss
- [ ] Components are properly typed with TypeScript (no `any` types)
- [ ] Mock data includes realistic French well-being questions
- [ ] Loading states for all async operations (page transitions)
- [ ] Responsive design tested on mobile (375px) and tablet (768px) viewports

## Risks

| Risk | Impact | Likelihood | Mitigation |
|------|--------|------------|------------|
| WCAG 2.1 AA compliance failures on initial build | HIGH | MEDIUM | Use automated tools (axe DevTools, Lighthouse) + manual keyboard/screen reader testing before marking ACs complete |
| Design system colors fail 4.5:1 contrast ratio | HIGH | LOW | Pre-validate all color combinations with WebAIM Contrast Checker, document approved pairings in Tailwind config |
| Framer Motion animations don't respect prefers-reduced-motion | MEDIUM | MEDIUM | Wrap all motion components with `useReducedMotion` hook, test in browser dev tools with motion preference toggled |
| Mock data feels unrealistic or unprofessional | MEDIUM | MEDIUM | Source real workplace well-being questions from reputable sources (WHO, APA), review with French native speaker |
| localStorage quota exceeded with feedback data | LOW | LOW | Implement data pruning (keep last 50 entries max), handle QuotaExceededError gracefully |
| Next.js 14 App Router breaking changes | MEDIUM | LOW | Pin Next.js version to 14.x in package.json, follow official migration guides for any future updates |
| PWA service worker conflicts with Next.js dev server | LOW | MEDIUM | Use `next-pwa` with proper dev/prod conditionals, clear service worker cache between dev sessions |

**Kill criteria:** If WCAG 2.1 AA compliance cannot be achieved within estimate, pause to research accessible design patterns before continuing. If design system requires more than 3 iterations to pass contrast checks, revert to default Tailwind palette and adjust aesthetic requirements.

## State Machine

```
                    App Start
                        │
                        ▼
                ┌───────────────┐
                │     HOME      │ (Jouer page)
                │ (idle)        │
                └───────┬───────┘
                        │ enter code + tap "Rejoindre"
                        ▼
                ┌───────────────┐
                │  VALIDATING   │
                │  (code check) │
                └───┬───────┬───┘
                    │       │
            invalid │       │ valid
                    │       │
                    ▼       ▼
            ┌─────────┐ ┌─────────────┐
            │  ERROR  │ │ QUIZ_ACTIVE │
            │(toast)  │ │(question N) │
            └────┬────┘ └──────┬──────┘
                 │             │
        retry    │             │ answer selected
                 │             ▼
                 │      ┌─────────────┐
                 │      │ ANSWERING   │
                 │      │(feedback +  │
                 │      │ 2s delay)   │
                 │      └──────┬──────┘
                 │             │
                 │    N<5      │ N==5
                 │      ┌──────┴──────┐
                 │      │             │
                 │      ▼             ▼
                 │ ┌─────────┐  ┌──────────┐
                 └▶│  HOME   │  │ RESULTS  │
                   │         │  │(score +  │
                   └─────────┘  │ ranking) │
                                └────┬─────┘
                                     │ tap "Continuer"
                                     ▼
                                ┌──────────┐
                                │ FEEDBACK │
                                │(form)    │
                                └────┬─────┘
                                     │ submit
                                     ▼
                                ┌──────────┐
                                │CONFIRMED │
                                │(message) │
                                └────┬─────┘
                                     │
                              Rejouer / Navigate
                                     │
                                     ▼
                                  HOME
```

**States:**
- `HOME`: { sessionCode: string | null, error: string | null }
- `VALIDATING`: { sessionCode: string, isValidating: boolean }
- `ERROR`: { error: string }
- `QUIZ_ACTIVE`: { sessionId: string, currentQuestion: number, score: number, answers: Answer[], timeLeft: number }
- `ANSWERING`: { selectedAnswer: number, isCorrect: boolean }
- `RESULTS`: { finalScore: number, ranking: Player[], userRank: number }
- `FEEDBACK`: { rating: number | null, comment: string, isSubmitting: boolean }
- `CONFIRMED`: { message: string }

**Transitions:**
- HOME → VALIDATING: user submits session code (guard: code is non-empty)
- VALIDATING → QUIZ_ACTIVE: code validation succeeds
- VALIDATING → ERROR: code validation fails
- ERROR → HOME: user dismisses error toast (auto after 5s)
- QUIZ_ACTIVE → ANSWERING: user selects answer OR timer expires (guard: question not already answered)
- ANSWERING → QUIZ_ACTIVE: 2s delay completes AND currentQuestion < 5
- ANSWERING → RESULTS: 2s delay completes AND currentQuestion == 5
- RESULTS → FEEDBACK: user taps "Continuer"
- FEEDBACK → CONFIRMED: user submits form (guard: rating is selected)
- CONFIRMED → HOME: user taps "Rejouer" OR auto-navigate after 3s

**Invalid transitions:**
- QUIZ_ACTIVE → HOME: prevented (no "quit" button in v1, must complete quiz)
- FEEDBACK → RESULTS: prevented (no back button)
- ANSWERING → ANSWERING: prevented (can't re-select answer after choice made)

**Race conditions:**
- Timer expiration vs manual answer selection: First event wins. If user selects answer at T=0.1s before timer hits 0, answer selection takes precedence. Lock state after first event.
- Multiple rapid taps on answer: First tap locks selection, subsequent taps ignored via `isAnswering` flag in state.

## Analysis

### Assumptions Challenged

| Assumption | Evidence For | Evidence Against | Verdict |
|------------|-------------|-----------------|---------|
| Users will understand "session code" concept without onboarding | Common pattern in Kahoot, Mentimeter, Zoom | First-time corporate users may not know to ask admin for code | RISKY - add placeholder text "Ex: ABC123" in input field |
| Emoji scale is culturally neutral for workplace feedback | Widely used in Microsoft Teams, Slack reactions | Some cultures interpret emoji differently, may feel unprofessional in formal orgs | RISKY - consider numeric 1-5 scale alternative |
| 5 questions is optimal quiz length | Short enough for break-time engagement | May feel too brief to assess well-being comprehensively | VALID - matches requirement, can adjust in future iterations |
| Mock data is sufficient for v1 launch | Requirement explicitly states "no backend" | Users will quickly exhaust 5 static questions | VALID - per spec, real question rotation is out of scope for v1 |
| localStorage is reliable for persisting scores | Standard browser API, widely supported | Quota limits, data loss on browser clear, no cross-device sync | RISKY - document limitation, add data export feature to roadmap |
| Black/white palette is sufficient without dark mode | Requirement specifies light mode only | Users in low-light environments may experience eye strain | VALID - per requirements, dark mode is explicit non-goal |
| Bottom navbar is better UX than top navbar on mobile | Easier thumb reach on large phones | Less discoverable for new users, conflicts with browser UI | VALID - industry standard (Instagram, Twitter, YouTube use bottom nav) |

### Blind Spots

1. **[UX]** Progressive Web App installation prompt behavior not designed
   Why it matters: Users may dismiss install prompt and never see it again, limiting offline functionality and home screen access. Should design explicit "Install App" CTA in settings or post-feedback flow.

2. **[Accessibility]** Screen reader announcement strategy for timer countdown not defined
   Why it matters: Visually impaired users won't perceive time pressure. Timer should announce at 10s, 5s, 0s intervals via `aria-live="polite"` region.

3. **[Data]** No strategy for syncing mock data updates across user devices
   Why it matters: If questions are updated, returning users will have stale localStorage cache. Need cache invalidation strategy (version key in localStorage).

4. **[Performance]** Image optimization strategy for team member avatars not specified
   Why it matters: 50+ team members with unoptimized images will cause slow page loads. Should use Next.js Image component with placeholder blur, or avatar service (DiceBear API).

5. **[i18n]** French language strings are hardcoded in components, not externalized
   Why it matters: Future internationalization will require refactoring. Should use i18n library (next-intl) or at minimum extract to constants file.

6. **[Security]** No input sanitization strategy for feedback comment field
   Why it matters: XSS risk if comments are later displayed in admin dashboard. Should sanitize with DOMPurify or similar before storage.

### Failure Hypotheses

| IF | THEN | BECAUSE | Severity | Mitigation |
|----|------|---------|----------|------------|
| Tailwind custom colors are defined with opacity variants (e.g., `bg-black/50`) | Contrast ratio calculations will fail WCAG AA | Opacity modifiers applied to backgrounds won't reach 4.5:1 against white text | HIGH | Pre-test all opacity levels with contrast checker, document safe combinations in design system |
| Framer Motion components render on initial page load | Animation flashes occur before prefers-reduced-motion check completes | React hydration race condition causes brief animation before useReducedMotion hook runs | MEDIUM | Use CSS-based detection (`@media (prefers-reduced-motion)`) as primary, Motion as progressive enhancement |
| Quiz timer state is stored only in client Zustand store | Timer desync occurs if user switches tabs or device sleeps | JavaScript timers pause when tab is inactive, causing incorrect time tracking | HIGH | Use server timestamp comparison (mock: localStorage timestamp), recalculate on tab focus |
| Session code validation is purely client-side mock | Users can bypass validation and access /quiz/[any-string] directly | No backend enforcement, route is accessible via URL manipulation | LOW | Add client-side route guard, redirect to home if sessionId not in mock data store |
| Focus trap is not implemented on error toasts | Keyboard users can tab behind modal, breaking a11y flow | No focus management strategy defined in error handling spec | MEDIUM | Use `react-focus-lock` or manual `tabindex` management on toast appearance |
| Mock player data is randomly generated on each page load | Leaderboard rankings will shuffle unpredictably | No persistent player IDs or seeded random generation | MEDIUM | Generate mock data once in data file with fixed seed, import consistently |

### The Real Question

**Reframing:** The spec assumes users arrive with session codes, but doesn't address the **admin/facilitator experience**. How do team leaders create sessions and distribute codes?

**Analysis:** The current spec solves the **player experience** (join, play, feedback) but leaves a critical gap in the **facilitator workflow**. Without a session creation flow, the app can't be used in isolation - it relies on an external system or manual code distribution.

**Verdict:** **Confirmed — spec solves the right problem for v1** because:
1. Requirement explicitly states "mock data for players and questions" with "no backend"
2. Session creation would require backend state management (out of scope)
3. v1 goal is to validate player UX, design system, and accessibility compliance
4. Facilitator tooling is a natural v2 feature once player experience is validated

**Recommendation:** Add to roadmap (not v1 scope): "Session management page for facilitators to create codes and customize question sets."

### Open Items

- [gap] Progressive Web App installation flow not designed → **→ no action** (PWA manifest is sufficient for v1, install prompt is browser-native)
- [risk] Contrast ratio failures on opacity-modified colors → **→ update spec** (add to Quality Checklist: "All Tailwind opacity variants pass contrast checks")
- [risk] Timer desync on tab switching → **→ update spec** (add to Scope item 5: use timestamp-based timer calculation)
- [improvement] Screen reader timer announcements not specified → **→ update spec** (add to AC-10: timer has aria-live announcements at 10s/5s/0s)
- [gap] Input sanitization for feedback comments not addressed → **→ update spec** (add to Scope item 7: sanitize comment input before localStorage save)
- [question] Should emoji scale be replaced with numeric 1-5 for cultural neutrality? → **→ question** (ask user if emoji is strict requirement or if alternative is acceptable)
- [gap] Mock player data regenerates on each load, causing leaderboard shuffle → **→ update spec** (add to Scope item 11: use seeded random generation for consistent mock data)
- [risk] Focus trap missing on error toasts breaks keyboard navigation → **→ update spec** (add to Scope item 4: implement focus management for error toasts)
- [improvement] French strings hardcoded instead of externalized → **→ no action** (i18n is out of scope for single-language v1, note for v2)

## Notes

## Progress

| # | Scope Item | Status | Iteration |
|---|-----------|--------|-----------|
| 1 | Initialize Next.js 14+ project | pending | - |
| 2 | Configure Tailwind design system | pending | - |
| 3 | Create root layout with navbar | pending | - |
| 4 | Build "Jouer" home page | pending | - |
| 5 | Implement quiz game flow | pending | - |
| 6 | Create results page | pending | - |
| 7 | Build feedback form | pending | - |
| 8 | Create Classement page | pending | - |
| 9 | Build Équipe page | pending | - |
| 10 | Implement Zustand stores | pending | - |
| 11 | Create mock data generators | pending | - |
| 12 | Build reusable UI components | pending | - |
| 13 | Add Framer Motion animations | pending | - |
| 14 | Configure PWA manifest | pending | - |
| 15 | Implement localStorage utilities | pending | - |

## Timeline

| Action | Timestamp | Duration | Notes |
|--------|-----------|----------|-------|
| plan | 2026-01-31T09:54:00Z | - | Created |
