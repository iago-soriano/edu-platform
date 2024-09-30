import { z } from "zod";

const createNewDraftParamsSchema = z.object({
  activityId: z.string().uuid(),
});

type Params = z.infer<typeof createNewDraftParamsSchema>;

type RequestBody = void;
interface ResponseBody {}

export type {
  Params as CreateNewDraftVersionParams,
  RequestBody as CreateNewDraftVersionRequestBody,
  ResponseBody as CreateNewDraftVersionResponseBody,
};

export { createNewDraftParamsSchema };
