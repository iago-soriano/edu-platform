import { Activity } from 'domain/entities';
import {
  GetActivitiesResponseBody,
  GetActivityByIdResponseBody,
  PaginatedParamsDTO,
} from '@edu-platform/common';
import { IAbstractRepository } from '@edu-platform/common/platform';

export interface IActivitiesRepository extends IAbstractRepository {
  findActivities: () => Promise<void>;
  findActivityById: (activityId: string) => Promise<void>;
}

export interface IActivitiesReadRepository {
  getActivities: (args: {} & PaginatedParamsDTO) => Promise<void>;
  getActivityById: (
    args: { activityId: string } & PaginatedParamsDTO
  ) => Promise<void>;
}
