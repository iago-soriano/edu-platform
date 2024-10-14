import dotenv from "dotenv";
dotenv.config(); // call this before importing main, because that will use env variables
import { registerDependencies as registereApiDependencies } from "./main/api.register-dependencies";
import { pgClient as modulePgClient } from "./adapters/infrastructure/persistence/schema/db-client";

import * as awilix from "awilix";

import { SqsHandler } from "./adapters/sqs-entrypoint";

export const mainContainer = awilix.createContainer();
registereApiDependencies(mainContainer);

(async () => {
  try {
    await modulePgClient.connect();
  } catch (e) {
    console.error("Databse connection failed", e);
  }
})();

const sqsHandler = mainContainer.resolve<SqsHandler>("sqsHandler");
export const handler = sqsHandler.execute.bind(sqsHandler);
