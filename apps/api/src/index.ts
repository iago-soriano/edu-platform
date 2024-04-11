import * as awilix from "awilix";
import dotenv from "dotenv";
import "reflect-metadata";
dotenv.config(); // call this before importing main, because that will use env variables

import { registerServer, registerDependencies } from "@main";

export const mainContainer = awilix.createContainer();

registerDependencies(mainContainer);
registerServer(mainContainer, "/web-api");

const server = mainContainer.resolve("server");

(async () => {
  try {
    await server.start();
  } catch (e) {
    console.error("Server instanciation failed", e);
  }
})();
