# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build & Dev Commands

Package manager is **pnpm**.

- `pnpm dev` — start dev server with Turbopack (localhost:3000)
- `pnpm build` — production build (`output: 'standalone'` in `next.config.ts`)
- `pnpm lint` — ESLint (`eslint ./src`)
- `pnpm format` / `pnpm format:check` — Prettier (`./src`)
- No test runner configured

## Big picture

**LMS Demo** — a frontend-only demo that walks through one learner's flow on an
online-course platform. Next.js 16 App Router (React 19), TypeScript, Tailwind v4.

This is a **demo with no backend and no database**. It deliberately mirrors the
architecture of the sibling `vatli-thay-nang` project (folder layout, styling
setup, shadcn conventions, server-component + feature-component split) but drops
everything backend-related: no axios, no server actions, no auth, no external
storage. The two "data" concerns are handled entirely on the client:

1. **Static content** (courses, modules, lessons) → typed const arrays in
   `src/constants/*`, read through `src/lib/courses.ts`.
2. **Mutable learner progress** (enrollment, completed lessons) → a module-level
   store backed by `localStorage` (`src/lib/progress/*`), read via the
   `useProgress()` hook. No React context provider.

Two surfaces:

1. **Public landing** (`/`) — marketing + course catalog, composed from
   `src/components/features/*`.
2. **Learn surface** (`/learn/*`) — the demo flow: overview → course list →
   course detail with lesson checklist + progress bar. Plain layout (no app
   shell); each page renders its own lightweight header.

Path alias `@/*` → `src/*`.

## Data layer (no DB, no BE)

There is no network layer. Replace it mentally with two pieces:

- **Course catalog** lives in `src/constants/courses.ts` as a typed `Course[]`.
  Components never import that array directly — they call the read helpers in
  `src/lib/courses.ts` (`getAllCourses`, `getCourseBySlug`, `getCourseById`,
  `getOrderedLessons`). Treat `src/lib/courses.ts` as the "repository": swapping
  to a real API later should only touch that file.
- **Learner progress** is the only mutable state. It lives in the module-level
  store `src/lib/progress/store.ts`, hydrated lazily from `localStorage` and
  persisted on every change via `src/lib/progress/storage.ts` (SSR-safe, single
  storage key `lms-demo:progress:v1`). Consume it with the `useProgress()` hook
  (`src/hooks/use-progress.ts`), which wires the store to React via
  `useSyncExternalStore` — no provider needed, and all consumers stay in sync.
  Never read `localStorage` directly from components. Derived values
  (completion %, lesson counts) come from `src/lib/progress/selectors.ts`.

Shared enum-style options (`LESSON_TYPE_OPTIONS`, `COURSE_LEVEL_OPTIONS`,
`PAGE_SIZE_OPTIONS`, `ALL_VALUE`) live in `src/lib/constants.ts`; validation
regex/messages in `src/lib/validation.ts`. Reuse these rather than redefining.

## Routing

- `src/app/layout.tsx` — root layout: fonts, top loader, tooltip provider, toaster.
- `src/app/page.tsx` — landing (server component composing feature components).
- `src/app/learn/layout.tsx` — plain container for the learn surface. Anything
  under `/learn` may call `useProgress()` (the store is module-level, not
  mounted here).
- `src/app/learn/page.tsx`, `src/app/learn/courses/page.tsx` — overview / catalog.
- `src/app/learn/courses/[slug]/page.tsx` — server component: resolves the course
  by slug (`notFound()` if missing) and renders `CourseLearnClient`. The
  interactive flow (enroll, toggle complete, progress) lives in the colocated
  client component because it touches the progress store.

There is **no route protection / middleware** — this is a demo. If you add a
`proxy.ts` edge gate, document it here.

## Styling

Tailwind CSS v4, **no `tailwind.config.ts`** — wired through `postcss.config.mjs`
(`@tailwindcss/postcss`) and configured via `@theme` blocks in
`src/styles/globals.css`. Brand tokens (`--color-brand`, `--color-accent-teal`,
`--color-success`, `--color-light-bg`, etc.) and the shadcn CSS variable theme
(`@theme inline` + `:root` / `.dark`) live there.

Fonts via `next/font/google` in `src/app/layout.tsx`, each with the `vietnamese`
subset:

- `--font-display` (Be Vietnam Pro) — headings (`font-display`)
- `--font-sans` (Inter) — body / default (`font-sans`)

> Note: not every Google font ships a `vietnamese` subset (e.g. Poppins doesn't).
> Pick Vietnamese-capable fonts for this app.

shadcn/ui (`components.json`, style **new-york**, base color **slate**, lucide
icons) is the source for `src/components/ui/*`. Don't duplicate primitives —
extend the existing ones or add via the shadcn CLI.

## Component organization

- `src/components/features/<domain>/` — feature components (`home`, `courses`,
  …). Client components (`'use client'`), one per file, `export default`.
  Landing components use `motion/react` for entrance animation.
- `src/components/ui/` — shadcn primitives.
- `src/components/ui/custom/` — small shared form primitives (`ActionButton`,
  `FormTextField`) re-exported from `index.ts`. Prefer these over hand-rolled
  inputs.

## Types

- `src/types/course.ts` — `Course` / `Module` / `Lesson` (content shape).
- `src/types/progress.ts` — `CourseProgress` / `ProgressState` /
  `ProgressContextValue` (client state shape).

## Misc

- Toasts: `sonner`, mounted in root layout. Top loader: `nextjs-toploader` (brand `#4f46e5`).
- `src/lib/utils.ts` → `cn()` (clsx + tailwind-merge), `formatDate()`, `clamp()`.
- Static assets registered in `src/constants/assets.ts` (`ASSETS` const); files under `public/assets/`.

## Deploy

Vercel-ready (`output: 'standalone'`). No env vars required — the demo runs
entirely client/server-side with bundled mock data.
