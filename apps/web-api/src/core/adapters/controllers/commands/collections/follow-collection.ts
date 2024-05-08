import {
  HTTPController,
  HttpMethod,
  Request as TypedRequest,
  Response as TypedResponse,
  parseNumberId,
} from "@edu-platform/common/platform";
import {
  FollowCollectionParams,
  FollowCollectionRequestBody,
  FollowCollectionResponseBody,
} from "@edu-platform/common";
import { IInsertFollowerInCollectionUseCase } from "@core/application/use-cases";

type Request = TypedRequest<
  FollowCollectionParams,
  {},
  FollowCollectionRequestBody
>;
type Response = TypedResponse<FollowCollectionResponseBody>;

export class InsertFollowerInCollectionController
  implements HTTPController<Request, Response>
{
  method = HttpMethod.POST;
  path: string = "core/collections/:collectionId/follow";
  middlewares: string[] = ["auth"];

  constructor(
    private insertFollowerInCollectionUseCase: IInsertFollowerInCollectionUseCase
  ) {}

  async execute(req: Request, res: Response) {
    const { collectionId } = parseNumberId(req.params, ["collectionId"]);
    const { user } = req;

    await this.insertFollowerInCollectionUseCase.execute({
      user,
      collectionId,
    });

    res.status(200);
  }
}
