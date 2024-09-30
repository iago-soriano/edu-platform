import { z } from "zod";

const publishStudentOutputParamsSchema = z.object({
  studentOutputId: z.coerce.number(),
});

type Params = z.infer<typeof publishStudentOutputParamsSchema>;
type RequestBody = {};
interface ResponseBody {}

export type {
  RequestBody as PublishStudentOutputRequestBody,
  ResponseBody as PublishStudentOutputResponseBody,
  Params as PublishStudentOutputParams,
};

export { publishStudentOutputParamsSchema };
