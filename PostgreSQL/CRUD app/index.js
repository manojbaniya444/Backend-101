const express = require("express");

const { apiRoutes } = require("./routes");

const app = express();

app.use(express.json());

app.use("/api", apiRoutes);

app.get("/", (req, res) => {
  res.status(200).json({ message: "Hello from server." });
});

app.listen(8080, () => {
  console.log(`server running on port 8080`);
});
