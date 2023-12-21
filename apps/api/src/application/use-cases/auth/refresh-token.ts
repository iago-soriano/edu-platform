import { IUserRepository, ITokenService, IUseCase } from "@interfaces";
import { Forbidden } from "@edu-platform/common/errors";

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
      throw new Forbidden();
    }

    if (!tokenPayload.id) throw new Forbidden();

    const userDTO = await this.userRepository.getUserById(
      Number(tokenPayload.id)
    );
    if (!userDTO) throw new Forbidden();

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
