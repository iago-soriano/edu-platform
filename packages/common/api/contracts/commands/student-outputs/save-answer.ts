import { z } from "zod";

const saveAnswerParamsSchema = z.object({
  studentOutputId: z.coerce.number(),
});

type Params = z.infer<typeof saveAnswerParamsSchema>;

const saveAnswerRequestSchema = z.object({
  answerId: z.coerce.number().optional(),
  answer: z.string(),
  questionId: z.coerce.number(),
});

type RequestBody = z.infer<typeof saveAnswerRequestSchema>;
interface ResponseBody {}

export type {
  RequestBody as SaveAnswerRequestBody,
  ResponseBody as SaveAnswerResponseBody,
  Params as SaveAnswerParams,
};

export { saveAnswerParamsSchema, saveAnswerRequestSchema };
