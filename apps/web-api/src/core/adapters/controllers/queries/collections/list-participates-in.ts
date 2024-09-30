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
  listCollectionsForParticipantsQuerySchema as paramsSchema,
} from "@edu-platform/common";
import {
  Get,
  Middlewares,
  ValidateParameters,
} from "@edu-platform/common/platform";

type Request = TypedRequest<{}, ListCollectionsForParticipantQuery, {}>;
type Response = TypedResponse<ListCollectionsForParticipantResponseBody>;

interface Deps {
  collectionsReadRepository: ICollectionsReadRepository;
}

@Get("collections/participates-in")
@ValidateParameters({ paramsSchema })
@Middlewares(["auth"])
export class ListCollectionsForParticipantController {
  private _collectionsReadRepository: ICollectionsReadRepository;

  constructor(deps: Deps) {
    this._collectionsReadRepository = deps.collectionsReadRepository;
  }

  async execute(req: Request, res: Response) {
    const { user } = req;

    const { page, pageSize } = req.query;
    const result = await this._collectionsReadRepository.listByParticipation({
      userId: user.id,
      page,
      pageSize,
    });

    res.status(200).json(result);
  }
}
