import {
  HTTPController,
  HttpMethod,
  Request as TypedRequest,
  Response as TypedResponse,
  IActivitiesReadRepository,
} from "@interfaces";
import {
  ListActivityVersionsQuery,
  ListActivityVersionsResponseBody,
  ListActivityVersionsRequestBody,
  parseVersionStatus,
} from "@edu-platform/common";
import { parseNumberId } from "@infrastructure";

type Request = TypedRequest<
  {},
  ListActivityVersionsQuery,
  ListActivityVersionsRequestBody
>;
type Response = TypedResponse<ListActivityVersionsResponseBody>;

export class ListActivityVersionsController
  implements HTTPController<Request, Response>
{
  method = HttpMethod.GET;
  path = "activities";
  middlewares: string[] = ["auth"];

  constructor(private activitiesReadRepository: IActivitiesReadRepository) {}

  async execute(req: Request, res: Response) {
    const {
      user: { id: userId },
    } = req;
    const { collectionId, pageSize, page } = parseNumberId(req.query, [
      "collectionId",
      "pageSize",
      "page",
    ]);

    if (pageSize <= 0 || page < 0)
      throw new Error("Please provide valid pagination parameters");

    let result: ListActivityVersionsResponseBody = {
      activities: [],
      pagination: { totalRowCount: 0 },
    };

    if (req.query.byOwnership) {
      result =
        await this.activitiesReadRepository.Versions.listByCollectionOwnership({
          userId,
          collectionId,
          page: page || 0,
          pageSize: pageSize || 100,
        });
    } else {
      // result =
      //   await this.activitiesReadRepository.Versions.listByCollectionParticipation(
      //     userId,
      //     collectionId
      //   );
    }

    res.status(200).json(result);
  }
}
