import { IUserRepository, ITokenRepository } from "@iam/application/interfaces";
import {
  InvalidStateError,
  SilentInvalidStateError,
} from "@edu-platform/common/errors";
import { IUseCase } from "@edu-platform/common/platform";

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

    if (!verificationToken || !verificationToken.userId)
      throw new InvalidStateError("Invalid verification token");

    const user = await this.userRepository.getUserById(
      verificationToken.userId
    );
    if (!user) throw new InvalidStateError("");

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
