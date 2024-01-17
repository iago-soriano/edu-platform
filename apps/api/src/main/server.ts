import http, { Server as HttpServer, RequestListener } from "http";
import { AddressInfo } from "net";
import { ILogger } from "./logger";
import { pgClient } from "@infrastructure";

export interface IHTTPServerConstructorParams {
  logger: ILogger;
}

export abstract class Server {
  private _server: HttpServer = new HttpServer();
  _logger: ILogger;

  constructor() {
    this._logger = { info: console.log, error: console.error };
  }

  setupServer(app: RequestListener) {
    this._server = http.createServer(app);
  }

  async start() {
    await pgClient.connect();

    this._server.listen(parseInt(process.env.PORT || "3000"), () => {
      const { address, port } = this._server.address() as AddressInfo;
      this._logger.info(`App running at ${address}:${port}`);
    });
  }

  stop() {
    this._server.close();
  }
}
