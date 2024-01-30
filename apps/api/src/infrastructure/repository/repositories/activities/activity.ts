import { Activity } from "@domain";
import { ActivityDtoMapper } from "../../dto-mappers";
import { IActivities } from "@interfaces";
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

  async update(activityId: number, activity: Partial<Activity>) {
    await db.transaction(async (tx) => {
      await tx
        .update(activities)
        .set({ ...activity, updatedAt: new Date() })
        .where(eq(activities.id, activityId));
    });
  }

  async findById(activityId: number) {
    const dto = (
      await db.select().from(activities).where(eq(activities.id, activityId))
    )[0];
    return ActivityDtoMapper.mapFromSelectDto(dto);
  }
}
