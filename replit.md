# Sovereign

Marketing & demo site for **Sovereign** — an enterprise infrastructure brand
(payment gateway, cloud/dedicated hosting, AI platform, and data centers).
This is a pnpm-workspace monorepo containing the public website plus a demo API.

## Run & Operate

- `pnpm --filter @workspace/hosting-site run dev` — run the website (Vite, port 5173)
- `pnpm --filter @workspace/api-server run dev` — run the demo API server (port 5000)
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from the OpenAPI spec
- Required env (api-server): `DATABASE_URL` — Postgres connection string

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- Web: React + Vite + Tailwind, wouter (routing), framer-motion (animation), TanStack Query
- API: Express 5
- DB: PostgreSQL + Drizzle ORM
- Validation: Zod (`zod/v4`), `drizzle-zod`
- API codegen: Orval (from OpenAPI spec)

## Where things live

- `artifacts/hosting-site/` — the public Sovereign website (the main app)
- `artifacts/api-server/` — demo Express API
- `artifacts/mockup-sandbox/` — UI component sandbox
- `lib/` — shared API client / spec / zod packages

## Architecture decisions

- The hero's ambient particles render to a single `<canvas>` (one rAF loop)
  rather than many animated DOM nodes — keeps the landing page smooth.
- Heavy background animation (aurora blobs, particles) is skipped when the user
  prefers reduced motion or is on a touch device.
- Route pages are lazy-loaded (`React.lazy` + `Suspense`) so the initial bundle
  and first paint stay light.

## Gotchas

- Page transitions use a 2D "city grid" map in `App.tsx` (`pagePositions`) to pick
  the slide direction — add new routes there or they default to a center slide.

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
