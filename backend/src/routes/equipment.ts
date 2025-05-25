import express from "express";
import {
  getAllEquipment,
  createEquipment,
  transferEquipment,
  deleteEquipment,
  updateEquipment,
} from "../models/equipment";

import { db } from "../db";

//Create a new router instance (Express)
const router = express.Router();

//Get all equipment using equipment model and returns equipment array as a json
router.get("/", async (_, res) => {
  const equipment = await getAllEquipment();
  res.json(equipment);
});

//Post equipment creates new equipment
//Location will default to Warehouse. If multiple exist, it will default to the first one.
router.post("/", async (req, res) => {
  const { model, equipment_type } = req.body;

  type warehouseRow = { id: number };

  const [warehouseRows] = await db.query(
    "SELECT id FROM locations WHERE building_type = 'Warehouse' LIMIT 1"
  );

  if (!Array.isArray(warehouseRows) || warehouseRows.length === 0) {
    res.status(400).json({ error: "No warehouse location found" });
    return;
  }

  const warehouseId = (warehouseRows as warehouseRow[])[0].id;

  try {
    const result = await createEquipment(model, equipment_type, warehouseId);
    res.json({ message: "Created", result });
  } catch (err) {
    res.status(500).json({ error: "Failed to create equipment" });
  }
});

//Patch specified equipment id to move equipment to a new room with specified room_name.
router.patch("/:id/transfer", async (req, res) => {
  try {
    await transferEquipment(parseInt(req.params.id), req.body.room_name);
    res.json({ message: "Transfer successful" });
  } catch (err) {
    res.status(400).json({ error: err });
  }
});

//Delete equipment with specified id from database
router.delete("/:id", async (req, res) => {
  const id = parseInt(req.params.id);

  try {
    await deleteEquipment(id);
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Delete failed" });
  }
});

//Put to update equipment with new model and equipment_type
router.put("/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const { model, equipment_type } = req.body;

  try {
    await updateEquipment(id, model, equipment_type);
    res.json({ message: "Updated successfully" });
  } catch (err) {
    res.status(500).json({ error: "Update failed" });
  }
});

export default router;
