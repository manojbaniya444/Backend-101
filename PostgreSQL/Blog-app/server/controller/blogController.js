const pool = require("../config/database");

const getUsersHandler = async (req, res) => {
  try {
    const users = await pool.query("SELECT * FROM blogger");
    res.status(200).json(users.rows);
  } catch (error) {
    res.status(500).json({ message: "Internal error." });
  }
};

const createNewBlogHandler = async (req, res) => {
  const { title, content, author } = req.body;
  if (!title || !content || !author) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    await pool.query(
      `INSERT INTO blog (title, content, author)
            VALUES ($1, $2, $3)`,
      [title, content, author]
    );
    res.status(201).json({ message: "Blog created successfully." });
  } catch (error) {
    res.status(500).json({ message: "Internal error." });
  }
};

const getBlogHandler = async (req, res) => {
  try {
    const blog = await pool.query("SELECT * FROM blog");
    res.status(200).json(blog.rows);
  } catch (e) {
    res.status(500).json({ message: "Internal error." });
  }
};

module.exports = { getUsersHandler, createNewBlogHandler, getBlogHandler };
