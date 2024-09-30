import {
  Get,
  Middlewares,
  Request as TypedRequest,
  Response as TypedResponse,
  ValidateParameters,
} from "@edu-platform/common/platform";
import { ICollectionsReadRepository } from "@core/application/interfaces";
import {
  Params,
  ResponseBody,
  paramsSchema,
} from "@edu-platform/common/api/contracts/queries/collections/get-by-id";

type Request = TypedRequest<Params, {}, {}>;
type Response = TypedResponse<ResponseBody>;

interface Deps {
  collectionsReadRepository: ICollectionsReadRepository;
}

@Get("collections/:collectionId")
@ValidateParameters({ paramsSchema })
@Middlewares(["auth"])
export class GetCollectionController {
  private _collectionsReadRepository: ICollectionsReadRepository;

  constructor(deps: Deps) {
    this._collectionsReadRepository = deps.collectionsReadRepository;
  }

  async execute(req: Request, res: Response) {
    const { user } = req;
    const { collectionId } = req.query;

    const collection = await this._collectionsReadRepository.findByIdForOwner(
      collectionId,
      user
    );

    return res.status(200).json(collection || undefined);
  }
}
