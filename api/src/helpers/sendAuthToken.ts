import type { Response } from "express";

/**
 * Takes a token split into two equal halves, and sends them
 * as authToken1 (httpOnly: true) and authToken2 (httpOnly: false).
 * This allows for client side logout without exposing whole token to JS,
 * or having to invalidate tokens server side. Not ideal but good enough for the use case.
 */
export default function sendAuthToken(res: Response, tokens: [string, string]) {
  const [authToken1, authToken2] = tokens;

  res.cookie("authToken1", authToken1, {
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
  });

  res.cookie("authToken2", authToken2, {
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    httpOnly: false,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
  });
}
