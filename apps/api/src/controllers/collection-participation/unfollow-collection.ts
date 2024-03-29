import {
  HTTPController,
  HttpMethod,
  Request as TypedRequest,
  Response as TypedResponse,
} from "@interfaces";
import {
  RemoveUserFromCollectionParams,
  RemoveUserFromCollectionRequestBody,
  RemoveUserFromCollectionResponseBody,
} from "@edu-platform/common";
import { IUnfollowCollectionUseCase } from "@use-cases";
import { parseNumberId } from "@infrastructure";

type Request = TypedRequest<
  RemoveUserFromCollectionParams,
  {},
  RemoveUserFromCollectionRequestBody
>;
type Response = TypedResponse<RemoveUserFromCollectionResponseBody>;

export class UnfollowCollectionController
  implements HTTPController<Request, Response>
{
  method = HttpMethod.DELETE;
  path: string = "collection/:collectionId/unfollow";
  middlewares: string[] = ["auth"];

  constructor(private unfollowCollectionUseCase: IUnfollowCollectionUseCase) {}

  async execute(req: Request, res: Response) {
    const { collectionId } = parseNumberId(req.params, ["collectionId"]);

    const { user } = req;

    const { alreadyUnfollowed } = await this.unfollowCollectionUseCase.execute({
      user,
      collectionId,
    });

    if (!alreadyUnfollowed) {
      res.status(200).json();
    } else {
      res.status(202).json();
    }
  }
}
