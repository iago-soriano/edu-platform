import { Client } from "pg";
import { drizzle } from "drizzle-orm/node-postgres";
import { DefaultLogger, LogWriter } from "drizzle-orm/logger";

export const getDrizzleClient = (
  connectionString: string,
  schema: Record<string, unknown>,
  writer: LogWriter
) => {
  const pgClient = new Client({
    connectionString,
  });
  const logger = new DefaultLogger({ writer });

  const dbClient = drizzle(pgClient, {
    logger,
    schema,
  });

  return { dbClient, pgClient };
};
