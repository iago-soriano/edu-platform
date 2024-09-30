import { paginatedParamsSchema, PaginatedResponse } from "../../common";
import { z } from "zod";

const listUsersInCollectionQuerySchema = z
  .object({
    collectionId: z.coerce.number().positive(),
  })
  .merge(paginatedParamsSchema);

type Query = z.infer<typeof listUsersInCollectionQuerySchema>;
type ResponseBody = PaginatedResponse<{
  id: number;
  name: string;
  email: string;
}>;

export type {
  ResponseBody as ListParticipantsOfCollectionResponseBody,
  Query as ListParticipantsOfCollectionQuery,
};
export { listUsersInCollectionQuerySchema };
