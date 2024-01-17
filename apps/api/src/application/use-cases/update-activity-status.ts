import {
  ActivityIsNotFound,
  ActivityVersionNotFound,
} from "@edu-platform/common";
import {
  ActivitySelectDTO,
  IActivitiesRepository,
  IUseCase,
  UserSelectDTO,
  ActivityVersionSelectDTO,
} from "@interfaces";
import { Activity, ActivityVersion, VersionStatus } from "@domain";
import {
  IGetActivityUseCaseHelper,
  IValidateActivityUserRelationUseCaseMiddleware,
} from "application/use-case-middlewares";

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
    private getActivityHelper: IGetActivityUseCaseHelper,
    private validateActivityUserRelationUseCaseMiddleware: IValidateActivityUserRelationUseCaseMiddleware
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

    await this.validateActivityUserRelationUseCaseMiddleware.execute({
      user,
      activity,
    });

    return this.handle({ activity, version, newActivityStatus });
  }

  async handle({
    activity: activityDto,
    version: versionDto,
    newActivityStatus,
  }: {
    activity: ActivitySelectDTO;
    version: ActivityVersionSelectDTO;
    newActivityStatus: VersionStatus;
  }) {
    const activity = Activity.mapFromDatabaseDto(activityDto);
    const version = ActivityVersion.mapFromDatabaseDto(versionDto);

    if (
      version.status === VersionStatus.Draft &&
      newActivityStatus === VersionStatus.Published
    ) {
      await this.handlePublishDraft(activity, version);
    } else if (
      version.status === VersionStatus.Archived &&
      newActivityStatus === VersionStatus.Published
    ) {
      await this.handlePublishArchived(activity, version);
    } else if (
      version.status === VersionStatus.Published &&
      newActivityStatus === VersionStatus.Archived
    ) {
      await this.handleArchivePublished(activity);
    }

    return {};
  }

  private handlePublishDraft = async (
    activity: Activity,
    version: ActivityVersion
  ) => {
    const { contents, questions } =
      await this.activitiesRepository.Versions.findElementsByVersionId(
        version.id
      );

    if (!contents || !contents.length) throw new Error("Não há conteúdos");

    if (activity.hasPublishedVersion()) {
      await this.activitiesRepository.Versions.update(
        activity.lastVersionId || 0,
        {
          status: VersionStatus.Published,
        }
      );
    }

    if (!version.title || !version.description)
      throw new Error("Deve haver título e descrição");

    let contentCounter = 0;

    // for (let content of contents) {
    //   const contentToBeVerified = Content.createContent({
    //     type: content.type,
    //     id: content.id,
    //     title: content.title,
    //     description: content.description,
    //     imageUrl: content.imageUrl,
    //     tracks: content.tracks,
    //     videoUrl: content.videoUrl,
    //     text: content.text,
    //     order: content.order,
    //     originatingVersionId: content.originatingVersionId,
    //   });

    //   if (contentToBeVerified.isHalfCompleted()) {
    //     throw new Error(
    //       `Conteúdo tem apenas título e/ou descrição. Título: ${contentToBeVerified.title}. Descrição: ${contentToBeVerified.description}`
    //     );
    //   } else if (contentToBeVerified.isEmpty()) {
    //     await this.activitiesRepository.deleteContentVersionRelation(
    //       content.id,
    //       versionId
    //     );
    //     await this.activitiesRepository.deleteContent(content.id);
    //   } else {
    //     contentCounter++;
    //   }
    // }

    if (contentCounter === 0) throw new Error("Não há conteúdos");

    await this.activitiesRepository.Versions.update(activity.draftVersionId, {
      status: "Published",
      version: (version.version || 0) + 1,
    });
    await this.activitiesRepository.Activities.update(activity.id, {
      lastVersionId: activity.draftVersionId,
      draftVersionId: null,
    });
  };

  private handlePublishArchived = async (
    activity: Activity,
    version: ActivityVersion
  ) => {
    if (activity.hasPublishedVersion()) {
      return activity.lastVersionId;
    } else {
      await this.activitiesRepository.Versions.update(version.id, {
        status: VersionStatus.Published,
      });
      await this.activitiesRepository.Activities.update(activity.id, {
        lastVersionId: version.id,
      });
    }
  };

  private handleArchivePublished = async (activity: Activity) => {
    await this.activitiesRepository.Versions.update(activity.lastVersionId, {
      status: VersionStatus.Archived,
    });
    await this.activitiesRepository.Activities.update(activity.id, {
      lastVersionId: null,
    });
  };
}

export default UseCase;
