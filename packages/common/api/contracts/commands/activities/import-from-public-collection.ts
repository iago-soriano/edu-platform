import { z } from "zod";

const importFromPublicCollectionParamsSchema = z.object({
  activityId: z.string().uuid(),
});

type Params = z.infer<typeof importFromPublicCollectionParamsSchema>;

const importFromPublicCollectionRequestSchema = z.object({
  destinationCollection: z.coerce.number(),
});

type RequestBody = z.infer<typeof importFromPublicCollectionRequestSchema>;

interface ResponseBody {}

export type {
  RequestBody as ImportActivityRequestBody,
  ResponseBody as ImportActivityResponseBody,
  Params as ImportActivityParams,
};

export {
  importFromPublicCollectionParamsSchema,
  importFromPublicCollectionRequestSchema,
};
