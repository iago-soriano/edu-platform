import { z } from "zod";
import { OutputStatus } from "../../../domain/domain/enums";

type Answer = {
  id: string;
  blockId: string;
  answer: string;
  review: string;
};

type ResponseBody = {
  id: string;
  requestingUserId: string;
  activityId: string;
  studentEmail: string;
  status: OutputStatus;
  answers: Answer[];
};

const getStudentOutputByIdParamsSchema = z.object({
  studentOutputId: z.string(),
});

type Params = z.infer<typeof getStudentOutputByIdParamsSchema>;

export type {
  ResponseBody as GetStudentOutputByIdResponseBody,
  Params as GetStudentOutputByIdParams,
};
export { getStudentOutputByIdParamsSchema };
