import { IUseCase } from "@edu-platform/common/platform";
import {
  UserSelectDTO,
  IActivitiesRepository,
  ICollectionsRepository,
} from "../../interfaces";

type InputParams = {
  user: UserSelectDTO;
  activityId: number;
  destinationCollection: number;
};

type Return = void;

export type IImportActivityUseCase = IUseCase<InputParams, Return>;

class UseCase implements IImportActivityUseCase {
  constructor(
    private activitiesRepository: IActivitiesRepository,
    private collectionsRepository: ICollectionsRepository
  ) {}

  async execute({ user, activityId, destinationCollection }: InputParams) {
    // const activity =
    //   await this.activitiesRepository.Activities.findById(activityId);
    // if (!activity || !activity.lastVersion?.id)
    //   throw new Error("Activity not found");
    // const collection = await this.collectionsRepository.getById(
    //   activity.collection.id
    // );
    // if (!collection?.isPrivate) throw new Error("Collection is not public");
    // const userCollection = await this.collectionsRepository.getById(
    //   destinationCollection
    // );
    // if (userCollection?.owner.id !== user.id)
    //   throw new Error("User is not owner of destination collection");
    // const versionToBeDuplicated =
    //   await this.activitiesRepository.Versions.findById(
    //     activity.lastVersion?.id,
    //     activityId
    //   );
    // const newActivity = await this.activitiesRepository.Activities.insert(
    //   user.id,
    //   userCollection.id
    // );
  }
}

export default UseCase;
