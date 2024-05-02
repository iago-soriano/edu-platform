import { z } from "zod";

export const paramsSchema = z.object({
  collectionId: z.coerce.number(),
  participationId: z.coerce.number(),
});

type RequestBody = {};
type ResponseBody = {};
type Params = z.infer<typeof paramsSchema>;

const parseRequest = paramsSchema.parse;
export type {
  RequestBody as UnfollowCollectionRequestBody,
  ResponseBody as UnfollowCollectionResponseBody,
  Params as UnfollowCollectionParams,
};
export { parseRequest as unfollowCollectionParseRequest };
