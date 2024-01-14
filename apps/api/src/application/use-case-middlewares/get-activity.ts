import {
  IUseCase,
  IActivitiesRepository,
  ActivitySelectDTO,
  CompleteVersionSelectDTO,
} from "@interfaces";
import {
  ActivityIsNotFound,
  ActivityVersionNotFound,
} from "@edu-platform/common";

type InputParams = {
  activityId: number;
  versionId: number;
};

type Return = {
  activity: ActivitySelectDTO;
  version: CompleteVersionSelectDTO;
};

export type IGetActivityUseCaseHelper = IUseCase<InputParams, Return>;

class UseCase implements IGetActivityUseCaseHelper {
  constructor(private activitiesRepository: IActivitiesRepository) {}

  async execute({ activityId, versionId }: InputParams) {
    const activity =
      await this.activitiesRepository.findActivityById(activityId);
    if (!activity) throw new ActivityIsNotFound();

    const version = await this.activitiesRepository.findVersionById(versionId);
    if (!version) throw new ActivityVersionNotFound();

    if (version.version.activityId !== activityId)
      throw new ActivityVersionNotFound();

    return {
      activity,
      version,
    };
  }
}

export default UseCase;
