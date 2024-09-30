import {
  Request as TypedRequest,
  Response as TypedResponse,
} from "@edu-platform/common/platform/interfaces";
import {
  SaveQuestionParams,
  SaveQuestionResponseBody,
  SaveQuestionRequestBody,
  saveQuestionParamsSchema as paramsSchema,
  saveQuestionRequestSchema as bodySchema,
} from "@edu-platform/common";
import { ISaveQuestionUseCase } from "@core/application/use-cases";
import {
  Middlewares,
  Post,
  ValidateParameters,
} from "@edu-platform/common/platform";

type Request = TypedRequest<SaveQuestionParams, {}, SaveQuestionRequestBody>;
type Response = TypedResponse<SaveQuestionResponseBody>;

interface Deps {
  saveQuestionUseCase: ISaveQuestionUseCase;
}

@Post("activities/:activityId/versions/draft/questions")
@ValidateParameters({
  paramsSchema,
  bodySchema,
})
@Middlewares(["auth"])
export class SaveQuestionController {
  private _saveQuestionUseCase: ISaveQuestionUseCase;

  constructor(deps: Deps) {
    this._saveQuestionUseCase = deps.saveQuestionUseCase;
  }

  async execute(req: Request, res: Response) {
    const questionDto = req.body;

    const { activityId } = req.params;
    const { user } = req;

    await this._saveQuestionUseCase.execute({
      questionDto,
      user,
      activityId,
    });

    res.status(200).json();
  }
}
