import { paginatedParamsSchema, PaginatedResponse } from "../../common";
import { z } from "zod";

type ResponseBody = PaginatedResponse<{
  id: number;
  name?: string | null;
  totalActivitiesCount?: number;
  ownerName: string;
}>;

const querySchema = paginatedParamsSchema;

type Query = z.infer<typeof querySchema>;
const parseListCollectionsForParticipantQuery = querySchema.parse;

export type {
  ResponseBody as ListCollectionsForParticipantResponseBody,
  Query as ListCollectionsForParticipantQuery,
};
export { parseListCollectionsForParticipantQuery };
