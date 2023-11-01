import * as awilix from "awilix";
import dotenv from "dotenv";
dotenv.config(); // call this before importing main, because that will use env variables

import { registerServer, registerDependencies } from "@main";

const container = awilix.createContainer();

registerDependencies(container);
registerServer(container, "/web-api");

const server = container.resolve("server");

(async () => {
  try {
    await server.start();
  } catch (e) {
    console.error("Server instanciation failed", e);
  }
})();
