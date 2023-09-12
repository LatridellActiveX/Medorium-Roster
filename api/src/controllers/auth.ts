import type { Request, Response } from "express";
import type {
  ResponseErrorMessage,
  ResponseIsAuthorized,
  ResponseValidAccessCode,
  ResponseZodError,
} from "../../types.js";
import User from "../models/user.js";
import { createAuthToken } from "../utils/authToken.js";
import { z } from "zod";
import { splitInHalf } from "../utils/index.js";
import {
  createRegistrationToken,
  invalidateRegistrationToken,
  verifyRegistrationToken,
} from "../utils/registrationToken.js";

export async function register(req: Request, res: Response) {
  const schema = z.object({
    query: z.object({
      accessCode: z.string().min(100).max(200),
    }),
    body: z.object({
      username: z.string().min(6).max(30).trim(),
      password: z.string().min(8).max(128),
    }),
  });

  const validation = schema.safeParse({ query: req.query, body: req.body });

  if (!validation.success) {
    return res.status(400).json(validation.error.errors as ResponseZodError);
  }

  const { accessCode } = validation.data.query;
  const { username, password } = validation.data.body;

  const codeIsValid = verifyRegistrationToken(accessCode);

  if (!codeIsValid) {
    return res
      .status(401)
      .json({ error: "Invalid access code" } as ResponseErrorMessage);
  }

  const result = await User.register(username, password);

  if (!result.ok) {
    return res.status(400).json({ error: result.err } as ResponseErrorMessage);
  }

  // invalidate the token after successful registration
  invalidateRegistrationToken(accessCode);

  const { user } = result.val;

  return res
    .status(200)
    .json({ message: `Successfully registered user with name '${user.name}'` });
}

export async function login(req: Request, res: Response) {
  const schema = z.object({
    body: z.object({
      username: z.string().min(6).max(30).trim(),
      password: z.string().min(8).max(128),
    }),
  });
  const validation = schema.safeParse({ body: req.body });

  if (!validation.success) {
    return res.status(400).json(validation.error.issues as ResponseZodError);
  }

  const { username, password } = validation.data.body;

  const result = await User.login(username, password);

  if (!result.ok) {
    return res
      .status(400)
      .json({ error: "Invalid username or password" } as ResponseErrorMessage);
  }

  const { user } = result.val;

  const authToken = createAuthToken(username, user.isAdmin);

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

  return res.status(200).json({ authenticated: true, isAdmin: user.isAdmin });
}

export async function isAuthorized(req: Request, res: Response) {
  const { username } = res.locals;
  return res.status(200).json({
    authorized: true,
    username,
    isAdmin: true,
  } as ResponseIsAuthorized);
}

export async function generateAccessCode(req: Request, res: Response) {
  const token = createRegistrationToken();
  res.status(200).json({ token });
}

export async function verifyAccessCode(req: Request, res: Response) {
  const schema = z.object({
    params: z.object({
      accessCode: z.string().min(100).max(200),
    }),
  });
  const validation = schema.safeParse({ params: req.params });

  if (!validation.success) {
    return res.status(200).json({ valid: false } as ResponseValidAccessCode);
  }

  const { accessCode } = validation.data.params;

  const isValid = verifyRegistrationToken(accessCode);

  return res.status(200).json({ valid: isValid } as ResponseValidAccessCode);
}
