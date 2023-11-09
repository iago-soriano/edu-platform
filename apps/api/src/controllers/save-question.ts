import {
  HTTPController,
  HttpMethod,
  Request as TypedRequest,
  Response as TypedResponse,
} from "@interfaces";
import {
  SaveQuestionRequestBody,
  SaveQuestionResponseBody,
} from "@edu-platform/common/api";
import { ISaveQuestionUseCase } from "@use-cases";

type Request = TypedRequest<{}, {}, SaveQuestionRequestBody>;
type Response = TypedResponse<SaveQuestionResponseBody>;

export class SaveQuestionController implements HTTPController {
  method = HttpMethod.PUT;
  path: string = "activities/:activityId/questions";
  middlewares: string[] = ["auth"];

  constructor(private saveQuestionUseCase: ISaveQuestionUseCase) {}

  async execute(req: Request, res: Response) {
    const { text, answerKey, type, questionId } = req.body;

    res.status(200).json();
  }
}
