import dotenv from "dotenv";
dotenv.config(); // call this before importing main, because that will use env variables

import * as awilix from "awilix";
import { registerServer, ExpressServer } from "@edu-platform/common/platform";
import { registerDependencies } from "./register-dependencies";
import { pgClient } from "../infrastructure/persistence/schema";

export const mainContainer = awilix.createContainer();

registerDependencies(mainContainer);

registerServer(mainContainer, "/web-api/iam", pgClient);

const server = mainContainer.resolve<ExpressServer>("server");

(async () => {
  try {
    await server.start();
  } catch (e) {
    console.error("Server instanciation failed", e);
  }
})();

export const handler = server.getApiGatewayHandler();
