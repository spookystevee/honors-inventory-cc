import express from "express";
import { db } from "../db";

const router = express.Router();

//Get room names from locations, returning a list of all room names from locations table
router.get("/", async (_, res) => {
  try {
    const [rows] = await db.query("SELECT room_name FROM locations");
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch locations" });
  }
});

export default router;
