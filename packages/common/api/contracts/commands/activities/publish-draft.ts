import { z } from "zod";

const publishDraftParamsSchema = z.object({
  activityId: z.string().uuid(),
});

type Params = z.infer<typeof publishDraftParamsSchema>;

type RequestBody = {};
interface ResponseBody {}

export type {
  RequestBody as PublishDraftRequestBody,
  ResponseBody as PublishDraftResponseBody,
  Params as PublishDraftParams,
};

export { publishDraftParamsSchema };
