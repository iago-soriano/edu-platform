import { z } from "zod";
import { ContentDTO, QuestionDTO } from ".";

export enum VersionStatus {
  Published = "Published",
  Draft = "Draft",
  Archived = "Archived",
}

type ElementDTO = {
  content: ContentDTO | undefined;
  question: QuestionDTO | undefined;
};

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
  updatedAt: z.date().optional(),
});

export type VersionDTO = z.infer<typeof versionSchema> & {
  elements?: ElementDTO[];
};
export const parseToVersionDTO = versionSchema.parse;
