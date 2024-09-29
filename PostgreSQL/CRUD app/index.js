const express = require("express");
const pool = require("./db/dbConfiguration");

const { apiRoutes } = require("./routes");

const app = express();

app.use(express.json());

app.use("/api", apiRoutes);

app.listen(8080, () => {
  console.log(`server running on port 8080`);
});
