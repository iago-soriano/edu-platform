import {
  HTTPController,
  HttpMethod,
  Request as TypedRequest,
  Response as TypedResponse,
} from "@interfaces";
import {
  UpdateVersionStatusParams,
  UpdateVersionStatusRequestBody,
  UpdateVersionStatusResponseBody,
} from "@edu-platform/common";
import { IUpdateActivityStatusUseCase } from "@use-cases";
import { parseNumberId } from "@infrastructure";
import { parseVersionStatus } from "@edu-platform/common";

type Request = TypedRequest<
  UpdateVersionStatusParams,
  {},
  UpdateVersionStatusRequestBody
>;
type Response = TypedResponse<UpdateVersionStatusResponseBody>;

export class UpdateVersionStatusController
  implements HTTPController<Request, Response>
{
  method = HttpMethod.PATCH;
  path = "activity/:activityId/version/:versionId/status";
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