import { PaginatedParamsDTO, PaginatedResponse } from "../../common";
import { z } from "zod";

enum NotificationType {
  StudentOutputCompleted = "StudentOutputCompleted",
  FeedbackCompleted = "FeedbackCompleted",
  ActivityPublished = "ActivityPublished",
}

type NotificationDto = {
  id: number;
  isNew: boolean;
  type: NotificationType;
  message: string;
  details: string;
};

type ResponseBody = PaginatedResponse<{
  notification: NotificationDto;
  totalUnread: number;
}>;

type Query = PaginatedParamsDTO;

export {
  ResponseBody as ListNotificationsResponseBody,
  Query as ListNotificationsQuery,
};
