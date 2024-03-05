import { VersionStatus, ActivityVersion } from "@domain";
import {
  ActivityVersionIsNotDraft,
  ActivityNotFound,
  ActivityVersionNotFound,
} from "@edu-platform/common";
import { IUseCase, UserSelectDTO, IActivitiesRepository } from "@interfaces";

type InputParams = {
  user: UserSelectDTO;
  activityId: number;
  versionId: number;
  newVersion: ActivityVersion;
};

type Return = void;

export type IUpdateActivityMetadataUseCase = IUseCase<InputParams, Return>;

class UseCase implements IUpdateActivityMetadataUseCase {
  constructor(private activitiesRepository: IActivitiesRepository) {}

  async execute({ user, activityId, versionId, newVersion }: InputParams) {
    const version = await this.activitiesRepository.Versions.findFullViewById(
      versionId,
      activityId
    );
    if (!version) throw new ActivityVersionNotFound();

    if (version.activity.author.id !== user.id) throw new ActivityNotFound();

    if (version.status !== VersionStatus.Draft)
      throw new ActivityVersionIsNotDraft();

    newVersion.validateTitle();
    newVersion.validateDescription();
    newVersion.validateTopics();

    version.merge(newVersion);

    await this.activitiesRepository.Versions.update(version);
  }
}

export default UseCase;
