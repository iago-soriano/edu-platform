import {
  ActivityFormat,
  ActivityLevel,
  ActivityStatus,
  Languages,
  paginatedParamsSchema,
  PaginatedResponse,
} from "../common";
import { z } from "zod";

type ResponseBody = PaginatedResponse<{
  id: string;
  requestingUserId: string;
  language: Languages;
  format: ActivityFormat;
  level: ActivityLevel;
  status: ActivityStatus;
}>;

const getActivitiesQuerySchema = z.object({}).merge(paginatedParamsSchema);

type Query = z.infer<typeof getActivitiesQuerySchema>;

export type {
  ResponseBody as GetActivitiesResponseBody,
  Query as GetActivitiesQuery,
};
export { getActivitiesQuerySchema };
