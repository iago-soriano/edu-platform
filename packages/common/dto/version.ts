import { z } from "zod";
import { ContentResponseDTO, QuestionResponseDTO } from ".";

export enum VersionStatus {
  Published = "Published",
  Draft = "Draft",
  Archived = "Archived",
}

type ElementDTO = {
  content: ContentResponseDTO | undefined;
  question: QuestionResponseDTO | undefined;
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

export const versionRequestSchema = z.object({
  id: z.number().optional(),

  title: z.string().optional(),
  description: z.string().optional(),
  topics: z.string().optional(),
});

export type VersionRequestDTO = z.infer<typeof versionRequestSchema> & {
  elements?: ElementDTO[];
};
export const parseToVersionRequestDto = versionRequestSchema.parse;
