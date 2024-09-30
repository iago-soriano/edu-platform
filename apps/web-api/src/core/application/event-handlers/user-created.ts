import { IUseCase } from "@edu-platform/common/platform";
import { IUserRepository } from "../interfaces";
import { UserCreatedEvent } from "@edu-platform/common/domain/integration-events";
import { User } from "@core/domain/entities";

export type IUserCreatedUseCase = IUseCase<UserCreatedEvent["payload"], void>;

class UseCase implements IUserCreatedUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(payload: UserCreatedEvent["payload"]) {
    console.log(`Creating user with ${payload}`);

    const existingUser = await this.userRepository.getById(payload.id);
    if (existingUser) {
      console.log(`User with id ${payload.id} already exists. Skipping...`);
      return;
    }

    await this.userRepository.save(
      new User(payload.id, payload.name, payload.email)
    );
  }
}
export default UseCase;
