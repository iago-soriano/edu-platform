import { Content, Activity, BaseElement, ActivityVersion } from "@domain";
import {
  GetActivityVersionResponseBody,
  ListActivityVersionsResponseBody,
  PaginatedParamsDTO,
} from "@edu-platform/common";
import { PersistencePathStep, IAbstractRepository } from "./abstract";

export interface IActivitiesRepository extends IAbstractRepository {
  save: (activity: Activity) => Promise<any>;
  findRootById: (activityId: string) => Promise<Activity | null>;
  findRootByIdWithContents: (activityId: string) => Promise<Activity | null>;
}

export interface IActivitiesReadRepository {
  listByCollectionOwnership: (
    args: {
      userId: number;
      collectionId?: number;
    } & PaginatedParamsDTO
  ) => Promise<ListActivityVersionsResponseBody>;
  // listByCollectionParticipation: (
  //   userId: number,
  //   collectionId?: number
  // ) => Promise<{ collection: Collection; version: ActivityVersion }[]>;
  findFullViewById: (
    activityId: string
  ) => Promise<GetActivityVersionResponseBody | null>;
}
