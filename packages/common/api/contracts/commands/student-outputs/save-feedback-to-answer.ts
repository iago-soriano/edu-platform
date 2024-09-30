import { z } from "zod";

const saveFeedbackToAnswerParamsSchema = z.object({
  studentOutputId: z.coerce.number(),
  answerId: z.coerce.number(),
});
const saveFeedbackToAnswerRequestSchema = z.object({
  feedbackEmoji: z.string().optional(),
  feedbackText: z.string().optional(),
});

type Params = z.infer<typeof saveFeedbackToAnswerParamsSchema>;
type RequestBody = z.infer<typeof saveFeedbackToAnswerRequestSchema>;
interface ResponseBody {}

export type {
  RequestBody as SaveFeedbackToAnswerRequestBody,
  ResponseBody as SaveFeedbackToAnswerResponseBody,
  Params as SaveFeedbackToAnswerParams,
};

export { saveFeedbackToAnswerParamsSchema, saveFeedbackToAnswerRequestSchema };
