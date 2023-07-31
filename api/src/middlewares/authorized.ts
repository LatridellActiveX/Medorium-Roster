import type { NextFunction, Request, Response } from "express";
import User from "../models/user.js";
import { decodeAuthToken } from "../utils/authToken.js";
import { z } from "zod";

async function authorized(req: Request, res: Response, next: NextFunction) {
  const authTokenSchema = z.object({
    authToken1: z.string().min(50).max(100),
    authToken2: z.string().min(50).max(100),
  });
  const validation = authTokenSchema.safeParse(req.cookies);

  if (!validation.success) {
    return res.status(401).json({ error: "Not Authorized" });
  }

  const { authToken1, authToken2 } = validation.data;

  const authToken = authToken1 + authToken2;

  const payload = decodeAuthToken(authToken);

  if (!payload) {
    return res.status(401).json({ error: "Not Authorized" });
  }

  const { username } = payload;

  const user = await User.findByUsername(username);

  if (!user) {
    return res.status(401).json({ error: "Not Authorized" });
  }

  res.locals.username = username
  next();
}

export default authorized;
