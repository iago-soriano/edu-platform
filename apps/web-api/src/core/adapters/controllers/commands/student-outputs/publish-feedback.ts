import {
  HTTPController,
  HttpMethod,
  Request as TypedRequest,
  Response as TypedResponse,
  parseNumberId,
} from "@edu-platform/common/platform";
import {
  CreateStudentOutputParams,
  CreateStudentOutputRequestBody,
  CreateStudentOutputResponseBody,
} from "@edu-platform/common";

type Request = TypedRequest<
  CreateStudentOutputParams,
  {},
  CreateStudentOutputRequestBody
>;
type Response = TypedResponse<CreateStudentOutputResponseBody>;

export class PublishStudentOutputFeedbackController
  implements HTTPController<Request, Response>
{
  method = HttpMethod.PUT;
  path: string = "activities/:activityId/student-output/:id/feedback/publish";
  middlewares: string[] = ["auth"];

  constructor() // private publishStudentOutputFeedbackUseCase: IPublishStudentOutputFeedbackUseCase
  {}

  async execute(req: Request, res: Response) {
    const { user } = req;

    const { activityId, versionId } = parseNumberId(req.params, [
      "activityId",
      "versionId",
    ]);

    // await this.publishStudentOutputFeedbackUseCase.execute({
    //   user,
    //   activityId,
    //   versionId,
    // });

    res.status(200).json();
  }
}
