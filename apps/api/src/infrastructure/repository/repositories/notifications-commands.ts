import { NotificationDtoMapper } from "../dto-mappers/notification";
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
