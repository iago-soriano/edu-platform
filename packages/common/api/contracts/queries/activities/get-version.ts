import { z } from "zod";

export type TextContentResponsePayloadDTO = {
  text: string;
};
export type VideoContentResponsePayloadDTO = {
  url: string;
  tracks: string;
};
export type ImageContentResponsePayloadDTO = {
  url: string;
};
export type QuestionResponseDTO = {
  id: number;
  type: string;
  question: string;
  alternatives?: string;
  order: number;
};
export type ContentResponseDTO = {
  id: number;
  type: string;
  description: string;
  order: number;
  payload:
    | TextContentResponsePayloadDTO
    | VideoContentResponsePayloadDTO
    | ImageContentResponsePayloadDTO;
};

export type ElementResponseDTO = {
  content?: ContentResponseDTO | null;
  question?: QuestionResponseDTO | null;
};

export enum VersionStatus {
  Published = "Published",
  Draft = "Draft",
  Archived = "Archived",
}

const requestSchemaActivityId = z.object({
  activityId: z.string(),
});

const parseActivityId = requestSchemaActivityId.parse;

const requestSchema = z
  .object({
    versionNumber: z.coerce.number().positive(),
  })
  .merge(requestSchemaActivityId);

const parseGetArchivedVersionRequest = requestSchema.parse;

type ResponseBody = {
  title: string;
  description: string;
  topics: string;
  version: number;
  collectionName: string;
  collectionId: number;
  authorId: string;
  status: VersionStatus;
  elements?: ElementResponseDTO[];
};
type Params = {
  activityId: string;
  versionNumber?: string;
};

export type {
  ResponseBody as GetActivityVersionResponseBody,
  Params as GetActivityVersionParams,
};

export {
  parseActivityId as parseGetDraftVersionRequest,
  parseActivityId as parseGetPublishedVersionRequest,
  parseGetArchivedVersionRequest,
};
