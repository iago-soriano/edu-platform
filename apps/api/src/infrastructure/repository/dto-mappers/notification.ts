import { parseNotificationType } from "@edu-platform/common";
import { Notification } from "@domain";
import { notifications } from "@infrastructure";

export const NotificationDtoMapper = {
  mapFromSelectDto: (dto: typeof notifications.$inferSelect) => {
    const notification = new Notification();

    notification.id = dto.id;
    notification.userId = dto.userId;
    notification.isNew = dto.isNew;
    notification.type = parseNotificationType(dto.type);
    notification.message = dto.message || "";
    notification.details = dto.details || "";

    return notification;
  },

  mapToInsertDto: (domain: Notification) => {
    const dto: typeof notifications.$inferInsert = {
      userId: domain.userId,
      isNew: domain.isNew,
      type: domain.type,
      message: domain.message,
      details: domain.details,
    };
    return dto;
  },
};
