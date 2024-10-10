import { z } from "zod";
import { paginatedParamsSchema, PaginatedResponse } from "../common";
import {
  ActivityLevel,
  ActivityType,
  Languages,
} from "../../../domain/domain/enums";

type ResponseBody = PaginatedResponse<{
  id: string;
  title: string;
  language: Languages;
  type: ActivityType;
  level: ActivityLevel;
  topics: string[];
}>;

const listMyActivitiesQuerySchema = z.object({}).merge(paginatedParamsSchema);

type Query = z.infer<typeof listMyActivitiesQuerySchema>;

export type {
  ResponseBody as ListMyActivitiesResponseBody,
  Query as ListMyActivitiesQuery,
};
export { listMyActivitiesQuerySchema };
