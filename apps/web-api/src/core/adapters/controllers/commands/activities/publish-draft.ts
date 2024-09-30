import {
  Request as TypedRequest,
  Response as TypedResponse,
} from "@edu-platform/common/platform/interfaces";
import {
  PublishDraftParams,
  PublishDraftRequestBody,
  PublishDraftResponseBody,
  publishDraftParamsSchema as paramsSchema,
} from "@edu-platform/common";
import { IPublishDraftUseCase } from "@core/application/use-cases";
import {
  Middlewares,
  Patch,
  ValidateParameters,
} from "@edu-platform/common/platform";

type Request = TypedRequest<PublishDraftParams, {}, PublishDraftRequestBody>;
type Response = TypedResponse<PublishDraftResponseBody>;

interface Deps {
  publishDraftUseCase: IPublishDraftUseCase;
}

@Patch("activities/:activityId/versions/draft/publish")
@ValidateParameters({ paramsSchema })
@Middlewares(["auth"])
export class PublishDraftController {
  private _publishDraftUseCase: IPublishDraftUseCase;

  constructor(deps: Deps) {
    this._publishDraftUseCase = deps.publishDraftUseCase;
  }

  async execute(req: Request, res: Response) {
    const { activityId } = req.params;
    const { user } = req;

    await this._publishDraftUseCase.execute({
      user,
      activityId,
    });

    res.status(200);
  }
}
