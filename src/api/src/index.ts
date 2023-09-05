import * as awilix from "awilix";
import dotenv from "dotenv";
import { registerServer, registerDependencies } from "@main";

dotenv.config();

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
