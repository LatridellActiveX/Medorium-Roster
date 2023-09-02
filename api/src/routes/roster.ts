import { Router } from "express";
import { getAllCharacters } from "../controllers/roster.js";
import authorized from "../middlewares/authorized.js";

const router = Router();

router.get("/", authorized, getAllCharacters);

export default router;
