import { Response as TypedResponse } from "@edu-platform/common/platform/interfaces";
import { Request as TypedRequest } from "../interfaces";
import {
  Middlewares,
  Get,
  ValidateParameters,
} from "@edu-platform/common/platform/http-server/decorators";
import {
  GetActivitiesQuery,
  GetActivitiesResponseBody,
  getActivitiesQuerySchema as paramsSchema,
} from "@edu-platform/common/api";
import { IActivitiesReadRepository } from "@application/interfaces";

type Request = TypedRequest<{}, GetActivitiesQuery, {}>;
type Response = TypedResponse<GetActivitiesResponseBody>;

interface Deps {
  activitiesReadRepository: IActivitiesReadRepository;
}

@Get("activities/generated")
@ValidateParameters({ paramsSchema })
@Middlewares(["auth"])
export class GetActivitiesController {
  private _activitiesReadRepository: IActivitiesReadRepository;

  constructor(deps: Deps) {
    this._activitiesReadRepository = deps.activitiesReadRepository;
  }

  async execute(req: Request, res: Response) {
    const { page, pageSize } = req.query;

    const resp = await this._activitiesReadRepository.listGeneratedActivities({
      page,
      pageSize,
    });

    res.status(200).json(resp);
  }
}
