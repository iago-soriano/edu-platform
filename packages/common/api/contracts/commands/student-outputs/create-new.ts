import { z } from "zod";

type RequestBody = void;
type ResponseBody = { outputId: number };
type Params = { activityId: number };

const requestSchema = z.object({
  activityId: z.string(),
});

const parseActivityId = requestSchema.parse;

export type {
  RequestBody as CreateStudentOutputRequestBody,
  ResponseBody as CreateStudentOutputResponseBody,
  Params as CreateStudentOutputParams,
};
export { parseActivityId as parseCreateNewStudentOutputRequest };
