import type { Request, Response } from "express";
import User from "../models/user.js";
import { createAuthToken, decodeAuthToken } from "../utils/authToken.js";
import { z } from "zod";

const usernameAndPasswordSchema = z.object({
  username: z.string().min(6).max(30).trim(),
  password: z.string().min(8).max(128).trim(),
});

const authTokenSchema = z.string().min(100).max(200);

export async function register(req: Request, res: Response) {
  const validation = usernameAndPasswordSchema.safeParse(req.body);
  if (!validation.success) {
    return res.status(400).json(validation.error.issues);
  }

  const { username, password } = validation.data;
  // const { accessCode } = req.query;

  const result = await User.register(username, password);

  if (!result.ok) {
    console.log("Registration failed.", result.err);
    return res.status(400).json({ error: result.err });
  }

  const { doc } = result.val;

  return res
    .status(200)
    .json({ message: `Successfully registered user with name '${doc.name}'` });
}

export async function login(req: Request, res: Response) {
  const validation = usernameAndPasswordSchema.safeParse(req.body);
  if (!validation.success) {
    return res.status(400).json(validation.error.issues);
  }

  const { username, password } = validation.data;

  const result = await User.login(username, password);

  if (!result.ok) {
    console.log("Login failed.", result.err);
    return res.status(400).json({ error: "Invalid username or password" });
  }

  const authToken = createAuthToken(username);

  res.cookie("authToken", authToken, {
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    httpOnly: true,
    // secure: true, // TODO: set to true if in production env
    sameSite: "lax",
  });

  return res.status(200).json({ authenticated: true });
}
//checks for the authorization token in the cookies, the endpoint /auth needs to specifically be called. 
export async function isAuthorized(req: Request, res: Response) {
  const validation = authTokenSchema.safeParse(req.cookies.authToken);
  if (!validation.success) {
    return res.status(401).json({ error: "Not Authorized" });
  }
  const authToken = validation.data;

  const payload = decodeAuthToken(authToken);

  if (!payload) {
    return res.status(401).json({ error: "Not Authorized" });
  }

  const { username } = payload;

  const user = await User.findByUsername(username);

  if (!user) {
    return res.status(401).json({ error: "Not Authorized" });
  }

  return res.status(200).json({ authorized: true, username });
}
