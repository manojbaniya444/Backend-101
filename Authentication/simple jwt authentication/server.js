const express = require("express");
const protectedRoutes = require("./routes/protectedRoute.js");
const freeRoutes = require("./routes/nonProtectedRoute.js");
const authRoutes = require("./routes/authRoute.js");
const apiRoutes = require("./routes/apiRoute.js");

const app = express();

app.use(express.json());

app.use("/protected", protectedRoutes);
app.use("/free", freeRoutes);
app.use("/auth", authRoutes);
app.use("/api", apiRoutes);

app.listen(8080, () => {
  console.log("Server is running on port 8080");
});
