import {
  HTTPController,
  HttpMethod,
  Request as TypedRequest,
  Response as TypedResponse,
} from "@edu-platform/common/platform/interfaces";
import { ICollectionsReadRepository } from "@application/interfaces";
import {
  ListCollectionsForOwnerQuery,
  ListCollectionsForOwnerResponseBody,
  parseListCollectionsForOwnerQuery,
} from "@edu-platform/common";

type Request = TypedRequest<{}, ListCollectionsForOwnerQuery, {}>;
type Response = TypedResponse<ListCollectionsForOwnerResponseBody>;

export class ListCollectionsForOwnerController
  implements HTTPController<Request, Response>
{
  method = HttpMethod.GET;
  path: string = "collections/owns";
  middlewares: string[] = ["auth"];

  constructor(private collectionsReadRepository: ICollectionsReadRepository) {}

  async execute(req: Request, res: Response) {
    const { user } = req;

    const { page, pageSize, isPrivate } = parseListCollectionsForOwnerQuery(
      req.query
    );

    const result = await this.collectionsReadRepository.listByOwnership({
      userId: user.id,
      isPrivate,
      page,
      pageSize,
    });

    res.status(200).json(result);
  }
}
