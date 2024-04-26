import { IUseCase } from "@edu-platform/common/platform";
import {
  ICollectionsRepository,
  INotificationsRepository,
} from "../../interfaces";
import { ActivityPublishedEvent } from "@edu-platform/common/domain/integration-events";
import { NotificationsFactory } from "@core/domain/entities";

export type IStudentOutputPublishedUseCase = IUseCase<
  ActivityPublishedEvent,
  void
>;

class UseCase implements IStudentOutputPublishedUseCase {
  constructor(private collectionsRepository: ICollectionsRepository) {}

  async execute(args: ActivityPublishedEvent) {}
}
export default UseCase;
