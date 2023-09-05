import * as awilix from "awilix";
import {
  ExpressServer
} from "./app";
import { 
  AuthenticationMiddlewareController,
  ErrorHandlerController
} from "@presentation/controllers";

const getControllers = (container: awilix.AwilixContainer) => {
  const controllers = [];
  for (let registrationName in container.registrations) {
    if (registrationName.includes("Controller")) {
      controllers.push(container.resolve(registrationName));
    }
  }
  return controllers;
};

export const registerServer = (
  container: awilix.AwilixContainer,
  baseUrn: string,
) => {
  container.register({
    authMiddleware: awilix.asClass(AuthenticationMiddlewareController),
    errorHandler: awilix.asClass(ErrorHandlerController),
    server: awilix
      .asClass(ExpressServer)
      .singleton()
      .inject((container: awilix.AwilixContainer) => {
        return {
          controllers: getControllers(container).map(
            (controller) => {
              return {
                middlewares: controller.middlewares,
                method: controller.method,
                controller: controller.execute,
                path: controller.path,
              };
            }
          ),
          logger: { info: console.log, error: console.error },
          middlewares: {
            auth: (req, _) => container.resolve("authMiddleware").execute(req, req.headers),
            // file: container.resolve("fileMiddleware"),
          },
          errorHandler: {
            controller: (error: Error, _, res, __) => container.resolve("errorHandler").execute(error, res)
          },
          baseUrn,
        };
      }),
  });
};
