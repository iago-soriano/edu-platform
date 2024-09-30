import { z } from "zod";
import {
  PaginatedParamsDTO,
  PaginatedResponse,
  paginatedParamsSchema,
} from "../../common";

enum NotificationType {
  StudentOutputCompleted = "StudentOutputCompleted",
  FeedbackCompleted = "FeedbackCompleted",
  ActivityPublished = "ActivityPublished",
  StudentOutputCreated = "StudentOutputCreated",
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

const listNotificationQuerySchema = paginatedParamsSchema;

type Query = z.infer<typeof listNotificationQuerySchema>;

export type {
  ResponseBody as ListNotificationsResponseBody,
  Query as ListNotificationsQuery,
};

export { listNotificationQuerySchema };
