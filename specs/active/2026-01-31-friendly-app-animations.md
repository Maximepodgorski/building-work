---
title: Friendly App Animations with Accessibility
status: active
created: 2026-01-31
estimate: 4h
tier: standard
---

# Friendly App Animations with Accessibility

## Context

The app currently has minimal animations (only on results page via framer-motion). User wants friendly, welcoming animations throughout the app while maintaining strict accessibility compliance (prefers-reduced-motion support). This improves UX engagement and creates a more polished, professional feel without compromising accessibility for users with motion sensitivities or vestibular disorders.

## Codebase Impact (MANDATORY)

| Area | Impact | Detail |
|------|--------|--------|
| `app/globals.css` | MODIFY | Add animation utilities (fade-in, slide-up, scale, etc.) respecting existing prefers-reduced-motion override at lines 29-37 |
| `components/ui/Button.tsx` | MODIFY | Add hover/press animations (scale, background transitions) |
| `components/ui/Card.tsx` | MODIFY | Add entrance animations (fade-in) when cards mount |
| `components/ui/Input.tsx` | MODIFY | Add focus animations (subtle scale/glow) and error shake |
| `components/quiz/QuestionCard.tsx` | MODIFY | Add option hover states, selection animation, and card entrance |
| `components/quiz/Timer.tsx` | MODIFY | Add pulse animation when time is low (<10s), smooth color transitions |
| `components/quiz/ProgressBar.tsx` | MODIFY | Add smooth width transitions (already has duration-300), add shimmer on progress |
| `components/layout/Navbar.tsx` | MODIFY | Add slide-up entrance, active tab transition animations |
| `app/page.tsx` | MODIFY | Add staggered entrance animations for Card and stats |
| `app/quiz/[sessionId]/page.tsx` | MODIFY | Add feedback toast entrance/exit animations, question transition |
| `app/resultats/page.tsx` | AFFECTED | Already uses framer-motion — ensure consistency with new patterns |

**Files:** 0 create | 10 modify | 1 affected
**Reuse:**
- Existing `prefers-reduced-motion` override in globals.css (lines 29-37)
- Existing framer-motion package (v11.0.0)
- Existing transition-colors/transition-all Tailwind utilities
- Existing `cn()` utility for conditional classes

**Breaking changes:** none
**New dependencies:** none (framer-motion already installed)

## User Journey (MANDATORY)

### Primary Journey

ACTOR: Quiz participant (any user of the app)
GOAL: Experience smooth, friendly animations throughout the app without motion sickness
PRECONDITION: User has loaded the app, may have motion preferences enabled

1. User lands on home page
   → System fades in welcome card and stats with 300ms stagger
   → User sees smooth entrance, feels professional polish

2. User types in session code input
   → System shows subtle focus glow animation
   → User sees clear focus indicator, feels responsive

3. User clicks "Rejoindre la partie" button
   → System shows press scale animation (0.98), then transitions to quiz
   → User sees button feedback, understands action was registered

4. User sees quiz question load
   → System slides question card up with fade-in (400ms)
   → User sees smooth transition, maintains context

5. User hovers over answer options
   → System scales option slightly (1.02) with border color transition
   → User sees hover feedback, understands interactivity

6. User selects answer
   → System animates selection with background fill (200ms), locks other options with fade
   → User sees immediate feedback, understands selection locked

7. User sees timer reach 10s remaining
   → System pulses timer bar every 1s, color transitions to red
   → User sees urgency indicator without being startled

8. User sees results screen
   → System animates score counter, staggers top-3 cards (already implemented)
   → User sees celebratory animation, feels accomplishment

POSTCONDITION: User has experienced consistent, friendly animations without discomfort

### Error Journeys

E1. User with vestibular disorder enables prefers-reduced-motion
   Trigger: OS-level accessibility setting enabled
   1. User navigates through app
      → System detects prefers-reduced-motion via CSS media query (globals.css:29-37)
      → User sees instant transitions (<0.01ms), no motion sickness
   2. User interacts with all components
      → System applies all animations with 0.01ms duration
      → User gets full functionality without motion triggers
   Recovery: User completes quiz comfortably with accessibility override

E2. Animation causes layout shift or jank
   Trigger: Heavy animation during interaction
   1. User clicks button while animation plays
      → System uses GPU-accelerated properties (transform, opacity) only
      → User sees smooth 60fps animation without layout reflow
   2. User interacts during animation
      → System maintains interactive state, doesn't block clicks
   Recovery: Interaction completes smoothly

### Edge Cases

EC1. Slow device/browser: Use will-change hints, limit concurrent animations to 3-5 elements
EC2. Animation preference changes mid-session: CSS media query handles instantly, no JS needed
EC3. Rapid navigation: Cleanup animations on unmount (framer-motion handles via AnimatePresence)
EC4. Touch vs mouse: Hover animations skip on touch devices (use @media (hover: hover))

## Acceptance Criteria (MANDATORY)

### Must Have (BLOCKING — all must pass to ship)

- [ ] AC-1: GIVEN user lands on homepage WHEN page loads THEN cards fade in with 300ms duration and 100ms stagger
- [ ] AC-2: GIVEN user focuses input WHEN focus event fires THEN input shows subtle scale (1.01) and glow within 200ms
- [ ] AC-3: GIVEN user hovers button WHEN mouse enters THEN button scales (0.98 on press) with smooth transition
- [ ] AC-4: GIVEN user hovers answer option WHEN mouse enters THEN option scales (1.02) and border color transitions
- [ ] AC-5: GIVEN user selects answer WHEN click fires THEN selected option fills background in 200ms, others fade to 60% opacity
- [ ] AC-6: GIVEN timer reaches 10s WHEN threshold crossed THEN timer pulses every 1s and color transitions to red over 300ms
- [ ] AC-7: GIVEN question changes WHEN nextQuestion() called THEN new question slides up from bottom with fade (400ms)
- [ ] AC-8: GIVEN navbar loads WHEN page mounts THEN navbar slides up from bottom (300ms)
- [ ] AC-9: GIVEN all animations WHEN triggered THEN only transform/opacity properties animate (GPU-accelerated, no layout shifts)

### Error Criteria (BLOCKING — all must pass)

- [ ] AC-E1: GIVEN user has prefers-reduced-motion enabled WHEN any animation triggers THEN animation completes in <0.01ms (globals.css override applies)
- [ ] AC-E2: GIVEN animation in progress WHEN user interacts with animated element THEN interaction works immediately (no pointer-events blocking)
- [ ] AC-E3: GIVEN input validation error WHEN error appears THEN error message fades in and input shakes with 3 quick oscillations in 400ms

### Should Have (ship without, fix soon)

- [ ] AC-10: GIVEN results page loads WHEN score animates THEN number counts up smoothly matching existing framer-motion pattern
- [ ] AC-11: GIVEN cards on any page WHEN mouse enters THEN card shows subtle lift effect (shadow increase)

## Scope

- [ ] 1. Create animation utilities in globals.css (fade-in, slide-up, scale, shake keyframes) → AC-1, AC-7, AC-E3
- [ ] 2. Add Button animations (hover scale, press feedback, color transitions) → AC-3
- [ ] 3. Add Input animations (focus glow, error shake) → AC-2, AC-E3
- [ ] 4. Add Card entrance animations (fade-in on mount) → AC-1
- [ ] 5. Add QuestionCard animations (hover states, selection animation, entrance) → AC-4, AC-5, AC-7
- [ ] 6. Add Timer pulse animation for low time warning → AC-6
- [ ] 7. Add ProgressBar shimmer animation → (nice-to-have, not blocking)
- [ ] 8. Add Navbar slide-up entrance animation → AC-8
- [ ] 9. Add page-level staggered entrances (HomePage, QuizPage) → AC-1, AC-7
- [ ] 10. Verify prefers-reduced-motion override applies to all new animations → AC-E1
- [ ] 11. Test GPU acceleration (DevTools performance tab, no layout warnings) → AC-9, AC-E2

### Out of Scope

- Micro-interactions beyond hover/focus/press (e.g., confetti, particles)
- Page transition animations (route changes)
- Loading skeleton animations
- Custom easing curves (use CSS defaults: ease-in-out, ease-out)
- Sounds or haptic feedback
- Gesture-based animations (swipe, drag)

## Quality Checklist

### Blocking (must pass to ship)

- [ ] All Must Have ACs passing
- [ ] All Error Criteria ACs passing
- [ ] All scope items implemented
- [ ] No regressions in existing tests
- [ ] Error states handled (not just happy path)
- [ ] No hardcoded secrets or credentials
- [ ] All animations respect prefers-reduced-motion (manual test with OS setting)
- [ ] No layout shift (CLS = 0) during animations (Lighthouse audit)
- [ ] Animations run at 60fps on mid-range device (DevTools FPS meter)
- [ ] Touch devices skip hover animations (@media (hover: hover) applied)

### Advisory (should pass, not blocking)

- [ ] All Should Have ACs passing
- [ ] Code follows existing project patterns
- [ ] Animation durations consistent (100-400ms range, no outliers)
- [ ] Color transitions smooth (no jarring palette changes)
- [ ] Accessibility audit passes (axe DevTools, no new violations)

## Risks

| Risk | Impact | Likelihood | Mitigation |
|------|--------|------------|------------|
| Animations cause motion sickness for users who don't enable prefers-reduced-motion | HIGH | MEDIUM | Enforce globals.css override (already in place), test with multiple users, keep animations subtle (200-400ms max) |
| Performance degradation on low-end devices | MEDIUM | MEDIUM | Use only GPU-accelerated properties (transform, opacity), limit concurrent animations, add will-change hints, test on throttled CPU |
| Animation timing inconsistencies across components | LOW | HIGH | Create centralized Tailwind animation utilities in globals.css, document standard durations (100/200/300/400ms) |
| Framer-motion bundle size increase | LOW | LOW | Only use framer-motion where complex orchestration needed (results page already uses it), prefer CSS animations for simple cases |
| Hover animations trigger on touch devices causing flicker | MEDIUM | MEDIUM | Use @media (hover: hover) for all hover states, test on mobile Safari and Chrome |
| Breaking existing results page animations | LOW | LOW | Review resultats/page.tsx carefully, ensure new patterns don't conflict with existing framer-motion usage |

**Kill criteria:** If >10% of users report motion sickness symptoms OR if animations cause >50ms jank on target devices, revert all animations and use instant transitions only.

## State Machine

N/A — animations are stateless CSS/framer-motion effects, no state machine needed

## Analysis

### Assumptions Challenged

| Assumption | Evidence For | Evidence Against | Verdict |
|------------|-------------|-----------------|---------|
| Users want more animations (spec assumes "friendly" = more motion) | Modern design trends favor subtle animations; results page already uses framer-motion | No user research data; some users prefer minimal motion even without prefers-reduced-motion | RISKY — should be subtle and optional |
| Existing prefers-reduced-motion override (globals.css:29-37) will catch all new animations | CSS media query applies to all CSS animations/transitions globally | Framer-motion animations may bypass CSS if not configured properly | VALID — CSS override is comprehensive, but need to ensure framer-motion respects it |
| 200-400ms duration range is "friendly" and accessible | Industry standards (Material Design: 200-300ms, Apple HIG: 200-400ms) | No user testing for this specific app's audience | VALID — standard timing, backed by design systems |
| GPU-accelerated properties (transform, opacity) will prevent jank | Browser rendering pipeline offloads these to compositor thread | Older devices may still struggle with multiple concurrent animations | VALID — but need to limit concurrent animations |
| @media (hover: hover) prevents touch device issues | Standard CSS feature, well-supported | May not work in all mobile browsers (old Android) | VALID — progressive enhancement, fallback is no hover effect |

### Blind Spots

1. **[UX]** Animation stacking on rapid interactions (e.g., user clicks button multiple times during animation)
   Why it matters: Could create visual chaos, unexpected states, or animation queue buildup

2. **[Accessibility]** Users with cognitive disabilities may be distracted by animations even without motion sensitivity
   Why it matters: WCAG 2.2.2 (Pause, Stop, Hide) requires control over moving content >5s; our animations are <400ms so compliant, but still potentially distracting

3. **[Technical]** Framer-motion SSR behavior — animations may flash on initial page load
   Why it matters: Next.js SSR may render unanimated state first, causing layout shift or FOUC

4. **[Performance]** Bundle size impact — CSS animations vs framer-motion tradeoff not quantified
   Why it matters: Every KB counts on mobile; may be over-engineering with framer-motion for simple effects

### Failure Hypotheses

| IF | THEN | BECAUSE | Severity | Mitigation |
|----|------|---------|----------|------------|
| Animations run on low-end Android device (2019-era) | Quiz becomes unusable with jank, users abandon | CSS animations + React re-renders compete for main thread | HIGH | Test on throttled CPU (DevTools 4x slowdown), limit concurrent animations to 3-5, use will-change sparingly |
| User rapidly navigates between pages | Animations don't cleanup, memory leak or visual artifacts | React unmount may not cancel CSS animations or framer-motion instances | MEDIUM | Use AnimatePresence for framer-motion, ensure CSS animations target stable elements |
| Designer/stakeholder requests more elaborate animations after seeing initial implementation | Scope creeps, accessibility suffers, timeline extends | "Friendly" is subjective, no design spec provided | MEDIUM | Define animation vocabulary upfront (duration range, allowed properties), show examples for approval BEFORE coding |
| Users with ADHD find animations distracting (not covered by prefers-reduced-motion) | Users complain, accessibility metrics decline | Prefers-reduced-motion targets vestibular issues, not attention disorders | MEDIUM | NONE — add to spec: consider future user preference toggle |

### The Real Question

**Confirmed — spec solves the right problem.** The app currently feels static/unpolished (only results page has motion). Adding consistent, subtle animations will improve perceived quality and engagement. However, the spec should emphasize SUBTLETY over "friendly" — friendly can mean calm and unobtrusive, not necessarily animated. The real goal is: "Make the app feel more responsive and polished while being universally accessible."

### Open Items

- [question] What specific "friendly" feeling does the user want? Playful (bounce, scale) vs professional (fade, slide)? → question
- [risk] No animation examples or design reference provided — risk of mismatch with user expectations → question
- [gap] No consideration for users with ADHD/cognitive disabilities beyond prefers-reduced-motion → no action (out of scope, note for future)
- [improvement] Could add user preference toggle (beyond OS-level prefers-reduced-motion) for finer control → no action (out of scope, note for future)
- [risk] Scope assumes 4h estimate — if animation refinement takes longer, may need to cut Should Have items → no action (monitor during dev)
- [question] Should hover animations apply on tablet devices (hybrid touch/mouse)? → question

## Notes

*Empty at creation. Filled during implementation. Retro goes here.*

## Progress

| # | Scope Item | Status | Iteration |
|---|-----------|--------|-----------|
| 1 | Create animation utilities in globals.css | pending | - |
| 2 | Add Button animations | pending | - |
| 3 | Add Input animations | pending | - |
| 4 | Add Card entrance animations | pending | - |
| 5 | Add QuestionCard animations | pending | - |
| 6 | Add Timer pulse animation | pending | - |
| 7 | Add ProgressBar shimmer | pending | - |
| 8 | Add Navbar slide-up entrance | pending | - |
| 9 | Add page-level staggered entrances | pending | - |
| 10 | Verify prefers-reduced-motion override | pending | - |
| 11 | Test GPU acceleration | pending | - |

## Timeline

| Action | Timestamp | Duration | Notes |
|--------|-----------|----------|-------|
| plan | 2026-01-31T00:00:00Z | - | Created |
