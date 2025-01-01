import { WebSocketServer } from "ws";

const wss = new WebSocketServer({ port: 8080 });
const users = [];

wss.on("connection", (sc) => {
  console.log("New connection");
  // receive particular message from the user
  sc.on("message", (data) => {
    // after getting the message from the user store in the users database to track the users
    const { username, msg, type } = JSON.parse(data.toString("utf-8"));
    switch (type) {
      // if it is about new user join
      case "newUser":
        console.log("___________NEW____________________________");
        console.log(data.toString("utf-8"));
        users.push({
          username,
          sc,
        });
        // new user
        console.log(`New user ${username} added.`);
        break;
      // if it is user message
      case "message":
        console.log(`Message from ${username} :: ${msg}`);

        const messageBroadcastData = {
          msg,
          sender: username,
        };
        // broadcast the message to all the users
        users.forEach((user) => {
          if (user.sc === sc) {
            return;
          }
          user.sc.send(JSON.stringify(messageBroadcastData));
        });
      default:
        break;
    }
  });
  // handle user disconnetion
  sc.on("close", (code) => {
    const disconnectedUser = users.find((u) => u.sc === sc);
    if (!disconnectedUser) return;
    const disconnectedUserIndex = users.findIndex(
      (user) => user.username === disconnectedUser.username
    );
    disconnectedUserIndex !== -1 && users.splice(disconnectedUserIndex, 1);
    // INFO about user disconnect
    console.log(
      `${disconnectedUser.username} disconnected and new users size is ${users.length}`
    );
    // broadcast the message
    users.forEach((user) =>
      user.sc.send(
        JSON.stringify({
          sender: "Server",
          msg: `${disconnectedUser.username} has disconnected`,
        })
      )
    );
  });
});
