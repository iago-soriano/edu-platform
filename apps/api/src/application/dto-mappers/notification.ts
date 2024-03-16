import {
  NotificationRequestDTO,
  NotificationResponseDTO,
} from "@edu-platform/common";
import { Notification } from "@domain";
import { DomainDtoMapper } from "./types";

export const NotificationDtoMapper = {
  mapFromDto: (dto: NotificationRequestDTO) => {
    const notification = new Notification();

    notification.id = dto.id;
    notification.userId = dto.userId;
    notification.isNew = dto.isNew;
    notification.type = dto.type;
    notification.message = dto.message;
    notification.details = dto.details;

    return notification;
  },
};
