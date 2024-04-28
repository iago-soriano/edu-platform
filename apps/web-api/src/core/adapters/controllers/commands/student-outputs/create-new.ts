import {
  HTTPController,
  HttpMethod,
  Request as TypedRequest,
  Response as TypedResponse,
} from "@edu-platform/common/platform";
import {
  CreateStudentOutputParams,
  CreateStudentOutputRequestBody,
  CreateStudentOutputResponseBody,
  parseCreateNewStudentOutputRequest,
} from "@edu-platform/common";
import { ICreateStudentOutputUseCase } from "@core/application/use-cases";

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
  path: string = "student-output/:activityId";
  middlewares: string[] = ["auth"];

  constructor(
    private createStudentOutputUseCase: ICreateStudentOutputUseCase
  ) {}

  async execute(req: Request, res: Response) {
    const { user } = req;

    const { activityId } = parseCreateNewStudentOutputRequest(req.params);

    await this.createStudentOutputUseCase.execute({
      user,
      activityId,
    });

    res.status(200).json();
  }
}
