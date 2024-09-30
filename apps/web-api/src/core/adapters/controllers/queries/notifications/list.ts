import {
  HTTPController,
  HttpMethod,
  Request as TypedRequest,
  Response as TypedResponse,
} from "@edu-platform/common/platform/interfaces";
import { INotificationsReadRepository } from "@core/application/interfaces";
import {
  ListNotificationsQuery,
  ListNotificationsResponseBody,
  listNotificationQuerySchema as paramsSchema,
} from "@edu-platform/common";

import { parseToPaginatedParamsDTO } from "@edu-platform/common";
import {
  Get,
  Middlewares,
  ValidateParameters,
} from "@edu-platform/common/platform";

type Request = TypedRequest<{}, ListNotificationsQuery, {}>;
type Response = TypedResponse<ListNotificationsResponseBody>;

interface Deps {
  notificationsReadRepository: INotificationsReadRepository;
}

@Get("notifications")
@ValidateParameters({ paramsSchema })
@Middlewares(["auth"])
export class ListNotificationsController {
  private _notificationsReadRepository: INotificationsReadRepository;

  constructor(deps: Deps) {
    this._notificationsReadRepository = deps.notificationsReadRepository;
  }

  async execute(req: Request, res: Response) {
    const { user } = req;
    const { page, pageSize } = parseToPaginatedParamsDTO(req.query);

    const notificationsList = await this._notificationsReadRepository.list({
      userId: user.id,
      page,
      pageSize,
    });

    res.status(200).json(notificationsList);
  }
}
