const { Pool } = require("pg");

const config = {
  host: "db",
  port: 5432,
  user: "manoj",
  password: "pgsql12",
  database: "mydatabase",
};

const pool = new Pool(config);

module.exports = pool;
