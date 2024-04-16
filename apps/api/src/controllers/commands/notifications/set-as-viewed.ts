import {
  HTTPController,
  HttpMethod,
  Request as TypedRequest,
  Response as TypedResponse,
  parseNumberId,
} from "@edu-platform/common/platform";
import {
  UpdateNotificationParams,
  UpdateNotificationRequestBody,
  UpdateNotificationResponseBody,
} from "@edu-platform/common";
import { IUpdateNotificationUseCase } from "@application/use-cases";

type Request = TypedRequest<
  UpdateNotificationParams,
  {},
  UpdateNotificationRequestBody
>;
type Response = TypedResponse<UpdateNotificationResponseBody>;

export class UpdateNotificationController
  implements HTTPController<Request, Response>
{
  method = HttpMethod.PATCH;
  path = "notifications/:notificationId/set-as-viewed";
  middlewares: string[] = ["auth"];

  constructor(private updateNotificationUseCase: IUpdateNotificationUseCase) {}

  async execute(req: Request, res: Response) {
    const { notificationId } = parseNumberId(req.params, ["notificationId"]);

    await this.updateNotificationUseCase.execute({
      user: req.user,
      notificationId,
    });

    res.status(200).json();
  }
}
