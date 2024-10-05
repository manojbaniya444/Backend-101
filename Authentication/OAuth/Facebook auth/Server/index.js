const express = require("express");
const cors = require("cors");
const cookieSession = require("cookie-session");
const authRoute = require("./route/authRoute.js");
const passportSetup = require("./passport.js");

app.use(
  cookieSession({
    name: "session",
    keys: ["secret"],
    maxAge: 24 * 60 * 60 * 1000,
  })
);
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: "GET, POST, PUT, DELETE",
    credential: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(express.json());
app.use("/auth", authRoute);

const app = express();
app.get("/test", (req, res) => {
  res.status(200).json({ message: "server is running" });
});

app.listen(8080, () => {
  console.log("server is running on port 8008");
});
