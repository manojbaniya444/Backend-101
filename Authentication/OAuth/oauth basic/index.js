const express = require("express");
const passport = require("passport");

const app = express();

// route to authenticate with facebook account
app.get("/auth/facebook", passport.authenticate("facebook"));

// facebook oauth callback route
app.get(
  "/auth/facebook/callback",
  // where to go if the authentication fail.
  passport.authenticate("facebook", { failureRedirect: "/login" }),
  (req, res) => {
    // redirect to the protected page
    console.log("User authenticated");
  }
);

app.get("/", (req, res) => {
  res.status(200).send("Hello World");
});

app.listen(8080, () => {
  console.log("server running port 8080");
});
