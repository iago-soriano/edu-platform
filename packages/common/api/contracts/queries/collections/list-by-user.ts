import { paginatedParamsSchema, PaginatedResponse } from "../../../../dto";
import { z } from "zod";

type ResponseBody = {
  isOwnerOf: {
    collections: {
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
    }[];
    pagination: {
      totalRowCount: number;
    };
  };
  participatesIn: {}[];
};

const querySchema = z
  .object({
    byOwnership: z
      .string()
      .toLowerCase()
      .transform((x) => x === "true")
      .pipe(z.boolean()),
    isPrivate: z
      .string()
      .toLowerCase()
      .transform((x) => x === "true")
      .pipe(z.boolean()),
  })
  .merge(paginatedParamsSchema);

type Query = z.infer<typeof querySchema>;
const parseListCollectionsQuery = querySchema.parse;

export {
  ResponseBody as ListCollectionsByUserResponseBody,
  Query as ListCollectionsByUserQuery,
  parseListCollectionsQuery,
};
