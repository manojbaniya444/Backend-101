import express, { Response } from "express"
import dotenv from "dotenv"

import { connectDb, disconnectDb } from "./config/database";
import todoRoute from "./routes/todo.route"

dotenv.config()

connectDb()

const app = express();

app.use(express.json())

app.use("/api/v1/todo", todoRoute)
app.use("/api/v1", (_, res: Response) => {
    res.status(200).json({ message: "message from api" })
})

app.listen(8080, () => {
    console.log("Server is running on localhost:8080")
})