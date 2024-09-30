import {
  Delete,
  Middlewares,
  Request as TypedRequest,
  Response as TypedResponse,
  ValidateParameters,
} from "@edu-platform/common/platform";
import {
  UnfollowCollectionParams,
  UnfollowCollectionRequestBody,
  UnfollowCollectionResponseBody,
  unfollowCollectionParamsSchema as paramsSchema,
} from "@edu-platform/common";
import { IUnfollowCollectionUseCase } from "@core/application/use-cases";

type Request = TypedRequest<
  UnfollowCollectionParams,
  {},
  UnfollowCollectionRequestBody
>;
type Response = TypedResponse<UnfollowCollectionResponseBody>;

interface Deps {
  unfollowCollectionUseCase: IUnfollowCollectionUseCase;
}

@Delete("collections/:collectionId/participation/:participationId/follower")
@ValidateParameters({
  paramsSchema,
})
@Middlewares(["auth"])
export class UnfollowCollectionController {
  private _unfollowCollectionUseCase: IUnfollowCollectionUseCase;

  constructor(deps: Deps) {
    this._unfollowCollectionUseCase = deps.unfollowCollectionUseCase;
  }

  async execute(req: Request, res: Response) {
    const { collectionId, participationId } = req.params;
    const { user } = req;

    await this._unfollowCollectionUseCase.execute({
      user,
      collectionId,
      participationId,
    });

    res.status(200).json();
  }
}
