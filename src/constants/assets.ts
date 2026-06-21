/**
 * Central registry of static asset paths (under `public/`).
 * Reference assets via `ASSETS.*` instead of hardcoding string paths in JSX.
 */
export const ASSETS = {
  logo: '/assets/logo.svg',
  heroIllustration: '/assets/hero.svg',
  coursePlaceholder: '/assets/course-placeholder.svg',
} as const;
