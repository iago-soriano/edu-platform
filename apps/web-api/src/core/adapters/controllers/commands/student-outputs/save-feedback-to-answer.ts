import {
  Middlewares,
  Post,
  Request as TypedRequest,
  Response as TypedResponse,
  ValidateParameters,
} from "@edu-platform/common/platform";
import {
  SaveFeedbackToAnswerParams,
  SaveFeedbackToAnswerRequestBody,
  SaveFeedbackToAnswerResponseBody,
  saveFeedbackToAnswerParamsSchema as paramsSchema,
  saveFeedbackToAnswerRequestSchema as bodySchema,
} from "@edu-platform/common";
import { ISaveFeedbackToAnswerUseCase } from "@core/application/use-cases";

type Request = TypedRequest<
  SaveFeedbackToAnswerParams,
  {},
  SaveFeedbackToAnswerRequestBody
>;
type Response = TypedResponse<SaveFeedbackToAnswerResponseBody>;

interface Deps {
  saveFeedbackToAnswerUseCase: ISaveFeedbackToAnswerUseCase;
}

@Post("student-output/:studentOutputId/answers/:answerId/feedbacks")
@ValidateParameters({
  paramsSchema,
  bodySchema,
})
@Middlewares(["auth"])
export class SaveFeedbackToAnswerController {
  private _saveFeedbackToAnswerUseCase: ISaveFeedbackToAnswerUseCase;

  constructor(deps: Deps) {
    this._saveFeedbackToAnswerUseCase = deps.saveFeedbackToAnswerUseCase;
  }

  async execute(req: Request, res: Response) {
    const { user } = req;
    const { studentOutputId, answerId } = req.params;
    const { feedbackEmoji, feedbackText } = req.body;

    await this._saveFeedbackToAnswerUseCase.execute({
      user,
      studentOutputId,
      answerId,
      feedbackEmoji,
      feedbackText,
    });

    res.status(200).json();
  }
}
