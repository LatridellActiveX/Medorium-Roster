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

const usernameAndPasswordSchema = z.object({
  username: z.string().min(6).max(30).trim(),
  password: z.string().min(8).max(128).trim(),
});
const accessCodeSchema = z.object({
  accessCode: z.string().min(100).max(200),
});

export async function register(req: Request, res: Response) {
  const bodyValidation = usernameAndPasswordSchema.safeParse(req.body);
  const queryValidation = accessCodeSchema.safeParse(req.query);

  // TODO: find cleaner way to do validate two schemas, or combine them into one
  if (!bodyValidation.success || !queryValidation.success) {
    const errors = [
      ...(bodyValidation.success ? [] : bodyValidation.error.issues),
      ...(queryValidation.success ? [] : queryValidation.error.issues),
    ];

    return res.status(400).json(errors as ResponseZodError);
  }

  const { username, password } = bodyValidation.data;
  const { accessCode } = queryValidation.data;

  const codeIsValid = verifyRegistrationToken(accessCode);

  if (!codeIsValid) {
    return res.status(401).json({ error: "Invalid access code" });
  }

  const result = await User.register(username, password);

  if (!result.ok) {
    console.log("Registration failed.", result.err);
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
  const bodyValidation = usernameAndPasswordSchema.safeParse(req.body);

  if (!bodyValidation.success) {
    return res
      .status(400)
      .json(bodyValidation.error.issues as ResponseZodError);
  }

  const { username, password } = bodyValidation.data;

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
  const validation = accessCodeSchema.safeParse(req.params);

  if (!validation.success) {
    return res.status(200).json({ valid: false });
  }

  const token = validation.data.accessCode;

  const isValid = verifyRegistrationToken(token, false);

  return res.status(200).json({ valid: isValid });
}
