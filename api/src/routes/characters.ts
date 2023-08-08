import { Router } from "express";
import { getUserCharacters, createCharacter, deleteUserCharacters } from "../controllers/roster.js";
import authorized from "../middlewares/authorized.js";

const router = Router();

router.get("/characters", authorized, getUserCharacters);
router.delete("/characters", authorized, deleteUserCharacters);
router.post("/characters", authorized, createCharacter);

export default router;
