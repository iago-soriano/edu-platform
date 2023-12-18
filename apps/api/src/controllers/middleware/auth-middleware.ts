import {
  ITokenService,
  IUserRepository,
  JWTPayload,
  Request,
  UserSelectDTO,
} from "@interfaces";
import {
  MissingTokenError,
  MalformedTokenError,
  Forbidden,
  CouldNotVerifyTokenError,
  InsufficientTokenError,
  UserNotFoundError,
} from "@edu-platform/common/errors";
import { TokenExpiredError, JsonWebTokenError } from "jsonwebtoken";

export class AuthenticationMiddlewareController {
  constructor(
    private tokenService: ITokenService,
    private userRepository: IUserRepository
  ) {}

  async execute(req: Request<{}, {}, {}>, headers: Record<string, string>) {
    if (!headers.authorization) throw new MissingTokenError();

    const [header, token] = headers.authorization.split(" ");
    if (header !== "Bearer") throw new MalformedTokenError();

    let tokenPayload: JWTPayload;
    try {
      tokenPayload = this.tokenService.verifyAccessToken(token);
    } catch (e) {
      if (e instanceof TokenExpiredError) throw new Forbidden();
      if (e instanceof JsonWebTokenError) throw new Error(e.message);
      throw e;
    }

    if (!tokenPayload.id) throw new InsufficientTokenError();

    const userDTO = await this.userRepository.getUserById(
      Number(tokenPayload.id)
    );
    if (!userDTO) throw new UserNotFoundError();

    req.user = userDTO;
  }
}
