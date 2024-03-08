import { ContentResponseDTO, QuestionResponseDTO } from "../../dto";

type RequestBody = void;
type ResponseBody = {
  title: string;
  description: string;
  topics: string;
  status: string;
  version: number;
  collectionName: string;
  authorId: number;
  elements: {
    content: ContentResponseDTO | null;
    question?: QuestionResponseDTO;
  }[];
};
type Params = {
  activityId: string;
  versionId: string;
};

export {
  RequestBody as GetActivityVersionRequestBody,
  ResponseBody as GetActivityVersionResponseBody,
  Params as GetActivityVersionParams,
};
