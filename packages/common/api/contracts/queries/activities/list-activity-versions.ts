import { paginatedParamsSchema, PaginatedResponse } from "../../../../dto";
import { z } from "zod";

type RequestBody = void;

type ActivityVersionDto = {
  id: number;
  description: string;
  title: string;
  updatedAt: Date;
  version: number;
} | null;
type ResponseBody = PaginatedResponse<{
  collectionName: string;
  activityId: number;
  draft: ActivityVersionDto;
  published: ActivityVersionDto;
  archivedVersionsCount: number;
}>;

const querySchema = z
  .object({
    byOwnership: z.coerce.boolean(),
    collectionId: z.coerce.number().positive().optional(),
  })
  .merge(paginatedParamsSchema);

type Query = z.infer<typeof querySchema>;
const parseListActivityVersionsQuery = querySchema.parse;

export {
  RequestBody as ListActivityVersionsRequestBody,
  ResponseBody as ListActivityVersionsResponseBody,
  Query as ListActivityVersionsQuery,
  parseListActivityVersionsQuery,
};
