import * as awilix from "awilix";
import { ExpressServer } from "./express-server";
import { HTTPController } from "../interfaces/controllers";
import { Client } from "pg";

const getControllersByResgistrationName = (
  container: awilix.AwilixContainer
) => {
  const result = [];
  for (let registrationName in container.registrations) {
    if (registrationName.includes("Controller")) {
      const res = container.resolve<HTTPController>(registrationName);
      result.push(res);
    }
  }
  return result;
};

export const registerServer = (
  modules: {
    container: awilix.AwilixContainer;
    pgClient: Client;
    basePath: string;
  }[]
) => {
  let controllers: HTTPController<any, any>[] = [];
  let middlewares: any = { auth: undefined, file: undefined };

  modules.forEach(({ container, basePath }) => {
    controllers.push(
      ...getControllersByResgistrationName(container).map((controller) => {
        return {
          middlewares: controller.middlewares,
          method: controller.method,
          execute: controller.execute.bind(controller),
          path: `${basePath}${controller.path}`,
          validationMiddleware: controller.validationMiddleware,
        };
      })
    );

    if (container.hasRegistration("authMiddleware")) {
      const authMiddleware = container.resolve("authMiddleware");
      middlewares.auth = async (req: any, _: any, next: any) => {
        await authMiddleware.execute.bind(authMiddleware)(req, req.headers);
        next();
      };
    }

    if (container.hasRegistration("fileMiddleware")) {
      const fileMiddleware = container.resolve("fileMiddleware");
      middlewares.file = fileMiddleware;
    }
  });

  return new ExpressServer({
    middlewares,
    controllers,
    pgClients: modules.map((v) => v.pgClient),
  });
};
