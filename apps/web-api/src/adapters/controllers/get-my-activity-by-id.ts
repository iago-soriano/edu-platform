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
  GetMyActivityByIdParams,
  GetMyActivityByIdResponseBody,
  getMyActivityByIdParamsSchema as paramsSchema,
} from "@edu-platform/common/api";
import { IActivitiesReadRepository } from "@application/interfaces";

type Request = TypedRequest<GetMyActivityByIdParams, {}, {}>;
type Response = TypedResponse<GetMyActivityByIdResponseBody>;

interface Deps {
  activitiesReadRepository: IActivitiesReadRepository;
}

@Get("activities/my/:activityId")
@ValidateParameters({ paramsSchema })
@Middlewares(["auth"])
export class GetMyActivityByIdController {
  private _activitiesReadRepository: IActivitiesReadRepository;

  constructor(deps: Deps) {
    this._activitiesReadRepository = deps.activitiesReadRepository;
  }

  async execute(req: Request, res: Response) {
    const { activityId } = req.params;

    let resp: GetMyActivityByIdResponseBody | null;

    resp = await this._activitiesReadRepository.getMyActivityById(activityId);

    res.status(200).json(resp ?? undefined);
  }
}
