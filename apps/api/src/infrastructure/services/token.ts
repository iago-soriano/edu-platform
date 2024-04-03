import { ITokenService, JWTPayload } from "@interfaces";
import { TokenGenerationError, Forbidden } from "@edu-platform/common/errors";
import jwt, { JwtPayload as LibJWTPayload } from "jsonwebtoken";

export class JWTTokenService implements ITokenService {
  token_secret = process.env.TOKEN_SECRET;
  _accessTokenPrivateKey: string;
  _accessTokenPublicKey: string;

  _refreshTokenPrivateKey: string;
  _refreshTokenPublicKey: string;

  constructor() {
    // this._privateKey = fs.readFile("./credentials/private.pem").toString();
    // this._publicKey = fs.readFile("./credentials/public.pem").toString();
    this._accessTokenPrivateKey = process.env.ACCESS_TOKEN_PRIVATE_KEY || "";
    this._accessTokenPublicKey = process.env.ACCESS_TOKEN_PUBLIC_KEY || "";
    this._refreshTokenPrivateKey = process.env.REFRESH_TOKEN_PRIVATE_KEY || "";
    this._refreshTokenPublicKey = process.env.REFRESH_TOKEN_PUBLIC_KEY || "";
  }

  generateRefreshToken({ id }: JWTPayload) {
    try {
      const resp = jwt.sign({}, this._refreshTokenPrivateKey, {
        issuer: process.env.HOST_NAME,
        algorithm: "RS256",
        expiresIn: "0.5y",
        subject: `${id}`,
      });
      return resp;
    } catch (e) {
      throw new TokenGenerationError({ error: (e as Error).message });
    }
  }

  generateAccessToken({ id }: JWTPayload) {
    try {
      const resp = jwt.sign({}, this._accessTokenPrivateKey, {
        issuer: process.env.HOST_NAME,
        algorithm: "RS256",
        expiresIn: "1y",
        subject: `${id}`,
      });
      return resp;
    } catch (e) {
      throw new TokenGenerationError({ error: (e as Error).message });
    }
  }

  _verifyToken(token: string, secret: string) {
    const tokenPayload = jwt.verify(token, secret) as LibJWTPayload;
    const issuer = (tokenPayload as LibJWTPayload)?.iss;
    const userId = (tokenPayload as LibJWTPayload)?.sub;

    if (!issuer) throw new Forbidden("No issuer in token");
    if (!userId) throw new Forbidden("No subject in token");

    if (issuer !== process.env.HOST_NAME)
      throw new Forbidden("Incorrect issuer in token");

    return {
      id: userId,
    };
  }
  verifyAccessToken(token: string) {
    return this._verifyToken(token, this._accessTokenPublicKey);
  }

  verifyRefreshToken(token: string) {
    return this._verifyToken(token, this._refreshTokenPublicKey);
  }

  decode(token: string) {
    return jwt.decode(token) as JWTPayload;
  }
}
