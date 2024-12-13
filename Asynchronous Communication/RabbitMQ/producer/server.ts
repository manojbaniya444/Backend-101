import express, { NextFunction, Request, Response } from "express";
import Producer from "./producer";

const app = express();
// creating a producer instance
const producer = new Producer();

app.use(express.json());

// send the log to the RabbitMQ
app.post(
  "/send-log",
  async (req: Request, res: Response, next: NextFunction) => {
    const logType = req.body.logType;
    const message = req.body.message;

    await producer.publishMessage(logType, message);
    res.send("Message sent to RabbitMQ");
  }
);

// check the server
app.get("/", (req: Request, res: Response) => {
  res.send("Hello World");
});

app.listen(8000, () => {
  console.log("Server is running on port 8000");
});
