import { Router } from "express";
import { db } from "../dataStore";

const router = Router();

router.get("/", (_req, res) => {
  res.json(db.activityEvents);
});

export default router;


