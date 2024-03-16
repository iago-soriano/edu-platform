import {
  HTTPController,
  HttpMethod,
  Request as TypedRequest,
  Response as TypedResponse,
} from "@interfaces";
import {
  UpdateNotificationParams,
  UpdateNotificationRequestBody,
  UpdateNotificationResponseBody,
} from "@edu-platform/common";
import { IUpdateNotificationUseCase } from "@use-cases";
import { parseNumberId } from "@infrastructure";

type Request = TypedRequest<
  UpdateNotificationParams,
  {},
  UpdateNotificationRequestBody
>;
type Response = TypedResponse<UpdateNotificationResponseBody>;

export class UpdateNotificationController
  implements HTTPController<Request, Response>
{
  method = HttpMethod.POST;
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
