import * as awilix from "awilix";
import dotenv from "dotenv";
import "reflect-metadata";
dotenv.config(); // call this before importing main, because that will use env variables
import { registerServer, registerDependencies, ExpressServer } from "@main";
import { SqsHandler } from "@sqs-handlers";

export const mainContainer = awilix.createContainer();

registerDependencies(mainContainer);
registerServer(mainContainer, "/web-api");

const server = mainContainer.resolve<ExpressServer>("server");

(async () => {
  try {
    await server.start();
  } catch (e) {
    console.error("Server instanciation failed", e);
  }
})();

export const apiGatewayHandler = server.getApiGatewayHandler();

export const sqsHandler =
  mainContainer.resolve<SqsHandler>("sqsHandler").execute;
