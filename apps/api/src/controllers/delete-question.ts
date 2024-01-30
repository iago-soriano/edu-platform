import {
  HTTPController,
  HttpMethod,
  Request as TypedRequest,
  Response as TypedResponse,
} from "@interfaces";
import { IDeleteQuestionUseCase } from "@use-cases";
import {
  DeleteQuestionParams,
  DeleteQuestionRequestBody,
  DeleteQuestionResponseBody,
} from "@edu-platform/common/api";
import { parseNumberId } from "@infrastructure";

type Request = TypedRequest<
  DeleteQuestionParams,
  {},
  DeleteQuestionRequestBody
>;
type Response = TypedResponse<DeleteQuestionResponseBody>;

export class DeleteQuestionController
  implements HTTPController<Request, Response>
{
  method = HttpMethod.DELETE;
  path: string = "activity/:activityId/version/:versionId/content/:questionId";
  middlewares: string[] = ["auth"];

  constructor(private deleteQuestionUseCase: IDeleteQuestionUseCase) {}

  async execute(req: Request, res: Response) {
    const { activityId, versionId, questionId } = parseNumberId(req.params, [
      "activityId",
      "versionId",
      "questionId",
    ]);
    const { user } = req;

    await this.deleteQuestionUseCase.execute({
      activityId,
      versionId,
      questionId,
      user,
    });

    res.status(200).json();
  }
}
