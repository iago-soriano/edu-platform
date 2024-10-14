import { ActivityGenerated } from "domain/entities";
import {
  GetActivitiesResponseBody,
  GetActivityByIdResponseBody,
  ListMyActivitiesResponseBody,
  PaginatedParamsDTO,
} from "@edu-platform/common";
import { IAbstractRepository } from "@edu-platform/common/platform";

export interface IActivitiesGeneratedRepository extends IAbstractRepository {
  findGeneratedActivityById: (
    activityId: string
  ) => Promise<ActivityGenerated | null>;
  findGeneratedActivityByParams: (
    languages: string,
    topics: string[],
    type: string,
    level: string
  ) => Promise<ActivityGenerated | null>;
}

export interface IActivitiesRepository extends IAbstractRepository {}

export interface IActivitiesReadRepository {
  listGeneratedActivities: (
    args: {} & PaginatedParamsDTO
  ) => Promise<GetActivitiesResponseBody>;
  listMyActivities: (
    args: { userId: string } & PaginatedParamsDTO
  ) => Promise<ListMyActivitiesResponseBody>;
  getGeneratedActivityById: (
    activityId: string
  ) => Promise<GetActivityByIdResponseBody>;
}
