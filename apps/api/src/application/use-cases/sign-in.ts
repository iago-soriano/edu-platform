import {
  IUserRepository,
  IEncryptionService,
  ITokenService,
  UserDTO,
  IUseCase,
} from "@interfaces";
import {
  CredentialsNotProvidedError,
  InvalidCredentialsError,
  UserNotVerifiedError,
} from "@edu-platform/common/errors";

type InputParams = {
  email: string;
  password: string;
};
type Return = {
  token: string;
  user: {
    email: string;
    name: string;
    image: string;
  };
};

export type ISignInUseCase = IUseCase<InputParams, Return>;

class UseCase implements ISignInUseCase {
  constructor(
    private userRepository: IUserRepository,
    private encryptionService: IEncryptionService,
    private tokenService: ITokenService
  ) {}

  async execute({ email, password }: InputParams) {
    let userDTO: UserDTO;

    if (email && password) {
      userDTO = await this.userRepository.getUserByEmail(email);
      if (!userDTO) throw new InvalidCredentialsError();

      if (userDTO.provider) throw new InvalidCredentialsError();

      if (!userDTO.emailVerified) throw new UserNotVerifiedError({ email });

      const passwordValid = await this.encryptionService.compare(
        password,
        userDTO.hashedPassword
      );
      if (!passwordValid) throw new InvalidCredentialsError();
    } else {
      throw new CredentialsNotProvidedError();
    }

    const token = this.tokenService.generate({
      id: userDTO.id || "",
      tokenVersion: userDTO.tokenVersion,
    });

    return {
      token,
      user: { email: userDTO.email, name: userDTO.name, image: userDTO.image },
    };
  }
}

export default UseCase;
