import {
  IUserRepository,
  IEncryptionService,
  ITokenService,
  UserDTO,
  IUseCase
} from "@interfaces";

type InputParams = {
  id: string;
  email: string;
  name: string;
  image: string;
  provider: string
};
type Return = void;

export type IProviderSignUpUseCase = IUseCase<InputParams, Return>;

class UseCase implements IProviderSignUpUseCase {
  constructor(
    private userRepository: IUserRepository,
    // private profileImageRepository: IProfileImageRepository
  ) {}

  async execute({ id, email, name, image, provider }) {
    const existingUser = await this.userRepository.getUserByEmail(email);

    if (existingUser) return;

    const userDTO: UserDTO = {
      id,
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
