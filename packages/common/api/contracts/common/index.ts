import { z } from "zod";
import {
  Languages,
  ActivityType,
  ActivityLevel,
  ActivityStatus,
  OutputStatus,
  ActivityBlockType,
  ActivityTopics,
} from "../../../domain/enums";

export const languagesSchema = z.nativeEnum(Languages);
export const languages = languagesSchema.parse;

export const activityTypeSchema = z.nativeEnum(ActivityType);
export const activityType = activityTypeSchema.parse;

export const activityTopicsSchema = z.nativeEnum(ActivityTopics);
export const activityTopics = activityTopicsSchema.parse;

export const activityLevelSchema = z.nativeEnum(ActivityLevel);
export const activityLevel = activityLevelSchema.parse;

export const activityStatusSchema = z.nativeEnum(ActivityStatus);
export const activityStatus = activityStatusSchema.parse;

export const outputStatusSchema = z.nativeEnum(OutputStatus);
export const outputStatus = outputStatusSchema.parse;

export const activityBlockTypeSchema = z.nativeEnum(ActivityBlockType);
export const activityBlockType = activityBlockTypeSchema.parse;

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
