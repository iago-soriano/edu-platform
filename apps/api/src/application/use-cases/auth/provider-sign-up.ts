import {
  IUserRepository,
  ITokenService,
  UserInsertDTO,
  IUseCase,
} from "@interfaces";

type InputParams = {
  email: string;
  name: string;
  image: string;
  provider: string;
};
type Return = {
  accessToken: string;
  refreshToken: string;
};

export type IProviderSignUpUseCase = IUseCase<InputParams, Return>;

class UseCase implements IProviderSignUpUseCase {
  constructor(
    private userRepository: IUserRepository,
    private tokenService: ITokenService
  ) {}

  async execute({ email, name, image, provider }) {
    let existingUser = await this.userRepository.getUserByEmail(email);
    let userId;

    if (existingUser && !existingUser.provider)
      throw new Error("Account already created with e-mail and password");

    if (!existingUser) {
      const userDTO: UserInsertDTO = {
        email,
        name,
        image,
        emailVerified: true,
        provider,
      };

      userId = (await this.userRepository.insertUser(userDTO)).userId;
    } else {
      userId = existingUser.id;
    }

    const accessToken = this.tokenService.generateAccessToken({
      id: `${userId}`,
    });

    const refreshToken = this.tokenService.generateRefreshToken({
      id: `${userId}`,
    });

    await this.userRepository.updateUser(userId, { refreshToken });

    return {
      accessToken,
      refreshToken,
    };
  }
}

export default UseCase;
