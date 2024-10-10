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
  GetActivityByIdResponseBody,
  getActivityByIdParamsSchema as paramsSchema,
} from "@edu-platform/common/api";
import { IActivitiesReadRepository } from "@application/interfaces";

type Request = TypedRequest<GetActivityByIdParams, {}, {}>;
type Response = TypedResponse<GetActivityByIdResponseBody>;

interface Deps {
  activitiesReadRepository: IActivitiesReadRepository;
}

@Get("activities/:activityId")
@ValidateParameters({ paramsSchema })
@Middlewares(["auth"])
export class GetActivitiesByIdController {
  private _activitiesReadRepository: IActivitiesReadRepository;

  constructor(deps: Deps) {
    this._activitiesReadRepository = deps.activitiesReadRepository;
  }

  async execute(req: Request, res: Response) {
    const { activityId } = req.params;

    const resp =
      await this._activitiesReadRepository.getActivityById(activityId);

    res.status(200).json(resp);
  }
}
