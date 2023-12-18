import {
  IUserRepository,
  IEncryptionService,
  ITokenService,
  UserSelectDTO,
  IUseCase,
  JWTPayload,
} from "@interfaces";
import {
  Forbidden,
  InsufficientTokenError,
  UserNotFoundError,
} from "@edu-platform/common/errors";
import {
  CredentialsNotProvidedError,
  InvalidCredentialsError,
  UserNotVerifiedError,
} from "@edu-platform/common/errors";
import { TokenExpiredError } from "jsonwebtoken";

type InputParams = {
  refreshToken: string;
};
type Return = {
  accessToken: string;
  refreshToken: string;
};

export type IRefreshTokenUseCase = IUseCase<InputParams, Return>;

class UseCase implements IRefreshTokenUseCase {
  constructor(
    private userRepository: IUserRepository,
    private tokenService: ITokenService
  ) {}

  async execute(args: InputParams) {
    const tokenPayload = this.tokenService.verifyRefreshToken(
      args.refreshToken
    );
    if (!tokenPayload.id) throw new InsufficientTokenError();

    const userDTO = await this.userRepository.getUserById(
      Number(tokenPayload.id)
    );
    if (!userDTO) throw new UserNotFoundError();

    // Time to rotate tokens. If this happens, refresh_token has been compromised
    if (userDTO.refreshToken !== args.refreshToken) {
      await this.userRepository.updateUser(userDTO.id, { refreshToken: "" });
      throw new Forbidden();
    }

    const accessToken = this.tokenService.generateAccessToken({
      id: `${userDTO.id}`,
    });

    const refreshToken = this.tokenService.generateRefreshToken({
      id: `${userDTO.id}`,
    });

    await this.userRepository.updateUser(userDTO.id, { refreshToken });

    return {
      accessToken,
      refreshToken,
    };
  }
}

export default UseCase;
