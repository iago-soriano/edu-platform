import { z } from "zod";
import { ContentResponseDTO } from ".";

export enum VersionStatus {
  Published = "Published",
  Draft = "Draft",
  Archived = "Archived",
}

type ElementDTO = {
  content: ContentResponseDTO | undefined;
  question: any;
};

const versionStatusSchema = z.nativeEnum(VersionStatus);
export const parseVersionStatus = versionStatusSchema.parse;

export const versionResponseSchema = z.object({
  id: z.number(),
  // createdAt: z.date(),
  updatedAt: z.date(),

  status: z.nativeEnum(VersionStatus),
  title: z.string(),
  description: z.string(),
  topics: z.string(),
  version: z.number(),

  activityId: z.number(),
});

export type VersionResponseDTO = z.infer<typeof versionResponseSchema> & {
  elements?: ElementDTO[];
};
