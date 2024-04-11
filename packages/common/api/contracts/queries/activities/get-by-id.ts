import {
  ContentTypes,
  VideoContentPayloadDTO,
  TextContentPayloadDTO,
  ImageContentPayloadDTO,
} from "../../common";

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
  payload: TextContentPayloadDTO | VideoContentPayloadDTO | { url: string };
};

export type ElementResponseDTO = {
  content?: ContentResponseDTO | null;
  question?: QuestionResponseDTO | null;
};

type ResponseBody = {
  title: string;
  description: string;
  topics: string;
  version: number;
  collectionName: string;
  collectionId: number;
  elements?: ElementResponseDTO[];
};
type Params = {
  activityId: string;
};

export {
  ResponseBody as GetDraftVersionResponseBody,
  Params as GetDraftVersionParams,
};
