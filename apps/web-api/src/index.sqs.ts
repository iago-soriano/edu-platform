import dotenv from "dotenv";
dotenv.config(); // call this before importing main, because that will use env variables

import * as awilix from "awilix";

import { SqsHandler } from "./core/adapters/sqs-entrypoint";

import { registerDependencies as registerApplicationDependencies } from "./core/main/sqs.register-dependencies";
import { registerDependencies as registerCommonDependencies } from "./core/main/common.register-dependencies";

export const mainContainer = awilix.createContainer();

registerApplicationDependencies(mainContainer);
registerCommonDependencies(mainContainer);

const sqsHandler = mainContainer.resolve<SqsHandler>("sqsHandler");
export const handler = sqsHandler.execute.bind(sqsHandler);
