import {
  HTTPController,
  HttpMethod,
  Request as TypedRequest,
  Response as TypedResponse,
} from "@interfaces";
import { IDeleteContentUseCase } from "@use-cases";
import {
  DeleteContentParams,
  DeleteContentRequestBody,
  DeleteContentResponseBody,
} from "@edu-platform/common/api";
import { parseNumberId } from "@infrastructure";

type Request = TypedRequest<DeleteContentParams, {}, DeleteContentRequestBody>;
type Response = TypedResponse<DeleteContentResponseBody>;

export class DeleteContentController
  implements HTTPController<Request, Response>
{
  method = HttpMethod.DELETE;
  path: string = "activity/:activityId/version/:versionId/content/:contentId";
  middlewares: string[] = ["auth"];

  constructor(private deleteContentUseCase: IDeleteContentUseCase) {}

  async execute(req: Request, res: Response) {
    const { versionId, contentId } = parseNumberId(req.params, [
      "activityId",
      "versionId",
      "contentId",
    ]);
    const { user } = req;

    await this.deleteContentUseCase.execute({
      versionId,
      contentId,
      user,
    });

    res.status(200).json();
  }
}
