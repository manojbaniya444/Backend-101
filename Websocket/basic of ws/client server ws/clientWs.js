import WebSocket from "ws";
import readline from "node:readline";

// new connection
const ws = new WebSocket("ws://localhost:8080");

// handle error
ws.on("error", console.error);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// creating a new username
const username = process.argv[2] ? process.argv[2] : "unknown";

ws.on("open", () => {
  // creating a new username
  const username = process.argv[2] ? process.argv[2] : "unknown";
  // sending the initial user
  const userData = {
    username,
    msg: "New user send",
    type: "newUser",
  };
  ws.send(JSON.stringify(userData));
});

ws.on("message", (data) => {
  const { msg: message, sender } = JSON.parse(data.toString());

  console.log(`Message from ${sender} :: ${message}`);
});

// send the user message to the server for broadcasting
rl.on("line", (data) => {
  const userData = {
    username,
    msg: data,
    type: "message",
  };

  ws.send(JSON.stringify(userData));
});
