import type { Request, Response } from "express";
import type {
  ResponseErrorMessage,
  ResponseIsAuthorized,
  ResponseZodError,
} from "../../types.js";
import User from "../models/user.js";
import { z } from "zod";
import {
  createRegistrationToken,
  verifyRegistrationToken,
} from "../helpers/registrationToken.js";
import generateAndSendAuthToken from "../helpers/generateAndSendAuthToken.js";

export async function register(req: Request, res: Response) {
  const schema = z.object({
    query: z.object({
      accessCode: z.string().min(100).max(200),
    }),
    body: z.object({
      username: z.string().min(6).max(30).trim(),
      password: z.string().min(8).max(128).trim(),
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
    return res.status(401).json({ error: "Invalid access code" });
  }

  const result = await User.register(username, password);

  if (!result.ok) {
    return res.status(400).json({ error: result.err } as ResponseErrorMessage);
  }

  const loginResult = await User.login(username, password);

  if (!loginResult.ok) {
    return res
      .status(400)
      .json({ error: "Invalid username or password" } as ResponseErrorMessage);
  }

  const { user } = loginResult.val;

  generateAndSendAuthToken(res, username, user.isAdmin);

  return res
    .status(200)
    .json({ authenticated: true, username, isAdmin: user.isAdmin });
}

export async function login(req: Request, res: Response) {
  const schema = z.object({
    body: z.object({
      username: z.string().min(6).max(30).trim(),
      password: z.string().min(8).max(128).trim(),
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

  generateAndSendAuthToken(res, username, user.isAdmin);

  return res
    .status(200)
    .json({ authenticated: true, username, isAdmin: user.isAdmin });
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
    return res.status(200).json({ valid: false });
  }

  const { accessCode } = validation.data.params;

  const isValid = verifyRegistrationToken(accessCode, false);

  return res.status(200).json({ valid: isValid });
}
