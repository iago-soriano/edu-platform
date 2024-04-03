import { z } from "zod";

const requestSchema = z.object({
  collectionId: z.coerce.number().positive(),
});
type RequestBody = z.infer<typeof requestSchema>;
const parseCreateNewActivityRequestBody = requestSchema.parse;

type ResponseBody = {
  activityId: string;
};
type Params = void;

export {
  RequestBody as CreateNewActivityRequestBody,
  ResponseBody as CreateNewActivityResponseBody,
  Params as CreateNewActivityParams,
  parseCreateNewActivityRequestBody,
};
