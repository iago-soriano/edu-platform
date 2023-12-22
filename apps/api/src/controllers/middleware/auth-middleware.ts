import {
  ITokenService,
  IUserRepository,
  JWTPayload,
  Request,
} from "@interfaces";
import { Forbidden, Unauthorized } from "@edu-platform/common/errors";
import { TokenExpiredError } from "jsonwebtoken";

export class AuthenticationMiddlewareController {
  constructor(
    private tokenService: ITokenService,
    private userRepository: IUserRepository
  ) {}

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
      if (e instanceof TokenExpiredError) throw new Unauthorized();
      throw e;
    }

    const userDTO = await this.userRepository.getUserById(
      Number(tokenPayload.id)
    );
    if (!userDTO) throw new Forbidden("User id in token not found");

    req.user = userDTO;
  }
}
