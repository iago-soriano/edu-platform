import {
  db,
  activitiesGenerated,
  activitiesBlocks,
  activities,
} from "../schema";
import { IActivitiesRepository } from "application/interfaces";
import { eq, and } from "drizzle-orm";
import { BaseRepository } from "@edu-platform/common/platform";
import { AllTables } from "./all-tables";
import { ActivitySerializer } from "../serializers";

const ActivityEntityNames = {
  Activity: AllTables["Activity"],
  ActivityBlock: AllTables["ActivityBlock"],
};

export class ActivitiesRepository
  extends BaseRepository<typeof AllTables>
  implements IActivitiesRepository
{
  constructor() {
    super(ActivityEntityNames, db);
  }

  async findMyActivityById(activityId: string) {
    const dto = await db
      .select()
      .from(activities)
      .leftJoin(
        activitiesBlocks,
        eq(activities.id, activitiesBlocks.activityId)
      )
      .where(and(eq(activities.id, activityId)));

    if (!dto[0]) return null;

    const baseActivity = ActivitySerializer.deserialize(dto[0].activities);

    return baseActivity;
  }
}
