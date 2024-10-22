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

const createCommentHandler = async (req, res) => {
  const { comment, authorId } = req.body;

  if (!comment || !authorId) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const blogId = req.params.blogId;

  try {
    await pool.query(
      `INSERT INTO comment (content, author, blog_id)
      VALUES ($1, $2, $3)`,
      [comment, authorId, blogId]
    );
    res.status(201).json({ message: "comment post." });
  } catch (error) {
    res.status(500).json({ message: "Internal error." });
  }
};

const getBlogComment = async (req, res) => {
  const { blogId } = req.params;

  try {
    const blogComments = await pool.query(
      `SELECT * FROM comment`
    );
    return res.status(200).json(blogComments.rows);
  } catch (error) {
    res.status(500).json({ message: "error" });
  }
};

const getBlog = async (req, res) => {
  const { blogId } = req.params;

  try {
    const blog = await pool.query("SELECT * FROM blog WHERE id = $1", [blogId]);
    res.status(200).json({ message: "fetch", blog: blog.rows });
  } catch (e) {
    res.status(500).json({ message: "Error", e });
  }
};

module.exports = {
  getUsersHandler,
  createNewBlogHandler,
  getBlogHandler,
  createCommentHandler,
  getBlogComment,
  getBlog
};
