import {
  IUseCase,
  UserSelectDTO,
  IActivitiesRepository,
  ICollectionsRepository,
  IIdGenerator,
} from "@interfaces";
import { Activity, IActivitiesFactory } from "@domain";

type InputParams = {
  user: UserSelectDTO;
  collectionId: number;
};

type Return = {
  activityId: string;
};

export type ICreateNewActivityUseCase = IUseCase<InputParams, Return>;

class UseCase implements ICreateNewActivityUseCase {
  constructor(
    private activitiesRepository: IActivitiesRepository,
    private collectionsRepository: ICollectionsRepository,
    private activitiesFactory: IActivitiesFactory
  ) {}

  async execute({ user, collectionId }: InputParams) {
    const collection =
      await this.collectionsRepository.findRootById(collectionId);

    if (!collection) throw new Error("Collection not found");

    const newActivity = this.activitiesFactory.from(collection, user);

    return this.activitiesRepository.save(newActivity);
  }
}

export default UseCase;
