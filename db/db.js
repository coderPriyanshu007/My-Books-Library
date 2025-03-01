import pkg from "pg";
import dotenv from "dotenv";

dotenv.config(); // ✅ Load .env file

  const { Pool } = pkg;

  const pool = new Pool({
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
  host: process.env.DB_HOST,
  password: process.env.DB_PASSWORD, // ✅ Reads from .env
  port: process.env.DB_PORT || 5432,
  ssl: process.env.NODE_ENV === "production" ? { rejectUnauthorized: false } : false,
});

export default pool;
