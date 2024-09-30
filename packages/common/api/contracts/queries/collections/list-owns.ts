import { paginatedParamsSchema, PaginatedResponse } from "../../common";
import { z } from "zod";

type ResponseBody = PaginatedResponse<{
  id: number;
  name?: string | null;
  updatedAt: Date;
  isPrivate?: boolean;
  totalActivitiesCount?: number;
  notifyOwnerOnStudentOutput?: boolean;
  draftVersionsCount?: number;
  archivedVersionsCount?: number;
  publishedVersionsCount?: number;
  totalParticipantsCount?: number;
  // newStudentOutputsCount: number;
  // feedbackGivenStudentOutputsCount: number;
}>;

const listCollectionsForOwnerQuerySchema = z
  .object({
    isPrivate: z
      .string()
      .toLowerCase()
      .transform((x) => x === "true")
      .pipe(z.boolean()),
  })
  .merge(paginatedParamsSchema);

type Query = z.infer<typeof listCollectionsForOwnerQuerySchema>;

export type {
  ResponseBody as ListCollectionsForOwnerResponseBody,
  Query as ListCollectionsForOwnerQuery,
};
export { listCollectionsForOwnerQuerySchema };
