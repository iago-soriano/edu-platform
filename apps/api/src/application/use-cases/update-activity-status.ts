import { Tabs } from "./../../../../web-app/src/components/tabs/index";
import { Content } from "@domain";
import {
  ActivityIsNotFound,
  ActivityVersionNotFound,
} from "@edu-platform/common";
import {
  ActivityContentSelectDTO,
  ActivitySelectDTO,
  ActivityVersionSelectDTO,
  IActivitiesRepository,
  IUseCase,
} from "@interfaces";
import { Activity } from "application/domain/activity";

type InputParams = {
  activityId: string;
  versionId: string;
  newActivityStatus: string;
};

type Return = {
  lastPublishedVersion?: number;
};

export type IUpdateActivityStatusUseCase = IUseCase<InputParams, Return>;

class UseCase implements IUpdateActivityStatusUseCase {
  constructor(private activitiesRepository: IActivitiesRepository) {}

  private handlePublishDraft = async (
    activityToBeUpdated: ActivitySelectDTO,
    version: ActivityVersionSelectDTO,
    contents: ActivityContentSelectDTO[],
    versionId: number,
    activityId: number
  ) => {
    if (!contents || !contents.length) throw new Error("Não há conteúdos");

    const activityHasPublishedVersion = Activity.hasPublishedVersion(
      activityToBeUpdated.lastVersionId
    );

    if (activityHasPublishedVersion) {
      await this.activitiesRepository.updateActivityVersion(
        activityToBeUpdated.lastVersionId,
        {
          status: "Archived",
        }
      );
    }

    if (!version.title || !version.description)
      throw new Error("Deve haver título e descrição");

    let contentCounter = 0;

    for (let content of contents) {
      const contentToBeVerified = Content.createContent({
        type: content.type,
        id: content.id,
        title: content.title,
        description: content.description,
        imageUrl: content.imageUrl,
        tracks: content.tracks,
        videoUrl: content.videoUrl,
        text: content.text,
        order: content.order,
        originatingVersionId: content.originatingVersionId,
      });

      if (contentToBeVerified.isHalfCompleted()) {
        throw new Error(
          `Conteúdo tem apenas título e/ou descrição. Título: ${contentToBeVerified.title}. Descrição: ${contentToBeVerified.description}`
        );
      } else if (contentToBeVerified.isEmpty()) {
        await this.activitiesRepository.deleteContentVersionRelation(
          content.id,
          versionId
        );
        await this.activitiesRepository.deleteContent(content.id);
      } else {
        contentCounter++;
      }
    }

    if (contentCounter === 0) throw new Error("Não há conteúdos");

    await this.activitiesRepository.updateActivityVersion(
      activityToBeUpdated.draftVersionId,
      {
        status: "Published",
        version: version.version + 1,
      }
    );
    await this.activitiesRepository.updateActivity(activityId, {
      lastVersionId: activityToBeUpdated.draftVersionId,
      draftVersionId: null,
    });
  };

  private handlePublishArchived = async (
    activityToBeUpdated: ActivitySelectDTO,
    versionId: number,
    activityId: number
  ) => {
    const activityHasPublishedVersion = Activity.hasPublishedVersion(
      activityToBeUpdated.lastVersionId
    );

    if (activityHasPublishedVersion) {
      return activityToBeUpdated.lastVersionId;
    } else {
      await this.activitiesRepository.updateActivityVersion(versionId, {
        status: "Published",
      });
      await this.activitiesRepository.updateActivity(activityId, {
        lastVersionId: versionId,
      });
    }
  };

  private handleArchivePublished = async (
    activityToBeUpdated: ActivitySelectDTO,
    activityId: number
  ) => {
    await this.activitiesRepository.updateActivityVersion(
      activityToBeUpdated.lastVersionId,
      { status: "Archived" }
    );
    await this.activitiesRepository.updateActivity(activityId, {
      lastVersionId: null,
    });
  };

  async execute({
    activityId: activityIdString,
    versionId: versionIdString,
    newActivityStatus,
  }: InputParams) {
    const activityId = parseInt(activityIdString);
    const versionId = parseInt(versionIdString);

    const validStatus = Activity.validateStatuses([newActivityStatus])[0];

    const activityToBeUpdated =
      await this.activitiesRepository.findActivityById(activityId);

    if (!activityToBeUpdated) throw new ActivityIsNotFound();

    const activityVersionToBeUpdated =
      await this.activitiesRepository.findVersionById(versionId);

    if (!activityVersionToBeUpdated) throw new ActivityVersionNotFound();

    if (
      activityVersionToBeUpdated.version.status === "Draft" &&
      validStatus === "Published"
    ) {
      await this.handlePublishDraft(
        activityToBeUpdated,
        activityVersionToBeUpdated.version,
        activityVersionToBeUpdated.contents,
        versionId,
        activityId
      );
    } else if (
      activityVersionToBeUpdated.version.status === "Archived" &&
      validStatus === "Published"
    ) {
      await this.handlePublishArchived(
        activityToBeUpdated,
        versionId,
        activityId
      );
    } else if (
      activityVersionToBeUpdated.version.status === "Published" &&
      validStatus === "Archived"
    ) {
      await this.handleArchivePublished(activityToBeUpdated, activityId);
    }

    return {};
  }
}

export default UseCase;
