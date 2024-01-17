import {
  IUseCase,
  IActivitiesRepository,
  ActivitySelectDTO,
  ActivityVersionSelectDTO,
  ActivityContentSelectDTO,
} from "@interfaces";
import {
  ActivityIsNotFound,
  ActivityVersionNotFound,
  ActivityContentNotFound,
} from "@edu-platform/common";

type InputParams = {
  activityId: number;
  versionId: number;
  contentId?: number;
};

type Return = {
  activity: ActivitySelectDTO;
  version: ActivityVersionSelectDTO;
  content?: ActivityContentSelectDTO;
};

export type IGetActivityUseCaseHelper = IUseCase<InputParams, Return>;

class UseCase implements IGetActivityUseCaseHelper {
  constructor(private activitiesRepository: IActivitiesRepository) {}

  async execute({ activityId, versionId, contentId }: InputParams) {
    const activity =
      await this.activitiesRepository.Activities.findById(activityId);
    if (!activity) throw new ActivityIsNotFound();

    const version =
      await this.activitiesRepository.Versions.findSimpleViewById(versionId);
    if (!version) throw new ActivityVersionNotFound();

    if (version.activityId !== activityId) throw new ActivityVersionNotFound();

    let content;

    if (contentId) {
      content = await this.activitiesRepository.Contents.findById(contentId);

      if (!content) throw new ActivityContentNotFound();

      // TODO: check if content belongs to this version
      // const { contents } = await this.activitiesRepository.Versions.findElementsByVersionId(versionId);
      // if (contents.map(content => content.id))
    }

    return {
      activity,
      version,
      content,
    };
  }
}

export default UseCase;
