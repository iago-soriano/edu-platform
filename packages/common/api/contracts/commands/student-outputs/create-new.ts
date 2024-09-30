import { z } from "zod";

const createNewStudentOutputParamsSchema = z.object({
  activityId: z.string().uuid(),
});

type Params = z.infer<typeof createNewStudentOutputParamsSchema>;

type RequestBody = void;
interface ResponseBody {
  outputId: number;
}

export type {
  RequestBody as CreateStudentOutputRequestBody,
  ResponseBody as CreateStudentOutputResponseBody,
  Params as CreateStudentOutputParams,
};
export { createNewStudentOutputParamsSchema };
