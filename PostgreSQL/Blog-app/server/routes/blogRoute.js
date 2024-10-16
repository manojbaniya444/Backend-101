const express = require("express");
const {
  getUsersHandler,
  createNewBlogHandler,
  getBlogHandler,
} = require("../controller/blogController");
const router = express.Router();

router.get("/users", getUsersHandler);
router.post("/blog", createNewBlogHandler);
router.get("/blog", getBlogHandler);

module.exports = router;
