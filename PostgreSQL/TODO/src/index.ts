import { connectDb, disconnectDb } from "./config/database";
import express from "express"
import dotenv from "dotenv"

dotenv.config()

connectDb()

const app = express();

app.listen(8080, () => {
    console.log("Server is running on localhost:8080")
})