import { z } from "zod";

const createNewStudentOutputRequestBodySchema = z.object({
  activityId: z.string(),
  studentEmail: z.string(),
});

type Params = void;

type RequestBody = z.infer<typeof createNewStudentOutputRequestBodySchema>;

interface ResponseBody {
  outputId: string;
}

export type {
  RequestBody as CreateStudentOutputRequestBody,
  ResponseBody as CreateStudentOutputResponseBody,
  Params as CreateStudentOutputParams,
};
export { createNewStudentOutputRequestBodySchema };
