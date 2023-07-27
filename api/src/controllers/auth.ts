import type { Request, Response } from "express";
import User from "../models/user.js";
import { createAuthToken, decodeAuthToken } from "../utils/authToken.js";

export async function register(req: Request, res: Response) {
  const { username, password } = req.body;
  const { accessCode } = req.query; // TODO: validate schema

  // TODO: replace this with a schema validation library like Zod/Joi/Yup
  if (typeof username !== "string" || typeof password !== "string") {
    return res.status(400).json({ error: "Invalid body parameters" });
  }

  const result = await User.register(username, password);

  if (!result.ok) {
    return res.status(400).json({ error: result.err });
  }

  const { doc } = result.val;

  return res
    .status(200)
    .json({ message: `Successfully registered user with name '${doc.name}'` });
}

export async function login(req: Request, res: Response) {
  const { username, password } = req.body; // TODO: validate schema

  // TODO: replace this with a schema validation library like Zod/Joi/Yup
  if (typeof username !== "string" || typeof password !== "string") {
    return res.status(400).json({ error: "Invalid body parameters" });
  }

  const result = await User.login(username, password);

  if (!result.ok) {
    return res.status(400).json({ error: result.err });
  }

  const authToken = createAuthToken(username);

  res.cookie("authToken", authToken, {
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    httpOnly: true,
    // secure: true, // TODO: set to true if in production env
    sameSite: "none",
  });

  return res.status(200).json({ authenticated: true });
}
//checks for the authorization token in the cookies, the endpoint /auth needs to specifically be called. 
export async function isAuthorized(req: Request, res: Response) {
  const { authToken } = req.cookies;

  if (typeof authToken !== "string") {
    return res.status(401).json({ error: "Not Authorized" });
  }

  const payload = decodeAuthToken(authToken);

  if (!payload) {
    return res.status(401).json({ error: "Not Authorized" });
  }

  const { username } = payload;

  const user = await User.findByUsername(username);

  if (!user) {
    return res.status(401).json({ error: "Not Authorized" });
  }

  return res.status(200).json({ authorized: true });
}
