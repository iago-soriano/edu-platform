import {
  ITokenService,
  IUserRepository,
  JWTPayload,
  Request,
  UserSelectDTO,
} from "@interfaces";
import { Forbidden, Unauthorized } from "@edu-platform/common/errors";
import { TokenExpiredError, JsonWebTokenError } from "jsonwebtoken";

export class AuthenticationMiddlewareController {
  constructor(
    private tokenService: ITokenService,
    private userRepository: IUserRepository
  ) {}

  async execute(req: Request<{}, {}, {}>, headers: Record<string, string>) {
    if (!headers.authorization) throw new Forbidden();

    const [header, token] = headers.authorization.split(" ");
    if (header !== "Bearer") throw new Forbidden();

    let tokenPayload: JWTPayload;
    try {
      tokenPayload = this.tokenService.verifyAccessToken(token);
    } catch (e) {
      if (e instanceof TokenExpiredError) throw new Unauthorized();
      throw e;
    }

    if (!tokenPayload.id) throw new Forbidden();

    const userDTO = await this.userRepository.getUserById(
      Number(tokenPayload.id)
    );
    if (!userDTO) throw new Forbidden();

    req.user = userDTO;
  }
}
