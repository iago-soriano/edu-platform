import {
  HTTPController,
  HttpMethod,
  Request as TypedRequest,
  Response as TypedResponse,
} from "@edu-platform/common/platform/interfaces";
import { IActivitiesReadRepository } from "@core/application/interfaces";
import {
  ListActivitiesQuery,
  ListActivitiesForOwnerResponseBody,
  listOwnerViewQuerySchema as paramsSchema,
} from "@edu-platform/common";
import {
  Get,
  Middlewares,
  ValidateParameters,
} from "@edu-platform/common/platform";

type Request = TypedRequest<{}, ListActivitiesQuery, {}>;
type Response = TypedResponse<ListActivitiesForOwnerResponseBody>;

interface Deps {
  activitiesReadRepository: IActivitiesReadRepository;
}

@Get("activities/owner-view")
@ValidateParameters({ paramsSchema })
@Middlewares(["auth"])
export class ListActivitiesForCollectionOwnerController {
  private _activitiesReadRepository: IActivitiesReadRepository;

  constructor(deps: Deps) {
    this._activitiesReadRepository = deps.activitiesReadRepository;
  }

  async execute(req: Request, res: Response) {
    const {
      user: { id: userId },
    } = req;
    const { collectionId, page, pageSize } = req.query;

    let result: ListActivitiesForOwnerResponseBody = {
      data: [],
      pagination: { totalCount: 0 },
    };

    result = await this._activitiesReadRepository.listForCollectionOwner({
      userId,
      collectionId,
      page,
      pageSize,
    });

    res.status(200).json(result);
  }
}
