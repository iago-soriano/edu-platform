import { notifications } from "../../schema";
import { Notification, NotificationType } from "@domain/entities";
import { ChangeEventsTree } from "../../interfaces";

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

  static deserialize(
    dto: typeof notifications.$inferSelect,
    _events: ChangeEventsTree
  ) {
    const notification = new Notification();

    notification.id = dto.id;
    notification.userId = dto.userId;
    notification.isUnread = dto.isUnread;
    notification.type = dto.type as NotificationType;
    notification.message = dto.message;
    notification.details = dto.details;

    notification.isNew = false;

    _events[dto.id].Notification = {
      ..._events[dto.id].Notification,
      [dto.id]: {},
    };

    const proxiedEntity = new Proxy(notification, {
      set: function (target: object, prop: string, value: any) {
        _events[prop] = value;
        Reflect.set(target, prop, value);
        return true;
      },
    }) as Notification;

    return proxiedEntity;
  }
}
