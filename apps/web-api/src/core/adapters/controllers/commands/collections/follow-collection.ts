import {
  Middlewares,
  Post,
  Request as TypedRequest,
  Response as TypedResponse,
  ValidateParameters,
} from "@edu-platform/common/platform";
import {
  FollowCollectionParams,
  FollowCollectionRequestBody,
  FollowCollectionResponseBody,
  followCollectionParamsSchema as paramsSchema,
} from "@edu-platform/common";
import { IInsertFollowerInCollectionUseCase } from "@core/application/use-cases";

type Request = TypedRequest<
  FollowCollectionParams,
  {},
  FollowCollectionRequestBody
>;
type Response = TypedResponse<FollowCollectionResponseBody>;

interface Deps {
  insertFollowerInCollectionUseCase: IInsertFollowerInCollectionUseCase;
}

@Post("collections/:collectionId/follow")
@ValidateParameters({
  paramsSchema,
})
@Middlewares(["auth"])
export class InsertFollowerInCollectionController {
  private _insertFollowerInCollectionUseCase: IInsertFollowerInCollectionUseCase;

  constructor(deps: Deps) {
    this._insertFollowerInCollectionUseCase =
      deps.insertFollowerInCollectionUseCase;
  }

  async execute(req: Request, res: Response) {
    const { collectionId } = req.params;
    const { user } = req;

    await this._insertFollowerInCollectionUseCase.execute({
      user,
      collectionId,
    });

    res.status(200);
  }
}
