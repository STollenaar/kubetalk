const express = require("express");
const { Pool } = require("pg");

const app = express();
const port = 4000;

// Build the connection string from environment variables
const pool = new Pool({
    host: process.env.DB_HOST || "localhost",
    port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 5432,
    user: "postgres",
    password: process.env.POSTGRES_PASSWORD,
    database: "postgres",
});

app.get("/api/hello", async (req, res) => {
    try {
        const result = await pool.query("SELECT NOW()");
        res.json({ message: "Hello from backend!", time: result.rows[0].now });
    } catch (err) {
        res.status(500).json({ error: "Database error", details: err.message });
    }
});

app.listen(port, () => {
    console.log(`Backend running on port ${port}`);
});