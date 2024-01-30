import { QuestionDTO } from "../../dto";

type RequestBody = QuestionDTO;
type ResponseBody = {
  questionId?: number;
};
type Params = { activityId: string; versionId: string };

export {
  RequestBody as SaveQuestionRequestBody,
  ResponseBody as SaveQuestionResponseBody,
  Params as SaveQuestionParams,
};
