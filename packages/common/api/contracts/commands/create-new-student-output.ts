import { z } from "zod";

const createNewStudentOutputRequestBodySchema = z.object({
  activityId: z.string().uuid(),
  studentEmail: z.string(),
  requestingUserEmail: z.string(),
});

type Params = void;

type RequestBody = z.infer<typeof createNewStudentOutputRequestBodySchema>;

interface ResponseBody {
  outputId: number;
}

export type {
  RequestBody as CreateStudentOutputRequestBody,
  ResponseBody as CreateStudentOutputResponseBody,
  Params as CreateStudentOutputParams,
};
export { createNewStudentOutputRequestBodySchema };
