import {
  IActivitiesRepository,
  ActivityInsertDTO,
  ActivityContentInsertDTO,
} from "@interfaces";
import {
  db,
  activities,
  activityVersions,
  activityHasTopicsRelationTable,
  activityContents,
} from "@infrastructure";
import { eq, and } from "drizzle-orm";

export class ActivityRepository implements IActivitiesRepository {
  async insertActivityAndNewVersion(
    activity: ActivityInsertDTO,
    topicIds: number[]
  ) {
    try {
      return await db.transaction(async (tx) => {
        const [{ activityId }] = await tx
          .insert(activities)
          .values(activity)
          .returning({ activityId: activities.id });
        const [{ versionId }] = await tx
          .insert(activityVersions)
          .values({ activityId })
          .returning({ versionId: activityVersions.id });
        await tx
          .update(activities)
          .set({ lastVersionId: versionId })
          .where(eq(activities.id, activityId));

        const topicRelationInserts = topicIds.map(
          async (topicId) =>
            await tx.insert(activityHasTopicsRelationTable).values({
              activityId,
              topicId,
            })
        );

        await Promise.all(topicRelationInserts);

        return { activityId, versionId };
      });
    } catch (ex) {
      console.log(ex);
    }
  }

  async getActivityById(activityId: number) {
    return (
      await db.select().from(activities).where(eq(activities.id, activityId))
    )[0];
  }

  async updateActivity(
    activityId: number,
    activity: ActivityInsertDTO,
    topicIds?: number[]
  ) {
    await db.transaction(async (tx) => {
      await tx
        .update(activities)
        .set({ ...activity, updatedAt: new Date() })
        .where(eq(activities.id, activityId));

      if (topicIds) {
        await tx
          .delete(activityHasTopicsRelationTable)
          .where(eq(activityHasTopicsRelationTable.activityId, activityId));

        const topicRelationInserts = topicIds.map(
          async (topicId) =>
            await tx.insert(activityHasTopicsRelationTable).values({
              activityId,
              topicId,
            })
        );

        await Promise.all(topicRelationInserts);
      }
    });
  }

  async insertContent(content: ActivityContentInsertDTO) {
    return (
      await db
        .insert(activityContents)
        .values(content)
        .returning({ contentId: activityContents.id })
    )[0];
  }
}
