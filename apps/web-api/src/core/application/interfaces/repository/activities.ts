import { Activity, VersionStatus } from "@core/domain/entities";
import {
  GetActivityVersionResponseBody,
  ListActivitiesForOwnerResponseBody,
  ListActivitiesForParticipantResponseBody,
  PaginatedParamsDTO,
} from "@edu-platform/common";
import { IAbstractRepository } from "@edu-platform/common/platform";

export interface IActivitiesRepository extends IAbstractRepository {
  findRootById: (activityId: string) => Promise<Activity | null>;
  findRootByIdWithElements: (activityId: string) => Promise<Activity | null>;
}

export interface IActivitiesReadRepository {
  listForCollectionOwner: (
    args: {
      userId: string;
      collectionId?: number;
    } & PaginatedParamsDTO
  ) => Promise<ListActivitiesForOwnerResponseBody>;
  listForCollectionParticipant: (
    args: {
      userId: string;
      collectionId?: number;
    } & PaginatedParamsDTO
  ) => Promise<ListActivitiesForParticipantResponseBody>;
  findFullVersionById: (
    activityId: string,
    status: VersionStatus,
    versionNumber?: number
  ) => Promise<GetActivityVersionResponseBody | null>;
}
