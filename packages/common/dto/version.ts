import { z } from "zod";

enum VersionStatus {
  Published = "Published",
  Draft = "Draft",
  Archived = "Archived",
}

const versionStatusSchema = z.nativeEnum(VersionStatus);
export const parseVersionStatus = versionStatusSchema.parse;

export const versionSchema = z.object({
  id: z.number().optional(),
  status: z.nativeEnum(VersionStatus).optional(),
  title: z.string().optional(),
  description: z.string().optional(),
  topics: z.string().optional(),
  version: z.number().optional(),
  activityId: z.number().optional(),
});

export type VersionDTO = z.infer<typeof versionSchema>;
export const parseToVersionDTO = versionSchema.parse;
