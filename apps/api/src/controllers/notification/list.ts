import {
  HTTPController,
  HttpMethod,
  INotificationsReadRepository,
  Request as TypedRequest,
  Response as TypedResponse,
} from "@interfaces";
import {
  ListNotificationsQuery,
  ListNotificationsResponseBody,
} from "@edu-platform/common";

import { parseToPaginatedParamsDTO } from "@edu-platform/common/dto/paginated-params";

type Request = TypedRequest<{}, ListNotificationsQuery, {}>;
type Response = TypedResponse<ListNotificationsResponseBody>;

export class ListNotificationsController
  implements HTTPController<Request, Response>
{
  method = HttpMethod.GET;
  path = "notifications";
  middlewares: string[] = ["auth"];

  constructor(
    private notificationsReadRepository: INotificationsReadRepository
  ) {}

  async execute(req: Request, res: Response) {
    const { page, pageSize } = parseToPaginatedParamsDTO(req.query);

    const notificationsList = await this.notificationsReadRepository.list({
      userId: req.user.id,
      page,
      pageSize,
    });

    res.status(200).json(notificationsList);
  }
}
