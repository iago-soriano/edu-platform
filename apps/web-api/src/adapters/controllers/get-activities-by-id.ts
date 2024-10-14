import {
  Request as TypedRequest,
  Response as TypedResponse,
} from "@edu-platform/common/platform/interfaces";
import {
  Post,
  Middlewares,
  Get,
  ValidateParameters,
} from "@edu-platform/common/platform/http-server/decorators";
import {
  GetActivityByIdParams,
  GetActivityByIdQuery,
  GetActivityByIdResponseBody,
  getActivityByIdParamsSchema as paramsSchema,
} from "@edu-platform/common/api";
import { IActivitiesReadRepository } from "@application/interfaces";

type Request = TypedRequest<GetActivityByIdParams, GetActivityByIdQuery, {}>;
type Response = TypedResponse<GetActivityByIdResponseBody>;

interface Deps {
  activitiesReadRepository: IActivitiesReadRepository;
}

@Get("activities/generated/:activityId")
@ValidateParameters({ paramsSchema })
@Middlewares(["auth"])
export class GetActivitiesByIdController {
  private _activitiesReadRepository: IActivitiesReadRepository;

  constructor(deps: Deps) {
    this._activitiesReadRepository = deps.activitiesReadRepository;
  }

  async execute(req: Request, res: Response) {
    const { activityId } = req.params;

    let resp: GetActivityByIdResponseBody | undefined;

    resp =
      await this._activitiesReadRepository.getGeneratedActivityById(activityId);

    res.status(200).json(resp);
  }
}
