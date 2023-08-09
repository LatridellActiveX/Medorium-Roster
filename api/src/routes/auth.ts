import { Router } from "express";
import {
  register,
  login,
  isAuthorized,
  generateAccessCode,
} from "../controllers/auth.js";
// TODO: put middlewares together in index.js
import authorized from "../middlewares/authorized.js";
import isAdmin from "../middlewares/admin.js";

const router = Router();

router.get("/auth", authorized, isAuthorized);
router.post("/auth/register", register);
router.post("/auth/login", login);
router.get("/auth/accessCode", authorized, isAdmin, generateAccessCode);

export default router;
