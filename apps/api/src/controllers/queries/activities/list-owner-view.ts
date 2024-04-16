import {
  HTTPController,
  HttpMethod,
  Request as TypedRequest,
  Response as TypedResponse,
} from "@edu-platform/common/platform/interfaces";
import { IActivitiesReadRepository } from "@application/interfaces";
import {
  ListActivitiesQuery,
  ListActivitiesForOwnerResponseBody,
  parseListActivityVersionsQuery,
} from "@edu-platform/common";

type Request = TypedRequest<{}, ListActivitiesQuery, {}>;
type Response = TypedResponse<ListActivitiesForOwnerResponseBody>;

export class ListActivitiesForCollectionOwnerController
  implements HTTPController<Request, Response>
{
  method = HttpMethod.GET;
  path = "activities/owner-view";
  middlewares: string[] = ["auth"];

  constructor(private activitiesReadRepository: IActivitiesReadRepository) {}

  async execute(req: Request, res: Response) {
    const {
      user: { id: userId },
    } = req;
    const { collectionId, page, pageSize } = parseListActivityVersionsQuery(
      req.query
    );

    let result: ListActivitiesForOwnerResponseBody = {
      data: [],
      pagination: { totalCount: 0 },
    };

    result = await this.activitiesReadRepository.listForCollectionOwner({
      userId,
      collectionId,
      page: page || 0,
      pageSize: pageSize || 100,
    });

    res.status(200).json(result);
  }
}
