# Component Factory — Storybook Library

Reusable React components extracted **faithfully** from production enterprise apps
(`react-auth-app` primary, `course-shop-ui` secondary). Each piece keeps the
original markup and CSS from its source app, with app-only dependencies
(i18n, auth store, react-router, API clients) stripped and replaced by plain props.

## Quick Start

```bash
npm install
npm run storybook        # dev → http://localhost:6006
npm run build-storybook  # static Storybook → storybook-static/
npm run build            # publishable library → dist/ (ESM + CJS + .d.ts + style.css)
npm run typecheck        # tsc --noEmit
```

## Using as a packaged library

The package builds to `dist/` with proper entry points:

```jsonc
"main":    "./dist/index.cjs",   // CommonJS
"module":  "./dist/index.js",    // ESM
"types":   "./dist/index.d.ts",  // TypeScript declarations
"exports": { ".": …, "./style.css": "./dist/style.css" }
```

React/ReactDOM are **peer dependencies** (not bundled). Consume it like:

```tsx
import { ProductCard, Carousel, AppNavbar } from 'component-factory';
import 'component-factory/style.css';   // ships all component styles + design tokens
```

Build details:
- **Vite library mode** → ESM (`index.js`) + CJS (`index.cjs`), externalizing `react`, `react-dom`, `react/jsx-runtime`.
- `cssCodeSplit: false` → every component's CSS is extracted into a single `dist/style.css`.
- Types emitted by `tsc -p tsconfig.build.json` (stories excluded).
- `sideEffects: ["**/*.css"]` so bundlers keep the stylesheet during tree-shaking.

## Architecture

| Tier          | What lives here             | Example             |
|---------------|-----------------------------|---------------------|
| **Atoms**     | Smallest building blocks    | Button, Spinner     |
| **Molecules** | 2–3 atom combinations       | ProductCard, Toast  |
| **Organisms** | Complex composite patterns  | Carousel, AppNavbar |

## Component Inventory

### Atoms

| Component | Variants / Props                                | Source                              |
|-----------|-------------------------------------------------|-------------------------------------|
| Button    | primary/secondary/ghost × sm/md/lg              | react-auth-app / course-shop-ui     |
| Spinner   | default/dots/pulse/ring × small/medium/large, overlay | react-auth-app/LoadingSpinner (verbatim) |
| Badge     | default/success/error/warning/info, pill        | generic atom                        |
| Avatar    | circle/square × sm/md/lg/xl, image or initials  | react-auth-app/ProfileAvatar        |
| Rating    | 0–5 value (decimals supported)                  | course-shop-ui/StarRating           |
| GlassButton | regular/clear/tinted × sm/md/lg, icon         | **new** — Apple Liquid Glass (iOS 26/visionOS) |

### Molecules

| Component   | Variants / Props                                       | Source                              |
|-------------|--------------------------------------------------------|-------------------------------------|
| ProductCard | marketplace card: discount %, wishlist heart, sale strikethrough, Add-to-Cart CTA | react-auth-app/products/ProductCard (faithful) |
| SearchInput | controlled/uncontrolled, clear button                  | react-auth-app/NavbarSearch         |
| Toast       | success/error/warning/info, auto-dismiss               | react-auth-app/NotificationContainer|
| ProgressBar | linear/gradient/striped × determinate/indeterminate    | react-auth-app/ProgressBar (verbatim) |
| GlassTabs   | segmented control, sliding glass thumb, regular/clear  | **new** — Apple Liquid Glass (iOS 26/visionOS) |

### Organisms

| Component | Variants / Props                                            | Source                              |
|-----------|------------------------------------------------------------|-------------------------------------|
| Carousel  | center/split layout, auto-slide, swipe, Apple-style progress controller, per-slide text styles | react-auth-app/Carousel (faithful, i18n stripped) |
| AppNavbar | click-to-open full-width mega dropdowns, mobile drawer w/ overlay + close, click-outside, dark/light | react-auth-app/EnhancedNavbar (the navbar the app actually renders) |

## Theming

The library uses **react-auth-app's dark theme** as its visual baseline (bg `#0a0a0a`,
gold brand `#d4af37`, white text). Tokens live in:

- `.storybook/globals.css` — canonical CSS custom properties (loaded by Storybook and shipped in `style.css`)
- `src/tokens.ts` — the same values as typed TS constants for programmatic use

Storybook defaults the canvas background to **dark** (with `surface` and `light`
options in the toolbar) so dark-themed components render in their intended context;
`ProductCard` is a light marketplace card and pops on any background.

## Page-Level Lego Demos

`stories/ecommerce-page.stories.tsx` composes components into realistic layouts:
catalog grid, loading state with Spinner, and a Toast notification.

## Extraction Rules

1. **Copy the original markup + CSS first**, then strip only app-specific deps
   (`@/config/*`, API clients, auth store, react-router, `react-i18next`).
2. Hardcoded English — i18n can return later as a prop.
3. CSS is plain global CSS with component-scoped class prefixes (`cf-…`, BEM names).
   > Note: files are **not** CSS Modules. An earlier pass named them `*.module.css`
   > but imported them as side-effects with literal class names — under Vite that
   > hashes the selectors so nothing applied. They are now plain `.css`.
4. Every component has stories (CSF3 + `autodocs`) covering default, variants, edge
   cases, and a composition.
5. Source attribution is documented in each component's JSDoc.

## Decisions Log

| Decision        | Choice                                          | Date       |
|-----------------|-------------------------------------------------|------------|
| CSS strategy    | Plain global CSS copied from source (no rewrite)| 2026-06-20 |
| Token source    | react-auth-app/theme.css canonical              | 2026-06-19 |
| Package format  | Standalone npm package (Vite lib + tsc types)   | 2026-06-20 |
| i18n approach   | Hardcode English, prop later                    | 2026-06-19 |
| Build tool      | Vite library mode + tsc declarations            | 2026-06-20 |

## Next Steps

1. [x] Scaffold Storybook project + design tokens
2. [x] Extract atoms: Button, Spinner, Badge, Avatar, Rating
3. [x] Extract molecules: ProductCard, SearchInput, Toast, ProgressBar
4. [x] Extract organisms: Carousel, AppNavbar
5. [x] Compose page-level Lego demos
6. [x] Library packaging (ESM/CJS/types/style.css)
7. [ ] Extract remaining high-value blocks: PricingCard, ProfileCard, SideMenu, DynamicProductFilter
8. [ ] Polish: light/dark theme toggle decorator, ARIA audit
```
