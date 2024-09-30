import { z } from "zod";

const unfollowCollectionParamsSchema = z.object({
  collectionId: z.coerce.number(),
  participationId: z.coerce.number(),
});
type Params = z.infer<typeof unfollowCollectionParamsSchema>;

type RequestBody = {};
interface ResponseBody {}

export type {
  RequestBody as UnfollowCollectionRequestBody,
  ResponseBody as UnfollowCollectionResponseBody,
  Params as UnfollowCollectionParams,
};
export { unfollowCollectionParamsSchema };
