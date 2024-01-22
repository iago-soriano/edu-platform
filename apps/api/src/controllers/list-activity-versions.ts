import {
  HTTPController,
  HttpMethod,
  Request as TypedRequest,
  Response as TypedResponse,
} from "@interfaces";
// import { GetActivityVersionsResponseBody } from "@edu-platform/common/api";
import { IListActivityVersionsUseCase } from "@use-cases";
import { parseVersionStatus, VersionDTO } from "@dto";

export type GetActivityVersionsResponseBody = VersionDTO[];

type Request = TypedRequest<{}, { statuses: string }, {}>;
type Response = TypedResponse<GetActivityVersionsResponseBody>;

export class ListActivityVersionsController
  implements HTTPController<Request, Response>
{
  method = HttpMethod.GET;
  path = "activities";
  middlewares: string[] = ["auth"];

  constructor(
    private listActivityVersionsUseCase: IListActivityVersionsUseCase
  ) {}

  async execute(req: Request, res: Response) {
    const statuses =
      req.query.statuses?.split(",").map((s) => parseVersionStatus(s)) || [];
    const { user } = req;

    const activitiesByAuthor = await this.listActivityVersionsUseCase.execute({
      user,
      statuses: statuses,
    });

    res.status(200).json(activitiesByAuthor);
  }
}
