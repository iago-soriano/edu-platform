import { NotificationDtoMapper } from "./../dto-mappers/notification";
import {
  INotificationsReadRepository,
  INotificationsRepository,
} from "@interfaces";
import { Notification } from "@domain";
import { notifications } from "../schema";
import { and, count, eq } from "drizzle-orm";
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
}

// export class NotificationsReadRepository
//   implements INotificationsReadRepository
// {
//   async list({ userId }: { userId: number } & PaginatedParamsDTO) {
//     const notificationsByUser = await db
//       .select()
//       .from(notifications)
//       .where(eq(notifications.userId, userId));

//     const totalNew = await db
//       .select({ count: count() })
//       .from(notifications)
//       .where(
//         and(eq(notifications.userId, userId), eq(notifications.isNew, true))
//       );
//   }

//   // percorrer array e ver quantas são novas? Tem jeito mais fácil de pegar totalNew?
// }
