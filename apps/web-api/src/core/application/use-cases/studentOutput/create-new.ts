import { IUseCase } from "@edu-platform/common/platform";
import {
  UserSelectDTO,
  IStudentOutputsRepository,
  ICollectionsRepository,
  IActivitiesRepository,
} from "../../interfaces";
import { SilentInvalidStateError } from "@edu-platform/common";

type InputParams = {
  user: UserSelectDTO;
  activityId: string;
};

type Return = void;

export type ICreateStudentOutputUseCase = IUseCase<InputParams, Return>;

class UseCase implements ICreateStudentOutputUseCase {
  constructor(
    private collectionsRepository: ICollectionsRepository,
    private studentOutputsRepository: IStudentOutputsRepository,
    private activitiesRepository: IActivitiesRepository
  ) {}

  async execute({ user, activityId }: InputParams) {
    const activity = await this.activitiesRepository.findRootById(activityId);
    if (!activity || !activity.lastVersion)
      throw new SilentInvalidStateError("Activity not found");

    const collection = await this.collectionsRepository.findById(
      activity.collectionId
    );

    if (!collection) throw new SilentInvalidStateError("Collection not found");
    if (!collection.isPrivate)
      throw new SilentInvalidStateError("Public collection");
  }
}
export default UseCase;
