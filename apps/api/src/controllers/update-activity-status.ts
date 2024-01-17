import {
  HTTPController,
  HttpMethod,
  Request as TypedRequest,
  Response as TypedResponse,
} from "@interfaces";
import {
  UpdateActivityStatusRequestParams,
  UpdateActivityStatusRequestBody,
  UpdateActivityStatusResponseBody,
} from "@edu-platform/common/api";
import { IUpdateActivityStatusUseCase } from "@use-cases";
import { parseNumberId } from "@infrastructure";
import { parseVersionStatus } from "@dto";

type Request = TypedRequest<
  UpdateActivityStatusRequestParams,
  {},
  UpdateActivityStatusRequestBody
>;
type Response = TypedResponse<UpdateActivityStatusResponseBody>;

export class UpdateActivityStatusController
  implements HTTPController<Request, Response>
{
  method = HttpMethod.POST;
  path = "update-activity/:activityId/version/:versionId/status";
  middlewares: string[] = ["auth"];

  constructor(
    private updateActivityStatusUseCase: IUpdateActivityStatusUseCase
  ) {}

  async execute(req: Request, res: Response) {
    const { activityId, versionId } = parseNumberId(req.params, [
      "activityId",
      "versionId",
    ]);
    const newActivityStatus = parseVersionStatus(req.body.newActivityStatus);

    const lastPublishedVersion = await this.updateActivityStatusUseCase.execute(
      {
        user: req.user,
        activityId,
        versionId,
        newActivityStatus,
      }
    );

    res.status(200).json(lastPublishedVersion);
  }
}
