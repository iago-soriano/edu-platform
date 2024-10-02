import {
  OutputStatus,
  paginatedParamsSchema,
  PaginatedResponse,
} from "../common";
import { z } from "zod";

type Answer = {
  id: string;
  blockId: string;
  answer: string;
  review: string;
};

type ResponseBody = PaginatedResponse<{
  id: string;
  requestingUserId: string;
  activityId: string;
  studentEmail: string;
  status: OutputStatus;
  answers: Answer[];
}>;

const getStudentOutputByIdQuerySchema = z
  .object({
    studentOutputId: z.string(),
  })
  .merge(paginatedParamsSchema);

type Query = z.infer<typeof getStudentOutputByIdQuerySchema>;

export type {
  ResponseBody as GetStudentOutputByIdResponseBody,
  Query as GetStudentOutputByIdQuery,
};
export { getStudentOutputByIdQuerySchema };
