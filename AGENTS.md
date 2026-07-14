# AGENTS.md

Project stack: TanStack Start (SSR), TanStack Router, shadcn/ui on **Base UI**, Tailwind CSS v4, Paraglide i18n, Zod validation, Cookie Session auth.

## Directory map

- `src/routes/` — file-based routes and API handlers (`server.handlers`)
- `src/server/functions/` — `createServerFn` endpoints (security boundary)
- `src/server/middleware/` — reusable server middleware (`auth`, headers)
- `src/server/session.ts` — HttpOnly cookie session helpers
- `src/start.ts` — global request middleware (CSRF, security headers, logging)
- `src/paraglide/` — generated i18n output (do not hand-edit)
- `messages/` — translation source files (`zh-CN`, `en`)
- `src/components/ui/` — shadcn Base UI components

## Commands

```bash
pnpm dev          # local development
pnpm check        # format + typecheck
pnpm build        # production build
pnpm start        # run built Nitro server (.output/server/index.mjs)
```

## Architecture rules

1. **Server Functions are the data boundary.** Protect private reads/writes with `authMiddleware`; route `beforeLoad` is UX-only.
2. **Use Zod + `@tanstack/zod-adapter`** for every Server Function input.
3. **Never store session tokens in `localStorage`.** Use `getAppSession()` only on the server.
4. **Do not leak internal errors to clients.** Map to `AppError` / `toClientError()`.
5. **User-visible strings go through Paraglide** (`m.*` from `@/paraglide/messages`), not hardcoded JSX copy.
6. **Theme tokens live in CSS variables** (`src/styles.css`); extend palettes via semantic tokens, not ad-hoc hex in components.
7. **Custom `src/start.ts` requires explicit CSRF** via `createCsrfMiddleware()`.

## Quality gate before finishing

Run `pnpm check && pnpm build`.

## Environment

Copy `.env.example` to `.env`. Required: `SESSION_SECRET` (>= 32 chars). Production also requires `APP_ORIGIN`.

<!-- intent-skills:start -->

See TanStack Intent mappings below when working on TanStack-specific features.
<!-- intent-skills:end -->
