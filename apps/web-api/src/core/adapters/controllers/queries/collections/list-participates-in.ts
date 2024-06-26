import {
  HTTPController,
  HttpMethod,
  Request as TypedRequest,
  Response as TypedResponse,
} from "@edu-platform/common/platform/interfaces";
import { ICollectionsReadRepository } from "@core/application/interfaces";
import {
  ListCollectionsForParticipantQuery,
  ListCollectionsForParticipantResponseBody,
  parseListCollectionsForParticipantQuery,
} from "@edu-platform/common";

type Request = TypedRequest<{}, ListCollectionsForParticipantQuery, {}>;
type Response = TypedResponse<ListCollectionsForParticipantResponseBody>;

export class ListCollectionsForParticipantController
  implements HTTPController<Request, Response>
{
  method = HttpMethod.GET;
  path: string = "collections/participates-in";
  middlewares: string[] = ["auth"];

  constructor(private collectionsReadRepository: ICollectionsReadRepository) {}

  async execute(req: Request, res: Response) {
    const { user } = req;

    const { page, pageSize } = parseListCollectionsForParticipantQuery(
      req.query
    );

    const result = await this.collectionsReadRepository.listByParticipation({
      userId: user.id,
      page,
      pageSize,
    });

    res.status(200).json(result);
  }
}
