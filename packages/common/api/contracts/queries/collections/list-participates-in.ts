import { paginatedParamsSchema, PaginatedResponse } from "../../common";
import { z } from "zod";

type ResponseBody = PaginatedResponse<{
  id: number;
  name?: string | null;
  totalActivitiesCount?: number;
  ownerName: string;
}>;

const listCollectionsForParticipantsQuerySchema = paginatedParamsSchema;

type Query = z.infer<typeof listCollectionsForParticipantsQuerySchema>;

export type {
  ResponseBody as ListCollectionsForParticipantResponseBody,
  Query as ListCollectionsForParticipantQuery,
};
export { listCollectionsForParticipantsQuerySchema };
