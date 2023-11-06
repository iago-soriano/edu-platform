import {
  IUserRepository,
  IEncryptionService,
  ITokenService,
  UserInsertDTO,
  IUseCase,
} from "@interfaces";

type InputParams = {
  email: string;
  name: string;
  image: string;
  provider: string;
  providerId: string;
};
type Return = void;

export type IProviderSignUpUseCase = IUseCase<InputParams, Return>;

class UseCase implements IProviderSignUpUseCase {
  constructor(
    private userRepository: IUserRepository // private profileImageRepository: IProfileImageRepository
  ) {}

  async execute({ providerId, email, name, image, provider }) {
    const existingUser = await this.userRepository.getUserByEmail(email);

    if (existingUser) return;

    const userDTO: UserInsertDTO = {
      providerId,
      email,
      name,
      image,
      emailVerified: true,
      tokenVersion: 0,
      provider,
    };

    await this.userRepository.insertUser(userDTO);
  }
}

export default UseCase;
