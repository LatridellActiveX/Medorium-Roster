import { Router } from "express";
import { getAllCharacters } from "../controllers/roster.js";

const router = Router();

router.get("/roster", getAllCharacters);

export default router;
