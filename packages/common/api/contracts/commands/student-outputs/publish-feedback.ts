import { z } from "zod";

const publishFeedbackParamsSchema = z.object({
  studentOutputId: z.coerce.number(),
});

type Params = z.infer<typeof publishFeedbackParamsSchema>;
type RequestBody = {};
interface ResponseBody {}

export type {
  RequestBody as PublishFeedbackRequestBody,
  ResponseBody as PublishFeedbackResponseBody,
  Params as PublishFeedbackParams,
};

export { publishFeedbackParamsSchema };
