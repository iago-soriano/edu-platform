import { paginatedParamsSchema, PaginatedResponse } from "../../common";
import { z } from "zod";

type ActivityVersionDto = {
  id: number;
  description: string;
  title: string;
  updatedAt: Date;
  version: number;
  topics: string;
} | null;
type ResponseBody = PaginatedResponse<{
  collectionName: string;
  activityId: string;
  draft: ActivityVersionDto;
  published: ActivityVersionDto;
  archivedVersionsCount: number;
}>;

const querySchema = z
  .object({
    collectionId: z.coerce.number().positive().optional(),
  })
  .merge(paginatedParamsSchema);

type Query = z.infer<typeof querySchema>;
const parseListActivityVersionsQuery = querySchema.parse;

export {
  ResponseBody as ListActivitiesForOwnerResponseBody,
  Query as ListActivitiesQuery,
  parseListActivityVersionsQuery,
};
