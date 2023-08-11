import type { Request, Response } from "express";
import type {
  ResponseErrorMessage,
  ResponseIsAuthorized,
  ResponseZodError,
} from "../../types.js";
import User from "../models/user.js";
import { createAuthToken } from "../utils/authToken.js";
import { z } from "zod";
import { splitInHalf } from "../utils/index.js";
import {
  createRegistrationToken,
  verifyRegistrationToken,
} from "../utils/registrationToken.js";

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

  const { user } = result.val;

  return res
    .status(200)
    .json({ message: `Successfully registered user with name '${user.name}'` });
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
    console.log("Login failed.", result.err);
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
    // secure: true, // TODO: set to true if in production env
    sameSite: "lax",
  });

  res.cookie("authToken2", secondHalf, {
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    httpOnly: false,
    // secure: true, // TODO: set to true if in production env
    sameSite: "lax",
  });

  return res.status(200).json({ authenticated: true });
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
