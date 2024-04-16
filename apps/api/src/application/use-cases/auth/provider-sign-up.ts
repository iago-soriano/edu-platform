import { IUserRepository } from "@application/interfaces";
import { IUseCase, ITokenService } from "@edu-platform/common/platform";

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

  async execute({ email, name, image, provider }: InputParams) {
    if (!provider) throw new Error("Please provide a provider name");

    let existingUser = await this.userRepository.getUserByEmail(email);
    let userId;

    if (existingUser && !existingUser.provider)
      throw new Error(
        "This e-mail is already registered with an e-mail and password"
      );

    if (!existingUser) {
      const userDTO: any = {
        email,
        name,
        image,
        emailVerified: true,
        provider,
      };

      userId = (await this.userRepository.insertUser(userDTO)).userId;
      // await this.insertDefaultCollectionUseCase.execute(
      //   new User(userId, name, email, "")
      // );
    } else {
      userId = existingUser.id;
    }

    const accessToken = this.tokenService.generateAccessToken({
      id: userId,
    });

    const refreshToken = this.tokenService.generateRefreshToken({
      id: userId,
    });

    // await this.userRepository.updateUser(userId, { refreshToken });

    return {
      accessToken,
      refreshToken,
    };
  }
}

export default UseCase;
