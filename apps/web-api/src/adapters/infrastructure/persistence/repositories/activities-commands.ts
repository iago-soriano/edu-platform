import { db, activities } from '../schema';
import { IActivitiesRepository } from 'application/interfaces';
import { eq } from 'drizzle-orm';
import { BaseRepository } from '@edu-platform/common/platform';
import { AllTables } from './all-tables';
import { ActivitySerializer } from '../serializers';

export const ActivityEntityNames = {
  Activity: AllTables['Activity'],
};

export class ActivitiesRepository
  extends BaseRepository<typeof AllTables>
  implements IActivitiesRepository
{
  constructor() {
    super(ActivityEntityNames, db);
  }

  async findActivities() {}

  async findActivityById(activityId: string) {}
}
