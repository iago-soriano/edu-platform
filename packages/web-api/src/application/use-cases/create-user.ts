import { InvalidStateError } from "@edu-platform/common/errors";
import { IKeycloakAdmin, IUseCase } from "@edu-platform/common/platform";
import { IUserRepository } from "application/interfaces";
import { User } from "@domain/entities";
import { createId } from "@paralleldrive/cuid2";

type InputParams = {
  firstName: string;
  lastName: string;
  email: string;
};
type Return = void;

export type ICreateUserUseCase = IUseCase<InputParams, Return>;

class UseCase implements ICreateUserUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute({ firstName, lastName, email }: InputParams) {
    const user = new User(
      createId(),
      firstName,
      lastName,
      email,
      5,
      new Date()
    );

    const existingUser = await this.userRepository.getByEmail(email);

    if (existingUser) throw new InvalidStateError("user exists");

    await this.userRepository.save(user);
  }
}

export default UseCase;
