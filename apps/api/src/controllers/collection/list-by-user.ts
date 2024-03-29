import {
  HTTPController,
  HttpMethod,
  Request as TypedRequest,
  Response as TypedResponse,
  ICollectionsReadRepository,
} from "@interfaces";
import {
  ListCollectionsByUserQuery,
  ListCollectionsByUserResponseBody,
  parseListCollectionsQuery,
} from "@edu-platform/common";

type Request = TypedRequest<{}, ListCollectionsByUserQuery, {}>;
type Response = TypedResponse<ListCollectionsByUserResponseBody>;

export class ListCollectionsByUserController
  implements HTTPController<Request, Response>
{
  method = HttpMethod.GET;
  path: string = "collection";
  middlewares: string[] = ["auth"];

  constructor(private collectionsReadRepository: ICollectionsReadRepository) {}

  async execute(req: Request, res: Response) {
    const { user } = req;

    const { page, pageSize, byOwnership, isPrivate } =
      parseListCollectionsQuery(req.query);

    let resp: ListCollectionsByUserResponseBody = {
      isOwnerOf: { collections: [], pagination: { totalRowCount: 0 } },
      participatesIn: [],
    };

    if (byOwnership) {
      resp = {
        isOwnerOf: await this.collectionsReadRepository.listByOwnership({
          userId: user.id,
          isPrivate,
          page,
          pageSize,
        }),
        participatesIn: [],
      };
    } else {
      resp = {
        isOwnerOf: { collections: [], pagination: { totalRowCount: 0 } },
        participatesIn:
          await this.collectionsReadRepository.listByParticipation({
            userId: user.id,
            page,
            pageSize,
          }),
      };
    }

    res.status(200).json(resp);
  }
}
