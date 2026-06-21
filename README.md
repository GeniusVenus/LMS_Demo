# LMS Demo

Frontend-only demo of a learner's flow on an online-course platform. Built with
Next.js 16 (App Router) + React 19 + TypeScript + Tailwind v4, mirroring the
architecture of `vatli-thay-nang` but with **no backend or database** — static
content lives in `src/constants/*` and learner progress lives in `localStorage`.

## Getting started

```bash
pnpm install
pnpm dev          # http://localhost:3000
```

Other scripts: `pnpm build`, `pnpm lint`, `pnpm format`.

## Flow

`/` (landing + catalog) → `/learn` (overview) → `/learn/courses` (my courses) →
`/learn/courses/[slug]` (enroll, mark lessons complete, track progress).

See [CLAUDE.md](CLAUDE.md) for the full architecture notes.
