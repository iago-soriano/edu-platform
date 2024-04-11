import { drizzle, NodePgDatabase } from "drizzle-orm/node-postgres";
import { Client } from "pg";
import {
  DefaultLogger,
  LogWriter as DrizzleLogWriter,
} from "drizzle-orm/logger";
import * as schema from ".";

class LogWriter implements DrizzleLogWriter {
  write(message: string) {
    // console.log(message);
  }
}

export const pgClient = new Client({
  connectionString: process.env.DATABASE_URL,
});

const logger = new DefaultLogger({ writer: new LogWriter() });
export const db: NodePgDatabase<typeof schema> = drizzle(pgClient, {
  logger,
  schema,
});
