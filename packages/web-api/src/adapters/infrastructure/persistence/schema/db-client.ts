import dotenv from "dotenv";
dotenv.config();
import { Client } from "pg";

import { drizzle } from "drizzle-orm/node-postgres";
import {
  DefaultLogger,
  LogWriter as DrizzleLogWriter,
} from "drizzle-orm/logger";
import * as schema from "./tables";

class LogWriter implements DrizzleLogWriter {
  write(message: string) {
    // console.log(message);
  }
}
const logger = new DefaultLogger({ writer: new LogWriter() });

const pgClient = new Client({
  connectionString: `${process.env.DATABASE_URL}`,
});

export const db = drizzle(pgClient, {
  logger,
  schema,
});
