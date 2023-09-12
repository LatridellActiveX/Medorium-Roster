import { randomBytes } from "node:crypto";
import jwt from "jsonwebtoken";

// the secret and blacklisted tokens will reset on server restart, invalidating ALL previously created tokens
const SECRET = randomBytes(32).toString("hex");
const BLACKLISTED_TOKENS = new Set<string>();
const EXPIRES_IN_SECONDS = 1800;

export function createRegistrationToken(): string {
  const token = jwt.sign({}, SECRET, {
    expiresIn: EXPIRES_IN_SECONDS,
  });

  return token;
}

/**
 * Verifies whether the token is valid, not expired and has not been used before
 */
export function verifyRegistrationToken(token: string): boolean {
  if (BLACKLISTED_TOKENS.has(token)) {
    return false;
  }

  try {
    const payload = jwt.verify(token, SECRET);
    return true;
  } catch (_) {
    // throws if token is expired or invalid
    return false;
  }
}

export function invalidateRegistrationToken(token: string) {
  BLACKLISTED_TOKENS.add(token);
}
