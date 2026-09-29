# Atelier Store

Next.js (App Router) + TypeScript + Tailwind CSS, with Better Auth, Drizzle ORM and Neon Postgres.

## Setup

1. Install dependencies: `npm install`
2. Copy `.env.example` to `.env.local` and fill in:
   - `DATABASE_URL` — Neon connection string
   - `BETTER_AUTH_SECRET` — generate with `npx auth secret`
3. Start the dev server: `npm run dev`

## Project structure

```
src/
  app/
    api/auth/[...all]/route.ts   Better Auth route handler
    layout.tsx, page.tsx, globals.css
  db/
    index.ts                     Drizzle client (Neon HTTP driver)
    schema.ts                    Drizzle schema entry point
  lib/
    auth.ts                      Better Auth server instance
    auth-client.ts               Better Auth React client
drizzle/                         Generated SQL migrations
drizzle.config.ts                drizzle-kit config
```

## Scripts

| Script | Description |
| --- | --- |
| `npm run dev` / `build` / `start` | Next.js |
| `npm run lint` / `typecheck` | ESLint / TypeScript |
| `npm run auth:generate` | Generate Better Auth tables into `src/db/auth-schema.ts` |
| `npm run db:generate` | Generate SQL migrations from the schema |
| `npm run db:migrate` | Apply migrations |
| `npm run db:push` | Push the schema directly (for prototyping) |
| `npm run db:studio` | Open Drizzle Studio |

## Adding the auth tables

1. `npm run auth:generate`
2. Uncomment `export * from "./auth-schema";` in `src/db/schema.ts`
3. `npm run db:generate && npm run db:migrate`
