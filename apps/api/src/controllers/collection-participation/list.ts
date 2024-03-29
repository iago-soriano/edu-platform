import {
  HTTPController,
  HttpMethod,
  Request as TypedRequest,
  Response as TypedResponse,
  ICollectionParticipationsReadRepository,
} from "@interfaces";
import {
  ListParticipantsOfCollectionQuery,
  ListParticipantsOfCollectionResponseBody,
  parseListParticipantsOfCollectionQuery,
} from "@edu-platform/common";

type Request = TypedRequest<ListParticipantsOfCollectionQuery, {}, {}>;
type Response = TypedResponse<ListParticipantsOfCollectionResponseBody>;

export class ListUsersInCollectionController
  implements HTTPController<Request, Response>
{
  method = HttpMethod.GET;
  path: string = "collection/:collectionId/student";
  middlewares: string[] = ["auth"];

  constructor(
    private collectionParticipationsReadRepository: ICollectionParticipationsReadRepository
  ) {}

  async execute(req: Request, res: Response) {
    const { user } = req;
    const { collectionId, page, pageSize } =
      parseListParticipantsOfCollectionQuery({ ...req.params, ...req.query });

    const resp = await this.collectionParticipationsReadRepository.listStudents(
      {
        collectionId,
        page,
        pageSize,
      }
    );

    res.status(200).json(resp);
  }
}
