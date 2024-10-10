import { db, activitiesGenerated, activitiesBlocks } from "../schema";
import { IActivitiesRepository } from "application/interfaces";
import { eq, and } from "drizzle-orm";
import { BaseRepository } from "@edu-platform/common/platform";
import { AllTables } from "./all-tables";

const ActivityEntityNames = {
  Activity: AllTables["Activity"],
};

export class ActivitiesRepository
  extends BaseRepository<typeof AllTables>
  implements IActivitiesRepository
{
  constructor() {
    super(ActivityEntityNames, db);
  }
}
