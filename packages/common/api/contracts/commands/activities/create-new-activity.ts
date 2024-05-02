import { z } from "zod";

const createNewActivityRequestSchema = z.object({
  collectionId: z.coerce.number().positive(),
});
type RequestBody = z.infer<typeof createNewActivityRequestSchema>;

type ResponseBody = {
  activityId: string;
};
type Params = void;

export type {
  RequestBody as CreateNewActivityRequestBody,
  ResponseBody as CreateNewActivityResponseBody,
  Params as CreateNewActivityParams,
};
export { createNewActivityRequestSchema };
