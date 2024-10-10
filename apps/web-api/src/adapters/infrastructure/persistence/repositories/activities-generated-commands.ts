import { db, activitiesGenerated, activitiesBlocks } from "../schema";
import { IActivitiesRepository } from "application/interfaces";
import { eq, and } from "drizzle-orm";
import { BaseRepository } from "@edu-platform/common/platform";
import { AllTables } from "./all-tables";
import { ActivityGeneratedSerializer } from "../serializers";
import {
  ActivityLevel,
  ActivityType,
  Languages,
} from "@edu-platform/common/domain/domain/enums";

export const ActivityEntityNames = {
  ActivityGenerated: AllTables["ActivityGenerated"],
};

export class ActivitiesGeneratedRepository
  extends BaseRepository<typeof AllTables>
  implements IActivitiesRepository
{
  constructor() {
    super(ActivityEntityNames, db);
  }

  async findGeneratedActivityById(activityId: string) {
    const dto = await db
      .select()
      .from(activitiesGenerated)
      .leftJoin(
        activitiesBlocks,
        eq(activitiesGenerated.id, activitiesBlocks.activityGeneratedId)
      )
      .where(and(eq(activitiesGenerated.id, activityId)));

    const baseActivity = ActivityGeneratedSerializer.deserialize(
      dto[0].activitiesGenerated
    );

    return baseActivity;
  }

  async findGeneratedActivityByParams(
    language: string,
    topics: string[],
    type: string,
    level: string
  ) {
    const dto = await db
      .select()
      .from(activitiesGenerated)
      .leftJoin(
        activitiesBlocks,
        eq(activitiesGenerated.id, activitiesBlocks.activityGeneratedId)
      )
      .where(
        and(
          eq(activitiesGenerated.language, language),
          eq(activitiesGenerated.type, type),
          eq(activitiesGenerated.level, level),
          eq(activitiesGenerated.topics, topics)
        )
      );

    if (!dto.length) return null;

    const baseActivity = ActivityGeneratedSerializer.deserialize(
      dto[0]?.activitiesGenerated
    );

    return baseActivity;
  }
}
