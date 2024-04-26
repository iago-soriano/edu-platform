import {
  HTTPController,
  HttpMethod,
  Request as TypedRequest,
  Response as TypedResponse,
  parseNumberId,
} from "@edu-platform/common/platform";
import { ICollectionsReadRepository } from "@core/application/interfaces";
import {
  GetCollectionParams,
  GetCollectionResponseBody,
} from "@edu-platform/common";

type Request = TypedRequest<GetCollectionParams, {}, {}>;
type Response = TypedResponse<GetCollectionResponseBody>;

export class GetCollectionController
  implements HTTPController<Request, Response>
{
  method = HttpMethod.GET;
  path = "collections/:collectionId";
  middlewares: string[] = ["auth"];

  constructor(private collectionsReadRepository: ICollectionsReadRepository) {}

  async execute(req: Request, res: Response) {
    const { user } = req;

    const { collectionId } = parseNumberId(req.params, ["collectionId"]);

    const collection = await this.collectionsReadRepository.findByIdForOwner(
      collectionId,
      user
    );

    return res.status(200).json(collection || undefined);
  }
}
