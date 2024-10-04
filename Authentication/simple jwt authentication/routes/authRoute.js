const router = require("express").Router();
const { getUsers, saveUsers } = require("../db");
const jwt = require("jsonwebtoken");
const TOKEN_SECRET = "secret";

router.post("/register", async (req, res) => {
  // get the username and password from the request body
  const { username, password } = req.body;

  // check if the username and password are provided
  if (!username || !password) {
    return res.status(400).send("Username and password are required.");
  }

  // get the users from the database
  const users = await getUsers("./users.json");

  // check if the user already exists
  const userExists = users.find((user) => user.username === username);

  // if the user exists, return an error
  if (userExists) {
    return res.status(400).send("User already exists.");
  }

  // add the new user to the users array
  users.push({ username, password });

  // save the users array to the database
  await saveUsers(users, "./users.json");

  // send the response to the client with the success message
  return res
    .status(201)
    .json({ message: "register user done", user: { username } });
});

router.post("/login", async (req, res) => {
  // get the username and password from user
  const { username, password } = req.body;

  // check if the username and password are provided
  if (!username || !password) {
    return res.status(400).send("Username and password are required.");
  }

  // get the users from the database
  const users = await getUsers("./users.json");

  // check if the user exists
  const user = users.find((user) => user.username === username);

  // if the user does not exist, return an error
  if (!user) {
    return res.status(400).send("User not found.");
  }

  // check if the password is correct
  if (user.password !== password) {
    return res.status(400).send("Invalid password.");
  }

  // generate a token
  const token = jwt.sign({ username }, TOKEN_SECRET);

  // set the cookie with the token
  res.cookie("token", token, {
    httpOnly: true,
    maxAge: 2 * 60 * 60 * 1000,
  });

  // another cookie with the username
  res.cookie("username", username, {
    httpOnly: true,
    maxAge: 2 * 60 * 60 * 1000,
  });

  // send the response to the client with the token
  return res.status(200).json({ message: "Login done", token });
});
module.exports = router;
