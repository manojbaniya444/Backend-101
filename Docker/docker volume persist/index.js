const express = require("express");
const { Pool } = require("pg");

const config = {
  host: "0.0.0.0",
  port: 5432,
  user: "test",
  password: "test",
  database: "test",
};

const pool = new Pool(config);

const app = express();

app.use(express.json());

// Create Table
app.get("/create-table", async (req, res) => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL  
      );
    `);
    res.send("Table created");
  } catch (error) {
    console.error("Error creating table:", error);
    res.status(500).send("Failed to create table");
  }
});

// Add User
app.post("/add-user", async (req, res) => {
  const { name, email } = req.body;
  try {
    await pool.query(`INSERT INTO users (name, email) VALUES ($1, $2)`, [
      name,
      email,
    ]);
    res.send("User added");
  } catch (error) {
    console.error("Error adding user:", error);
    res.status(500).send("Failed to add user");
  }
});

// Get Users
app.get("/get-users", async (req, res) => {
  try {
    const result = await pool.query(`SELECT * FROM users`);
    res.send(result.rows);
  } catch (error) {
    console.error("Error getting users:", error);
    res.status(500).send("Failed to get users");
  }
});

// Delete User
app.post("/delete-user", async (req, res) => {
  const { id } = req.body;
  try {
    await pool.query(`DELETE FROM users WHERE id = $1`, [id]);
    res.send("User deleted");
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).send("Failed to delete user");
  }
});

// Update User
app.post("/update-user", async (req, res) => {
  const { id, name, email } = req.body;
  try {
    await pool.query(`UPDATE users SET name = $1, email = $2 WHERE id = $3`, [
      name,
      email,
      id,
    ]);
    res.send("User updated");
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).send("Failed to update user");
  }
});

// Test Route
app.get("/", (req, res) => {
  res.send("Server is working.");
});

// Start Server
app.listen(8080, () => {
  console.log("Server running on port 8080");
});
