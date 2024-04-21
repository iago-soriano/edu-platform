import { notifications } from "../../schema";
import { Notification, NotificationType } from "@domain/entities";
import { ChangeTrackingProxy } from "@edu-platform/common/platform";

export class NotificationSerializer {
  static serialize(domain: Notification) {
    const dto: typeof notifications.$inferInsert = {
      id: domain.id as number,
      userId: domain.userId,
      isUnread: domain.isUnread,
      type: domain.type,
      message: domain.message,
      details: domain.details,
    };
    return dto;
  }

  static deserialize(dto: typeof notifications.$inferSelect) {
    const notification = new Notification();

    notification.id = dto.id;
    notification.userId = dto.userId;
    notification.isUnread = dto.isUnread;
    notification.type = dto.type as NotificationType;
    notification.message = dto.message;
    notification.details = dto.details;

    notification.isNew = false;

    const proxiedEntity = new ChangeTrackingProxy(notification) as Notification;

    return proxiedEntity;
  }
}
