import express, { Request, Response } from "express";
import { createClient } from "redis";

const client = createClient();

const app = express();

app.use(express.json());

app.post("/submit", async (req: Request, res: Response) => {
  const { problemId, userId, code, language } = req.body;
  // TODO: store in db this user data

  try {
    await client.lPush(
      "submissions",
      JSON.stringify({ problemId, userId, code, language })
    );

    res.status(200).json({ message: "your submission received in server." });
  } catch (error) {
    res.status(500).json({ message: "Failed to submit your code." });
  }
});

const startServer = async () => {
  try {
    await client.connect();
    console.log("Connected to redis server.");
    app.listen(8080, () => {
      console.log("server running port: 8080");
    });
  } catch (error) {
    console.error("Failed to connect to redis server.", error);
  }
};

startServer();
