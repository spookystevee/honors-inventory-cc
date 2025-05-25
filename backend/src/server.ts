import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import equipmentRoutes from "./routes/equipment";
import locationRoutes from "./routes/locations";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

//Use imported routes to attach them to /api/*
app.use("/api/equipment", equipmentRoutes);
app.use("/api/locations", locationRoutes);

//Port the server will run on, will default to 5000 if not provided in environment variables
const PORT = process.env.PORT || 5000;
//Starts the server, and sends a log to confirm that the server has started
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
