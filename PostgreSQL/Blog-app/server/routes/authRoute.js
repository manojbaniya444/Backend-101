const express = require("express");
const router = express.Router();

const { registerHandler } = require("../controller/authController");

router.post("/register", registerHandler);

module.exports = router;