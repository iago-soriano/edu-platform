import { z } from "zod";

export enum NotificationType {
  StudentOutputCompleted = "StudentOutputCompleted",
  FeedbackCompleted = "FeedbackCompleted",
  ActivityPublished = "ActivityPublished",
}

const notificationTypeSchema = z.nativeEnum(NotificationType);
export const parseNotificationType = notificationTypeSchema.parse;

export const notificationResponseSchema = z.object({
  id: z.number(),
  isNew: z.boolean(),
  type: z.nativeEnum(NotificationType),
  message: z.string(),
  details: z.string(),
});

export type NotificationResponseDTO = z.infer<
  typeof notificationResponseSchema
>;

export const notificationRequestSchema = z.object({
  id: z.number(),
  userId: z.number(),
  isNew: z.boolean(),
  type: z.nativeEnum(NotificationType),
  message: z.string(),
  details: z.string(),
});

export type NotificationRequestDTO = z.infer<typeof notificationRequestSchema>;
export const parseToNotificationRequestDTO = notificationRequestSchema.parse;
