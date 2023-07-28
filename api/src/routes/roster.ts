import { Router } from "express";
import { getMembersData } from "../controllers/roster.js";

const router = Router();

router.get("/roster", getMembersData);

export default router;
