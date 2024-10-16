import { z } from "zod";

const updateStudentOutputAnswerParamsSchema = z.object({
  studentOutputId: z.string(),
});

type Params = z.infer<typeof updateStudentOutputAnswerParamsSchema>;

const updateStudentOutputAnswerRequestBodySchema = z.object({
  answers: z
    .object({
      blockId: z.string(),
      answer: z.string(),
    })
    .array(),
});

type RequestBody = z.infer<typeof updateStudentOutputAnswerRequestBodySchema>;

interface ResponseBody {
  outputId: string;
}

export type {
  RequestBody as UpdateStudentOutputAnswerRequestBody,
  ResponseBody as UpdateStudentOutputAnswerResponseBody,
  Params as UpdateStudentOutputAnswerParams,
};
export {
  updateStudentOutputAnswerRequestBodySchema,
  updateStudentOutputAnswerParamsSchema,
};
