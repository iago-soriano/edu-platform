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
  GetGeneratedActivityByIdParams,
  GetGeneratedActivityByIdResponseBody,
  getGeneratedActivityByIdParamsSchema as paramsSchema,
} from "@edu-platform/common/api";
import { IActivitiesReadRepository } from "@application/interfaces";

type Request = TypedRequest<GetGeneratedActivityByIdParams, {}, {}>;
type Response = TypedResponse<GetGeneratedActivityByIdResponseBody>;

interface Deps {
  activitiesReadRepository: IActivitiesReadRepository;
}

@Get("activities/generated/:activityId")
@ValidateParameters({ paramsSchema })
@Middlewares(["auth"])
export class GetGeneratedActivityByIdController {
  private _activitiesReadRepository: IActivitiesReadRepository;

  constructor(deps: Deps) {
    this._activitiesReadRepository = deps.activitiesReadRepository;
  }

  async execute(req: Request, res: Response) {
    const { activityId } = req.params;

    let resp: GetGeneratedActivityByIdResponseBody | null;

    resp =
      await this._activitiesReadRepository.getGeneratedActivityById(activityId);

    res.status(200).json(resp ?? undefined);
  }
}
