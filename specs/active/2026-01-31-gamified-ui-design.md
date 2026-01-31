---
title: Gamified UI Design System
status: active
created: 2026-01-31
estimate: 6h
tier: standard
---

# Gamified UI Design System

## Context

User wants to transform the current minimalist black/white interface into a vibrant, gamified quiz experience similar to educational apps like Duolingo. The goal is to add more color, visual energy, and playful design elements while maintaining WCAG 2.1 AA compliance. This redesign should make the quiz feel more engaging and less corporate, encouraging participation and creating a positive emotional connection to workplace well-being content.

Reference screenshots show: vibrant gradient backgrounds (purple/blue, orange/red), rounded UI components, progress indicators with visual feedback, emoji/icon integration, and colorful button states with percentage indicators.

## Codebase Impact (MANDATORY)

| Area | Impact | Detail |
|------|--------|--------|
| `tailwind.config.ts` | MODIFY | Add vibrant color palette (purple, blue, orange, pink gradients), update theme tokens for gamified design system |
| `app/globals.css` | MODIFY | Add gradient utility classes, animation keyframes for success/failure states, gamified component styles |
| `components/quiz/QuestionCard.tsx` | MODIFY | Transform to gamified question card with percentage indicators, animated answer states, gradient backgrounds |
| `app/quiz/[sessionId]/page.tsx` | MODIFY | Add vibrant gradient background per question, integrate gamified feedback with animations |
| `components/ui/Button.tsx` | MODIFY | Add gamified button variants (bright green "Continue", purple/blue for actions), hover/press animations |
| `components/ui/Card.tsx` | MODIFY | Add gradient backgrounds, shadow elevations, rounded corners (more pronounced) |
| `components/quiz/Timer.tsx` | MODIFY | Visual redesign with color states (green → yellow → red as time runs out) |
| `components/quiz/ProgressBar.tsx` | MODIFY | Add vibrant progress visualization with color transitions |
| `app/resultats/page.tsx` | MODIFY | Gamified results screen with celebratory colors, gradient backgrounds for score display |
| `app/feedback/page.tsx` | MODIFY | Colorful emoji scale with hover animations, vibrant card backgrounds |
| `app/page.tsx` | MODIFY | Gamified home screen with welcoming gradient header, colorful CTA button |

**Files:** 0 create | 11 modify | 0 affected
**Reuse:** Existing Framer Motion setup for animations, current component structure (only styling changes), existing WCAG utilities (touch targets, focus states)
**Breaking changes:** None — purely visual/CSS changes, no API or component interface changes
**New dependencies:** None — leverage existing Tailwind + Framer Motion

## User Journey (MANDATORY)

### Primary Journey

ACTOR: Quiz participant (employee)
GOAL: Experience an engaging, visually stimulating quiz that feels fun rather than corporate
PRECONDITION: User has joined a quiz session

1. User lands on home screen
   → System displays vibrant gradient background with colorful "Rejoindre la partie" button
   → User sees welcoming, energetic design (not corporate black/white)

2. User answers a quiz question
   → System shows question card with vibrant gradient background (e.g., purple-to-blue)
   → User sees colorful answer options with hover states
   → User selects answer
   → System animates selection (scale/glow effect), shows percentage indicators fading in
   → User sees immediate visual feedback (green for correct with checkmark, red for incorrect with X)

3. User views results
   → System displays score on celebratory gradient background (confetti-like colors)
   → User sees podium with gradient cards for top 3
   → User experiences positive reinforcement through color psychology

POSTCONDITION: User associates workplace well-being quiz with positive, energetic experience

### Error Journeys

E1. Question loads with default styling (gradient fails)
   Trigger: CSS gradient not supported or failed to load
   1. User sees question card
      → System falls back to solid vibrant color (not black/white)
      → User sees functional UI without gradients
   2. User continues quiz normally
      → System maintains gamified colors in fallback mode
   Recovery: Quiz remains functional with solid color fallback

E2. Animation performance issues on low-end device
   Trigger: Device can't handle animations smoothly
   1. User enables reduced motion or system detects low performance
      → System respects prefers-reduced-motion (already implemented)
      → User sees gamified colors without animations
   2. User completes quiz with instant state changes
      → System maintains color scheme, skips animations
   Recovery: Full functionality with static gamified design

### Edge Cases

EC1. High contrast mode enabled: Ensure gamified colors maintain 4.5:1 contrast ratios with text
EC2. Color blindness: Pair colors with icons/shapes (checkmarks, X marks) for accessibility
EC3. Dark mode user preference: Design is light-mode focused (reference images), but respect system preference with vibrant dark palette if needed

## Acceptance Criteria (MANDATORY)

### Must Have (BLOCKING — all must pass to ship)

- [ ] AC-1: GIVEN user on home screen WHEN page loads THEN background displays vibrant gradient (purple/blue or similar) AND "Rejoindre la partie" button is bright green with white text
- [ ] AC-2: GIVEN user on quiz question WHEN question renders THEN question card has vibrant gradient background (changes per question) AND answer options have colorful hover states
- [ ] AC-3: GIVEN user selects answer WHEN answer is correct THEN card shows green success state with checkmark AND percentage indicator animates in
- [ ] AC-4: GIVEN user selects answer WHEN answer is incorrect THEN card shows red error state with X mark AND correct answer highlights in green with percentage
- [ ] AC-5: GIVEN user views results WHEN results page loads THEN score card has celebratory gradient background AND podium cards use distinct vibrant colors
- [ ] AC-6: GIVEN user interacts with buttons WHEN hovering/pressing THEN button shows scale/shadow animation AND maintains bright color scheme
- [ ] AC-7: GIVEN timer is running WHEN time decreases THEN timer color transitions from green → yellow → orange → red based on remaining time
- [ ] AC-8: GIVEN progress bar updates WHEN moving to next question THEN filled portion uses vibrant color gradient AND animates smoothly

### Error Criteria (BLOCKING — all must pass)

- [ ] AC-E1: GIVEN CSS gradients fail to load WHEN any page renders THEN fallback to solid vibrant colors (no black/white)
- [ ] AC-E2: GIVEN user has prefers-reduced-motion enabled WHEN animations trigger THEN colors remain vibrant BUT animations are skipped (instant state changes)
- [ ] AC-E3: GIVEN user has high contrast mode WHEN reading text on colored backgrounds THEN all text maintains minimum 4.5:1 contrast ratio (WCAG AA)

### Should Have (ship without, fix soon)

- [ ] AC-9: GIVEN user completes quiz WHEN viewing feedback page THEN emoji scale has subtle hover animations AND card backgrounds use gradient
- [ ] AC-10: GIVEN user views leaderboard WHEN page loads THEN top 3 positions have distinct gradient backgrounds (gold/silver/bronze theme with modern colors)

## Scope

- [ ] 1. Design vibrant color palette with gradient tokens → AC-1, AC-2, AC-5
- [ ] 2. Implement gamified question card with gradient backgrounds and percentage indicators → AC-2, AC-3, AC-4
- [ ] 3. Add animated success/failure states with icons (checkmark/X) → AC-3, AC-4
- [ ] 4. Transform buttons to bright, gamified style (green Continue, colorful CTAs) → AC-1, AC-6
- [ ] 5. Redesign timer with color-coded time states (green→red transition) → AC-7
- [ ] 6. Update progress bar with vibrant gradient fill → AC-8
- [ ] 7. Apply gradient backgrounds to results and feedback pages → AC-5, AC-9
- [ ] 8. Implement fallback colors for gradient failures → AC-E1
- [ ] 9. Verify WCAG AA contrast ratios across all new color combinations → AC-E3
- [ ] 10. Test animation respect for prefers-reduced-motion → AC-E2

### Out of Scope

- Gem/points system (user explicitly said "sans le système de gems")
- Backend changes (purely frontend visual redesign)
- New interactive elements (focus on color/animation, not new features)
- Dark mode variant (reference images are light mode; can add later if needed)
- Premium/paid features (not part of gamification request)

## Quality Checklist

### Blocking (must pass to ship)

- [ ] All Must Have ACs passing
- [ ] All Error Criteria ACs passing
- [ ] All scope items implemented
- [ ] No regressions in existing tests
- [ ] Error states handled (gradient fallback, animation fallback)
- [ ] No hardcoded secrets or credentials
- [ ] WCAG 2.1 AA contrast ratios verified on all text/background combinations (4.5:1 minimum)
- [ ] Colors paired with icons/shapes for color-blind accessibility
- [ ] Framer Motion animations respect prefers-reduced-motion (already implemented, verify still works)

### Advisory (should pass, not blocking)

- [ ] All Should Have ACs passing
- [ ] Code follows existing project patterns (Tailwind utilities, Framer Motion conventions)
- [ ] Gradient performance tested on mid-range mobile devices
- [ ] Design feels cohesive across all pages (consistent gradient style)

## Risks

| Risk | Impact | Likelihood | Mitigation |
|------|--------|------------|------------|
| Vibrant colors violate WCAG contrast ratios | HIGH | MEDIUM | Test all color combinations with contrast checker tool before implementation, pair with strong text colors (white on dark gradients, dark on light gradients) |
| Gradients cause performance issues on low-end devices | MEDIUM | LOW | Use CSS gradients (GPU-accelerated), avoid complex multi-stop gradients, test on low-end Android device |
| Too many colors create visual chaos | MEDIUM | MEDIUM | Stick to 2-3 gradient color families (purple/blue, orange/red, green), use consistent gradient directions, maintain white space |
| Color-only feedback excludes color-blind users | HIGH | MEDIUM | Always pair colors with icons (✓ checkmark for correct, ✗ for incorrect), use shapes/patterns in addition to color |
| Animations distract from content | LOW | LOW | Keep animations subtle (200-300ms), use easing functions (ease-out), respect prefers-reduced-motion |

**Kill criteria:** If WCAG AA compliance cannot be maintained with vibrant colors after 3 design iterations, revert to high-contrast variant of gamified design (less vibrant but compliant)

## State Machine

N/A — stateless visual redesign (no new state transitions, only visual styling of existing states)

## Analysis

### Assumptions Challenged

| Assumption | Evidence For | Evidence Against | Verdict |
|------------|-------------|-----------------|---------|
| Gamified design will increase engagement | Reference apps (Duolingo) have high retention, color psychology research shows vibrant colors increase positive emotion | No user testing data from target audience (employees), some users may prefer professional aesthetic | RISKY — proceed with implementation but add analytics to measure engagement delta if possible |
| Gradients won't violate WCAG contrast | Modern tools allow gradient contrast testing, white text on dark gradients typically passes | Multi-stop gradients can have contrast issues in middle sections, gradient text overlay is tricky | RISKY — must test every gradient/text combination with contrast checker, may need fallback solid colors |
| Current codebase structure supports pure visual changes | All styling is Tailwind-based, components use className props, no inline styles | Some components may have hardcoded color logic in JS (e.g., timer color states) | VALID — codebase is well-structured for theming, timer logic may need JS updates but that's expected |
| Users want gamification (not just more color) | User explicitly referenced Duolingo-style UI, said "gamifier davantage l'interface" | User also said "sans le système de gems" — may want visuals only, not game mechanics | VALID — user wants visual gamification (colors, animations) without points/rewards system |

### Blind Spots

1. **[Accessibility]** Color contrast in gradient mid-points
   Why it matters: Text overlaid on gradient can have sufficient contrast at edges but fail in the middle. WCAG requires 4.5:1 everywhere, not just endpoints. Impact: Could fail accessibility audit, block ship.

2. **[UX]** Visual fatigue from too much color stimulation
   Why it matters: Educational apps limit bright colors to focused areas. If entire UI is vibrant, users may experience cognitive overload during 5-question quiz. Impact: Could decrease completion rates despite higher initial engagement.

3. **[Technical]** CSS gradient rendering differences across browsers
   Why it matters: Safari, Chrome, Firefox may render gradients differently (color banding, angle interpretation). Impact: Inconsistent visual experience across devices.

4. **[Cultural]** Color meaning varies by culture
   Why it matters: Red = error in Western cultures but positive in some Asian cultures. Green may have different connotations. Impact: Multinational companies using this app may receive mixed feedback.

### Failure Hypotheses

| IF | THEN | BECAUSE | Severity | Mitigation |
|----|------|---------|----------|------------|
| Text is placed directly on gradient backgrounds without contrast testing | Accessibility audit fails and users with low vision cannot read content | Gradients have varying luminosity across the span, middle sections often have insufficient contrast | HIGH | Test every text/gradient combination with WebAIM contrast checker, add semi-transparent overlay (scrim) behind text if needed |
| Too many different gradient styles are used (one per question, page, component) | UI feels chaotic and unprofessional instead of gamified | Lack of design system consistency, no gradient reuse strategy | MEDIUM | Define 3-4 gradient presets (primary, secondary, success, error), reuse across components, maintain consistent direction (top-left to bottom-right) |
| Animations run on every state change without throttling | Low-end devices experience lag, users with motion sensitivity get discomfort | Framer Motion animations compound, CSS gradients + animations are GPU-intensive | MEDIUM | Already mitigated with prefers-reduced-motion support, additionally limit animations to critical feedback moments (answer selection, results reveal) |

### The Real Question

Confirmed — spec solves the right problem because user explicitly requested "gamifier davantage l'interface" with reference to engaging educational apps, and current black/white minimalist design lacks visual energy. The spec correctly focuses on visual gamification (colors, gradients, animations) without adding game mechanics (points, gems) which user explicitly excluded.

However, underlying motivation should be validated: **Is the goal to increase quiz participation rates, or improve subjective experience during the quiz?** If participation is the goal, gamified UI may help initial engagement but won't sustain it without compelling content. If experience is the goal, this redesign is perfectly scoped.

### Open Items

- [improvement] Define 3-4 gradient presets upfront to maintain consistency → update spec Scope to include "Define gradient token system in Tailwind config"
- [gap] No mention of loading states for gradient backgrounds → no action (gradients are CSS, no load time)
- [question] Should dark mode have vibrant dark palette or be out of scope? → question user
- [risk] Gradient contrast in mid-points could block ship → add to Quality Checklist: "Verify text contrast on ALL gradient backgrounds including mid-points"
- [improvement] Consider adding subtle particle/confetti animation on results page for celebration → no action (out of scope for v1, can add later)

## Notes

Design references analyzed (4 screenshots):
1. Purple-blue gradient quiz card with "Did you know?" fact card, green "Continue" button
2. Celebration screen with confetti, gift icon, "+30 gems" (exclude gems, keep celebratory style)
3. Quiz question with orange-red gradient, answer options with percentage indicators (74%, 22%, 2%), selected answer in green
4. Same quiz UI with timer (00:22, 00:17 countdown)

Key visual patterns to implement:
- Gradient backgrounds change per question (purple/blue, orange/red, possibly green)
- Answer options show percentage after selection (percentage indicator animates in)
- Selected correct answer: bright green background (#4CAF50 or similar)
- Selected incorrect answer: red indicator, correct answer highlighted in green
- Big green "Continue" button at bottom
- Timer in top-right with white background, countdown visible
- Rounded corners on all cards (12px+)
- White text on dark gradients, dark text on white cards

## Progress

| # | Scope Item | Status | Iteration |
|---|-----------|--------|-----------|
| 1 | Design vibrant color palette with gradient tokens | pending | - |
| 2 | Implement gamified question card with gradient backgrounds and percentage indicators | pending | - |
| 3 | Add animated success/failure states with icons (checkmark/X) | pending | - |
| 4 | Transform buttons to bright, gamified style | pending | - |
| 5 | Redesign timer with color-coded time states | pending | - |
| 6 | Update progress bar with vibrant gradient fill | pending | - |
| 7 | Apply gradient backgrounds to results and feedback pages | pending | - |
| 8 | Implement fallback colors for gradient failures | pending | - |
| 9 | Verify WCAG AA contrast ratios | pending | - |
| 10 | Test animation respect for prefers-reduced-motion | pending | - |

## Timeline

| Action | Timestamp | Duration | Notes |
|--------|-----------|----------|-------|
| plan | 2026-01-31T05:07:00Z | - | Created |
