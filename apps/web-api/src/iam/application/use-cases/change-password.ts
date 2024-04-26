import { IUseCase, IEncryptionService } from "@edu-platform/common/platform";
import { IUserRepository, ITokenRepository } from "@application/interfaces";
import {
  InvalidStateError,
  SilentInvalidStateError,
} from "@edu-platform/common/errors";

type InputParams = {
  changePasswordToken: string;
  newPassword: string;
  confirmNewPassword: string;
};

type Return = void;

export type IChangePasswordUseCase = IUseCase<InputParams, Return>;

class UseCase implements IChangePasswordUseCase {
  constructor(
    private userRepository: IUserRepository,
    private tokenRepository: ITokenRepository,
    private encryptionService: IEncryptionService
  ) {}

  async execute({
    changePasswordToken,
    newPassword,
    confirmNewPassword,
  }: InputParams) {
    const token = await this.tokenRepository.getTokenByTokenValue(
      changePasswordToken,
      "ChangePasswordRequest"
    );

    if (!token) throw new InvalidValidationTokenError();
    if (token.expiresAt && token.expiresAt.getTime() < Date.now())
      throw new InvalidStateError("");

    if (!newPassword || !confirmNewPassword) throw new InvalidStateError("");
    if (newPassword !== confirmNewPassword) throw new InvalidStateError("");

    const user = await this.userRepository.getUserById(token.userId || 0);

    if (!user) throw new UserNotFoundError();

    const newHashedPassword = await this.encryptionService.encrypt(newPassword);

    await this.userRepository.updateUser(user.id, {
      hashedPassword: newHashedPassword,
    });

    await this.tokenRepository.updateTokenByValue(token.value || "", {
      expiresAt: new Date(),
    });
  }
}

export default UseCase;
