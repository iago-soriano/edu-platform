import {
  HTTPController,
  HttpMethod,
  Request as TypedRequest,
  Response as TypedResponse,
} from "@edu-platform/common/platform/interfaces";
import {
  PublishDraftParams,
  PublishDraftRequestBody,
  PublishDraftResponseBody,
} from "@edu-platform/common";
import { IPublishDraftUseCase } from "@application/use-cases";

type Request = TypedRequest<PublishDraftParams, {}, PublishDraftRequestBody>;
type Response = TypedResponse<PublishDraftResponseBody>;

export class PublishDraftController
  implements HTTPController<Request, Response>
{
  method = HttpMethod.PATCH;
  path = "activities/:activityId/versions/draft/publish";
  middlewares: string[] = ["auth"];

  constructor(private publishDraftUseCase: IPublishDraftUseCase) {}

  async execute(req: Request, res: Response) {
    const { activityId } = req.params;
    const { user } = req;

    await this.publishDraftUseCase.execute({
      user,
      activityId,
    });

    res.status(200);
  }
}
