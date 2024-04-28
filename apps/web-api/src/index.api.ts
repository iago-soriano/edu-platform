import dotenv from "dotenv";
dotenv.config(); // call this before importing main, because that will use env variables
import "express-async-errors";

import * as awilix from "awilix";

import { registerServer, ExpressServer } from "@edu-platform/common/platform";

import { registerDependencies as registerCoreApiDependencies } from "./core/main/api.register-dependencies";
import { registerDependencies as registerCommonCoreApiDependencies } from "./core/main/common.register-dependencies";
import { registerDependencies as registerIAMApiDependencies } from "iam/main/register-dependencies";

import { pgClient as coreModulePgClient } from "./core/adapters/infrastructure/persistence/schema/db-client";
import { pgClient as IAMModulePgClient } from "./iam/adapters/infrastructure/persistence/schema/db-client";

export const mainContainer = awilix.createContainer();

registerCoreApiDependencies(mainContainer);
registerCommonCoreApiDependencies(mainContainer);
registerIAMApiDependencies(mainContainer);

registerServer(mainContainer, [coreModulePgClient, IAMModulePgClient]);

const server = mainContainer.resolve<ExpressServer>("server");

(async () => {
  try {
    await server.start();
  } catch (e) {
    console.error("Server instanciation failed", e);
  }
})();

export const handler = server.getApiGatewayHandler();
