const router = require("express").Router();

router.get("/", (req, res) => {
  res.send("Hello from free route.");
});

module.exports = router;
