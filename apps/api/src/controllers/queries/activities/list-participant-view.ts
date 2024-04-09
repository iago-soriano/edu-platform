import {
  HTTPController,
  HttpMethod,
  Request as TypedRequest,
  Response as TypedResponse,
  IActivitiesReadRepository,
} from "@interfaces";
import {
  ListActivitiesQuery,
  ListActivitiesForParticipantResponseBody,
  parseListActivityVersionsQuery,
} from "@edu-platform/common";

type Request = TypedRequest<{}, ListActivitiesQuery, {}>;
type Response = TypedResponse<ListActivitiesForParticipantResponseBody>;

export class ListActivitiesForCollectionParticipantController
  implements HTTPController<Request, Response>
{
  method = HttpMethod.GET;
  path = "activities/participant-view";
  middlewares: string[] = ["auth"];

  constructor(private activitiesReadRepository: IActivitiesReadRepository) {}

  async execute(req: Request, res: Response) {
    const {
      user: { id: userId },
    } = req;
    const { collectionId, page, pageSize } = parseListActivityVersionsQuery(
      req.query
    );

    let result: ListActivitiesForParticipantResponseBody = {
      data: [],
      pagination: { totalCount: 0 },
    };

    result = await this.activitiesReadRepository.listForCollectionParticipant({
      userId,
      collectionId,
      page: page || 0,
      pageSize: pageSize || 100,
    });

    res.status(200).json(result);
  }
}
