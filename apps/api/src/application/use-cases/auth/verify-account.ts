import {
  IUserRepository,
  ITokenRepository,
  IUseCase,
  TokenType,
} from "@interfaces";
import {
  InvalidValidationTokenError,
  UserNotFoundError,
} from "@edu-platform/common/errors";

type InputParams = {
  verifyAccountToken: string;
};

type Return = void;

export type IVerifyAccountUseCase = IUseCase<InputParams, Return>;

class UseCase implements IVerifyAccountUseCase {
  constructor(
    private userRepository: IUserRepository,
    private tokenRepository: ITokenRepository
  ) {}

  async execute({ verifyAccountToken }: InputParams) {
    const verificationToken = await this.tokenRepository.getTokenByTokenValue(
      verifyAccountToken,
      "VerifyAccount"
    );

    if (!verificationToken) throw new InvalidValidationTokenError();

    const user = await this.userRepository.getUserById(
      verificationToken.userId || 0
    );
    if (!user) throw new UserNotFoundError();

    if (user.emailVerified) return;

    await this.userRepository.updateUser(user.id, { emailVerified: true });
  }
}

export default UseCase;
