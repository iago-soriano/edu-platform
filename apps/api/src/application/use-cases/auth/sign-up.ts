import {
  IUserRepository,
  IEncryptionService,
  ITokenRepository,
  IEmailService,
  IUseCase,
} from "@application/interfaces";
import { User } from "@domain/entities";
import {
  PasswordsDontMatchError,
  EmailAlreadySignedupError,
} from "@edu-platform/common/errors";
import { GetUUID } from "@infrastructure/utils";

type InputParams = {
  email: string;
  name: string;
  password: string;
  confirmPassword: string;
};
type Return = void;

export type ISignUpUseCase = IUseCase<InputParams, Return>;

class UseCase implements ISignUpUseCase {
  constructor(
    private userRepository: IUserRepository,
    private encryptionService: IEncryptionService,
    private emailService: IEmailService,
    private tokenRepository: ITokenRepository
  ) {}

  async execute({ email, password, name, confirmPassword }: InputParams) {
    const user = new User(0, name, email, password);

    const existingUser = await this.userRepository.getUserByEmail(email);

    if (existingUser) throw new EmailAlreadySignedupError();

    if (!password || !confirmPassword) throw new PasswordsDontMatchError();
    if (password !== confirmPassword) throw new PasswordsDontMatchError();

    if (!email || !name) throw new Error("Missing name or e-mail");

    const token = GetUUID();

    const userDTO: any = {
      email: user.email!,
      name: user.name!,
      emailVerified: false,
      hashedPassword: await this.encryptionService.encrypt(user.password || ""),
    };

    const { userId } = await this.userRepository.insertUser(userDTO);
    await this.tokenRepository.insertToken({
      value: token,
      userId,
      type: "VerifyAccount",
    });

    await this.emailService.sendVerifyAccountEmail({
      destination: email,
      // url: `${process.env.WEB_APP_URL}/auth/verify-account?verificationToken=${token}`,
    });
  }
}

export default UseCase;
