import { IUseCase, UserSelectDTO, IActivitiesRepository } from "@interfaces";
import { Activity, ActivityVersion } from "@domain";

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

    const activity = new Activity(activityId);

    const version = new ActivityVersion();
    version.activity = activity;
    version.version = 1;

    const { versionId } =
      await this.activitiesRepository.Versions.insert(version);

    version.id = versionId;
    activity.draftVersion = version;

    await this.activitiesRepository.Activities.update(activity);

    return { activityId, versionId };
  }
}

export default UseCase;
