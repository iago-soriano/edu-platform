import { NotificationDtoMapper } from "./../dto-mappers/notification";
import {
  INotificationsReadRepository,
  INotificationsRepository,
} from "@interfaces";
import { Notification, NotificationType } from "@domain";
import { notifications } from "../schema";
import { and, sql, eq } from "drizzle-orm";
import { PaginatedParamsDTO } from "@edu-platform/common";
import { db } from "@infrastructure";

export class NotificationsRepository implements INotificationsRepository {
  async insert(notification: Notification) {
    return (
      await db
        .insert(notifications)
        .values(NotificationDtoMapper.mapToInsertDto(notification))
        .returning({
          notificationId: notifications.id,
        })
    )[0];
  }
  async update(notificationId: number, isNew: boolean) {
    if (!notificationId) throw new Error("There must be an id to update");

    await db
      .update(notifications)
      .set({ isNew })
      .where(eq(notifications.id, notificationId));
  }

  async getNotificationById(notificationId: number) {
    const notification = (
      await db
        .select()
        .from(notifications)
        .where(eq(notifications.id, notificationId))
    )[0];

    return NotificationDtoMapper.mapFromSelectDto(notification);
  }
}

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
  // percorrer array e ver quantas são novas? Tem jeito mais fácil de pegar totalNew?
}
