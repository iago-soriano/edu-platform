import { ITokenService, JWTPayload } from "@interfaces";
import {
  TokenGenerationError,
  InvalidValidationTokenError,
} from "@edu-platform/common/errors";
import jwt, { JwtPayload as LibJWTPayload } from "jsonwebtoken";
import { OAuth2Client } from "google-auth-library";

export class JWTTokenService implements ITokenService {
  token_secret = process.env.TOKEN_SECRET;
  _accessTokenPrivateKey: string;
  _accessTokenPublicKey: string;

  _refreshTokenPrivateKey: string;
  _refreshTokenPublicKey: string;

  client: OAuth2Client;

  constructor() {
    // this._privateKey = fs.readFile("./credentials/private.pem").toString();
    // this._publicKey = fs.readFile("./credentials/public.pem").toString();
    this._accessTokenPrivateKey = process.env.ACCESS_TOKEN_PRIVATE_KEY;
    this._accessTokenPublicKey = process.env.ACCESS_TOKEN_PUBLIC_KEY;
    this._refreshTokenPrivateKey = process.env.REFRESH_TOKEN_PRIVATE_KEY;
    this._refreshTokenPublicKey = process.env.REFRESH_TOKEN_PUBLIC_KEY;

    this.client = new OAuth2Client();
  }

  generateRefreshToken({ id }: JWTPayload) {
    try {
      const resp = jwt.sign({}, this._refreshTokenPrivateKey, {
        issuer: process.env.HOST_NAME,
        algorithm: "RS256",
        expiresIn: "0.5y",
        // subject: `${id}`,
      });
      return resp;
    } catch (e) {
      throw new TokenGenerationError({ error: e.message });
    }
  }

  generateAccessToken({ id }: JWTPayload) {
    try {
      const resp = jwt.sign({}, this._accessTokenPrivateKey, {
        issuer: process.env.HOST_NAME,
        algorithm: "RS256",
        expiresIn: "1h",
        subject: `${id}`,
      });
      return resp;
    } catch (e) {
      throw new TokenGenerationError({ error: e.message });
    }
  }

  verifyAccessToken(token: string) {
    const tokenPayload = jwt.verify(
      token,
      this._accessTokenPublicKey
    ) as LibJWTPayload;
    const issuer = (tokenPayload as LibJWTPayload)?.iss;
    const userId = (tokenPayload as LibJWTPayload)?.sub;

    if (!issuer) throw new Error(`JWT issuer not found: ${tokenPayload}`);
    if (!userId) throw new Error(`JWT subject not found: ${tokenPayload}`);

    if (issuer !== process.env.HOST_NAME)
      throw new Error("Token not recognized");

    return {
      id: tokenPayload.sub,
    };
  }

  async verifyRefreshToken(token: string) {
    const { payload } = jwt.decode(token, { complete: true });
    const issuer = (payload as LibJWTPayload)?.iss;

    if (!issuer) throw new Error(`JWT issuer not found: ${payload}`);

    if (issuer !== process.env.HOST_NAME)
      throw new Error("Token not recognized");

    try {
      jwt.verify(token, this._refreshTokenPublicKey) as LibJWTPayload;
    } catch (e) {
      console.error(e.message);
    }
  }
}
