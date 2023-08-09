import type { NextFunction, Request, Response } from "express";

/**
 * Ensures that user is an admin.
 * Requires using the authorized middleware before.
 *
 * @example
 * // authorized checks if caller is logged in, admin checks if the user is an admin
 * app.get("/adminRestrictedContent", authorized, admin, getUserCharacters);
 *
 */
function isAdmin(req: Request, res: Response, next: NextFunction) {
  const { admin } = res.locals;
  if (!admin) {
    return res.status(401).json({ error: "Not Authorized" });
  }

  next();
}

export default isAdmin;
