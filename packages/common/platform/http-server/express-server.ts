import express, { Express, RequestHandler } from "express";
import serverless from "serverless-http";
import { CustomError } from "../../errors";
import { HTTPController } from "../interfaces/controllers";
import helmet from "helmet";
import cors from "cors";
import { json } from "body-parser";
import { AbstractServer } from "./abstract-server";
import { Client } from "pg";
import { ErrorMiddleware } from "./middleware";
import { keycloak } from "./keycloak";

interface IExpressConstructorParams {
  controllers: HTTPController[];
  middlewares: { [key: string]: RequestHandler };
  pgClients: Client[];
}

class RouteNotFoundError extends CustomError {
  HTTPstatusCode = 404;
  static message = "Rota não encontrada";
  constructor() {
    super(RouteNotFoundError.message);
  }
}

export class ExpressServer extends AbstractServer {
  _app: Express;

  constructor({
    controllers,
    middlewares,
    pgClients,
  }: IExpressConstructorParams) {
    super(pgClients);
    this._app = express();
    this.setupServer(this._app);

    // CORS
    const allowlist = process.env.CORS_ALLOW?.split(" ");
    const corsOptionsDelegate = function (req: any, callback: any) {
      let corsOptions;
      if (process.env.CORS_ALLOW === "*") {
        callback(null, { origin: true });
        return;
      }
      if (allowlist?.indexOf(req.header("Origin")) !== -1) {
        corsOptions = { origin: true }; // reflect (enable) the requested origin in the CORS response
      } else {
        corsOptions = { origin: false }; // disable CORS for this request
      }
      callback(null, corsOptions); // callback expects two parameters: error and options
    };
    this._app.use(cors(corsOptionsDelegate));

    //Middleware
    this._app.use(json());

    // Security
    this._app.use(helmet());
    this._app.disable("x-powered-by");

    controllers.forEach((descriptor) => {
      const pipeline: RequestHandler[] = [];

      if (descriptor.validationMiddleware)
        pipeline.push(descriptor.validationMiddleware);

      if (descriptor.middlewares)
        pipeline.push(
          ...descriptor.middlewares.map((middleware) => middlewares[middleware])
        );

      this._app[descriptor.method!](
        `/web-api/${descriptor.path!}`,
        ...pipeline,
        descriptor.execute
      );
    });

    // healthcheck
    this._app.get("/", (_, res) => {
      res.sendStatus(200);
    });

    this._app.get("/env", (_, res) => {
      res.send(process.env.NODE_ENV);
    });

    this._app.all("*", () => {
      throw new RouteNotFoundError();
    });

    this._app.use(ErrorMiddleware);
  }

  getApiGatewayHandler() {
    return serverless(this._app);
  }
}
