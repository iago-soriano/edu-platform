import {
  IUseCase,
  ICollectionsRepository,
  INotificationsRepository,
} from "@application/interfaces";
import { ActivityPublishedEvent } from "@domain/events";
import { NotificationsFactory } from "@domain/entities";

export type IActivityPublishedUseCase = IUseCase<ActivityPublishedEvent, void>;

class UseCase implements IActivityPublishedUseCase {
  constructor(
    private collectionsRepository: ICollectionsRepository,
    private notificationsRepository: INotificationsRepository
  ) {}

  async execute(args: ActivityPublishedEvent) {}
}
export default UseCase;
