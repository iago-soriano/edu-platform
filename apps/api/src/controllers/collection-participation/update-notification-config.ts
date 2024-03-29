import {
  HTTPController,
  HttpMethod,
  Request as TypedRequest,
  Response as TypedResponse,
} from "@interfaces";
import {
  UpdateNotificationConfigParams,
  UpdateNotificationConfigRequestBody,
  UpdateNotificationConfigResponseBody,
} from "@edu-platform/common";
import { IUpdateNotificationConfigUseCase } from "@use-cases";
import { parseNumberId } from "@infrastructure";

type Request = TypedRequest<
  UpdateNotificationConfigParams,
  {},
  UpdateNotificationConfigRequestBody
>;
type Response = TypedResponse<UpdateNotificationConfigResponseBody>;

export class UpdateNotificationConfigController
  implements HTTPController<Request, Response>
{
  method = HttpMethod.POST;
  path: string = "collection/:collectionId/update-notification-config";
  middlewares: string[] = ["auth"];

  constructor(
    private updateNotificationConfigUseCase: IUpdateNotificationConfigUseCase
  ) {}

  async execute(req: Request, res: Response) {
    const { collectionId } = parseNumberId(req.params, ["collectionId"]); // TODO criar o trem do zod igual list-activity-version lá nos contracts na pasta common

    const { user } = req;

    await this.updateNotificationConfigUseCase.execute({
      user,
      collectionId,
    });

    res.status(200).json();
  }
}
