import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

//Sets up database connection using .env file, provided it is setup corectly.
export const db = mysql.createPool({
  host: process.env.DB_HOST, //Database host
  user: process.env.DB_USER, //Database Username
  password: process.env.DB_PASSWORD, //Database Password
  database: process.env.DB_NAME, //Database name (i.e. honors_inventory)
});
