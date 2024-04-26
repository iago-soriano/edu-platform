import dotenv from "dotenv";
dotenv.config();

import { getDrizzleClient } from "@edu-platform/common/platform/database/drizzle-client";
import { NodePgDatabase } from "drizzle-orm/node-postgres";
import { LogWriter as DrizzleLogWriter } from "drizzle-orm/logger";
import * as schema from ".";

class LogWriter implements DrizzleLogWriter {
  write(message: string) {
    // console.log(message);
  }
}
const { dbClient, pgClient } = getDrizzleClient(
  `${process.env.DATABASE_URL}/core`!,
  schema,
  new LogWriter()
);

const db = dbClient as NodePgDatabase<typeof schema>;

export { db, pgClient };
