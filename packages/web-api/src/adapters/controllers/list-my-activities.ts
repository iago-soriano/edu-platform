import { Response as TypedResponse } from "@edu-platform/common/platform/interfaces";
import { Request as TypedRequest } from "../interfaces";
import {
  Middlewares,
  Get,
  ValidateParameters,
} from "@edu-platform/common/platform/http-server/decorators";
import {
  ListMyActivitiesQuery,
  ListMyActivitiesResponseBody,
  listMyActivitiesQuerySchema as paramsSchema,
} from "@edu-platform/common/api";
import { IActivitiesReadRepository } from "@application/interfaces";

type Request = TypedRequest<{}, ListMyActivitiesQuery, {}>;
type Response = TypedResponse<ListMyActivitiesResponseBody>;

interface Deps {
  activitiesReadRepository: IActivitiesReadRepository;
}

@Get("activities/my")
@ValidateParameters({ paramsSchema })
@Middlewares(["auth"])
export class ListMyActivitiesController {
  private _activitiesReadRepository: IActivitiesReadRepository;

  constructor(deps: Deps) {
    this._activitiesReadRepository = deps.activitiesReadRepository;
  }

  async execute(req: Request, res: Response) {
    // throw new Error("Test");
    const userId = req.user.id;

    const { page, pageSize } = req.query;

    const resp = await this._activitiesReadRepository.listMyActivities({
      page,
      pageSize,
      userId,
    });

    res.status(200).json(resp);
  }
}
