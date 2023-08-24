import { Router } from "express";
import {
  register,
  login,
  isAuthorized,
  generateAccessCode,
  verifyAccessCode,
} from "../controllers/auth.js";
import authorized from "../middlewares/authorized.js";
import admin from "../middlewares/admin.js";

const router = Router();

router.get("/", authorized, isAuthorized);
router.post("/register", register);
router.post("/login", login);
router.get("/accessCode", authorized, admin, generateAccessCode);
router.get("/accessCode/verify/:accessCode", verifyAccessCode);

export default router;
