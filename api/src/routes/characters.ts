import { Router } from "express";
import {
  getUserCharacters,
  createCharacter,
  replaceCharacter,
  deleteUserCharacter,
} from "../controllers/roster.js";
import authorized from "../middlewares/authorized.js";
import admin from "../middlewares/admin.js";

const router = Router();

router.get("/characters", authorized, getUserCharacters);
router.post("/characters", authorized, createCharacter);
router.put("/characters", authorized, admin, replaceCharacter);
// router.patch("/characters", authorized, admin, updateCharacter);
router.delete("/characters", authorized, deleteUserCharacter);

export default router;
