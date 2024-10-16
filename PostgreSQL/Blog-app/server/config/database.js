const Pool = require("pg").Pool;

const pool = new Pool({
  host: "localhost",
  user: "myblog",
  password: "blog12",
  database: "blog",
  port: 9999,
});

try {
  pool.connect();
  console.log("Connected to the database");
  (async () => {
    // await pool.query(
    //   `CREATE TABLE IF NOT EXISTS blog (
    //     id SERIAL PRIMARY KEY,
    //     title VARCHAR(255) NOT NULL,
    //     content TEXT NOT NULL,
    //     author VARCHAR(255) NOT NULL,
    //     created_at TIMESTAMP DEFAULT NOW())`
    // );
    // await pool.query(
    //   `CREATE TABLE IF NOT EXISTS blogger (
    //     id SERIAL PRIMARY KEY,
    //     username VARCHAR(255) UNIQUE NOT NULL,
    //     password VARCHAR(255) NOT NULL)`
    // );
    // await pool.query(
    //   `CREATE TABLE IF NOT EXISTS comment (
    //         id SERIAL PRIMARY KEY,
    //         content TEXT NOT NULL,
    //         author VARCHAR(255) NOT NULL,
    //         created_at TIMESTAMP DEFAULT NOW(),
    //         blog_id INT REFERENCES blog(id) ON DELETE CASCADE)`
    // );
    console.log("Table setup successfully");
  })();
} catch (error) {
  console.error("Error connecting to the database: ", error);
}

module.exports = pool;
