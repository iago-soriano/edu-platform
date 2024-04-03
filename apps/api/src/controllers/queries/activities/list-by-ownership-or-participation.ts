import {
  // TODO: if owner of the collection, list by ownership (all versions). If participant of the collection, list only published. split into two endpoints
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
  parseListActivityVersionsQuery,
} from "@edu-platform/common";

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
    const { collectionId, page, pageSize, byOwnership } =
      parseListActivityVersionsQuery(req.query);

    let result: ListActivityVersionsResponseBody = {
      data: [],
      pagination: { totalCount: 0 },
    };

    if (byOwnership) {
      result = await this.activitiesReadRepository.listByCollectionOwnership({
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
