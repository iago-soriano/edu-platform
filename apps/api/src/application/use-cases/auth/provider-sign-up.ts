import { HasAccountWithEmailAndPassword } from "@edu-platform/common";
import {
  IUserRepository,
  ITokenService,
  UserInsertDTO,
  IUseCase,
} from "@interfaces";
import { IInsertDefaultCollectionUseCase } from "@use-cases";
import { User } from "@domain";

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
    private tokenService: ITokenService,
    private insertDefaultCollectionUseCase: IInsertDefaultCollectionUseCase
  ) {}

  async execute({ email, name, image, provider }: InputParams) {
    let existingUser = await this.userRepository.getUserByEmail(email);
    let userId;

    if (existingUser && !existingUser.provider)
      throw new HasAccountWithEmailAndPassword();

    if (!existingUser) {
      const userDTO: UserInsertDTO = {
        email,
        name,
        image,
        emailVerified: true,
        provider,
      };

      userId = (await this.userRepository.insertUser(userDTO)).userId;
      await this.insertDefaultCollectionUseCase.execute(
        new User(userId, name, email, "")
      );
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
