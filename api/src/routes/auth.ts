import { Router } from "express";
import { register, login, isAuthorized } from "../controllers/auth.js";

const router = Router();

router.post("/auth/register", register);
router.post("/auth/login", login);
router.get("/auth", isAuthorized);

export default router;
