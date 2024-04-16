import { IUseCase } from "@edu-platform/common/platform";
import {
  ICollectionsRepository,
  INotificationsRepository,
} from "@application/interfaces";
import { ActivityPublishedEvent } from "@domain/events";
import { NotificationsFactory } from "@domain/entities";

export type IFeedbackPublishedUseCase = IUseCase<ActivityPublishedEvent, void>;

class UseCase implements IFeedbackPublishedUseCase {
  constructor(private collectionsRepository: ICollectionsRepository) {}

  async execute(args: ActivityPublishedEvent) {}
}
export default UseCase;
