import { z } from "zod";
import {
  languagesSchema,
  activityFormatSchema,
  activityLevelSchema,
} from "../common";

type Params = void;

const createNewActivityRequestSchema = z.object({
  language: languagesSchema,
  topics: z.string().array(),
  format: activityFormatSchema,
  level: activityLevelSchema,
  userEmail: z.string(),
});

type RequestBody = z.infer<typeof createNewActivityRequestSchema>;

interface ResponseBody {
  activityId: string;
}

export type {
  Params as CreateNewActivityParams,
  RequestBody as CreateNewActivityRequestBody,
  ResponseBody as CreateNewActivityResponseBody,
};
export { createNewActivityRequestSchema }; // o que vai ser passado pro decorator de Validate Parameters
