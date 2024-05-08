import {
  HTTPController,
  HttpMethod,
  Request as TypedRequest,
  Response as TypedResponse,
  parseNumberId,
} from "@edu-platform/common/platform";
import {
  UpdateNotificationConfigParams,
  UpdateNotificationConfigRequestBody,
  UpdateNotificationConfigResponseBody,
} from "@edu-platform/common";
import { IUpdateNotificationConfigUseCase } from "@core/application/use-cases";

type Request = TypedRequest<
  UpdateNotificationConfigParams,
  {},
  UpdateNotificationConfigRequestBody
>;
type Response = TypedResponse<UpdateNotificationConfigResponseBody>;

export class UpdateNotificationConfigController
  implements HTTPController<Request, Response>
{
  method = HttpMethod.PATCH;
  path: string = "core/collections/:collectionId/notification-config";
  middlewares: string[] = ["auth"];

  constructor(
    private updateNotificationConfigUseCase: IUpdateNotificationConfigUseCase
  ) {}

  async execute(req: Request, res: Response) {
    const { collectionId } = parseNumberId(req.params, ["collectionId"]);
    const { user } = req;

    await this.updateNotificationConfigUseCase.execute({
      user,
      collectionId,
    });

    res.status(200).json();
  }
}
