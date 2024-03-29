import {
  ActivitySelectDTO,
  IActivitiesRepository,
  IUseCase,
  UserSelectDTO,
  ActivityVersionSelectDTO,
  ICollectionParticipationsRepository,
  INotificationsRepository,
} from "@interfaces";
import { Activity, ActivityVersion, VersionStatus, Content } from "@domain";
import {
  ActivityVersionHasNoContent,
  ActivityVersionHasNoTitleOrNoDescription,
  FailedToUpdateVersionStatus,
  ActivityNotFound,
  ContentIsHalfCompleted,
  ActivityVersionNotFound,
} from "@edu-platform/common/";
import { HandlePublishDraft } from "./publish";
import { HandleRepublishArchived } from "./republish";
import { HandleArchivePublished } from "./archive";

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
  private _handlePublishDraft: HandlePublishDraft;
  private _handleArchivePublished: HandleArchivePublished;
  private _handleRepublishArchived: HandleRepublishArchived;

  constructor(
    private activitiesRepository: IActivitiesRepository,
    private collectionParticipationsRepository: ICollectionParticipationsRepository,
    private notificationsRepository: INotificationsRepository
  ) {
    this._handlePublishDraft = new HandlePublishDraft(
      activitiesRepository,
      collectionParticipationsRepository,
      notificationsRepository
    );
    this._handleArchivePublished = new HandleArchivePublished(
      activitiesRepository
    );
    this._handleRepublishArchived = new HandleRepublishArchived(
      activitiesRepository
    );
  }

  async execute({
    user,
    activityId,
    versionId,
    newActivityStatus,
  }: InputParams) {
    const version = await this.activitiesRepository.Versions.findById(
      versionId,
      activityId
    );
    if (!version) throw new ActivityVersionNotFound();

    if (version.activity?.author?.id !== user.id) throw new ActivityNotFound();

    if (
      version.status === VersionStatus.Draft &&
      newActivityStatus === VersionStatus.Published
    )
      return this._handlePublishDraft.execute(version.activity, version);

    if (
      version.status === VersionStatus.Archived &&
      newActivityStatus === VersionStatus.Published
    )
      return this._handleRepublishArchived.execute(version.activity, version);

    if (
      version.status === VersionStatus.Published &&
      newActivityStatus === VersionStatus.Archived
    )
      return this._handleArchivePublished.execute(version.activity);

    throw new FailedToUpdateVersionStatus(version.status, newActivityStatus);
  }
}

export default UseCase;
