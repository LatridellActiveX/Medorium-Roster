import { Router } from "express";
import {
  getUserCharacters,
  createCharacter,
  deleteLoggedInUserCharacter,
  replaceLoggedInUserCharacter,
} from "../controllers/roster.js";
import authorized from "../middlewares/authorized.js";

const router = Router();

router.get("/", authorized, getUserCharacters);
router.post("/", authorized, createCharacter);
router.put("/:name", authorized, replaceLoggedInUserCharacter);
// router.patch("/", authorized, updateLoggedInUserCharacter);
router.delete("/:name", authorized, deleteLoggedInUserCharacter);

export default router;
