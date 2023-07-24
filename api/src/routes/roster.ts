import { Router } from "express";
import { pullFullRoster } from "../models/roster.js";

const router = Router();

router.get("/roster", (req, res) => {
  const roster = pullFullRoster();
  res.status(200).send(roster);
});

export default router;
