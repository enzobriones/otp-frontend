/** Joins `API_BASE_URL` (which already includes the `/v1` prefix) with a route. */
export const apiUrl = (base: string, path: string): string =>
  `${base.replace(/\/+$/, "")}/${path.replace(/^\/+/, "")}`
