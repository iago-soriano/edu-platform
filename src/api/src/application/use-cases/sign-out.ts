import {
  IUserRepository,
  IUseCase
} from "@application/interfaces";

type InputParams = {
  id: string;
  tokenVersion: number;
};
type Return = void;

export type ISignOutUseCase = IUseCase<InputParams, Return>;

class UseCase implements ISignOutUseCase {
  constructor(
    private userRepository: IUserRepository,
  ) {}

  async execute({ id, tokenVersion }) {
    const userDTO = await this.userRepository.getUserById(id);

    const newTokenVersion = tokenVersion + 1;
    if (userDTO.tokenVersion === tokenVersion) {
      await this.userRepository.updateUser(id, {
        tokenVersion: newTokenVersion,
      });
    }
  }
}

export default UseCase;
