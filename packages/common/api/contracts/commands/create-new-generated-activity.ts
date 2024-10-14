import { z } from "zod";
import {
  languagesSchema,
  activityTypeSchema,
  activityLevelSchema,
  activityStatusSchema,
} from "../common";
import { ActivityStatus } from "../../../domain/domain/enums";

type Params = void;

const createNewGeneratedActivityRequestSchema = z.object({
  language: languagesSchema,
  topics: z.string().array(),
  type: activityTypeSchema,
  level: activityLevelSchema,
  //status: activityStatusSchema,
});

type RequestBody = z.infer<typeof createNewGeneratedActivityRequestSchema>;

interface ResponseBody {
  id: string;
  status: ActivityStatus;
}

export type {
  Params as CreateNewGeneratedActivityParams,
  RequestBody as CreateNewGeneratedActivityRequestBody,
  ResponseBody as CreateNewGeneratedActivityResponseBody,
};
export { createNewGeneratedActivityRequestSchema }; // o que vai ser passado pro decorator de Validate Parameters