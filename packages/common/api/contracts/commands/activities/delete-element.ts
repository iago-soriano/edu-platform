import { z } from "zod";

const deleteElementParamsSchema = z.object({
  activityId: z.string().uuid(),
  elementId: z.coerce.number(),
});

type Params = z.infer<typeof deleteElementParamsSchema>;

type RequestBody = void;
interface ResponseBody {}

export type {
  RequestBody as DeleteElementRequestBody,
  ResponseBody as DeleteElementResponseBody,
  Params as DeleteElementParams,
};

export { deleteElementParamsSchema };
