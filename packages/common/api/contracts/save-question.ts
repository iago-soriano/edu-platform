import { QuestionRequestDTO } from "../../dto";

type RequestBody = QuestionRequestDTO;
type ResponseBody = {
  questionId?: number;
};
type Params = { activityId: string; versionId: string };

export {
  RequestBody as SaveQuestionRequestBody,
  ResponseBody as SaveQuestionResponseBody,
  Params as SaveQuestionParams,
};
