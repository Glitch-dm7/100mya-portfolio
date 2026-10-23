# Repository guidance

## Commands
- User opts out of tracking: keep Next.js telemetry and agent-upgrade reminders disabled. Do not run upgrade-result reporting commands or add analytics.
- Use npm (`package-lock.json`); install with `npm ci`. Next.js requires Node >=20.9.0.
- `npm run dev` starts development; `npm run build` builds production; `npm start` serves the completed build.
- `npm run lint` runs ESLint directly. For a focused check: `npx eslint components/Layout/Header.tsx` (substitute the changed paths).
- No typecheck script exists: run `npx next typegen && npx tsc --noEmit` to generate route types before checking TypeScript on a clean checkout.
- Run lint separately from the production build; there is no configured test runner or test script.
- Production builds use `next/font/google` and need access to Google Fonts when fonts are not cached.

## Wiring and change-sensitive details
- This is a single-page Next.js App Router portfolio. `app/page.tsx` composes the sections; `app/layout.tsx` owns the shared header and desktop `120px` top padding. Keep that padding aligned with the header's initial desktop height.
- `components/Layout/Header.tsx` uses `react-scroll` targets `home`, `work`, and `contact`; keep these synchronized with section IDs. The header is sticky on mobile and fixed/scroll-responsive on desktop.
- Portfolio entries and gallery captions come from `Data/workData.ts` and `Data/Achievements.ts`; their `/images/...` paths resolve under `public/images/`. Preserve exact path casing, including uppercase `Data` and the mixed `Components`/`components` subdirectories.
- Featured work uses the custom `WorkCardCarousel.tsx`, not `react-slick` despite that dependency. Desktop renders a 3D carousel; mobile renders all cards vertically. Preserve keyboard navigation, reduced-motion behavior, and inactive-card focus/pointer restrictions when changing it.
- Fonts are defined in `lib/fonts.ts`, attached as CSS variables to `<html>` in `app/layout.tsx`, and exposed through `tailwind.config.ts` font families. Update these together; the README's Geist reference is stale.
- Styling uses Tailwind **v3** via `tailwind.config.ts` and `postcss.config.mjs`; shared CSS and keyframes live in `app/globals.css`. Tailwind scans `app/` and `components/`, not `Data/`.
- Both resume buttons share `RESUME_URL` in the header, pointing to `public/Saumya-Gautam-Resume.pdf`.
