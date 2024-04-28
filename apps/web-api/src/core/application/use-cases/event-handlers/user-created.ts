import { IUseCase } from "@edu-platform/common/platform";
import {
  ICollectionsRepository,
  INotificationsRepository,
  IUserRepository,
} from "../../interfaces";
import { UserCreatedEvent } from "@edu-platform/common/domain/integration-events";
import { User } from "@core/domain/entities";

export type IUserCreatedUseCase = IUseCase<UserCreatedEvent, void>;

class UseCase implements IUserCreatedUseCase {
  constructor(private coreUserRepository: IUserRepository) {}

  async execute(evnt: UserCreatedEvent) {
    const { payload } = evnt;
    await this.coreUserRepository.save(
      new User(payload.id, payload.name, payload.email)
    );
  }
}
export default UseCase;
