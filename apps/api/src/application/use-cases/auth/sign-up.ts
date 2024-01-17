import {
  IUserRepository,
  IEncryptionService,
  ITokenRepository,
  IIdGenerator,
  IEmailService,
  UserInsertDTO,
  IUseCase,
} from "@interfaces";
import { User } from "@domain";
import {
  PasswordsDontMatchError,
  EmailAlreadySignedupError,
} from "@edu-platform/common/errors";

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
    private idService: IIdGenerator,
    private emailService: IEmailService,
    private tokenRepository: ITokenRepository
  ) {}

  async execute({ email, password, name, confirmPassword }: InputParams) {
    const user = new User(name, email, password);

    const existingUser = await this.userRepository.getUserByEmail(email);

    if (existingUser) throw new EmailAlreadySignedupError();

    if (!password || !confirmPassword) throw new PasswordsDontMatchError();
    if (password !== confirmPassword) throw new PasswordsDontMatchError();

    const token = this.idService.getId();

    const userDTO: UserInsertDTO = {
      email: user.email,
      name: user.name,
      emailVerified: false,
      hashedPassword: await this.encryptionService.encrypt(user.password),
    };

    const { userId } = await this.userRepository.insertUser(userDTO);
    await this.tokenRepository.insertToken({
      value: token,
      userId,
      type: "VerifyAccount",
    });

    await this.emailService.sendVerifyAccountEmail({
      destination: email,
      url: `${process.env.WEB_APP_URL}/auth/verify-account?verificationToken=${token}`,
    });
  }
}

export default UseCase;
