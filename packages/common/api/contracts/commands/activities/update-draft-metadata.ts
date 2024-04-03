import { z } from "zod";

export const versionMetadataRequestSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  topics: z.string().optional(),
});

export type VersionRequestDTO = z.infer<typeof versionMetadataRequestSchema>;
export const parseToVersionRequestDto = versionMetadataRequestSchema.parse;

type ResponseBody = {
  activityId: number;
};
type Params = {
  activityId: string;
  versionId: string;
};

export {
  VersionRequestDTO as UpdateVersionMetadataRequestBody,
  ResponseBody as UpdateVersionMetadataResponseBody,
  Params as UpdateVersionMetadataParams,
};
