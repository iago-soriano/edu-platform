import { drizzle } from "drizzle-orm/node-postgres";
import { Client } from "pg";

export const pgClient = new Client({
  connectionString: process.env.DATABASE_URL,
});

export const db = drizzle(pgClient);
