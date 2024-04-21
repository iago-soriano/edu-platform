import dotenv from "dotenv";
dotenv.config(); // call this before importing main, because that will use env variables

import * as awilix from "awilix";
import { SqsHandler } from "sqs-entrypoint";
import { registerDependencies } from "./register-dependencies";
import { registerCoreDependencies } from "../core-dependencies";

export const mainContainer = awilix.createContainer();

registerCoreDependencies(mainContainer);
registerDependencies(mainContainer);

const sqsHandler = mainContainer.resolve<SqsHandler>("sqsHandler");
export const handler = sqsHandler.execute.bind(sqsHandler);
