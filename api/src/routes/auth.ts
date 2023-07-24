import { Router } from "express";
import { register, login } from "../controllers/user.js";

const router = Router();

router.post("/auth/register/:accessCode", register);
router.post("/auth/login", login);

export default router;
