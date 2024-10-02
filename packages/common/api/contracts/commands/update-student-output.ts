import { z } from "zod";

const updateStudentOutputRequestBodySchema = z.object({
  blockId: z.string().uuid(),
  answer: z.string(),
});

const updateStudentOutputParamsSchema = z.object({
  studentOutputId: z.string().uuid(),
});

type Params = z.infer<typeof updateStudentOutputParamsSchema>;
type RequestBody = z.infer<typeof updateStudentOutputRequestBodySchema>;

interface ResponseBody {
  outputId: number;
}

export type {
  RequestBody as UpdateStudentOutputRequestBody,
  ResponseBody as UpdateStudentOutputResponseBody,
  Params as UpdateStudentOutputParams,
};
export { updateStudentOutputRequestBodySchema };
