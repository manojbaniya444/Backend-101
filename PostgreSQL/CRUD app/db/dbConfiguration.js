const { Pool } = require("pg");

const config = {
  host: "db",
  port: 5432,
  user: "manoj444",
  password: "pgsql",
  database: "mydatabase",
};

const pool = new Pool(config);

module.exports = pool;
