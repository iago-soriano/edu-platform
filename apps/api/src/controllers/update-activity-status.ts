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
import { IUpdateActivityStatusUseCase } from "application/use-cases/update-activity-status";

type Request = TypedRequest<
  UpdateActivityStatusRequestParams,
  {},
  UpdateActivityStatusRequestBody
>;
type Response = TypedResponse<UpdateActivityStatusResponseBody>;

export class UpdateActivityStatusController implements HTTPController {
  method = HttpMethod.POST;
  path = "update-activity/:activityId/version/:versionId/status";
  middlewares: string[] = ["auth"];

  constructor(
    private updateActivityStatusUseCase: IUpdateActivityStatusUseCase
  ) {}

  async execute(req: Request, res: Response) {
    const { activityId, versionId } = req.params;
    const { newActivityStatus } = req.body;
    const lastPublishedVersion = await this.updateActivityStatusUseCase.execute(
      {
        activityId,
        versionId,
        newActivityStatus,
      }
    );

    res.status(200).json(lastPublishedVersion);
  }
}
