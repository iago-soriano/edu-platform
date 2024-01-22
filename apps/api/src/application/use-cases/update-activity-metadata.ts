import { VersionStatus, ActivityVersion } from "@domain";
import {
  ActivityIsNotDraft,
  ActivityIsNotFound,
  UserNotActivityAuthor,
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
    const { version, activity } = await this.getActivityHelper.execute({
      activityId,
      versionId,
    });

    if (version.status !== VersionStatus.Draft) throw new ActivityIsNotDraft();

    if (activity.authorId !== user.id) throw new ActivityIsNotFound();

    return this.handle({ versionId, dto: versionDto });
  }

  async handle({ versionId, dto }: { dto: VersionDTO; versionId: number }) {
    const version = ActivityVersion.mapFromDto(dto);

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
