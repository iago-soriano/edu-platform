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
      tokenPayload = await this.tokenService.verify(token);
    } catch (e) {
      console.log("token verification error:", e);
      throw new CouldNotVerifyTokenError();
    }

    if (
      !Object.keys(tokenPayload).includes("id") ||
      !Object.keys(tokenPayload).includes("tokenVersion") ||
      isNaN(Number(tokenPayload.tokenVersion))
    )
      throw new InsufficientTokenError();

    let userDTO: UserSelectDTO;
    if (tokenPayload.id)
      userDTO = await this.userRepository.getUserById(tokenPayload.id);
    else if (tokenPayload.providerId)
      await this.userRepository.getUserByProviderId(tokenPayload.providerId);

    if (!userDTO) throw new UserNotFoundError();

    if (userDTO.tokenVersion !== tokenPayload.tokenVersion)
      throw new Forbidden();

    req.user = userDTO;
  }
}
