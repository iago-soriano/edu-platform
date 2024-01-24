import { VersionStatus, ActivityVersion } from "@domain";
import {
  ActivityVersionIsNotDraft,
  ActivityNotFound,
} from "@edu-platform/common";
import { IUseCase, UserSelectDTO, IActivitiesRepository } from "@interfaces";
import { VersionDTO } from "@dto";
import { IGetActivityUseCaseHelper } from "application/use-case-middlewares";

type InputParams = {
  user: UserSelectDTO;
  activityId: number;
  versionId: number;
  versionDto: VersionDTO;
};

type Return = void;

export type IUpdateActivityMetadataUseCase = IUseCase<InputParams, Return>;

class UseCase implements IUpdateActivityMetadataUseCase {
  constructor(
    private activitiesRepository: IActivitiesRepository,
    private getActivityHelper: IGetActivityUseCaseHelper
  ) {}

  async execute({ user, activityId, versionId, versionDto }: InputParams) {
    const { version: versionDbDto, activity } =
      await this.getActivityHelper.execute({
        activityId,
        versionId,
      });

    if (versionDbDto.status !== VersionStatus.Draft)
      throw new ActivityVersionIsNotDraft();

    if (activity.authorId !== user.id) throw new ActivityNotFound();

    const version = ActivityVersion.mapFromDto(versionDto);

    version.validateTitle();
    version.validateDescription();
    version.validateTopics();

    await this.activitiesRepository.Versions.update(versionId, {
      title: version.title,
      description: version.description,
      topics: version.topics,
    });
  }
}

export default UseCase;
