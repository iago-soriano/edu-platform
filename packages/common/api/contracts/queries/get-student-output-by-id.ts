import { z } from "zod";
import { ActivityBlockType, OutputStatus } from "../../../domain/enums";

type Answer = {
  blockId: string;
  answer: string;
  review: string;
};

type ResponseBody = {
  id: string;
  reviewerEmail: string;
  activityId: string;
  studentEmail: string;
  status: OutputStatus;
  answers: Answer[];
  title: string;

  activityBlocks: {
    id: string;
    type: ActivityBlockType;
    data: any;
  }[];
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
