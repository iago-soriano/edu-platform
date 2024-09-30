import { z } from "zod";

const updateDraftMetadataParamsSchema = z.object({
  activityId: z.string().uuid(),
});

type Params = z.infer<typeof updateDraftMetadataParamsSchema>;

const updateDraftMetadataRequestSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  topics: z.string().optional(),
});

type RequestBody = z.infer<typeof updateDraftMetadataRequestSchema>;

interface ResponseBody {}

export type {
  RequestBody as UpdateVersionMetadataRequestBody,
  ResponseBody as UpdateVersionMetadataResponseBody,
  Params as UpdateVersionMetadataParams,
};

export { updateDraftMetadataParamsSchema, updateDraftMetadataRequestSchema };
