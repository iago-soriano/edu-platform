import {
  Request as TypedRequest,
  Response as TypedResponse,
} from "@edu-platform/common/platform/interfaces";
import {
  SaveAnswerParams,
  SaveAnswerRequestBody,
  SaveAnswerResponseBody,
  saveAnswerParamsSchema as paramsSchema,
  saveAnswerRequestSchema as bodySchema,
} from "@edu-platform/common";
import {
  Middlewares,
  Post,
  ValidateParameters,
} from "@edu-platform/common/platform";
import { ISaveAnswerUseCase } from "@core/application/use-cases";

type Request = TypedRequest<SaveAnswerParams, {}, SaveAnswerRequestBody>;
type Response = TypedResponse<SaveAnswerResponseBody>;

interface Deps {
  saveAnswerUseCase: ISaveAnswerUseCase;
}

@Post("student-output/:studentOutputId/answers")
@ValidateParameters({
  paramsSchema,
  bodySchema,
})
@Middlewares(["auth"])
export class SaveAnswerController {
  private _saveAnswerUseCase: ISaveAnswerUseCase;

  constructor(deps: Deps) {
    this._saveAnswerUseCase = deps.saveAnswerUseCase;
  }

  async execute(req: Request, res: Response) {
    const { studentOutputId } = req.params;
    const { answer, questionId, answerId } = req.body;
    const { user } = req;

    await this._saveAnswerUseCase.execute({
      user,
      studentOutputId,
      questionId,
      answer,
      answerId,
    });

    res.status(200).json();
  }
}
