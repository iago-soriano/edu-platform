import {
  HTTPController,
  HttpMethod,
  Request as TypedRequest,
  Response as TypedResponse,
} from "@interfaces";
import {
  UpdateStudentOutputParams,
  UpdateStudentOutputRequestBody,
  UpdateStudentOutputResponseBody,
  parseOutputStatus,
  parseToStudentOutputRequestDTO,
} from "@edu-platform/common";
import { IUpdateStudentOutputUseCase } from "@use-cases";
import { parseNumberId } from "@infrastructure";
import { StudentOutputDtoMapper } from "@dto-mappers";

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
    const newOutputStatus = parseOutputStatus(req.body.newOutputStatus);

    const statusWasChanged = await this.updateStudentOutputUseCase.execute({
      user: req.user,
      studentOutputId,
      newOutputStatus,
    });

    if (!statusWasChanged) {
      res.status(202).json();
    } else {
      res.status(200).json();
    }
  }
}
