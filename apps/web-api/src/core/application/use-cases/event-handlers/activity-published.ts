import { IUseCase } from "@edu-platform/common/platform";
import {
  ICollectionsRepository,
  INotificationsRepository,
} from "../../interfaces";
import { ActivityPublishedEvent } from "@edu-platform/common/domain/integration-events";

export type IActivityPublishedUseCase = IUseCase<ActivityPublishedEvent, void>;

class UseCase implements IActivityPublishedUseCase {
  constructor(
    private collectionsRepository: ICollectionsRepository,
    private notificationsRepository: INotificationsRepository
  ) {}

  async execute(args: ActivityPublishedEvent) {}
}
export default UseCase;
