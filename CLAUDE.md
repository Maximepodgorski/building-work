# Building Work

A mobile-first web application for workplace well-being through engaging multiplayer quiz sessions. Built with Next.js 14, TypeScript, Tailwind CSS, and Zustand.

**Purpose:** Promote workplace well-being in corporate environments through clean, professional, accessible quiz experiences.

**Language:** French (all UI text)

**Tech Stack:**
- **Framework:** Next.js 14+ (App Router)
- **Language:** TypeScript 5
- **Styling:** Tailwind CSS 3.4
- **State:** Zustand 4.5
- **Animation:** Framer Motion 11

## Getting Started

### Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

### Available Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Create production build |
| `npm start` | Start production server (requires build first) |
| `npm run lint` | Run ESLint on all files |

### First Time Setup

1. Clone the repository
2. Run `npm install`
3. Run `npm run dev`
4. Open browser to `http://localhost:3000`
5. Enter session code `DEMO123` to test the quiz flow

## Project Structure

```
building-work/
├── app/                          # Next.js App Router pages
│   ├── page.tsx                  # Home: session code input ("Jouer")
│   ├── classement/page.tsx       # Global leaderboard rankings
│   ├── equipe/page.tsx           # Team directory
│   ├── quiz/[sessionId]/page.tsx # Dynamic quiz game flow
│   ├── resultats/page.tsx        # Post-game results and podium
│   ├── feedback/page.tsx         # Post-game feedback form
│   ├── layout.tsx                # Root layout with navbar
│   └── globals.css               # Global styles and Tailwind imports
│
├── components/
│   ├── ui/                       # Reusable UI primitives
│   │   ├── Button.tsx            # WCAG AA compliant button
│   │   ├── Input.tsx             # Form input with accessibility
│   │   └── Card.tsx              # Container component
│   ├── layout/                   # Layout components
│   │   ├── Navbar.tsx            # Bottom-fixed mobile navbar
│   │   └── PageContainer.tsx    # Page wrapper with padding
│   └── quiz/                     # Quiz-specific components
│       ├── QuestionCard.tsx      # Question display with answers
│       ├── Timer.tsx             # Countdown timer
│       └── ProgressBar.tsx       # Quiz progress indicator
│
├── lib/
│   ├── store/                    # Zustand state management
│   │   ├── gameStore.ts          # Quiz game state
│   │   ├── userStore.ts          # User session state
│   │   └── leaderboardStore.ts   # Leaderboard data
│   ├── data/                     # Mock data generators
│   │   ├── questions.ts          # French well-being questions
│   │   ├── players.ts            # Seeded player profiles
│   │   └── sessions.ts           # Session validation
│   └── utils/                    # Utility functions
│       ├── localStorage.ts       # Browser storage helpers
│       ├── cn.ts                 # Tailwind class merging
│       └── sanitize.ts           # Input sanitization
│
└── specs/                        # Feature specifications
    └── active/                   # Current work-in-progress specs
```

## Development Workflow

### File Naming Conventions

- **Pages:** `page.tsx` (App Router convention)
- **Components:** PascalCase (e.g., `QuestionCard.tsx`)
- **Utilities:** camelCase (e.g., `localStorage.ts`)
- **Stores:** camelCase + `Store` suffix (e.g., `gameStore.ts`)

### Component Patterns

**Server Components (default):**
```typescript
// app/page.tsx - Server component (no "use client")
export default function HomePage() {
  // Can fetch data, no useState/useEffect
}
```

**Client Components (interactive):**
```typescript
"use client";

// Use for: state, events, browser APIs
export default function QuizPage() {
  const [answer, setAnswer] = useState(null);
  // ...
}
```

### State Management (Zustand)

All client-side state uses Zustand stores:

```typescript
// lib/store/gameStore.ts
import { create } from 'zustand';

export const useGameStore = create((set) => ({
  currentQuestion: 0,
  score: 0,
  incrementScore: () => set((state) => ({
    score: state.score + 1
  })),
}));

// In components
import { useGameStore } from '@/lib/store/gameStore';

const score = useGameStore((state) => state.score);
const incrementScore = useGameStore((state) => state.incrementScore);
```

### TypeScript Standards

- **No `any` types** - use `unknown` if type is truly unknown
- **Explicit return types** on exported functions
- **Interface over type** for object shapes
- **Strict mode enabled** in tsconfig.json

### Accessibility First

Every component MUST be WCAG 2.1 AA compliant:

```typescript
// Good: Accessible button
<button
  aria-label="Rejoindre la partie"
  className="min-h-touch min-w-touch" // 44px minimum
>
  Rejoindre
</button>

// Good: Error feedback
<div role="alert" aria-live="assertive">
  Code invalide
</div>
```

## Quality Standards

### WCAG 2.1 AA Compliance (MANDATORY)

All features must pass these accessibility checks:

1. **Color Contrast:** Minimum 4.5:1 for text, 3:1 for large text
2. **Keyboard Navigation:** All interactive elements reachable via Tab
3. **Focus Indicators:** Visible focus state on all focusable elements
4. **Touch Targets:** Minimum 44x44px for all interactive elements
5. **Screen Reader Support:** Proper ARIA labels and semantic HTML
6. **Motion Sensitivity:** Respect `prefers-reduced-motion` setting

**Testing:**
- Use browser DevTools Accessibility panel
- Test keyboard navigation (Tab, Enter, Escape)
- Enable screen reader (VoiceOver on Mac, NVDA on Windows)
- Toggle `prefers-reduced-motion` in DevTools

### French Language Requirement

- All user-facing text MUST be in French
- Use proper French typography (guillemets « », accents, etc.)
- No English fallbacks in production UI
- Comments and code can be in English

### Code Quality

Before committing:
1. Run `npm run lint` - must pass with zero errors
2. Run `npm run build` - must build successfully
3. Visual check on mobile viewport (375px width minimum)
4. Keyboard navigation test

## Design System

### Color Palette

The design uses a minimal black/white aesthetic:

```typescript
// tailwind.config.ts
colors: {
  primary: "#000000",           // Black - main text, headers
  secondary: "#6B7280",         // Gray-600 - secondary text
  background: "#FFFFFF",        // White - page background
  "background-light": "#F9FAFB", // Gray-50 - card backgrounds
  "accent-positive": "#10B981", // Green-500 - correct answers
  "accent-negative": "#EF4444", // Red-500 - incorrect answers
}
```

**Contrast validation:** All color combinations pass WCAG AA (4.5:1 minimum)

### Touch Targets

All interactive elements MUST meet minimum size:

```typescript
// Tailwind utilities
minHeight: { touch: "44px" }
minWidth: { touch: "44px" }

// Usage
<button className="min-h-touch min-w-touch">Click me</button>
```

### Typography

- **Font Family:** Inter (fallback to system-ui)
- **Primary Text:** `text-primary` (black)
- **Secondary Text:** `text-secondary` (gray-600)
- **Sizes:** Use Tailwind size utilities (`text-sm`, `text-base`, `text-lg`, etc.)

### Layout

- **Mobile-first:** Design for 375px width minimum
- **Bottom Navigation:** Fixed navbar at bottom for thumb reach
- **Spacing:** Use Tailwind spacing scale (4px increments)
- **Responsive:** Test at 375px (mobile), 768px (tablet), 1024px+ (desktop)

## Key Features

### Quiz Flow

1. **Home Page (Jouer):** User enters session code → validates → navigates to quiz
2. **Quiz Page:** 5 questions with 4 options each, countdown timer, instant feedback
3. **Results Page:** Animated score reveal, top 3 podium, full player ranking
4. **Feedback Page:** Emoji scale for well-being rating + optional comment

### Leaderboard (Classement)

- Global rankings sorted by total points
- Filters: Week / Month / All-time
- Top 3 players highlighted with special styling

### Team Directory (Équipe)

- Grid of team member cards with avatars
- Search and filter functionality
- Member details modal (games played, average score)

### Navigation

Bottom-fixed navbar with 3 tabs:
- **Classement:** Leaderboard icon
- **Jouer:** Play icon (home)
- **Équipe:** Team icon

Active tab highlighted, ARIA labels for screen readers.

## Key Concepts

### No Backend Architecture

Building Work v1 is **entirely client-side** with no backend:

- **Mock Data:** All questions, players, and sessions are generated in `lib/data/`
- **localStorage:** Scores and feedback persist in browser storage only
- **No Authentication:** No user accounts or login required
- **No Real-time Sync:** Each browser instance is independent

**Implications:**
- Data resets when localStorage is cleared
- No cross-device persistence
- No actual multiplayer (simulated player counts)
- Session codes validated against hardcoded list

### Mock Data Strategy

All mock data uses **seeded random generation** for consistency:

```typescript
// lib/data/players.ts
const SEED = 42; // Fixed seed ensures same "random" data every time
const players = generatePlayers(SEED);
```

**Why seeded?** Prevents leaderboard from shuffling on every page reload.

**Data files:**
- `lib/data/questions.ts` - 5 French well-being questions
- `lib/data/players.ts` - 20 consistent player profiles
- `lib/data/sessions.ts` - Valid session codes (e.g., "DEMO123", "ABC123")

### localStorage Usage

Persists user-specific data across sessions:

```typescript
// Stored data
- user_games_played: number
- user_total_score: number
- feedback_history: Array<{rating: number, comment: string, timestamp: string}>
- game_results: Array<{sessionId: string, score: number, date: string}>
```

**Limits:**
- 5-10MB quota (browser-dependent)
- Cleared when user clears browser data
- Not available in incognito mode

**Helpers:** `lib/utils/localStorage.ts` provides typed get/set functions

## Working with Specs

Active work is tracked in `specs/active/` as markdown files. Each spec includes:

- **Context:** Why this feature exists
- **User Journey:** Step-by-step flow with error handling
- **Acceptance Criteria:** GIVEN/WHEN/THEN format (pass/fail gates)
- **Scope:** Checklist of deliverables mapped to ACs

**Current active specs:**
- `2026-01-31-building-work-init.md` - Initial project setup (main feature)
- `2026-01-31-claude-md-documentation.md` - This documentation file

When implementing features:
1. Read the spec's User Journey first
2. Check Acceptance Criteria for success conditions
3. Follow Scope items as implementation checklist
4. Update Progress section as you complete items

## Tips for Claude Code

This project is optimized for Claude Code development:

1. **Read specs first:** Check `specs/active/` before implementing features
2. **WCAG compliance:** Every UI change must maintain accessibility
3. **French UI text:** Never add English strings to user-facing components
4. **Mock data aware:** Remember there's no backend - all data is local
5. **Mobile-first:** Always test changes at 375px width
6. **TypeScript strict:** Types must be explicit, no `any` allowed

**Common tasks:**
- Adding a question: Edit `lib/data/questions.ts` (maintain seeded generation)
- New page: Create `app/your-page/page.tsx` + add to Navbar
- New component: Follow existing patterns in `components/ui/` or `components/quiz/`
- State change: Edit appropriate Zustand store in `lib/store/`
