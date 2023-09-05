import { ITokenService, IUserRepository } from "@application/interfaces";
import {
  MissingTokenError,
  MalformedTokenError,
  Forbidden,
  CouldNotVerifyTokenError,
  InsufficientTokenError,
  UserNotFoundError,
} from "@common/errors";
import { Request } from '@presentation/interfaces';

export class AuthenticationMiddlewareController {

  constructor(
    private tokenService: ITokenService,
    private userRepository: IUserRepository
  ){}

  async execute(req: Request<{},{},{}>, headers: Record<string, string>) {

    if (!headers.authorization) throw new MissingTokenError();

    const [header, token] = headers.authorization.split(" ");
    if (header !== "Bearer") throw new MalformedTokenError();

    let tokenPayload;
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

    const userDTO = await this.userRepository.getUserById(tokenPayload.id);

    if (!userDTO) throw new UserNotFoundError();

    if (userDTO.tokenVersion !== tokenPayload.tokenVersion)
      throw new Forbidden();

    req.user = {
      id: userDTO.id,
      emailVerified: userDTO.emailVerified,
      tokenVersion: userDTO.tokenVersion,
      email: userDTO.email,
      name: userDTO.name,
      role: userDTO.role,
      image: userDTO.image,
    };
  };
};
