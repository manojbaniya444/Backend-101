import express from "express";
import RabbitMQClient from "./rabbitmq/rpc Client/client";
import { sendMessage } from "./produceMessage";

const app = express();

app.use(express.json());

app.post("/operate", async (req, res) => {
  const data = req.body;
  const result = await RabbitMQClient.produce(data);
  // await sendMessage(data);

  res.send(result);
});

app.listen(8000, async () => {
  console.log("Server is running on port 8000");
  RabbitMQClient.initialize();
});
