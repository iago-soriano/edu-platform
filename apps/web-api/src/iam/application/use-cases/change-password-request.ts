import { IUserRepository, ITokenRepository } from "@iam/application/interfaces";
import {
  InvalidStateError,
  SilentInvalidStateError,
} from "@edu-platform/common/errors";
import {
  IUseCase,
  IEmailService,
  GetUUID,
} from "@edu-platform/common/platform";

type InputParams = {
  email: string;
};

type Return = void;

export type IChangePasswordRequestUseCase = IUseCase<InputParams, Return>;

class UseCase implements IChangePasswordRequestUseCase {
  constructor(
    private userRepository: IUserRepository,
    private emailService: IEmailService,
    private tokenRepository: ITokenRepository
  ) {}

  async execute({ email }: InputParams) {
    const user = await this.userRepository.getUserByEmail(email);

    if (!user) throw new InvalidStateError("");

    if (user.provider) throw new InvalidStateError("");

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
      throw new InvalidStateError("");
    }

    const changePasswordToken = GetUUID();

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
