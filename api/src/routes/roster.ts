import { Router } from "express";
import { getFullRoster } from "../controllers/roster.js";

const router = Router();

router.get("/roster", getFullRoster);

export default router;
