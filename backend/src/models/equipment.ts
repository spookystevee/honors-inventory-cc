import { db } from "../db";

//Fetch equipment and associated location info
//This will return an array of all equipment including: id, equipment model, equipment type, room name, and the building type.
//We use LEFT JOIN in order to match the room name and building type to the location id property of the equipment row.
export async function getAllEquipment() {
  const [rows] = await db.query(`
    SELECT
      e.id,
      e.model,
      e.equipment_type,
      l.room_name,
      l.building_type
    FROM equipment e
    LEFT JOIN locations l ON e.location_id = l.id
  `);
  return rows;
}

//Inserts new equipment into database with model, equipment_type and location_id
//This will return the result of the insert.
export async function createEquipment(
  model: string,
  equipment_type: string,
  location_id: number
) {
  const [result] = await db.query(
    "INSERT INTO equipment (model, equipment_type, location_id) VALUES (?, ?, ?)",
    [model, equipment_type, location_id]
  );
  return result;
}

/**Transfers equipment to different room with equipmentID and roomName that we are transferring to
 * First we find the location id of the specified room name
 * Then we update the equipment with the specified equipmentID with the location ID we got.
 */
export async function transferEquipment(equipmentId: number, roomName: string) {
  type LocationRow = { id: number };
  const [row] = await db.query("SELECT id FROM locations WHERE room_name = ?", [
    roomName,
  ]);

  if (!Array.isArray(row) || row.length === 0) throw new Error("Invalid room");

  const locationId = (row as LocationRow[])[0].id;

  await db.query("UPDATE equipment SET location_id = ? WHERE id = ?", [
    locationId,
    equipmentId,
  ]);
}

//Deletes equipment with given Id from database
export async function deleteEquipment(equipmentId: number) {
  await db.query("DELETE FROM equipment WHERE id = ?", [equipmentId]);
}

//Updates equipment with given ID with the new model and equipment_type provided.
export async function updateEquipment(
  equipmentId: number,
  model: string,
  equipment_type: string
) {
  await db.query(
    "UPDATE equipment SET model = ?, equipment_type = ? WHERE id = ?",
    [model, equipment_type, equipmentId]
  );
}
