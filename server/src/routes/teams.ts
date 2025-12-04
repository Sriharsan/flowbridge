import { Router } from "express";
import { db } from "../dataStore";

const router = Router();

router.get("/", (req, res) => {
  res.json({
    teams: db.teams,
    users: db.users
  });
});

export default router;


