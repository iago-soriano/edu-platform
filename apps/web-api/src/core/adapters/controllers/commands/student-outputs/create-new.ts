import {
  Middlewares,
  Post,
  Request as TypedRequest,
  Response as TypedResponse,
  ValidateParameters,
} from "@edu-platform/common/platform";
import {
  CreateStudentOutputParams,
  CreateStudentOutputRequestBody,
  CreateStudentOutputResponseBody,
  createNewStudentOutputParamsSchema as paramsSchema,
} from "@edu-platform/common";
import { ICreateStudentOutputUseCase } from "@core/application/use-cases";

type Request = TypedRequest<
  CreateStudentOutputParams,
  {},
  CreateStudentOutputRequestBody
>;
type Response = TypedResponse<CreateStudentOutputResponseBody>;

interface Deps {
  createStudentOutputUseCase: ICreateStudentOutputUseCase;
}

@Post("student-output/:activityId")
@ValidateParameters({
  paramsSchema,
})
@Middlewares(["auth"])
export class CreateStudentOutputController {
  private _createStudentOutputUseCase: ICreateStudentOutputUseCase;

  constructor(deps: Deps) {
    this._createStudentOutputUseCase = deps.createStudentOutputUseCase;
  }

  async execute(req: Request, res: Response) {
    const { user } = req;

    const { activityId } = req.params;

    await this._createStudentOutputUseCase.execute({
      user,
      activityId,
    });

    res.status(200).json();
  }
}
