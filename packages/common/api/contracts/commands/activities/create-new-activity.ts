import { z } from "zod";

const createNewActivityRrequestSchema = z.object({
  collectionId: z.coerce.number().positive(),
});
type RequestBody = z.infer<typeof createNewActivityRrequestSchema>;

type ResponseBody = {
  activityId: string;
};
type Params = void;

export {
  RequestBody as CreateNewActivityRequestBody,
  ResponseBody as CreateNewActivityResponseBody,
  Params as CreateNewActivityParams,
  createNewActivityRrequestSchema,
};
