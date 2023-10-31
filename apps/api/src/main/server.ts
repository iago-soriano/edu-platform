import http, { Server as HttpServer, RequestListener } from "http";
import { AddressInfo } from "net";
import { ILogger } from "./logger";

export interface IHTTPServerConstructorParams {
  logger: ILogger;
}

export abstract class Server {
  _server: HttpServer;
  _hasHTTPS: boolean;
  _localHostSSL: any;
  _logger: ILogger;

  constructor({ logger }) {
    this._logger = logger;
  }

  setupServer(app: RequestListener) {
    this._server = http.createServer(app);
    this._hasHTTPS = false;
  }

  async start() {
    this._server.listen(parseInt(process.env.PORT || "3000"), () => {
      const { address, port } = this._server.address() as AddressInfo;
      this._logger.info(`App running at ${address}:${port}`);
    });
  }

  stop() {
    this._server.close();
  }
}
