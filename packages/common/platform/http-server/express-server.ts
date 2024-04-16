import express, { Express, RequestHandler } from "express";
import serverless from "serverless-http";
import "express-async-errors";
import { RouteNotFoundError } from "@edu-platform/common/errors";
import { HTTPController, HTTPErrorController } from "../interfaces/controllers";
import helmet from "helmet";
import cors from "cors";
import { json } from "body-parser";
import { AbstractServer } from "./abstract-server";
import { Client } from "pg";

interface IExpressConstructorParams {
  controllers: HTTPController[];
  errorHandler: HTTPErrorController;
  middlewares: { [key: string]: RequestHandler };
  baseUrn: string;
  _pgClient: Client;
}

export class ExpressServer extends AbstractServer {
  _app: Express;
  baseUrn: string;

  constructor({
    controllers,
    errorHandler,
    middlewares,
    baseUrn,
    _pgClient,
  }: IExpressConstructorParams) {
    super(_pgClient);
    this._app = express();
    this.setupServer(this._app);
    this.baseUrn = baseUrn;

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

    const getPath = (path: string) => `${this.baseUrn}/${path}`;

    controllers.forEach((descriptor) => {
      if (descriptor.middlewares) {
        this._app[descriptor.method!](
          getPath(descriptor.path!),
          ...descriptor.middlewares.map(
            (middleware) => middlewares[middleware]
          ),
          descriptor.execute
        );
      } else {
        this._app[descriptor.method!](
          getPath(descriptor.path!),
          descriptor.execute
        );
      }
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

    this._app.use(errorHandler.execute);
  }

  getApiGatewayHandler() {
    return serverless(this._app);
  }
}
