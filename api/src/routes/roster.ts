import { Router } from "express";
import { getAllCharacters } from "../controllers/roster.js";

const router = Router();

router.get("/", getAllCharacters);

export default router;
