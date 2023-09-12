import type { NextFunction, Request, Response } from "express";
import User from "../models/user.js";
import { decodeAuthToken } from "../utils/authToken.js";
import { z } from "zod";
import { ResponseErrorMessage } from "../../types.js";

async function authorized(req: Request, res: Response, next: NextFunction) {
  const authTokenSchema = z.object({
    authToken1: z.string().min(50).max(100),
    authToken2: z.string().min(50).max(100),
  });
  
  const validation = authTokenSchema.safeParse(req.cookies);

  if (!validation.success) {
    return res.status(401).json({ error: "Not Authorized" } as ResponseErrorMessage);
  }

  const { authToken1, authToken2 } = validation.data;

  const authToken = authToken1 + authToken2;

  const payload = decodeAuthToken(authToken);

  if (!payload) {
    // token is not valid
    return res.status(401).json({ error: "Not Authorized" } as ResponseErrorMessage);
  }

  const { username, isAdmin } = payload;

  const user = await User.findByUsername(username);

  if (!user) {
    // user account with this username does not exists
    return res.status(401).json({ error: "Not Authorized" } as ResponseErrorMessage);
  }

  res.locals.username = username;
  res.locals.isAdmin = isAdmin;

  next();
}

export default authorized;
