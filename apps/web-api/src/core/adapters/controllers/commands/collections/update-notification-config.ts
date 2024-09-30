import {
  Middlewares,
  Patch,
  Request as TypedRequest,
  Response as TypedResponse,
  ValidateParameters,
} from "@edu-platform/common/platform";
import {
  UpdateNotificationConfigParams,
  UpdateNotificationConfigRequestBody,
  UpdateNotificationConfigResponseBody,
  updateNotificationConfigParamsSchema as paramsSchema,
} from "@edu-platform/common";
import { IUpdateNotificationConfigUseCase } from "@core/application/use-cases";

type Request = TypedRequest<
  UpdateNotificationConfigParams,
  {},
  UpdateNotificationConfigRequestBody
>;
type Response = TypedResponse<UpdateNotificationConfigResponseBody>;

interface Deps {
  updateNotificationConfigUseCase: IUpdateNotificationConfigUseCase;
}

@Patch("collections/:collectionId/notification-config")
@ValidateParameters({
  paramsSchema,
})
@Middlewares(["auth"])
export class UpdateNotificationConfigController {
  private _updateNotificationConfigUseCase: IUpdateNotificationConfigUseCase;

  constructor(deps: Deps) {
    this._updateNotificationConfigUseCase =
      deps.updateNotificationConfigUseCase;
  }

  async execute(req: Request, res: Response) {
    const { collectionId } = req.params;
    const { user } = req;

    await this._updateNotificationConfigUseCase.execute({
      user,
      collectionId,
    });

    res.status(200).json();
  }
}
