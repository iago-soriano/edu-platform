import { VersionStatus, ActivityVersion } from "@domain";
import {
  ActivityVersionIsNotDraft,
  ActivityNotFound,
} from "@edu-platform/common";
import { IUseCase, UserSelectDTO, IActivitiesRepository } from "@interfaces";
import { IGetActivityUseCaseHelper } from "application/use-case-middlewares";

type InputParams = {
  user: UserSelectDTO;
  activityId: number;
  versionId: number;
  newVersion: ActivityVersion;
};

type Return = void;

export type IUpdateActivityMetadataUseCase = IUseCase<InputParams, Return>;

class UseCase implements IUpdateActivityMetadataUseCase {
  constructor(
    private activitiesRepository: IActivitiesRepository,
    private getActivityHelper: IGetActivityUseCaseHelper
  ) {}

  async execute({ user, activityId, versionId, newVersion }: InputParams) {
    const { version, activity } = await this.getActivityHelper.execute({
      activityId,
      versionId,
    });

    if (version.status !== VersionStatus.Draft)
      throw new ActivityVersionIsNotDraft();

    if (activity.author.id !== user.id) throw new ActivityNotFound();

    newVersion.validateTitle();
    newVersion.validateDescription();
    newVersion.validateTopics();

    await this.activitiesRepository.Versions.update(versionId, {
      title: newVersion.title,
      description: newVersion.description,
      topics: newVersion.topics,
    });
  }
}

export default UseCase;
