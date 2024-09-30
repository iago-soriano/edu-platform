import { z } from "zod";

const archiveActivityParamsSchema = z.object({
  activityId: z.string().uuid(),
});

type Params = z.infer<typeof archiveActivityParamsSchema>;
type RequestBody = void;
interface ResponseBody {}

export type {
  Params as ArchiveActivityParams,
  RequestBody as ArchiveActivityRequestBody,
  ResponseBody as ArchiveActivityResponseBody,
};

export { archiveActivityParamsSchema };
