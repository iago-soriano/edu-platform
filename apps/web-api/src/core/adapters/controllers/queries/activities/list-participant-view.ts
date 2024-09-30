import {
  HTTPController,
  HttpMethod,
  Request as TypedRequest,
  Response as TypedResponse,
} from "@edu-platform/common/platform/interfaces";
import { IActivitiesReadRepository } from "@core/application/interfaces";
import {
  ListActivitiesQuery,
  ListActivitiesForParticipantResponseBody,
} from "@edu-platform/common";
import { Get, Middlewares } from "@edu-platform/common/platform";

type Request = TypedRequest<{}, ListActivitiesQuery, {}>;
type Response = TypedResponse<ListActivitiesForParticipantResponseBody>;

interface Deps {
  activitiesReadRepository: IActivitiesReadRepository;
}

@Get("activities/participant-view")
@Middlewares(["auth"])
export class ListActivitiesForCollectionParticipantController {
  private _activitiesReadRepository: IActivitiesReadRepository;

  constructor(deps: Deps) {
    this._activitiesReadRepository = deps.activitiesReadRepository;
  }

  async execute(req: Request, res: Response) {
    const {
      user: { id: userId },
    } = req;
    // const { collectionId, page, pageSize } = parseListActivityVersionsQuery(
    //   req.query
    // );

    let result: ListActivitiesForParticipantResponseBody = {
      data: [],
      pagination: { totalCount: 0 },
    };

    result = await this._activitiesReadRepository.listForCollectionParticipant({
      userId,
      collectionId: 9,
      page: 0,
      pageSize: 10,
    });

    res.status(200).json(result);
  }
}
