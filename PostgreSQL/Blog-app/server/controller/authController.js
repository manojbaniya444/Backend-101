const pool = require("../config/database");

const registerHandler = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const user = await pool.query(`SELECT * FROM blogger WHERE username = $1`, [
      username,
    ]);
    if (user.rows.length > 0) {
      return res
        .status(400)
        .json({ message: "Username already in use use different." });
    }
    await pool.query(
      `INSERT INTO blogger (username, password)
            VALUES ($1, $2)`,
      [username, password]
    );
    res.status(201).json({ message: "user register done." });
  } catch (error) {
    res.status(500).json({ message: "Internal error." });
  }
};

module.exports = { registerHandler };
