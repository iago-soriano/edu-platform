import {
  HTTPController,
  HttpMethod,
  Request as TypedRequest,
  Response as TypedResponse,
} from "@interfaces";
import { IDeleteContentUseCase } from "@use-cases";
import { DeleteActivityContentParams } from "@edu-platform/common/api";

type Request = TypedRequest<DeleteActivityContentParams, {}, {}>;
type Response = TypedResponse<{}>;

export class DeleteContentController implements HTTPController {
  method = HttpMethod.DELETE;
  path: string = "activity/:activityId/version/:versionId/content/:contentId";
  middlewares: string[] = ["auth"];

  constructor(private deleteContentUseCase: IDeleteContentUseCase) {}

  async execute(req: Request, res: Response) {
    const { versionId, contentId } = req.params;

    await this.deleteContentUseCase.execute({
      versionId,
      contentId,
    });

    res.status(200).json();
  }
}
