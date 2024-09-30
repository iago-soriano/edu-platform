import {
  Middlewares,
  Patch,
  Request as TypedRequest,
  Response as TypedResponse,
  ValidateParameters,
} from "@edu-platform/common/platform";
import {
  UpdateNotificationParams,
  UpdateNotificationRequestBody,
  UpdateNotificationResponseBody,
  updateNotificationParamsSchema as paramsSchema,
} from "@edu-platform/common";
import { IUpdateNotificationUseCase } from "@core/application/use-cases";

type Request = TypedRequest<
  UpdateNotificationParams,
  {},
  UpdateNotificationRequestBody
>;
type Response = TypedResponse<UpdateNotificationResponseBody>;

interface Deps {
  updateNotificationUseCase: IUpdateNotificationUseCase;
}

@Patch("notifications/:notificationId/set-as-viewed")
@ValidateParameters({
  paramsSchema,
})
@Middlewares(["auth"])
export class UpdateNotificationController {
  private _updateNotificationUseCase: IUpdateNotificationUseCase;

  constructor(deps: Deps) {
    this._updateNotificationUseCase = deps.updateNotificationUseCase;
  }

  async execute(req: Request, res: Response) {
    const { notificationId } = req.params;

    await this._updateNotificationUseCase.execute({
      user: req.user,
      notificationId,
    });

    res.status(200).json();
  }
}
