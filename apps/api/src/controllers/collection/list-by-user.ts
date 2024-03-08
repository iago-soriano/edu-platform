import {
  HTTPController,
  HttpMethod,
  Request as TypedRequest,
  Response as TypedResponse,
} from "@interfaces";
import {
  ListCollectionsByUserQuery,
  ListCollectionsByUserResponseBody,
} from "@edu-platform/common";
import { ICollectionsReadRepository } from "@interfaces";

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

    let resp: ListCollectionsByUserResponseBody = {
      isOwnerOf: [],
      participatesIn: [],
    };

    if (req.query.byOwnership) {
      resp = {
        isOwnerOf: await this.collectionsReadRepository.listByOwnership(
          user.id
        ),
        participatesIn: [],
      };
    } else {
      resp = {
        isOwnerOf: [],
        participatesIn:
          await this.collectionsReadRepository.listByParticipation(user.id),
      };
    }

    res.status(200).json(resp);
  }
}
