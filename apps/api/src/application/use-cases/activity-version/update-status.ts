import {
  ActivitySelectDTO,
  IActivitiesRepository,
  IUseCase,
  UserSelectDTO,
  ActivityVersionSelectDTO,
} from "@interfaces";
import { Activity, ActivityVersion, VersionStatus, Content } from "@domain";
import { IGetActivityUseCaseHelper } from "@use-case-middlewares";
import {
  ActivityVersionHasNoContent,
  ActivityVersionHasNoTitleOrNoDescription,
  FailedToUpdateVersionStatus,
  ActivityNotFound,
  ContentIsHalfCompleted,
} from "@edu-platform/common/";

type InputParams = {
  user: UserSelectDTO;
  activityId: number;
  versionId: number;
  newActivityStatus: VersionStatus;
};

type Return = {
  lastPublishedVersion?: number;
};

export type IUpdateActivityStatusUseCase = IUseCase<InputParams, Return>;

class UseCase implements IUpdateActivityStatusUseCase {
  constructor(
    private activitiesRepository: IActivitiesRepository,
    private getActivityHelper: IGetActivityUseCaseHelper
  ) {}

  async execute({
    user,
    activityId,
    versionId,
    newActivityStatus,
  }: InputParams) {
    const { version, activity } = await this.getActivityHelper.execute({
      activityId,
      versionId,
    });

    if (activity.author.id !== user.id) throw new ActivityNotFound();

    if (
      version.status === VersionStatus.Draft &&
      newActivityStatus === VersionStatus.Published
    )
      return this.handlePublishDraft(activity, version);

    if (
      version.status === VersionStatus.Archived &&
      newActivityStatus === VersionStatus.Published
    )
      return this.handleRepublishArchived(activity, version);

    if (
      version.status === VersionStatus.Published &&
      newActivityStatus === VersionStatus.Archived
    )
      return this.handleArchivePublished(activity);

    throw new FailedToUpdateVersionStatus(version.status, newActivityStatus);
  }

  private handlePublishDraft = async (
    activity: Activity,
    version: ActivityVersion
  ) => {
    if (!activity.draftVersion) throw new Error("Draft version not found");

    const v = await this.activitiesRepository.Versions.findFullViewById(
      version.id
    );
    if (!v) throw new ActivityNotFound();

    const { contents, questions } = v;

    if (!contents || !contents.length) throw new ActivityVersionHasNoContent();

    if (!version.title || !version.description)
      throw new ActivityVersionHasNoTitleOrNoDescription();

    let contentCounter = contents.length;

    for (let content of contents) {
      if (content.isHalfCompleted())
        throw new ContentIsHalfCompleted(content.title, content.description);

      if (content.isEmpty()) {
        await this.activitiesRepository.Contents.delete(content.id || 0);
        contentCounter--;
      }
    }

    if (contentCounter === 0) throw new ActivityVersionHasNoContent();

    for (let question of questions) {
      await this.activitiesRepository.Questions.delete(question.id || 0);
    }

    // publish current draft
    await this.activitiesRepository.Versions.update(activity.draftVersion.id, {
      status: VersionStatus.Published,
      version: version.version,
    });

    // archive currently published version
    if (activity.lastVersion) {
      await this.activitiesRepository.Versions.update(activity.lastVersion.id, {
        status: VersionStatus.Archived,
      });
    }

    // update activity
    activity.lastVersion = new ActivityVersion(activity.draftVersion.id);
    activity.draftVersion = new ActivityVersion(0);

    await this.activitiesRepository.Activities.update(activity.id, activity);

    return {};
  };

  private handleRepublishArchived = async (
    activity: Activity,
    version: ActivityVersion
  ) => {
    //can't republish if there is another published version active
    if (activity.lastVersion)
      return { lastPublishedVersion: activity.lastVersion.id };

    await this.activitiesRepository.Versions.update(version.id, {
      status: VersionStatus.Published,
    });
    await this.activitiesRepository.Activities.update(activity.id, {
      lastVersion: new ActivityVersion(version.id),
    });

    return {};
  };

  private handleArchivePublished = async (activity: Activity) => {
    if (!activity.lastVersion) throw new Error("Published version not found");

    await this.activitiesRepository.Versions.update(activity.lastVersion.id, {
      status: VersionStatus.Archived,
    });
    await this.activitiesRepository.Activities.update(activity.id, {
      lastVersion: new ActivityVersion(0),
    });

    return {};
  };
}

export default UseCase;
