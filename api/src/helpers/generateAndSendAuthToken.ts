import type { Response } from "express";
import { createAuthToken } from "../helpers/authToken.js";
import { splitInHalf } from "../utils/index.js";

export default function generateAndSendAuthToken(
  res: Response,
  username: string,
  isAdmin: boolean
) {
  const authToken = createAuthToken(username, isAdmin);

  // Split token into two cookies, second one is httpOnly: false to allow
  // client side logout, without exposing the first half to javascript,
  // or implementing server side logout with token invalidation.
  const [firstHalf, secondHalf] = splitInHalf(authToken);

  res.cookie("authToken1", firstHalf, {
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
  });

  res.cookie("authToken2", secondHalf, {
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    httpOnly: false,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
  });
}
