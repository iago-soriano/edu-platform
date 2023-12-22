import { IUserRepository, IUseCase, ITokenService } from "@interfaces";
import { UserNotFoundError, Forbidden } from "@edu-platform/common/errors";

type InputParams = {
  refreshToken: string;
};
type Return = void;

export type ISignOutUseCase = IUseCase<InputParams, Return>;

class UseCase implements ISignOutUseCase {
  constructor(
    private userRepository: IUserRepository,
    private tokenService: ITokenService
  ) {}

  async execute({ refreshToken }) {
    const tokenPayload = this.tokenService.verifyRefreshToken(refreshToken);

    const userDTO = await this.userRepository.getUserById(
      Number(tokenPayload.id)
    );
    if (!userDTO) throw new UserNotFoundError();

    await this.userRepository.updateUser(userDTO.id, { refreshToken: "" });
  }
}

export default UseCase;
