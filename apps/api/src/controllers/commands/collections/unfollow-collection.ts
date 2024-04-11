import {
  HTTPController,
  HttpMethod,
  Request as TypedRequest,
  Response as TypedResponse,
} from "../../interfaces";
import {
  UnfollowCollectionParams,
  UnfollowCollectionRequestBody,
  UnfollowCollectionResponseBody,
} from "@edu-platform/common";
import { IUnfollowCollectionUseCase } from "@application/use-cases";
import { parseNumberId } from "@infrastructure/utils";

type Request = TypedRequest<
  UnfollowCollectionParams,
  {},
  UnfollowCollectionRequestBody
>;
type Response = TypedResponse<UnfollowCollectionResponseBody>;

export class UnfollowCollectionController
  implements HTTPController<Request, Response>
{
  method = HttpMethod.POST;
  path: string = "collections/:collectionId/unfollow";
  middlewares: string[] = ["auth"];

  constructor(private unfollowCollectionUseCase: IUnfollowCollectionUseCase) {}

  async execute(req: Request, res: Response) {
    const { collectionId } = parseNumberId(req.params, ["collectionId"]);
    const { user } = req;

    await this.unfollowCollectionUseCase.execute({
      user,
      collectionId,
    });

    res.status(200).json();
  }
}
