import type { Config } from "drizzle-kit";
import * as dotenv from "dotenv";
dotenv.config({
  path: process.env.NODE_ENV === "production" ? "./.env.prod" : "./.env.local",
});

if (!process.env.DATABASE_URL)
  throw new Error("Please provide a 'DATABASE_URL'");

export default {
  schema: "./src/adapters/infrastructure/persistence/schema/index.ts",
  out: "./drizzle",
  driver: "pg",
  strict: true,
  verbose: true,
  dbCredentials: {
    connectionString: `${process.env.DATABASE_URL}`,
  },
} satisfies Config;
