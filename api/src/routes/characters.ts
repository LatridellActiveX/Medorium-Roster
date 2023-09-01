import { Router } from "express";
import {
  getUserCharacters,
  createCharacter,
  replaceCharacter,
  deleteLoggedInUserCharacter,
} from "../controllers/roster.js";
import authorized from "../middlewares/authorized.js";

const router = Router();

router.get("/", authorized, getUserCharacters);
router.post("/", authorized, createCharacter);
router.put("/", authorized, replaceCharacter);
// router.patch("/", authorized, updateCharacter);
router.delete("/", authorized, deleteLoggedInUserCharacter);

export default router;
