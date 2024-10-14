import { z } from "zod";

const updateStudentOutputReviewParamsSchema = z.object({
  studentOutputId: z.string(),
});

type Params = z.infer<typeof updateStudentOutputReviewParamsSchema>;

const updateStudentOutputReviewRequestBodySchema = z
  .object({
    blockId: z.string(),
    review: z.string(),
  })
  .array();

type RequestBody = z.infer<typeof updateStudentOutputReviewRequestBodySchema>;

interface ResponseBody {
  outputId: number;
}

export type {
  RequestBody as UpdateStudentOutputReviewRequestBody,
  ResponseBody as UpdateStudentOutputReviewResponseBody,
  Params as UpdateStudentOutputReviewParams,
};
export {
  updateStudentOutputReviewRequestBodySchema,
  updateStudentOutputReviewParamsSchema,
};
