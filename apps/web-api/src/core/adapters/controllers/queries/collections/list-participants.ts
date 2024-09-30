import {
  HTTPController,
  HttpMethod,
  Request as TypedRequest,
  Response as TypedResponse,
} from "@edu-platform/common/platform/interfaces";
import { ICollectionsReadRepository } from "@core/application/interfaces";
import {
  ListParticipantsOfCollectionQuery,
  ListParticipantsOfCollectionResponseBody,
  listUsersInCollectionQuerySchema as paramsSchema,
} from "@edu-platform/common";
import {
  Get,
  Middlewares,
  ValidateParameters,
} from "@edu-platform/common/platform";

type Request = TypedRequest<{}, ListParticipantsOfCollectionQuery, {}>;
type Response = TypedResponse<ListParticipantsOfCollectionResponseBody>;

interface Deps {
  collectionsReadRepository: ICollectionsReadRepository;
}

@Get("collections/:collectionId/participants")
@ValidateParameters({ paramsSchema })
@Middlewares(["auth"])
export class ListUsersInCollectionController {
  private _collectionsReadRepository: ICollectionsReadRepository;

  constructor(deps: Deps) {
    this._collectionsReadRepository = deps.collectionsReadRepository;
  }

  async execute(req: Request, res: Response) {
    const { user } = req;
    const { collectionId, page, pageSize } = req.query;

    const resp = await this._collectionsReadRepository.listStudents({
      collectionId,
      page,
      pageSize,
    });

    res.status(200).json(resp);
  }
}
