import { z } from "zod";

type Params = void;

const createNewActivityRequestSchema = z.object({
  collectionId: z.coerce.number().positive(),
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
