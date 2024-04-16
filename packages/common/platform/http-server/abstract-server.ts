import http, { Server as HttpServer, RequestListener } from "http";
import { AddressInfo } from "net";
import { Client } from "pg";

interface ILogger {
  info: (message: string) => void;
  error: (message: string) => void;
}

export abstract class AbstractServer {
  private _server: HttpServer = new HttpServer();
  _logger: ILogger;

  constructor(private _pgClient: Client) {
    this._logger = { info: console.log, error: console.error };
  }

  setupServer(app: RequestListener) {
    this._server = http.createServer(app);
  }

  async start() {
    await this._pgClient.connect();

    this._server.listen(parseInt(process.env.PORT || "3000"), () => {
      const { address, port } = this._server.address() as AddressInfo;
      this._logger.info(`App running at ${address}:${port}`);
    });
  }

  stop() {
    this._server.close();
  }
}
