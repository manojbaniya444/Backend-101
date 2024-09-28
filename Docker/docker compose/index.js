const express = require("express");
const Pool = require("pg-pool");

const config = {
  user: "manoj444",
  password: "pgsql",
  host: "db",
  port: 5432,
  database: "mydatabase",
};

const pool = new Pool(config);

const app = express();

app.get("/", (req, res) => {
  res.json({
    message: "Hello from the node docker compose section.",
  });
});

app.get("/connect", (req, res) => {
  pool
    .connect()
    .then(() => {
      console.log("Connected to the database successful.");
    })
    .catch((error) => {
      console.log("Error connecting to the database", error);
    });
  res.send("Connection to the database.");
});

app.listen(8080, () => {
  console.log("Server running on port 8080");
});
