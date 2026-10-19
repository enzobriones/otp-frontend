import assert from "node:assert/strict"
import { test } from "node:test"
import { apiUrl } from "../src/utils/api.utils.ts"

test("joins the base url and the route with a single slash", () => {
  assert.equal(
    apiUrl("http://localhost:3000/v1", "/auth/me"),
    "http://localhost:3000/v1/auth/me"
  )
  assert.equal(
    apiUrl("http://localhost:3000/v1/", "auth/me"),
    "http://localhost:3000/v1/auth/me"
  )
})
