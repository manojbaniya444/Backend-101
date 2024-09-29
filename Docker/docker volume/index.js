const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Hello from the server.",
  });
});

app.listen(9000, () => {
  console.log("Server is running on port 9000");
});
