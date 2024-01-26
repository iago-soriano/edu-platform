import { IActivities, ActivityInsertDTO } from "@interfaces";
import { db, activities } from "@infrastructure";
import { eq } from "drizzle-orm";

export class Activities implements IActivities {
  async insert(authorId: number) {
    return (
      await db
        .insert(activities)
        .values({ authorId })
        .returning({ activityId: activities.id })
    )[0];
  }

  async update(
    activityId: number,
    { lastVersionId, draftVersionId }: ActivityInsertDTO
  ) {
    await db.transaction(async (tx) => {
      await tx
        .update(activities)
        .set({ lastVersionId, draftVersionId, updatedAt: new Date() })
        .where(eq(activities.id, activityId));
    });
  }

  async findById(activityId: number) {
    return (
      await db.select().from(activities).where(eq(activities.id, activityId))
    )[0];
  }
}
