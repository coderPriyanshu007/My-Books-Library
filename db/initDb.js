import pool from "./db.js";

const createTables = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS books (
      id SERIAL PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      author VARCHAR(255) NOT NULL,
      isbn VARCHAR(20) UNIQUE NOT NULL,
      intro TEXT,
      notes TEXT,
      rating INTEGER CHECK (rating >= 1 AND rating <= 5),
      date DATE NOT NULL
    );
  `;

  try {
    await pool.query(query);
    console.log("✅ Tables created successfully!");
  } catch (err) {
    console.error("❌ Error creating tables:", err);
  } finally {
    pool.end(); // Close the connection
  }
};

// Run the function
createTables();
