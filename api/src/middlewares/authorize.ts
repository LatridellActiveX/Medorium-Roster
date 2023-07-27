import type { NextFunction, Request, Response } from "express";
import User from "../models/user.js";
import { decodeAuthToken } from "../utils/authToken.js";
import { z } from "zod"

async function authorized(req: Request, res: Response, next: NextFunction) {

    const authTokenSchema = z.string().min(100).max(200);
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
  
    next();
  }

 export default authorized;