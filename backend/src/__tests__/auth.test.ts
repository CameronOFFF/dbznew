import { describe, expect, it } from "vitest";
import { hashPassword, verifyPassword, verifyLegacyMd5 } from "../lib/auth.js";

const md5Hash = "5f4dcc3b5aa765d61d8327deb882cf99"; // "password"

describe("auth helpers", () => {
  it("hashes and verifies password", async () => {
    const hash = await hashPassword("supersecret");
    const valid = await verifyPassword("supersecret", hash);
    expect(valid).toBe(true);
  });

  it("verifies legacy md5", () => {
    expect(verifyLegacyMd5("password", md5Hash)).toBe(true);
  });
});
