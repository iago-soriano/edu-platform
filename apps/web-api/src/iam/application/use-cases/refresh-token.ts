import { IUserRepository } from "@iam/application/interfaces";
import { Forbidden } from "@edu-platform/common/errors";
import { TokenExpiredError } from "jsonwebtoken";
import { IUseCase, ITokenService } from "@edu-platform/common/platform";

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
    let tokenPayload;
    try {
      tokenPayload = this.tokenService.verifyRefreshToken(args.refreshToken);
    } catch (ex) {
      if (ex instanceof TokenExpiredError)
        throw new Forbidden("Refresh token expirado");
      throw new Forbidden(`Unexpected error verifying refresh_token: ${ex}`);
    }

    const userDTO = await this.userRepository.getUserById(
      Number(tokenPayload.id)
    );
    if (!userDTO) throw new InvalidStateError("");

    // TODO
    // Time to rotate tokens. If this happens, refresh_token has been compromised
    // if (userDTO.refreshToken !== args.refreshToken) {
    //   console.log(userDTO.refreshToken, args.refreshToken);
    //   await this.userRepository.updateUser(userDTO.id, { refreshToken: "" });
    //   throw new Forbidden("Refresh token persisted not equal to the one sent");
    // }

    const accessToken = this.tokenService.generateAccessToken({
      id: userDTO.id,
    });

    const refreshToken = this.tokenService.generateRefreshToken({
      id: userDTO.id,
    });

    // await this.userRepository.updateUser(userDTO.id, { refreshToken });

    return {
      accessToken,
      refreshToken,
    };
  }
}

export default UseCase;
