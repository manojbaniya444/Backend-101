const router = require("express").Router();
const { authenticate } = require("../authMiddleware");

router.get("/", authenticate, (req, res) => {
  res.status(200).send(`Hello from protected route, ${req.user.username}`);
});

module.exports = router;
