import { ITokenService } from "@interfaces";
import { TokenGenerationError } from "@edu-platform/common/errors";
import jwt from "jsonwebtoken";
import fs from "fs";

export class JWTTokenService implements ITokenService {
  token_secret = process.env.TOKEN_SECRET;
  _privateKey: string;
  _publicKey: string;

  constructor() {
    this._privateKey = fs.readFileSync("./credentials/private.pem").toString();
    this._publicKey = fs.readFileSync("./credentials/public.pem").toString();
  }

  generate(args: any) {
    try {
      const resp = jwt.sign({ data: args }, this._privateKey, {
        issuer: process.env.HOSTNAME,
        algorithm: "RS256",
      });
      return resp;
    } catch (e) {
      throw new TokenGenerationError({ error: e.message });
    }
  }

  verify(token: string) {
    const decoded = jwt.decode(token, { complete: true });

    try {
      const payload = jwt.verify(token, this._publicKey) as any;
      return payload.data;
    } catch (e) {
      console.error(e.message);
    }
  }
}
