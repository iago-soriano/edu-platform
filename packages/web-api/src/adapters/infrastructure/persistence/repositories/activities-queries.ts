import { PaginatedParamsDTO } from "@edu-platform/common";
import {
  db,
  activities,
  activitiesBlocks,
  activitiesGenerated,
} from "../schema";
import { IActivitiesReadRepository } from "application/interfaces";
import { eq, desc } from "drizzle-orm";
import { sql } from "drizzle-orm";
import {
  ActivityBlockType,
  ActivityLevel,
  ActivityStatus,
  ActivityType,
  Languages,
} from "@edu-platform/common/domain/enums";
import { sortActivityBlocks } from "./utils";

export class ActivitiesReadRepository implements IActivitiesReadRepository {
  async listGeneratedActivities({ page, pageSize }: PaginatedParamsDTO) {
    const activityList = await db
      .select({
        id: activitiesGenerated.id,
        language: activitiesGenerated.language,
        topics: activitiesGenerated.topics,
        type: activitiesGenerated.type,
        level: activitiesGenerated.level,
        totalActivitiesCount:
          sql<number>`COUNT(${activitiesGenerated.id}) OVER ()`.as(
            "totalActivitiesCount"
          ),
      })
      .from(activitiesGenerated)
      .orderBy(desc(activitiesGenerated.updatedAt))
      .limit(pageSize || 10)
      .offset(page * (pageSize || 10));

    return {
      data: activityList.map((act) => ({
        id: act.id,
        language: act.language as Languages,
        topics: act.topics,
        type: act.type as ActivityType,
        level: act.level as ActivityLevel,
      })),
      pagination: { totalCount: activityList[0]?.totalActivitiesCount },
    };
  }

  async listMyActivities({
    page,
    pageSize,
    userId,
  }: { userId: string } & PaginatedParamsDTO) {
    const activityList = await db
      .select({
        id: activities.id,
        requestingUserId: activities.requestingUserId,
        activityGeneratedId: activities.activityGeneratedId,
        title: activities.title,
        language: activitiesGenerated.language,
        topics: activitiesGenerated.topics,
        level: activitiesGenerated.level,
        type: activitiesGenerated.type,
        totalActivitiesCount:
          sql<number>`COUNT(${activitiesGenerated.id}) OVER ()`.as(
            "totalActivitiesCount"
          ),
      })
      .from(activities)
      .leftJoin(
        activitiesGenerated,
        eq(activities.activityGeneratedId, activitiesGenerated.id)
      )
      .where(eq(activities.requestingUserId, userId))
      .orderBy(desc(activities.updatedAt))
      .limit(pageSize || 10)
      .offset(page * (pageSize || 10));

    return {
      data: activityList.map((act) => ({
        id: act.id,
        title: act.title || "",
        language: act.language as Languages,
        topics: act.topics!,
        level: act.level as ActivityLevel,
        type: act.type as ActivityType,
      })),
      pagination: { totalCount: activityList[0]?.totalActivitiesCount ?? 0 },
    };
  }

  async getGeneratedActivityById(activityId: string) {
    const activity = await db
      .select()
      .from(activitiesGenerated)
      .where(eq(activitiesGenerated.id, activityId))
      .leftJoin(
        activitiesBlocks,
        eq(activitiesGenerated.id, activitiesBlocks.activityGeneratedId)
      );

    if (!activity[0]) return null;

    return {
      activityGenerated: {
        id: activity[0].activitiesGenerated.id,
        language: activity[0].activitiesGenerated.language as Languages,
        topics: activity[0].activitiesGenerated.topics,
        type: activity[0].activitiesGenerated.type as ActivityType,
        level: activity[0].activitiesGenerated.level as ActivityLevel,
        status: activity[0].activitiesGenerated.status as ActivityStatus,

        activityBlocks: sortActivityBlocks(
          activity.map((activity) => ({
            id: activity.activitiesBlocks?.id || "",
            type: activity.activitiesBlocks?.type as ActivityBlockType,
            data: activity.activitiesBlocks?.data as string,
          }))
        ),
      },
    };
  }

  async getMyActivityById(activityId: string) {
    const activity = await db
      .select()
      .from(activities)
      .where(eq(activities.id, activityId))
      .leftJoin(
        activitiesBlocks,
        eq(activities.id, activitiesBlocks.activityId)
      );

    if (!activity[0]) return null;

    return {
      activity: {
        id: activity[0].activities.id,
        requestingUserId: activity[0].activities.requestingUserId,
        title: activity[0].activities.title ?? "",

        activityBlocks: sortActivityBlocks(
          activity.map((activity) => ({
            id: activity.activitiesBlocks?.id || "",
            type: activity.activitiesBlocks?.type as ActivityBlockType,
            data: activity.activitiesBlocks?.data as string,
          }))
        ),
      },
    };
  }
}
