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
