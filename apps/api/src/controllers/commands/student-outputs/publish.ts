import {
  HTTPController,
  HttpMethod,
  Request as TypedRequest,
  Response as TypedResponse,
} from "../../interfaces";
import {
  UpdateStudentOutputParams,
  UpdateStudentOutputRequestBody,
  UpdateStudentOutputResponseBody,
} from "@edu-platform/common";
import { IUpdateStudentOutputUseCase } from "@application/use-cases";
import { parseNumberId } from "@infrastructure/utils";

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
