import { Client } from "pg";
import { drizzle } from "drizzle-orm/node-postgres";
import {
  activities,
  tokens,
  users,
  activityVersions,
  activityContents,
  activityQuestions,
  activityVersionHasElementsRelationTable,
} from "../../apps/api/src/infrastructure";

import { TokenInsertDTO } from "../../apps/api/src/interfaces";

// docker run --name=test-psql -p 5433:5432 -e POSTGRES_PASSWORD='admin-test' -e POSTGRES_USER='admin-test' -e POSTGRES_DB=test -v ~/edu-platform/test-psql-data/:/var/lib/postgresql/data postgres
// docker container start test-psql

export const pgClient = new Client({
  connectionString: "postgres://admin-test:admin-test@172.20.176.135:5433/test",
});

const userAmount = 1000;
const maxActAmount = 10;

const token: typeof tokens.$inferInsert = {};

const db = drizzle(pgClient);
await pgClient.connect();
