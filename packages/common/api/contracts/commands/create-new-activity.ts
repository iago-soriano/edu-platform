import { z } from "zod";

import { ActivityBlockType, ActivityStatus } from "../../../domain/enums";

type Params = void;

const ActivityBlocksSchema = z.object({
  type: z.nativeEnum(ActivityBlockType),
  data: z.string(),
});

const createNewActivityRequestSchema = z.object({
  generatedActivityId: z.string(),
  blocks: z.array(ActivityBlocksSchema),
  title: z.string(),
});

type RequestBody = z.infer<typeof createNewActivityRequestSchema>;

interface ResponseBody {
  id: string;
  status: ActivityStatus;
}

export type {
  Params as CreateNewActivityParams,
  RequestBody as CreateNewActivityRequestBody,
  ResponseBody as CreateNewActivityResponseBody,
};
export { createNewActivityRequestSchema }; // o que vai ser passado pro decorator de Validate Parameters
