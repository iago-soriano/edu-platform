import {
  HTTPController,
  HttpMethod,
  Request as TypedRequest,
  Response as TypedResponse,
} from "@interfaces";
import {
  CreateStudentOutputParams,
  CreateStudentOutputRequestBody,
  CreateStudentOutputResponseBody,
} from "@edu-platform/common";
import { ICreateStudentOutputUseCase } from "@use-cases";
import { parseNumberId } from "@infrastructure";

type Request = TypedRequest<
  CreateStudentOutputParams,
  {},
  CreateStudentOutputRequestBody
>;
type Response = TypedResponse<CreateStudentOutputResponseBody>;

export class CreateUserOutputController
  implements HTTPController<Request, Response>
{
  method = HttpMethod.POST;
  path: string = "activities/:activityId/published-version/student-output";
  middlewares: string[] = ["auth"];

  constructor(
    private createStudentOutputUseCase: ICreateStudentOutputUseCase
  ) {}

  async execute(req: Request, res: Response) {
    const { user } = req;

    const { activityId, versionId } = parseNumberId(req.params, [
      "activityId",
      "versionId",
    ]);

    await this.createStudentOutputUseCase.execute({
      user,
      activityId,
      versionId,
    });

    res.status(200).json();
  }
}
