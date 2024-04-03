import {
  IUseCase,
  UserSelectDTO,
  IActivitiesRepository,
  ICollectionsRepository,
  IIdGenerator,
} from "@interfaces";
import { Activity } from "@domain";
import { db } from "@infrastructure";

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
    private idService: IIdGenerator
  ) {}

  async execute({ user, collectionId }: InputParams) {
    const collection = await this.collectionsRepository.getById(collectionId);

    if (!collection) throw new Error("Collection not found");

    const newActivity = Activity.createNewInCollection(
      collection,
      user,
      this.idService
    );

    return this.activitiesRepository.save(newActivity);
  }
}

export default UseCase;
