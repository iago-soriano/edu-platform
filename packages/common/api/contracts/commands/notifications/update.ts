import { z } from "zod";

const updateNotificationParamsSchema = z.object({
  notificationId: z.coerce.number(),
});

type Params = z.infer<typeof updateNotificationParamsSchema>;

type RequestBody = {};
interface ResponseBody {}

export type {
  RequestBody as UpdateNotificationRequestBody,
  ResponseBody as UpdateNotificationResponseBody,
  Params as UpdateNotificationParams,
};

export { updateNotificationParamsSchema };
