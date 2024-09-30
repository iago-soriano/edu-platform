import { z } from "zod";

const updateNotificationConfigParamsSchema = z.object({
  collectionId: z.coerce.number(),
});

type Params = z.infer<typeof updateNotificationConfigParamsSchema>;

type RequestBody = {};
interface ResponseBody {}

export type {
  RequestBody as UpdateNotificationConfigRequestBody,
  ResponseBody as UpdateNotificationConfigResponseBody,
  Params as UpdateNotificationConfigParams,
};

export { updateNotificationConfigParamsSchema };
