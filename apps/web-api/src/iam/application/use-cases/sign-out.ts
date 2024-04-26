import { IUserRepository } from "@iam/application/interfaces";
import {
  InvalidStateError,
  SilentInvalidStateError,
} from "@edu-platform/common/errors";
import { TokenExpiredError } from "jsonwebtoken";
import { IUseCase, ITokenService } from "@edu-platform/common/platform";

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

  async execute({ refreshToken }: InputParams) {
    try {
      this.tokenService.verifyRefreshToken(refreshToken);
    } catch (ex) {
      if (!(ex instanceof TokenExpiredError)) throw ex;
    }

    const tokenPayload = this.tokenService.decode(refreshToken);

    const userDTO = await this.userRepository.getUserById(
      Number(tokenPayload.sub)
    );
    if (!userDTO) throw new InvalidStateError("");

    // if (refreshToken == userDTO.refreshToken) {
    //   await this.userRepository.updateUser(userDTO.id, { refreshToken: "" });
    // }
  }
}

export default UseCase;
