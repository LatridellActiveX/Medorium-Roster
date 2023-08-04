import { Router } from "express";
import { getUserCharacters, createCharacter } from "../controllers/roster.js";
import authorized from "../middlewares/authorized.js";

const router = Router();

router.get("/characters", getUserCharacters);
router.post("/characters", authorized, createCharacter);

export default router;
