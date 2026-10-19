---
name: frontend-conventions
description: How to add a page, a server module (actions and API access) and a form in otp-frontend. Use when adding or changing a screen or anything that talks to otp-api.
---

# Frontend conventions

Read the Next.js guide in `node_modules/next/dist/docs/` before writing code: this version differs from older ones.

## Talking to the API

The browser never calls the API. Everything goes through the server.

1. `src/server/<module>/<module>.api.ts`: server-only functions that call the API with `fetch` and `apiUrl(process.env.API_BASE_URL, path)` (`src/utils/api.utils.ts`), forward the session cookie, and validate the response shape with a helper from `src/utils/`.
2. `src/server/<module>/<module>.actions.ts`: Server Actions (`"use server"`) for mutations. They parse the form, call the `.api.ts` function and return field errors or redirect.
3. Pages are Server Components that call the `.api.ts` functions directly.

API errors: 400 carries `details` (Zod issues) → show them in their field; 401 → redirect to `/login`; 404 → `notFound()`.

## Where things go

| What | Where |
|---|---|
| Labels, form fields, limits | `src/constants/<module>.constants.ts` |
| Pure helpers (parsing, formatting, RUT) | `src/utils/<module>.utils.ts`, with a `test/<module>.test.ts` |
| Types | `src/types/<module>.types.ts` |
| shadcn components | `pnpm dlx shadcn add <name>` → `src/components/ui/` |

## Style

- Arrow functions only; ESLint fails otherwise (except `src/components/ui`).
- Run `pnpm format` before committing (no semicolons, double quotes, Tailwind class sorting).
- Money is an integer in CLP; format with `Intl.NumberFormat("es-CL", { style: "currency", currency: "CLP" })`. RUTs are shown as `12.345.678-5` and sent as `12345678-5`.
- User-facing text in Spanish, accessible (labels on inputs, visible focus, keyboard reachable).
