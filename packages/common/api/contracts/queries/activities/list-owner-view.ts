import { paginatedParamsSchema, PaginatedResponse } from "../../common";
import { z } from "zod";

export type ActivityVersionDto = {
  id: number;
  description: string;
  title: string;
  updatedAt: Date;
  version: number;
  topics: string;
};

type ResponseBody = PaginatedResponse<{
  collectionName: string;
  activityId: string;
  draft: ActivityVersionDto | null;
  published: ActivityVersionDto | null;
  archivedVersionsCount: number;
}>;

const listOwnerViewQuerySchema = z
  .object({
    collectionId: z.coerce.number().positive().optional(),
  })
  .merge(paginatedParamsSchema);

type Query = z.infer<typeof listOwnerViewQuerySchema>;

export type {
  ResponseBody as ListActivitiesForOwnerResponseBody,
  Query as ListActivitiesQuery,
};
export { listOwnerViewQuerySchema };
