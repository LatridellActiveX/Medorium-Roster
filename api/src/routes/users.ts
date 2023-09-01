import { Router } from "express";
import {
  adminDeleteUserCharacter,
  replaceCharacter,
} from "../controllers/roster.js";
import authorized from "../middlewares/authorized.js";
import admin from "../middlewares/admin.js";

const router = Router();

router.put(
  "/:username/characters/:character",
  authorized,
  admin,
  replaceCharacter
);

router.delete(
  "/:username/characters/:character",
  authorized,
  admin,
  adminDeleteUserCharacter
);

export default router;
