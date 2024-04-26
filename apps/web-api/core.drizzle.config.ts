import type { Config } from "drizzle-kit";
import * as dotenv from "dotenv";
dotenv.config();

if (!process.env.DATABASE_URL)
  throw new Error("Please provide a 'DATABASE_URL'");

export default {
  schema: "./src/infrastructure/persistence/schema/index.ts",
  out: "./drizzle",
  driver: "pg",
  strict: true,
  verbose: true,
  dbCredentials: {
    connectionString: `${process.env.DATABASE_URL}/core`,
  },
} satisfies Config;
