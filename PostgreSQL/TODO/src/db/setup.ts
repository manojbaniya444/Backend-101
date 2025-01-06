import dotenv from "dotenv";
import pg from "pg";

dotenv.config()

async function setupDb() {
    const client = new pg.Client({
        host: process.env.HOST,
        database: process.env.DATABASE,
        user: process.env.USER,
        password: process.env.PASSWORD,
        port: Number(process.env.DB_PORT)
    })

    try {
        await client.connect();
        const tableQuery = `CREATE TABLE IF NOT EXISTS todos (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description TEXT,
        is_completed BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP  WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
        )`
        const indexQuery = `CREATE INDEX idx_todos_is_completed ON todos(is_completed);`

        await client.query(tableQuery)
        await client.query(indexQuery)
        console.log("database setup applied successful")
    } catch (error) {
        console.log("Error during migration", error)
    } finally {
        await client.end()
    }
}

setupDb()