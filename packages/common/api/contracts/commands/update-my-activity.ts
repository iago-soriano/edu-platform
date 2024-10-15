import { z } from "zod";

const updateMyActivityParamsSchema = z.object({
  activityId: z.string(),
});

type Params = z.infer<typeof updateMyActivityParamsSchema>;

const updateMyActivityRequestBodySchema = z
  .object({
    blockId: z.string(),
    answer: z.string(),
  })
  .array();

type RequestBody = z.infer<typeof updateMyActivityRequestBodySchema>;

interface ResponseBody {}

export type {
  RequestBody as UpdateMyActivityRequestBody,
  ResponseBody as UpdateMyActivityResponseBody,
  Params as UpdateMyActivityParams,
};
export { updateMyActivityRequestBodySchema, updateMyActivityParamsSchema };
