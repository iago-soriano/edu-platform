import {
  IUseCase,
  UserSelectDTO,
  IActivitiesRepository,
  ICollectionsRepository,
} from "@interfaces";
import { Activity, ActivityVersion, VersionStatus } from "@domain";

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
  constructor(
    private activitiesRepository: IActivitiesRepository,
    private collectionsRepository: ICollectionsRepository
  ) {}

  async execute({ user, collectionId }: InputParams) {
    const collection = await this.collectionsRepository.getById(collectionId);

    if (!collection) throw new Error("Coleção não encontrada");

    if (collection.owner.id !== user.id)
      throw new Error("Usuário não é dono da coleção");

    const { activityId } = await this.activitiesRepository.Activities.insert(
      user.id,
      collectionId
    );

    const activity = new Activity(activityId);

    const version = new ActivityVersion();
    version.activity = activity;
    version.version = 1;
    version.status = VersionStatus.Draft;

    const { versionId } =
      await this.activitiesRepository.Versions.insert(version);

    version.id = versionId;
    activity.draftVersion = version;

    await this.activitiesRepository.Activities.update(activity);

    return { activityId, versionId };
  }
}

export default UseCase;
