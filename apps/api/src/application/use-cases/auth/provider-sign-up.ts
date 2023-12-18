import { IUserRepository, UserInsertDTO, IUseCase } from "@interfaces";

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

    if (existingUser && !existingUser.providerId)
      throw new Error("Account already created with e-mail and password");
    if (existingUser) return;

    const userDTO: UserInsertDTO = {
      providerId,
      email,
      name,
      image,
      emailVerified: true,
      provider,
    };

    await this.userRepository.insertUser(userDTO);
  }
}

export default UseCase;
