import { IUserRepository, ITokenRepository, IUseCase } from "@interfaces";
import { IInsertDefaultCollectionUseCase } from "@use-cases";
import {
  InvalidValidationTokenError,
  UserNotFoundError,
} from "@edu-platform/common";
import { Collection, User } from "@domain";

type InputParams = {
  verifyAccountToken: string;
};

type Return = void;

export type IVerifyAccountUseCase = IUseCase<InputParams, Return>;

class UseCase implements IVerifyAccountUseCase {
  constructor(
    private userRepository: IUserRepository,
    private tokenRepository: ITokenRepository,
    private insertDefaultCollectionUseCase: IInsertDefaultCollectionUseCase
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
    await this.insertDefaultCollectionUseCase.execute(
      new User(user.id, user.name || "", user.email || "", "")
    );
  }
}

export default UseCase;
