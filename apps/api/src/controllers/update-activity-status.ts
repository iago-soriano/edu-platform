import {
  HTTPController,
  HttpMethod,
  Request as TypedRequest,
  Response as TypedResponse,
} from "@interfaces";
import {
  UpdateActivityStatusRequestBody,
  UpdateActivityStatusResponseBody,
} from "@edu-platform/common/api";
import { IUpdateActivityStatusUseCase } from "application/use-cases/update-activity-status";

type Request = TypedRequest<
  { activityId },
  {},
  UpdateActivityStatusRequestBody
>;
type Response = TypedResponse<UpdateActivityStatusResponseBody>;

export class UpdateActivityStatusController implements HTTPController {
  method = HttpMethod.PATCH;
  path = "activities/:activityId/status";
  middlewares: string[] = ["auth"];

  constructor(
    private updateActivityStatusUseCase: IUpdateActivityStatusUseCase
  ) {}

  async execute(req: Request, res: Response) {
    const { activityId } = req.params;
    const { activityStatus } = req.body;
    await this.updateActivityStatusUseCase.execute({
      activityId,
      activityStatus,
    });

    res.status(200).json();
  }
}
