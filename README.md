# otp-frontend

Frontend de **Ordena tu Pyme**: flujo de caja y cuentas por pagar para pymes chilenas, opensource (MIT). Next.js 16 con Server Components y Server Actions, shadcn/ui (Base UI) y Tailwind 4.

Cliente de [otp-api](https://github.com/enzobriones/otp-api).

## Desarrollo

Requiere Node 24 y pnpm 12 (`corepack enable`). Copia `.env.example` a `.env.local` y configura `API_BASE_URL` con la URL de la API incluyendo el prefijo `/v1` (por ejemplo `http://localhost:3000/v1`). Levanta la API por separado y ejecuta `pnpm dev`: el frontend usa el puerto 3001.

## Arquitectura

El navegador no consume la API directamente; `API_BASE_URL` no es una variable pública. Cada módulo accede a la API desde el servidor.

- `src/server/<módulo>/`: Server Actions (`*.actions.ts`) y acceso a la API (`*.api.ts`).
- `src/constants/*.constants.ts`: constantes (etiquetas, campos de formulario, límites).
- `src/utils/*.utils.ts`: helpers puros.
- `src/types/*.types.ts`: tipos por módulo.
- Solo arrow functions; ESLint lo exige salvo en `src/components/ui` (generado por shadcn).

## Verificación

```sh
pnpm lint
pnpm typecheck
pnpm test
pnpm exec prettier --check "**/*.{ts,tsx}"
pnpm build
```

## CI y despliegue

GitHub Actions (`.github/workflows/ci.yml`) corre lint, typecheck, prettier, test y build en cada PR y en cada push a `develop` y `main`.

Railway, proyecto `ordena-tu-pyme`, servicio `frontend` desplegado desde GitHub tras pasar el CI (Wait for CI). La configuración vive en el dashboard de Railway, no en el repo.

- `production` ← `main`, `staging` ← `develop`.
- Railpack detecta pnpm por `pnpm-lock.yaml`, compila con `pnpm build` y arranca con `pnpm start`; Next.js toma el puerto de `PORT`.
- Variables del servicio:

```text
NODE_ENV=production
API_BASE_URL=http://${{api.RAILWAY_PRIVATE_DOMAIN}}:${{api.PORT}}/v1
```

`API_BASE_URL` usa la red privada hacia la API del mismo entorno y no lleva `NEXT_PUBLIC_`. Más detalle en la [documentación de despliegue de la API](https://github.com/enzobriones/otp-api/blob/main/docs/DEPLOYMENT.md).

## Licencia

[MIT](LICENSE)
