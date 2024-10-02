import { z } from "zod";

export enum Languages {}

export enum ActivityFormat {
  READING = "READING",
  LISTENING = "LISTENING",
}

export enum ActivityLevel {
  BASIC = "BASIC",
  INTERMEDIATE = "INTERMEDIATE",
  ADVANCED = "ADVANCED",
}

export enum ActivityStatus {
  PENDING = "PENDING",
  READY = "READY",
}

export enum OutputStatus {
  PENDING = "PENDING",
  READY = "READY",
  REVIEWED = "REVIEWED",
}

export const languagesSchema = z.nativeEnum(Languages);
export const languages = languagesSchema.parse;

export const activityFormatSchema = z.nativeEnum(ActivityFormat);
export const activityFormat = activityFormatSchema.parse;

export const activityLevelSchema = z.nativeEnum(ActivityLevel);
export const activityLevel = activityLevelSchema.parse;

export const activityStatusSchema = z.nativeEnum(ActivityStatus);
export const activityStatus = activityStatusSchema.parse;

export const outputStatusSchema = z.nativeEnum(OutputStatus);
export const outputStatus = outputStatusSchema.parse;

export const paginatedParamsSchema = z.object({
  page: z.coerce.number().nonnegative(),
  pageSize: z.coerce.number().positive().optional(),
});

export type PaginatedParamsDTO = z.infer<typeof paginatedParamsSchema>;
export const parseToPaginatedParamsDTO = paginatedParamsSchema.parse;

export type PaginatedResponse<T> = {
  data: T[];
  pagination: {
    totalCount: number;
  };
};
