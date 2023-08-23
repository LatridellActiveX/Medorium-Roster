import { randomBytes } from "node:crypto";
import jwt from "jsonwebtoken";

// the secret and blacklisted tokens will reset on server restart, invalidating ALL previously created tokens
const SECRET = randomBytes(32).toString("hex");
const BLACKLISTED_TOKENS: string[] = [];
const EXPIRES_IN_SECONDS = 1800;

export function createRegistrationToken(): string {
  const token = jwt.sign({}, SECRET, {
    expiresIn: EXPIRES_IN_SECONDS,
  });

  return token;
}

/**
 * Verifies whether the token is valid, not expired and has not been used before
 * If invalidateToken flag is explicitly set to false, it won't invalidate the token
 */
export function verifyRegistrationToken(
  token: string,
  invalidateToken: boolean = true
): boolean {
  if (BLACKLISTED_TOKENS.includes(token)) {
    return false;
  }

  try {
    const payload = jwt.verify(token, SECRET);
    // on first succesful verification invalidate the token
    if (invalidateToken) {
      BLACKLISTED_TOKENS.push(token);
    }
    return true;
  } catch (_) {
    // throws if token is expired or invalid
    return false;
  }
}
