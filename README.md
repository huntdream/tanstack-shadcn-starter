# Story

Production-ready TanStack Start app with shadcn/ui (Base UI), SSR, Cookie Session auth foundation, theme switching, and Paraglide i18n.

## Stack

- TanStack Start + TanStack Router (SSR, Nitro)
- shadcn/ui on **Base UI** (`base-nova`, neutral)
- Tailwind CSS v4
- Paraglide JS (`zh-CN` + `en`, cookie-based locale)
- Zod + `@tanstack/zod-adapter`
- GitHub Actions CI

## Getting started

```bash
pnpm install
cp .env.example .env
pnpm dev
```

Required env:

- `SESSION_SECRET` — at least 32 characters
- `APP_ORIGIN` — required in production (e.g. `http://localhost:3000`)

## Scripts

| Command      | Description                     |
| ------------ | ------------------------------- |
| `pnpm dev`   | Development server on port 3000 |
| `pnpm check` | Prettier + TypeScript           |
| `pnpm build` | Production build                |
| `pnpm start` | Run `.output/server/index.mjs`  |

## Architecture highlights

- **Server Functions** in `src/server/functions/` — data security boundary
- **Auth middleware** protects private RPCs; route `beforeLoad` is UX-only
- **CSRF** via `createCsrfMiddleware()` in `src/start.ts`
- **i18n** via Paraglide cookie strategy (no URL prefix)
- **Theme** light/dark/system with CSS variable tokens in `src/styles.css`

## Extending brand colors

Add alternate token sets under `:root` / `.dark` in `src/styles.css`, or introduce a `[data-theme="brand"]` selector. Components consume semantic tokens (`--primary`, `--background`, etc.) — no component changes needed.

## i18n note

Cookie-only locale keeps URLs simple for app-style products. For SEO/hreflang with localized URLs, add Paraglide `url` strategy later.

## AI agents

See [AGENTS.md](./AGENTS.md) for project conventions and quality gates.
