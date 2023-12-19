import type { Config } from "drizzle-kit";

export default {
  schema: "../../apps/api/src/infrastructure/repositories/schema.ts",
  out: "./drizzle",
  driver: "pg",
  dbCredentials: {
    connectionString:
      "postgres://admin-test:admin-test@172.20.176.135:5433/test",
  },
} satisfies Config;
