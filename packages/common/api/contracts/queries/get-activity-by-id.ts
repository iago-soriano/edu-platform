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

const getActivityByIdQuerySchema = z
  .object({
    activityId: z.string(),
  })
  .merge(paginatedParamsSchema);

type Query = z.infer<typeof getActivityByIdQuerySchema>;

export type {
  ResponseBody as GetActivityByIdResponseBody,
  Query as GetActivityByIdQuery,
};
export { getActivityByIdQuerySchema };
