import { IUserRepository } from "@iam/application/interfaces";
import {
  InvalidStateError,
  SilentInvalidStateError,
} from "@edu-platform/common/errors";
import {
  IUseCase,
  IEncryptionService,
  ITokenService,
} from "@edu-platform/common/platform";

type InputParams = {
  email: string;
  password: string;
};
type Return = {
  accessToken: string;
  refreshToken: string;
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
    let userDTO: any | null;

    if (email && password) {
      userDTO = await this.userRepository.getUserByEmail(email);
      if (!userDTO) throw new InvalidStateError("User not found");

      if (userDTO.provider) throw new InvalidStateError("Has provider already");

      if (!userDTO.emailVerified) throw new InvalidStateError("Unverified");

      const passwordValid = await this.encryptionService.compare(
        password,
        userDTO?.hashedPassword || ""
      );
      if (!passwordValid) throw new InvalidStateError("Password invalid");
    } else {
      throw new InvalidStateError("Please provide email and password");
    }

    const accessToken = this.tokenService.generateAccessToken({
      id: userDTO.id,
    });

    const refreshToken = this.tokenService.generateRefreshToken({
      id: userDTO.id,
    });

    // await this.userRepository.updateUser(userDTO.id, { refreshToken });

    return {
      accessToken,
      refreshToken,
      user: userDTO && {
        email: userDTO.email || "",
        name: userDTO.name || "",
        image: userDTO.image || "",
      },
    };
  }
}

export default UseCase;
