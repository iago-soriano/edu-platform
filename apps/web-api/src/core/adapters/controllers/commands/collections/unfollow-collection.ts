import {
  HTTPController,
  HttpMethod,
  Request as TypedRequest,
  Response as TypedResponse,
  parseNumberId,
} from "@edu-platform/common/platform";
import {
  UnfollowCollectionParams,
  UnfollowCollectionRequestBody,
  UnfollowCollectionResponseBody,
  unfollowCollectionParseRequest,
} from "@edu-platform/common";
import { IUnfollowCollectionUseCase } from "@core/application/use-cases";

type Request = TypedRequest<
  UnfollowCollectionParams,
  {},
  UnfollowCollectionRequestBody
>;
type Response = TypedResponse<UnfollowCollectionResponseBody>;

export class UnfollowCollectionController
  implements HTTPController<Request, Response>
{
  method = HttpMethod.DELETE;
  path: string =
    "collections/:collectionId/participation/:participationId/follower";
  middlewares: string[] = ["auth"];

  constructor(private unfollowCollectionUseCase: IUnfollowCollectionUseCase) {}

  async execute(req: Request, res: Response) {
    const { collectionId, participationId } = unfollowCollectionParseRequest(
      req.params
    );
    const { user } = req;

    await this.unfollowCollectionUseCase.execute({
      user,
      collectionId,
      participationId,
    });

    res.status(200).json();
  }
}
