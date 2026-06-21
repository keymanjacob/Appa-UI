# Component Factory — Extraction Strategy

> **Status:** Draft — strategy doc only, no concrete work yet
> **Created:** 2026-06-19
> **Primary Source:** `react-auth-app` (the key project)
> **Secondary Source:** `course-shop-ui` (complementary patterns)
> **Goal:** Turn production-tested React UI blocks from a monolith into a Storybook-powered component library — Lego pieces for future projects.

---

## Vision

Your webapps contain dozens of well-crafted, production-tested UI components scattered across a monolithic app structure. This initiative extracts those blocks into a standalone Storybook project where each component is:

1. **Self-contained** — no dependency on its home app's config, API, auth context, or i18n layer
2. **Documented** — stories covering every variant and edge-case with interactive controls
3. **Themed** — compatible with your design token system (colors, spacing, typography, z-index)
4. **Import-ready** — usable as an npm package or local path in any future project

---

## Source: react-auth-app Component Audit

### What You've Built (~50 components, 40+ directories)

The app has two natural tiers of components — the ones worth extracting now and the ones that are really just app-logic.

#### Tier A: High Reusability (extract first)

| Component | What it is | Why it's valuable |
|-----------|-----------|------------------|
| **Carousel** | Full carousel engine with progress controller, swipe, auto-slide, i18n, split layout | Complex interaction pattern; takes days to get right |
| **ProductCard / LuxuryProductCard** | E-commerce product display + skeleton state | Core commerce pattern; production-visualized |
| **ModernNavbar / AppNavbar** | Glassmorphism navbar with hover states, blur backdrop | Visually distinctive; hard CSS work is done |
| **PricingCard** | Tiered pricing/membership card with perks, trial banner | Complex conditional rendering already handled |
| **OmniSearch** | Global search input pattern | Search UX work already solved |
| **SideMenu** | Navigation drawer | Mobile nav pattern |
| **NotificationContainer** | Toast/alert system | State management + visual stacking done |
| **ProfileCard** | User profile display card | Rich data display pattern |
| **ProfileField** | Reusable form field | Form primitive that generalizes well |
| **DynamicProductFilter** | Filter UI shell | Complex filter interaction solved |
| **ProgressBar** | Progress indicator | Generic visual primitive |
| **LoadingSpinner** | Loading state spinner | Visual primitive |
| **ResponsiveImage** | Image with loading/fallback states | Generic image handling pattern |

#### Tier B: Medium Reusability (extract second wave)

| Component | What it is | Notes |
|-----------|-----------|-------|
| **Button/CouponButton** | Styled CTA button | Simple but domain-tied styling |
| **EnterpriseFooter** | Multi-column footer pattern | Layout shell, mostly structural |
| **PageTransition** | Route transition wrapper | Navigation UX pattern |
| **ProfileAvatar** | Avatar with initials/initials fallback | Generic avatar primitive |
| **ConnectionStatus** | Online/offline indicator | Context-dependent but visual is reusable |
| **IdleTimeoutPrompt** | Inactivity warning modal | Security UX pattern |
| **ProductsToolbar** | Product listing toolbar | Sort/filter chrome pattern |

#### Tier C: App-Logic Only (don't extract)

| Component | Why it stays |
|-----------|-------------|
| `ProtectedRoute` | Pure auth routing — no visual output |
| `AuthTransition` | Auth-specific transition choreography |
| `ScrollToTop` | Page-level hook, zero UI |
| `SiteAccessGuard` | Access control logic, not a UI pattern |
| `config/*` (20+ files) | App data layer — configuration is domain-specific |

### Design Token Foundation

From `react-auth-app/src/styles/theme.css`:

- **Color system**: 4-scale backgrounds (primary → elevated), 3-level text hierarchy, brand/gold identity, full interactive + status palette
- **Typography**: System font stack with Inter display variant
- **Spacing**: xs/sm/md/lg/xl/2xl scale (0.5rem → 8rem)
- **Radius**: sm(4px) / md(8px) / lg(16px) / xl(24px)
- **Transitions**: fast(150ms) / base(300ms) / slow(cubic-bezier)
- **Z-index**: base → dropdown → sticky → fixed → modal → popover → tooltip
- **Configurable opacity**: navbar-opacity, footer-opacity, hover-bg-opacity

These tokens become the **single source of truth** for the Storybook's visual language.

---

## Proposed Output Structure

```
component-factory/
├── package.json
├── tsconfig.json
├── .storybook/
│   ├── main.ts              # Entry point
│   ├── preview.ts           # Decorators + dark mode toggle
│   └── globals.css          # Design tokens (canonical copy)
│
├── src/
│   ├── index.ts             # Barrel exports
│   │
│   ├── atoms/               # Smallest building blocks
│   │   ├── Button/
│   │   ├── Spinner/
│   │   ├── Input/
│   │   ├── Badge/
│   │   ├── Card/            # Generic card base
│   │   ├── Avatar/          # ProfileAvatar extracted
│   │   └── Rating/
│   │
│   ├── molecules/           # 2-3 atom combinations
│   │   ├── ProductCard/     # Card + Image + Price + Badge
│   │   ├── SearchBar/       # Input + Icon + suggestions
│   │   ├── Toast/           # Container + individual toasts
│   │   ├── ProfileField/
│   │   ├── ProgressBar/
│   │   └── NavItem/
│   │
│   ├── organisms/           # Complex composite patterns
│   │   ├── Carousel/
│   │   ├── PricingCard/
│   │   ├── Navbar/
│   │   ├── SideMenu/
│   │   ├── ProfileCard/
│   │   └── ProductFilter/
│   │
│   ├── layout/              # Page chrome patterns
│   │   ├── HeroSection/
│   │   ├── Footer/
│   │   └── PageTransition/
│   │
│   ├── utils/
│   │   └── withTheme.ts     # Story decorator for theme switching
│   │
│   └── tokens.css           # Design token definitions (exported)
│
├── stories/                 # Page-level compositions (Lego demos)
│   ├── ecommerce.stories.tsx
│   ├── auth-flow.stories.tsx
│   └── course-reader.stories.tsx
│
├── ARCHITECTURE.md          # Design decisions & usage guide
└── README.md
```

---

## Extraction Strategies

### Strategy 1: Dependency Stripping

**Goal:** Every exported component must work in isolation with zero app imports.

**What gets stripped:**
- `@/config/*` → replaced by direct props or story args
- `react-i18next` (`useTranslation`) → hardcoded English strings; i18n as an optional future feature
- Auth context / hooks → no auth dependency, purely presentational
- API clients / data fetchers → mock data passed via props

**What gets preserved:**
- All CSS module classes and file structure per component
- lucide-react icon dependencies (lightweight, universally available)
- Component prop interfaces (generalized where domain-specific)

### Strategy 2: Prop Generalization

Map domain-specific props to generic ones. Example mapping for PricingCard:

```tsx
// Before (app-tied)
interface PricingCardProps {
  tier: MembershipTier;           // imported from membershipConfig
  onAction: (action, tierId) => void;
}

// After (library-generic)
interface PricingCardProps {
  title: string;
  description: string;
  price: { amount: number; period: string };
  cta: { label: string; variant: 'primary' | 'outline'; onClick: () => void };
  perks: { label: string; included: boolean }[];
  highlighted?: boolean;
}
```

### Strategy 3: Story-Driven Discovery

Every component gets stories that **force discovery of missing variants**:

1. **Default story** — typical usage with sensible defaults
2. **Variant story** — each `variant` prop combination
3. **Edge-case story** — empty state, single word, overflow, long text
4. **Interaction story** — hover, focus, active, disabled states
5. **Composition story** — the component inside a realistic layout context

This ensures no hidden assumption about how the component is used.

### Strategy 4: Phased Extraction (Risk-First)

```
Phase 0 → Scaffold Storybook shell + design tokens
Phase 1 → Primitives (zero app coupling, safest)
    Button, Spinner, Rating, Avatar, Badge
Phase 2 → Core molecules (light config dependency)
    ProductCard, SearchBar, Toast, ProfileField, ProgressBar
Phase 3 → Organisms (deep app coupling — careful strip needed)
    Carousel, PricingCard, Navbar, SideMenu, ProfileCard
Phase 4 → Layout patterns
    HeroSection, Footer, PageTransition
Phase 5 → Page compositions (Lego demos)
    Full e-commerce page, auth flow, course reader
Phase 6 → Polish
    Controls addon, dark mode toggle, ARIA checks, README
```

### Strategy 5: Subagent Decomposition

Each phase is a **dedicated subagent task** with clear boundaries:

```
Coordinator (this doc)
├── Agent: scaffold-storybook        [Phase 0] Empty shell + tokens + config
├── Agent: extract-atomic             [Phase 1] Primitives — Button, Spinner, etc.
├── Agent: extract-molecules           [Phase 2] ProductCard, SearchBar, Toast, etc.
├── Agent: extract-organisms           [Phase 3] Carousel, PricingCard, Navbar, etc.
├── Agent: compose-layouts            [Phase 4] Page chrome patterns
├── Agent: compose-pages              [Phase 5] Full page Lego demos
└── Agent: polish-doc                  [Phase 6] Controls, dark mode, README
```

**Extraction rules for every agent:**
1. Copy the original TSX as-is first, then strip imports incrementally
2. Write stories *before* refactoring — captures existing behavior as baseline
3. Generalize props last — after the component works in Storybook with mock data
4. Keep CSS modules intact — no styling rewrites unless absolutely needed
5. Tag every component with its **origin** (source file path + which project)

### Strategy 6: Naming — Domain → Pattern

| Original | New Name | Why |
|----------|---------|-----|
| `CourseCard` (from course-shop-ui) | `MediaCard` | Content-agnostic card shell |
| `ProductCard` | `ProductCard` | Already generic — keep |
| `LuxuryProductCard` | `PremiumCard` | Visual variant label, not domain |
| `ModernNavbar` | `AppNavbar` | Universal nav bar pattern |
| `OmniSearch` | `SearchInput` | Generic search field |
| `PricingCard` | `PricingTier` | Describes data shape, not UI context |
| `ProfileCard` | `UserCard` | Person-agnostic label |
| `ProfileField` | `FormField` | Form primitive |
| `VoicePlayer` | `AudioPlayer` | Generic audio playback |
| `EnterpriseFooter` | `ContentFooter` | Structure over context |

---

## Key Decisions to Make Before Concrete Work

1. **CSS strategy**: Keep CSS modules (preserves visual fidelity, zero rewrite) or migrate to Tailwind (faster iteration, bigger rewrite)?
2. **Token source of truth**: Use `react-auth-app/theme.css` as the canonical copy — it has the richest token set?
3. **Package format**: Standalone npm package vs. monorepo with pnpm workspaces?
4. **i18n approach**: Hardcode English now, support i18n via prop (`locale?: string`) later?
5. **Build tool**: Storybook's built-in Vite preview, or separate build pipeline for the library?

---

## Risks & Mitigations

| Risk | Impact | Mitigation |
|------|--------|-----------|
| Component depends on deep app context (theme, auth, API) | High | Strip in phases; fall back to simpler presentational form if needed |
| Story variants reveal missing props/edge cases | Medium | Stories force completeness — treat as feature discovery, not a problem |
| Design tokens from react-auth-app may conflict with course-shop-ui patterns | Low | react-auth-app's theme is canonical; note deviations in ARCHITECTURE.md |
| CSS modules don't compose well across projects | Low | Use story decorators and className args for cross-component preview |

---

## Next Steps

1. [x] Write this strategy doc
2. [ ] Decide on the 6 key decisions above
3. [ ] Scaffold Storybook shell (Phase 0)
4. [ ] Extract primitives — highest confidence, lowest risk (Phase 1)
5. [ ] Extract molecules — light config dependency (Phase 2)
6. [ ] Extract organisms — careful stripping needed (Phase 3)
7. [ ] Compose page demos (Phase 4-5)
8. [ ] Polish and document (Phase 6)
