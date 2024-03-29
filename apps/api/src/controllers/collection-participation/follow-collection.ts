import {
  HTTPController,
  HttpMethod,
  Request as TypedRequest,
  Response as TypedResponse,
} from "@interfaces";
import {
  FollowCollectionParams,
  FollowCollectionRequestBody,
  FollowCollectionResponseBody,
} from "@edu-platform/common";
import { IInsertFollowerInCollectionUseCase } from "@use-cases";
import { parseNumberId } from "@infrastructure";

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
  path: string = "collection/:collectionId/follower";
  middlewares: string[] = ["auth"];

  constructor(
    private insertFollowerInCollectionUseCase: IInsertFollowerInCollectionUseCase
  ) {}

  async execute(req: Request, res: Response) {
    const { collectionId } = parseNumberId(req.params, ["collectionId"]);

    const { user } = req;

    const { startedFollowing } =
      await this.insertFollowerInCollectionUseCase.execute({
        user,
        collectionId,
      });

    if (startedFollowing) {
      res.status(200).json();
    } else {
      res.status(202).json();
    }
  }
}
