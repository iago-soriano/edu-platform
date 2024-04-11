import {
  IUseCase,
  UserSelectDTO,
  IActivitiesRepository,
  ICollectionsRepository,
} from "@interfaces";
import { ActivitiesFactory } from "@domain";

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
    private collectionsRepository: ICollectionsRepository
  ) {}

  async execute({ user, collectionId }: InputParams) {
    const collection =
      await this.collectionsRepository.findRootById(collectionId);

    if (!collection) throw new Error("Collection not found");

    const newActivity = ActivitiesFactory.from(collection, user);

    return this.activitiesRepository.save(newActivity);
  }
}

export default UseCase;
