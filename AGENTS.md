<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# harry-studio

Single Next.js 16.4.3 App Router app (no monorepo). Source lives entirely under `src/`; pages in `src/app/`, shared components in `src/components/`, helpers in `src/lib/`. Path alias `@/*` → `./src/*`.

## Commands

Use **npm** (`package-lock.json`); ignore the yarn/pnpm/bun alternatives in README.md — that's create-next-app boilerplate.

- `npm run dev` — dev server (Turbopack)
- `npm run build` — production build
- `npm run lint` — ESLint (bare `eslint` with flat config in `eslint.config.mjs`, not `next lint`)
- No typecheck or test scripts exist. For type verification run `npx tsc --noEmit`.

## Framework quirks (Next 16 — verify against `node_modules/next/dist/docs/`)

- `next.config.ts` enables `cacheComponents`, `partialPrefetching`, and `reactCompiler` (React Compiler is active; don't hand-memoize or fight it).
- `cacheComponents` changes data/caching semantics vs older Next — consult the bundled docs before adding fetching or server actions.

## Styling & UI conventions

- Tailwind **v4, CSS-first**: no `tailwind.config` file. Theme tokens and CSS variables are defined in `src/app/globals.css` (`@theme`, `@custom-variant`); Turbopack loads it via the `@tailwindcss/turbopack` rule in `next.config.ts`. Add design tokens there, not in a config file.
- shadcn uses style **`base-nova`** on **Base UI** (`@base-ui/react`), *not* Radix — don't paste Radix-based shadcn examples. Add components with `npx shadcn add <component>` (config in `components.json`); they land in `src/components/ui/`.
- `cn` comes from the `cn` npm package, re-exported by `src/lib/utils.ts` — don't replace it with a clsx/tailwind-merge implementation.
- Fonts: Manrope (`--font-manrope`, sans) and Space Grotesk (`--font-space-grotesk`, heading) are wired to CSS vars in `src/app/layout.tsx` and mapped in `globals.css`.
