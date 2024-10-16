const express = require("express");
const app = express();
const pool = require("./config/database");

const PORT = 8080;

app.use(express.json());
app.use("/api", require("./routes/blogRoute"));
app.use("/auth", require("./routes/authRoute"));

app.listen(PORT, () => {
  console.log("server running on localhost port 8080");
});
