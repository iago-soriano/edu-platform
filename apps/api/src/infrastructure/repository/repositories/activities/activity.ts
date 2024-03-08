import { Activity } from "@domain";
import { ActivityDtoMapper } from "../../dto-mappers";
import { IActivities } from "@interfaces";
import {
  db,
  activities,
  activityVersions,
  collections,
  users,
} from "@infrastructure";
import { eq } from "drizzle-orm";
import { alias } from "drizzle-orm/pg-core";

export class Activities implements IActivities {
  async insert(authorId: number, collectionId: number) {
    return (
      await db
        .insert(activities)
        .values({ authorId, collectionId })
        .returning({ activityId: activities.id })
    )[0];
  }

  async update(activity: Activity) {
    if (!activity.id) throw new Error("There must be an id to update");

    await db
      .update(activities)
      .set(ActivityDtoMapper.mapToInsertDto(activity))
      .where(eq(activities.id, activity.id));
  }

  async findById(activityId: number) {
    const dto = (
      await db.select().from(activities).where(eq(activities.id, activityId))
    )[0];
    return ActivityDtoMapper.mapFromSelectDto(dto);
  }

  async findFullViewById(activityId: number) {
    const draftVersions = alias(activityVersions, "draftVersions");
    const lastVersions = alias(activityVersions, "lastVersions");

    const dto = (
      await db
        .select()
        .from(activities)
        .leftJoin(draftVersions, eq(draftVersions.id, activities.lastVersionId))
        .leftJoin(lastVersions, eq(lastVersions.id, activities.lastVersionId))
        .innerJoin(collections, eq(collections.id, activities.collectionId))
        .innerJoin(users, eq(users.id, activities.authorId))
        .where(eq(activities.id, activityId))
    )[0];

    return ActivityDtoMapper.mapFromSelectDto(
      dto.activities,
      dto.draftVersions || undefined,
      dto.lastVersions || undefined,
      dto.collections,
      dto.users
    );
  }
}
