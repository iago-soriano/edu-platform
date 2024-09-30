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
