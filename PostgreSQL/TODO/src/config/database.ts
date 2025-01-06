import pg from "pg";
import dotenv from "dotenv";

dotenv.config()

const pool = new pg.Pool({
    host: "0.0.0.0", // db host
    user: "test", // db user
    database: "todo",
    password: "todo12",
    port: 9000,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
    max: 20, // maximum number of clients the pool should contain
})

export const connectDb = async () => {
    try {
        await pool.connect()
        console.log("INFO: Connected to Postgresql")
    } catch (error) {
        console.error("Database connection Error: ", error)
        process.exit(1)
    }
}

export const disconnectDb = async () => {
    console.log("Trying to disconnect")
    try {
        await pool.end()
        console.log("INFO: Disconnected from Postgresql")
    } catch (error) {
        console.error("Error during disconnect: ", error)
    }
}

export const queryDb = async (query: string, values: any[] = []) => {
    try {
        const res = await pool.query(query, values);
        return res
    } catch (error) {
        console.error("Error query: ", error)
        throw error
    }
}