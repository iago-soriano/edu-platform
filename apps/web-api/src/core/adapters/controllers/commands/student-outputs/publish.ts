import {
  HTTPController,
  HttpMethod,
  Request as TypedRequest,
  Response as TypedResponse,
  parseNumberId,
} from "@edu-platform/common/platform";
import {
  UpdateStudentOutputParams,
  UpdateStudentOutputRequestBody,
  UpdateStudentOutputResponseBody,
} from "@edu-platform/common";
import { IUpdateStudentOutputUseCase } from "@core/application/use-cases";

type Request = TypedRequest<
  UpdateStudentOutputParams,
  {},
  UpdateStudentOutputRequestBody
>;
type Response = TypedResponse<UpdateStudentOutputResponseBody>;

export class UpdateStudentOutputController
  implements HTTPController<Request, Response>
{
  method = HttpMethod.PATCH;
  path = "student-output/:studentOutputId";
  middlewares: string[] = ["auth"];

  constructor(
    private updateStudentOutputUseCase: IUpdateStudentOutputUseCase
  ) {}

  async execute(req: Request, res: Response) {
    const { studentOutputId } = parseNumberId(req.params, ["studentOutputId"]);
    // const newOutputStatus = parseOutputStatus(req.body.newOutputStatus);

    await this.updateStudentOutputUseCase.execute({
      user: req.user,
      studentOutputId,
      // newOutputStatus,
    });

    res.status(200).json();
  }
}
