import {
  ContentTypes,
  VideoContentPayloadDTO,
  TextContentPayloadDTO,
  ImageContentPayloadDTO,
} from "../../common";

export type QuestionResponseDTO = {
  id: number;
  type: ContentTypes;
  question: string;
  alternatives?: string;
};
export type ContentResponseDTO = {
  id: number;
  type: ContentTypes;
  description: string;
  payload: {
    text: TextContentPayloadDTO;
    video: VideoContentPayloadDTO;
    image: ImageContentPayloadDTO;
  };
};

type ResponseBody = {
  title: string;
  description: string;
  topics: string;
  version: number;
  collectionName: string;
  collectionId: number;
  elements?: {
    content: ContentResponseDTO | null;
    question?: QuestionResponseDTO;
  }[];
};
type Params = {
  activityId: string;
};

export {
  ResponseBody as GetDraftVersionResponseBody,
  Params as GetDraftVersionParams,
};
