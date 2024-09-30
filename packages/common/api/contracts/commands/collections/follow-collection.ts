import { z } from "zod";

const followCollectionParamsSchema = z.object({
  collectionId: z.coerce.number(),
});

type Params = z.infer<typeof followCollectionParamsSchema>;

type RequestBody = {};
interface ResponseBody {}

export type {
  RequestBody as FollowCollectionRequestBody,
  ResponseBody as FollowCollectionResponseBody,
  Params as FollowCollectionParams,
};

export { followCollectionParamsSchema };
