import {
  Middlewares,
  Put,
  Request as TypedRequest,
  Response as TypedResponse,
  ValidateParameters,
} from "@edu-platform/common/platform";
import {
  publishFeedbackParamsSchema as paramsSchema,
  PublishFeedbackRequestBody,
  PublishFeedbackResponseBody,
  PublishFeedbackParams,
} from "@edu-platform/common";
import { IPublishFeedbackUseCase } from "@core/application/use-cases";

type Request = TypedRequest<
  PublishFeedbackParams,
  {},
  PublishFeedbackRequestBody
>;
type Response = TypedResponse<PublishFeedbackResponseBody>;

interface Deps {
  publishFeedbackUseCase: IPublishFeedbackUseCase;
}

@Put("student-output/:studentOutputId/feedback/publish")
@ValidateParameters({
  paramsSchema,
})
@Middlewares(["auth"])
export class PublishFeedbackController {
  private _publishFeedbackUseCase: IPublishFeedbackUseCase;

  constructor(deps: Deps) {
    this._publishFeedbackUseCase = deps.publishFeedbackUseCase;
  }

  async execute(req: Request, res: Response) {
    const { user } = req;
    const { studentOutputId } = req.params;

    await this._publishFeedbackUseCase.execute({
      user,
      studentOutputId,
    });

    res.status(200).json();
  }
}
