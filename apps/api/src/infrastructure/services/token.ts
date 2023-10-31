import { ITokenService } from "@interfaces";
import { TokenGenerationError } from "@edu-platform/common/errors";
import jwt, { JwtPayload } from "jsonwebtoken";
import fs from "fs/promises";
import { OAuth2Client } from "google-auth-library";

export class JWTTokenService implements ITokenService {
  token_secret = process.env.TOKEN_SECRET;
  _privateKey: string;
  _publicKey: string;
  client: OAuth2Client;

  constructor() {
    this._privateKey = fs.readFile("./credentials/private.pem").toString();
    this._publicKey = fs.readFile("./credentials/public.pem").toString();
    this.client = new OAuth2Client();
  }

  generate(args: any) {
    try {
      const resp = jwt.sign({ data: args }, this._privateKey, {
        issuer: process.env.HOST_NAME,
        algorithm: "RS256",
      });
      return resp;
    } catch (e) {
      throw new TokenGenerationError({ error: e.message });
    }
  }

  async verify(token: string) {
    const { payload } = jwt.decode(token, { complete: true });
    const issuer = (payload as JwtPayload)?.iss;

    if (!issuer) throw new Error(`JWT issuer not found: ${payload}`);

    if (issuer === process.env.HOST_NAME) {
      try {
        const payload = jwt.verify(token, this._publicKey) as any;
        return payload.data;
      } catch (e) {
        console.error(e.message);
      }
    } else if (
      issuer === "accounts.google.com" ||
      issuer === "https://accounts.google.com"
    ) {
      try {
        const ticket = await this.client.verifyIdToken({
          idToken: token,
          audience: process.env.GOOGLE_CLIENT_ID,
        });

        if (!ticket || !ticket.getPayload() || !ticket.getUserId())
          throw new TokenGenerationError({ error: "Unespecified JWT error" });

        return {
          id: ticket.getUserId(),
          tokenVersion: 0,
        };
      } catch (e) {
        throw new TokenGenerationError({ error: e.message });
      }
    }
  }
}
