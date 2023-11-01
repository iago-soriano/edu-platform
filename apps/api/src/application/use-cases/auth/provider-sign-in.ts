import {
  IUserRepository,
  IEncryptionService,
  ITokenService,
  UserSelectDTO,
  IUseCase,
} from "@interfaces";
import {
  CredentialsNotProvidedError,
  InvalidCredentialsError,
  UserNotVerifiedError,
} from "@edu-platform/common/errors";

type InputParams = {
  email: string;
  provider: string;
};
type Return = {
  token: string;
  user: UserSelectDTO;
};

export type IProviderSignInUseCase = IUseCase<InputParams, Return>;

class UseCase implements IProviderSignInUseCase {
  constructor(
    private userRepository: IUserRepository,
    private tokenService: ITokenService
  ) {}

  async execute({ email, provider }) {
    let userDTO: UserSelectDTO;

    userDTO = await this.userRepository.getUserByEmailAndProvider(
      email,
      provider
    );
    if (!userDTO) throw new InvalidCredentialsError();

    const token = this.tokenService.generate({
      id: userDTO.id || "",
      tokenVersion: userDTO.tokenVersion,
    });

    return {
      token,
      user: userDTO,
    };
  }
}

export default UseCase;
