import { z } from "zod";

const removeUserParamsSchema = z.object({
  collectionId: z.coerce.number(),
  participationId: z.coerce.number(),
});

type Params = z.infer<typeof removeUserParamsSchema>;

type RequestBody = {};
interface ResponseBody {}

export type {
  RequestBody as RemoveUserFromCollectionRequestBody,
  ResponseBody as RemoveUserFromCollectionResponseBody,
  Params as RemoveUserFromCollectionParams,
};

export { removeUserParamsSchema };
