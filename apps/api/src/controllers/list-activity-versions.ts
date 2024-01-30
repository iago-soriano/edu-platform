import {
  HTTPController,
  HttpMethod,
  Request as TypedRequest,
  Response as TypedResponse,
} from "@interfaces";
import { IListActivityVersionsUseCase } from "@use-cases";
import {
  ListActivityVersionsParams,
  ListActivityVersionsResponseBody,
  ListActivityVersionsRequestBody,
  parseVersionStatus,
} from "@edu-platform/common";

type Request = TypedRequest<
  {},
  ListActivityVersionsParams,
  ListActivityVersionsRequestBody
>;
type Response = TypedResponse<ListActivityVersionsResponseBody>;

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
