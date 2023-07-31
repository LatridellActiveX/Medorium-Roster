import { Router } from "express";
import { register, login, isAuthorized } from "../controllers/auth.js";
import authorized from "../middlewares/authorized.js";

const router = Router();

router.post("/auth/register", register);
router.post("/auth/login", login);
router.get("/auth", authorized, isAuthorized);
export default router;
