import {
  IUseCase,
  ICollectionsRepository,
  INotificationsRepository,
} from "@application/interfaces";
import { ActivityPublishedEvent } from "@domain/events";
import { NotificationsFactory } from "@domain/entities";

export type IUserCreatedUseCase = IUseCase<ActivityPublishedEvent, void>;

class UseCase implements IUserCreatedUseCase {
  constructor(private collectionsRepository: ICollectionsRepository) {}

  async execute(args: ActivityPublishedEvent) {}
}
export default UseCase;
