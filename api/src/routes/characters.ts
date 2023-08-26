import { Router } from "express";
import {
  getUserCharacters,
  createCharacter,
  replaceCharacter,
  deleteLoggedInUserCharacter,
} from "../controllers/roster.js";
import authorized from "../middlewares/authorized.js";
import admin from "../middlewares/admin.js";

const router = Router();

router.get("/", authorized, getUserCharacters);
router.post("/", authorized, createCharacter);
router.put("/", authorized, admin, replaceCharacter);
// router.patch("/", authorized, admin, updateCharacter);
router.delete("/", authorized, deleteLoggedInUserCharacter);

export default router;
