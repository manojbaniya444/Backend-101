const express = require("express");
const {
  getUsersHandler,
  createNewBlogHandler,
  getBlogHandler,
  createCommentHandler,
  getBlogComment,
  getBlog,
} = require("../controller/blogController");
const router = express.Router();

router.get("/users", getUsersHandler);
router.post("/blog", createNewBlogHandler);
router.get("/blog/:blogId", getBlog)
router.get("/blog", getBlogHandler);
router.post("/comment/:blodId", createCommentHandler);
router.get("/comment/:blogId", getBlogComment);

module.exports = router;
