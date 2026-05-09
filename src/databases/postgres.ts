import postgres from "postgres";
import { log } from "../utils/logger";
import { env } from "../utils/env";



const sql = postgres({
    host: env.db.host,
    port: env.db.port,
    database: env.db.name,
    user: env.db.user,
    password: env.db.password,
});

async function verifyConnection(): Promise<void> {
    try {
        await sql`SELECT 1`;
        log.info("Connected to PostgreSQL database");
    } catch (error) {
        log.error({ error }, "Error connecting to the database");
    }
}

verifyConnection();

export default sql;