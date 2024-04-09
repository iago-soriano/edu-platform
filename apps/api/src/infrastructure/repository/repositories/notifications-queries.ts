import {
  INotificationsReadRepository,
  INotificationsRepository,
} from "@interfaces";
import { Notification, NotificationType } from "@domain";
import { notifications } from "../schema";
import { and, sql, eq } from "drizzle-orm";
import { PaginatedParamsDTO } from "@edu-platform/common";
import { db } from "@infrastructure";

export class NotificationsReadRepository
  implements INotificationsReadRepository
{
  async list({
    userId,
    page,
    pageSize,
  }: { userId: number } & PaginatedParamsDTO) {
    const sq = db.$with("sq").as(
      db
        .select({
          id: notifications.id,
          isNew: notifications.isNew,
          type: notifications.type,
          message: notifications.message,
          details: notifications.details,
          totalNew: sql<number>`COUNT(CASE WHEN ${
            notifications.isNew
          } = ${true} THEN 1 END)`.as("totalNew"),
          total: sql<number>`COUNT(DISTINCT ${notifications.id})`.as("total"),
        })
        .from(notifications)
        .where(eq(notifications.userId, userId))
    );

    const dtos = await db
      .with(sq)
      .select()
      .from(sq)
      .limit(pageSize)
      .offset(page * pageSize);

    return {
      data: dtos.map((dto) => ({
        notification: {
          id: dto.id,
          isNew: dto.isNew,
          type: dto.type as NotificationType,
          message: dto.message,
          details: dto.details,
        },
        totalNew: dto.totalNew,
      })),

      pagination: {
        totalCount: dtos[0]?.total,
      },
    };
  }
}
