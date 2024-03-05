import { Activity, ActivityVersion, VersionStatus, Content } from "@domain";
import {
  ActivityVersionHasNoContent,
  ActivityVersionHasNoTitleOrNoDescription,
  FailedToUpdateVersionStatus,
  ActivityNotFound,
  ContentIsHalfCompleted,
} from "@edu-platform/common/";
import {
  ActivitySelectDTO,
  IActivitiesRepository,
  IUseCase,
  UserSelectDTO,
  ActivityVersionSelectDTO,
} from "@interfaces";

export class HandleRepublishArchived {
  constructor(private activitiesRepository: IActivitiesRepository) {}
  async execute(activity: Activity, version: ActivityVersion) {
    if (activity.lastVersion)
      return { lastPublishedVersion: activity.lastVersion.id };

    version.status = VersionStatus.Published;
    await this.activitiesRepository.Versions.update(version);

    activity.lastVersion = new ActivityVersion(version.id);
    await this.activitiesRepository.Activities.update(activity);

    return {};
  }
}
