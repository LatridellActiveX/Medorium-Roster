import type { Request, Response, NextFunction } from "express";
import User from "../models/user.js";
import { decodeAuthToken } from "../utils/authToken.js";

export async function isAuthorized(req: Request, res: Response, next: NextFunction) {
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
  
    next();
    
  }