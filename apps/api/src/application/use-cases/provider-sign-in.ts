import {
  IUserRepository,
  IEncryptionService,
  ITokenService,
  UserDTO,
  IUseCase
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
  // token: string;
};

export type IProviderSignInUseCase = IUseCase<InputParams, Return>;

class UseCase implements IProviderSignInUseCase {
  constructor(
    private userRepository: IUserRepository,
    private tokenService: ITokenService
  ) {}

  async execute({ email, provider }) {
    let userDTO: UserDTO;

    userDTO = await this.userRepository.getUserByEmailAndProvider(email, provider);
    if (!userDTO) throw new InvalidCredentialsError();

    // const token = this.tokenService.generate({
    //   id: userDTO.id || "",
    //   tokenVersion: userDTO.tokenVersion,
    // });

    return {
      // token,
    };
  }
}

export default UseCase;
