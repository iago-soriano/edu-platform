import {
  ActivitySelectDTO,
  IActivitiesRepository,
  IUseCase,
  UserSelectDTO,
  ActivityVersionSelectDTO,
} from "@interfaces";
import { Activity, ActivityVersion, VersionStatus, Content } from "@domain";
import { IGetActivityUseCaseHelper } from "application/use-case-middlewares";
import {
  ActivityVersionHasNoContent,
  ActivityVersionHasNoTitleOrNoDescription,
  FailedToUpdateVersionStatus,
  ActivityNotFound,
} from "@edu-platform/common/";
import { ContentIsHalfCompleted } from "@edu-platform/common/errors/domain/content";

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

    if (activity.authorId !== user.id) throw new ActivityNotFound();

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
    const { contents, questions } =
      await this.activitiesRepository.Versions.findElementsByVersionId(
        version.id
      );

    if (!contents || !contents.length) throw new ActivityVersionHasNoContent();

    // archive currently published version
    if (activity.hasPublishedVersion()) {
      await this.activitiesRepository.Versions.update(
        activity.lastVersionId || 0,
        {
          status: VersionStatus.Archived,
        }
      );
    }

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

    await this.activitiesRepository.Versions.update(activity.draftVersionId, {
      status: VersionStatus.Published,
      version: (version.version || 0) + 1,
    });

    await this.activitiesRepository.Activities.update(activity.id, {
      lastVersionId: activity.draftVersionId,
      draftVersionId: 0,
    });

    return {};
  };

  private handleRepublishArchived = async (
    activity: Activity,
    version: ActivityVersion
  ) => {
    //can't republish if there is another published version active
    if (activity.hasPublishedVersion())
      return { lastPublishedVersion: activity.lastVersionId };

    await this.activitiesRepository.Versions.update(version.id, {
      status: VersionStatus.Published,
    });
    await this.activitiesRepository.Activities.update(activity.id, {
      lastVersionId: version.id,
    });

    return {};
  };

  private handleArchivePublished = async (activity: Activity) => {
    await this.activitiesRepository.Versions.update(activity.lastVersionId, {
      status: VersionStatus.Archived,
    });
    await this.activitiesRepository.Activities.update(activity.id, {
      lastVersionId: 0,
    });

    return {};
  };
}

export default UseCase;
