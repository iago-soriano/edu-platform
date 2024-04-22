import { IUseCase } from "@edu-platform/common/platform";
import {
  UserSelectDTO,
  IActivitiesRepository,
  ICollectionsRepository,
} from "@application/interfaces";
import { ActivitiesFactory } from "@domain/entities";

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
    const res =
      await this.collectionsRepository.findByIdWithActivityCount(collectionId);

    if (!res) throw new Error("Collection not found");

    const { collection, activitiesCount } = res;

    const newActivity = ActivitiesFactory.from(
      collection,
      activitiesCount,
      user
    );

    return this.activitiesRepository.save(newActivity);
  }
}

export default UseCase;
