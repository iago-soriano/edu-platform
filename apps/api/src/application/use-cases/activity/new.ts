import { IUseCase, UserSelectDTO, IActivitiesRepository } from "@interfaces";
import { ActivityVersion } from "@domain";

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
      "",
      "",
      "",
      activityId,
      1
    );

    await this.activitiesRepository.Activities.update(activityId, {
      draftVersion: new ActivityVersion(versionId),
    });

    return { activityId, versionId };
  }
}

export default UseCase;
