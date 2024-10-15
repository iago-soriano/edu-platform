import { Activity, ActivityGenerated } from "domain/entities";
import {
  GetActivitiesResponseBody,
  GetGeneratedActivityByIdResponseBody,
  GetMyActivityByIdResponseBody,
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

export interface IActivitiesRepository extends IAbstractRepository {
  findMyActivityById: (activityId: string) => Promise<Activity | null>;
}

export interface IActivitiesReadRepository {
  listGeneratedActivities: (
    args: {} & PaginatedParamsDTO
  ) => Promise<GetActivitiesResponseBody>;
  listMyActivities: (
    args: { userId: string } & PaginatedParamsDTO
  ) => Promise<ListMyActivitiesResponseBody>;
  getGeneratedActivityById: (
    activityId: string
  ) => Promise<GetGeneratedActivityByIdResponseBody | null>;
  getMyActivityById: (
    activityId: string
  ) => Promise<GetMyActivityByIdResponseBody | null>;
}
