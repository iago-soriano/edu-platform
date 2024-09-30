import {
  HTTPController,
  HttpMethod,
  Request as TypedRequest,
  Response as TypedResponse,
} from "@edu-platform/common/platform/interfaces";
import { IActivitiesReadRepository } from "@core/application/interfaces";
import {
  GetPublishedParams,
  GetPublishedResponseBody,
  getPublishedParamsSchema as paramsSchema,
  InvalidStateError,
  // parseGetPublishedVersionRequest,
} from "@edu-platform/common";
import { VersionStatus } from "@core/domain/enums";
import {
  Get,
  Middlewares,
  ValidateParameters,
} from "@edu-platform/common/platform";

type Request = TypedRequest<GetPublishedParams, {}, {}>;
type Response = TypedResponse<GetPublishedResponseBody>;

interface Deps {
  activitiesReadRepository: IActivitiesReadRepository;
}

@Get("activities/:activityId/versions/published")
@ValidateParameters({ paramsSchema })
@Middlewares(["auth"])
export class GetPublishedVersionController {
  private _activitiesReadRepository: IActivitiesReadRepository;

  constructor(deps: Deps) {
    this._activitiesReadRepository = deps.activitiesReadRepository;
  }

  async execute(req: Request, res: Response) {
    // const { activityId } = parseGetPublishedVersionRequest(req.params);

    const resp = await this._activitiesReadRepository.findFullVersionById(
      // activityId,
      "9",
      VersionStatus.Published
    );
    if (!resp) throw new InvalidStateError("Activity not found");

    return res.status(200).json(resp);
  }
}
