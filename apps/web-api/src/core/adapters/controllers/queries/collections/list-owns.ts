import {
  HTTPController,
  HttpMethod,
  Request as TypedRequest,
  Response as TypedResponse,
} from "@edu-platform/common/platform/interfaces";
import { ICollectionsReadRepository } from "@core/application/interfaces";
import {
  ListCollectionsForOwnerQuery,
  ListCollectionsForOwnerResponseBody,
  listCollectionsForOwnerQuerySchema as paramsSchema,
} from "@edu-platform/common";
import {
  Get,
  Middlewares,
  ValidateParameters,
} from "@edu-platform/common/platform";

type Request = TypedRequest<{}, ListCollectionsForOwnerQuery, {}>;
type Response = TypedResponse<ListCollectionsForOwnerResponseBody>;

interface Deps {
  collectionsReadRepository: ICollectionsReadRepository;
}

@Get("collections/owns")
@ValidateParameters({ paramsSchema })
@Middlewares(["auth"])
export class ListCollectionsForOwnerController {
  private _collectionsReadRepository: ICollectionsReadRepository;
  constructor(deps: Deps) {
    this._collectionsReadRepository = deps.collectionsReadRepository;
  }

  async execute(req: Request, res: Response) {
    const { user } = req;

    const { page, pageSize, isPrivate } = req.query;

    const result = await this._collectionsReadRepository.listByOwnership({
      userId: user.id,
      isPrivate,
      page,
      pageSize,
    });

    res.status(200).json(result);
  }
}
