import { rateLimit } from "express-rate-limit";

export const globalRateLimiter = rateLimit({
  max: 300,
  windowMs: 1000 * 60 * 15, // 15 minutes
  standardHeaders: "draft-7",
  legacyHeaders: false,
});
