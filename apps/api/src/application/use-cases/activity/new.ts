import { IUseCase, UserSelectDTO, IActivitiesRepository } from "@interfaces";

type InputParams = {
  user: UserSelectDTO;
  collectionId: number;
};

type Return = {
  activityId: number;
  versionId: number;
};

export type ICreateNewActivityUseCase = IUseCase<InputParams, Return>;

class UseCase implements ICreateNewActivityUseCase {
  constructor(private activitiesRepository: IActivitiesRepository) {}

  async execute({ user, collectionId }: InputParams) {
    const { activityId } = await this.activitiesRepository.Activities.insert(
      user.id,
      collectionId
    );

    const { versionId } = await this.activitiesRepository.Versions.insert(
      activityId,
      0
    );

    return { activityId, versionId };
  }
}

export default UseCase;
