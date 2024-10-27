import express, { Request, Response } from "express";

const app = express();
const PORT = 8080;

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    message: "hello",
  });
});

app.listen(PORT, () => {
  console.log("server is runnin on PORT: 8080");
});
