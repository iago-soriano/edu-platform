import { Activity, ActivityVersion, VersionStatus, Content } from "@domain";
import {
  ActivityVersionHasNoContent,
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

export class HandleArchivePublished {
  constructor(private activitiesRepository: IActivitiesRepository) {}
  async execute(activity: Activity) {
    // if (!activity.lastVersion) throw new Error("Published version not found");
    // activity.lastVersion.status = VersionStatus.Archived;
    // await this.activitiesRepository.Versions.update(activity.lastVersion);
    // activity.lastVersion = undefined;
    // await this.activitiesRepository.Activities.update(activity);
    // return {};
  }
}
