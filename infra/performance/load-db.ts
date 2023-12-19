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
// docker run -p 81:80 -e 'PGADMIN_DEFAULT_EMAIL=user@domain.com' -e 'PGADMIN_DEFAULT_PASSWORD=SuperSecret' -d --name=pg-admin dpage/pgadmin4

export const pgClient = new Client({
  connectionString: "postgres://isrm:isrm2303%21%40%23@172.20.176.135:5432/db",
});

const userAmount = 1000;
const maxActAmount = 10;

const token: typeof tokens.$inferInsert = {};

const db = drizzle(pgClient);
