const e = require("express");
const pool = require("../db/dbConfiguration");

const router = require("express").Router();

router.get("/", async (req, res) => {
  try {
    const data = await pool.query("SELECT * FROM schools;");
    return res.status(200).send({ data });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ error });
  }
});

router.post("/", async (req, res) => {
  const { name, location } = req.body;

  try {
    await pool.query("INSERT INTO schools (name, address) VALUES ($1, $2);", [
      name,
      location,
    ]);
    return res
      .status(200)
      .send({ message: "successfully added to the database." });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ error });
  }
});

router.get("/setup", async (req, res) => {
  try {
    await pool.query(
      "CREATE TABLE schools (id SERIAL PRIMARY KEY, name VARCHAR(100), address VARCHAR(100));"
    );
    return res.status(200).send({ message: "Successfully created table" });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ error });
  }
});

module.exports = router;
