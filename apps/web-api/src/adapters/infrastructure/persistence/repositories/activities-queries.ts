import { PaginatedParamsDTO } from '@edu-platform/common';
import { db, activities } from '../schema';
import { IActivitiesReadRepository } from 'application/interfaces';
import { eq } from 'drizzle-orm';

export class ActivitiesReadRepository implements IActivitiesReadRepository {
  async getActivities({ page, pageSize }: PaginatedParamsDTO) {}

  async getActivityById({
    activityId,
    page,
    pageSize,
  }: { activityId: string } & PaginatedParamsDTO) {}
}
