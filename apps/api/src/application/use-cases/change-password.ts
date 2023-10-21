import {
  IUserRepository,
  ITokenRepository,
  IUseCase,
  TokenType,
  IEncryptionService,
} from "@interfaces";
import {
  InvalidValidationTokenError,
  PasswordsDontMatchError,
  UserNotFoundError,
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
      TokenType.ChangePasswordRequest
    );

    if (!token) throw new InvalidValidationTokenError();
    if (token.expiresAt < Date.now()) throw new InvalidValidationTokenError();

    if (!newPassword || !confirmNewPassword)
      throw new PasswordsDontMatchError();
    if (newPassword !== confirmNewPassword) throw new PasswordsDontMatchError();

    const user = await this.userRepository.getUserById(token.userId);

    if (!user) throw new UserNotFoundError();

    const newHashedPassword = await this.encryptionService.encrypt(newPassword);

    await this.userRepository.updateUser(user.id, {
      hashedPassword: newHashedPassword,
      tokenVersion: user.tokenVersion + 1,
    });
  }
}

export default UseCase;
