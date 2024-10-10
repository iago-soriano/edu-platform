import {
  ActivityLevel,
  ActivityType,
  Languages,
} from "../../../domain/domain/enums";
import { paginatedParamsSchema, PaginatedResponse } from "../common";
import { z } from "zod";

type ResponseBody = PaginatedResponse<{
  id: string;
  language: Languages;
  type: ActivityType;
  level: ActivityLevel;
  topics: string[];
}>;

const getActivitiesQuerySchema = z.object({}).merge(paginatedParamsSchema);

type Query = z.infer<typeof getActivitiesQuerySchema>;

export type {
  ResponseBody as GetActivitiesResponseBody,
  Query as GetActivitiesQuery,
};
export { getActivitiesQuerySchema };
