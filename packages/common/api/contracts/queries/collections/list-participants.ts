import { paginatedParamsSchema, PaginatedResponse } from "../../common";
import { z } from "zod";

const querySchema = z
  .object({
    collectionId: z.coerce.number().positive(),
  })
  .merge(paginatedParamsSchema);

const parseListParticipantsOfCollectionQuery = querySchema.parse;

type Query = z.infer<typeof querySchema>;
type ResponseBody = PaginatedResponse<{
  id: number;
  name: string;
  email: string;
}>;

export type {
  ResponseBody as ListParticipantsOfCollectionResponseBody,
  Query as ListParticipantsOfCollectionQuery,
};
export { parseListParticipantsOfCollectionQuery };
