import {
  HTTPController,
  HttpMethod,
  Middlewares,
  Put,
  Request as TypedRequest,
  Response as TypedResponse,
  ValidateParameters,
} from "@edu-platform/common/platform";
import {
  PublishStudentOutputParams,
  PublishStudentOutputRequestBody,
  PublishStudentOutputResponseBody,
  publishStudentOutputParamsSchema as paramsSchema,
} from "@edu-platform/common";
import { IPublishStudentOutputUseCase } from "@core/application/use-cases";

type Request = TypedRequest<
  PublishStudentOutputParams,
  {},
  PublishStudentOutputRequestBody
>;
type Response = TypedResponse<PublishStudentOutputResponseBody>;

interface Deps {
  publishStudentOutputUseCase: IPublishStudentOutputUseCase;
}

@Put("student-output/:studentOutputId/publish")
@ValidateParameters({
  paramsSchema,
})
@Middlewares(["auth"])
export class PublishStudentOutputController {
  private _publishStudentOutputUseCase: IPublishStudentOutputUseCase;

  constructor(deps: Deps) {
    this._publishStudentOutputUseCase = deps.publishStudentOutputUseCase;
  }

  async execute(req: Request, res: Response) {
    const { studentOutputId } = req.params;

    await this._publishStudentOutputUseCase.execute({
      user: req.user,
      studentOutputId,
    });

    res.status(200).json();
  }
}
