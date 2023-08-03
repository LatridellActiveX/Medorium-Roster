import { Router } from "express";
import { getUserCharacters } from "../controllers/roster.js";

const router = Router();

router.get("/characters", getUserCharacters);

export default router;
