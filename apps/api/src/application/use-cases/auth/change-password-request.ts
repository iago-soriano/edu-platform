import {
  IUserRepository,
  ITokenRepository,
  IUseCase,
  IIdGenerator,
  IEmailService,
  TokenType,
} from "@interfaces";
import {
  ChangePasswordRequestTokenExist,
  UserNotFoundError,
  HasProviderAccountError,
} from "@edu-platform/common/errors";

type InputParams = {
  email: string;
};

type Return = void;

export type IChangePasswordRequestUseCase = IUseCase<InputParams, Return>;

class UseCase implements IChangePasswordRequestUseCase {
  constructor(
    private userRepository: IUserRepository,
    private idService: IIdGenerator,
    private emailService: IEmailService,
    private tokenRepository: ITokenRepository
  ) {}

  async execute({ email }: InputParams) {
    const user = await this.userRepository.getUserByEmail(email);

    if (!user) throw new UserNotFoundError();

    if (user.provider)
      throw new HasProviderAccountError({ provider: user.provider });

    const tokens = await this.tokenRepository.getTokensByUserId(
      user.id,
      "ChangePasswordRequest"
    );

    if (
      tokens &&
      tokens.filter(
        (token) => token.expiresAt && token.expiresAt.getTime() > Date.now()
      ).length != 0
    ) {
      throw new ChangePasswordRequestTokenExist();
    }

    const changePasswordToken = this.idService.getId();

    await this.tokenRepository.insertToken({
      value: changePasswordToken,
      userId: user.id,
      type: "ChangePasswordRequest",
      expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 3),
    });

    await this.emailService.sendForgotPasswordEmail({
      destination: email,
      // url: `${process.env.WEB_APP_URL}/auth/change-password?changePasswordToken=${changePasswordToken}`,
    });
  }
}

export default UseCase;
