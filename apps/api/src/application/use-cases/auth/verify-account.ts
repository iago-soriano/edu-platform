import {
  IUserRepository,
  ITokenRepository,
  IUseCase,
} from "@application/interfaces";
import {
  InvalidValidationTokenError,
  UserNotFoundError,
} from "@edu-platform/common";
import { Collection, User } from "@domain/entities";

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
    // const defaultCollection = new Collection(0); // TODO: put this in domain
    // defaultCollection.name = "Minha coleção";
    // defaultCollection.description =
    //   "Esta é sua primeira coleção! Altere seu nome e descrição para refletir o objetivo desta coleção, e, então, insira estudantes";
    // defaultCollection.notifyOwnerOnStudentOutput = true;
    // defaultCollection.isPrivate = true;
    // defaultCollection.owner = user;
  }
}

export default UseCase;
