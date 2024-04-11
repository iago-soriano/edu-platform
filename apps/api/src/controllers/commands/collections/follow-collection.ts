import {
  HTTPController,
  HttpMethod,
  Request as TypedRequest,
  Response as TypedResponse,
} from "../../interfaces";
import {
  FollowCollectionParams,
  FollowCollectionRequestBody,
  FollowCollectionResponseBody,
} from "@edu-platform/common";
import { IInsertFollowerInCollectionUseCase } from "@application/use-cases";
import { parseNumberId } from "@infrastructure/utils";

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
  path: string = "collections/:collectionId/follow";
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
