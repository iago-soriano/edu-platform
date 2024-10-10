import { ITokenService, JWTPayload } from "./interfaces";
import { Forbidden } from "../../errors";
import jwt, { JwtPayload as LibJWTPayload } from "jsonwebtoken";

export class JWTTokenService implements ITokenService {
  constructor() {}

  verify(token: string, validIssuer: string, publicKey: string) {
    if (!publicKey) throw new Error("Access token public key not found");
    const tokenPayload = jwt.verify(token, publicKey, {
      algorithms: ["RS256"],
    }) as any;
    // console.log("got token payload", tokenPayload);
    const issuer = (tokenPayload as LibJWTPayload)?.iss;

    if (!issuer) throw new Forbidden("No issuer in token");

    if (issuer !== validIssuer)
      throw new Forbidden("Incorrect issuer in token");

    return {
      userEmail: tokenPayload.email,
    };
  }
}
