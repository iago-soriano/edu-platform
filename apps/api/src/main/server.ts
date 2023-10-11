import http, { Server as HttpServer, RequestListener } from "http";
import https, { Server as HttpsServer } from "https";
import fs from "fs";
import { AddressInfo } from "net";
import { ILogger } from "./logger";

export interface IHTTPServerConstructorParams {
  logger: ILogger;
}

export abstract class Server {
  _server: HttpServer | HttpsServer;
  _hasHTTPS: boolean;
  _localHostSSL: any;
  _logger: ILogger;

  constructor({ logger }) {
    this._logger = logger;
  }

  setupServer(app: RequestListener) {
    // try {
    //   this._localHostSSL = {
    //     key: fs.readFileSync("./certificates/key.pem"),
    //     cert: fs.readFileSync("./certificates/cert.pem"),
    //   };
    //   this._server = https.createServer(this._localHostSSL, app);
    //   this._hasHTTPS = true;
    //   this._logger.info("Successfully created HTTPS server");
    // } catch {
      this._server = http.createServer(app);
      // this._logger.error("Failed to create HTTPS server");
      this._hasHTTPS = false;
    // }
  }

  async start() {
    const alternativePort = this._hasHTTPS ? "443" : "3000";
    this._server.listen(parseInt(process.env.PORT || alternativePort), () => {
      const { address, port } = this._server.address() as AddressInfo;
      this._logger.info(`App running at ${address}:${port}`);
    });
  }

  stop() {
    this._server.close();
  }
}

