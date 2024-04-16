import { Request, ITokenService, JWTPayload } from "../../interfaces";
import { Forbidden, Unauthorized } from "@edu-platform/common/errors";
import { TokenExpiredError } from "jsonwebtoken";

export class AuthenticationMiddlewareController {
  constructor(private tokenService: ITokenService) {}

  async execute(req: Request<{}, {}, {}>, headers: Record<string, string>) {
    if (!headers.authorization)
      throw new Forbidden("No Authorization header present");

    const [header, token] = headers.authorization.split(" ");
    if (header !== "Bearer")
      throw new Forbidden(
        `Authorization header present but incorrect form: ${header}`
      );

    let tokenPayload: JWTPayload;
    try {
      tokenPayload = this.tokenService.verifyAccessToken(token);
    } catch (e) {
      if (e instanceof TokenExpiredError) {
        // console.log(e.message, e.expiredAt);
        throw new Unauthorized();
      }
      throw e;
    }

    // up to this point, make a client that retrieves JWT payload from headers

    req.user = { id: tokenPayload.id };
  }
}
