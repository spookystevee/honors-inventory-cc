//Using axios library to handle HTTP requests to the backend
import axios from "axios";

/**
 * process.env.REACT_APP_BASE_URL should work for getting the URL from the .env file, but for whatever reason it simply returns undefined no matter what
 * I've tried so many different solutions, so if you happen to know why it doesn't work, I would love to know why haha.
 * Hard coding the localhost is probably not the best solution here but I am genuinely lost as to why it refuses to take the .env file.
 */
const baseURL = process.env.REACT_APP_BASE_URL || "http://localhost:5000/api";

if (!baseURL) {
  throw new Error("BASE URL is not defined.");
}

const API = axios.create({ baseURL: baseURL });

//Most of these are pretty self explanatory, either getting the JSON of equipment or locations, patch to modify, post to add, delete to delete, and put to update by replacing.
export const getEquipment = () => API.get("/equipment");

export const getLocations = () => API.get("/locations");

export const transferEquipment = (id: number, room_name: string) =>
  API.patch(`/equipment/${id}/transfer`, { room_name });

export const addEquipment = (model: string, equipment_type: string) =>
  API.post("/equipment", { model, equipment_type });

export const deleteEquipment = (id: number) => API.delete(`/equipment/${id}`);

export const updateEquipment = (
  id: number,
  model: string,
  equipment_type: string
) => API.put(`/equipment/${id}`, { model, equipment_type });
