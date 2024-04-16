import * as awilix from "awilix";
import { ExpressServer } from "./express-server";
import { HTTPController } from "../interfaces/controllers";
import {
  AuthenticationMiddlewareController,
  ErrorHandlerController,
  AcceptFileMiddleware,
} from "./middleware";
import { Client } from "pg";

const getControllers = (container: awilix.AwilixContainer) => {
  const controllers = [];
  for (let registrationName in container.registrations) {
    if (registrationName.includes("Controller")) {
      const controller = container.resolve(registrationName);
      controllers.push(controller);
    }
  }
  return controllers;
};

export const registerServer = (
  container: awilix.AwilixContainer,
  baseUrn: string,
  _pgClient: Client
) => {
  container.register({
    authMiddleware: awilix
      .asClass(AuthenticationMiddlewareController)
      .classic(),
    fileMiddleware: awilix.asValue(AcceptFileMiddleware), // objeto do multer
    errorHandler: awilix.asClass(ErrorHandlerController),
    server: awilix
      .asClass(ExpressServer)
      .singleton()
      .inject((container: awilix.AwilixContainer) => {
        const authMiddleware = container.resolve("authMiddleware");
        const fileMiddleware = container.resolve("fileMiddleware");
        return {
          _pgClient,
          controllers: getControllers(container).map((controller) => {
            return {
              middlewares: controller.middlewares,
              method: controller.method,
              execute: controller.execute.bind(controller),
              path: controller.path,
            } as HTTPController;
          }),
          middlewares: {
            auth: async (req: any, _: any, next: any) => {
              await authMiddleware.execute.bind(authMiddleware)(
                req,
                req.headers
              );
              next();
            },
            file: fileMiddleware,
          },
          errorHandler: {
            execute: (error: Error, _: any, res: any, __: any) =>
              container.resolve("errorHandler").execute(error, _, res),
          },
          baseUrn,
        };
      }),
  });
};
