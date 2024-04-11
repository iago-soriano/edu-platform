import {
  Content,
  Activity,
  BaseElement,
  ActivityVersion,
} from "@domain/entities";
import {
  GetDraftVersionResponseBody,
  ListActivitiesForOwnerResponseBody,
  ListActivitiesForParticipantResponseBody,
  PaginatedParamsDTO,
} from "@edu-platform/common";
import { IAbstractRepository } from "../../../infrastructure/persistence/interfaces";

export interface IActivitiesRepository extends IAbstractRepository {
  findRootById: (activityId: string) => Promise<Activity | null>;
  findRootByIdWithElements: (activityId: string) => Promise<Activity | null>;
}

export interface IActivitiesReadRepository {
  listForCollectionOwner: (
    args: {
      userId: number;
      collectionId?: number;
    } & PaginatedParamsDTO
  ) => Promise<ListActivitiesForOwnerResponseBody>;
  listForCollectionParticipant: (
    args: {
      userId: number;
      collectionId?: number;
    } & PaginatedParamsDTO
  ) => Promise<ListActivitiesForParticipantResponseBody>;
  findFullDraftViewById: (
    activityId: string,
    user: { id: number }
  ) => Promise<GetDraftVersionResponseBody | null>;
}
