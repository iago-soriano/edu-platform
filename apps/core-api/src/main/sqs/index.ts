import dotenv from "dotenv";
dotenv.config(); // call this before importing main, because that will use env variables

import * as awilix from "awilix";
import { SqsHandler } from "@sqs-handlers";
import { registerDependencies } from "./register-dependencies";
import { registerCoreDependencies } from "../core-dependencies";

export const mainContainer = awilix.createContainer();

registerCoreDependencies(mainContainer);
registerDependencies(mainContainer);

export const handler = mainContainer.resolve<SqsHandler>("sqsHandler").execute;
