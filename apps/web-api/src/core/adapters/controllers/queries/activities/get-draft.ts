import {
  Request as TypedRequest,
  Response as TypedResponse,
} from "@edu-platform/common/platform/interfaces";
import { IActivitiesReadRepository } from "@core/application/interfaces";
import {
  GetDraftParams,
  GetDraftResponseBody,
  getDraftParamsSchema as paramsSchema,
  InvalidStateError,
  SilentInvalidStateError,
  // parseGetDraftVersionRequest,
} from "@edu-platform/common";
import { VersionStatus } from "@core/domain/enums";
import {
  Get,
  Middlewares,
  ValidateParameters,
} from "@edu-platform/common/platform";

type Request = TypedRequest<GetDraftParams, {}, {}>;
type Response = TypedResponse<GetDraftResponseBody>;

interface Deps {
  activitiesReadRepository: IActivitiesReadRepository;
}

@Get("activities/:activityId/versions/draft")
@ValidateParameters({ paramsSchema })
@Middlewares(["auth"])
export class GetDraftVersionController {
  private _activitiesReadRepository: IActivitiesReadRepository;

  constructor(deps: Deps) {
    this._activitiesReadRepository = deps.activitiesReadRepository;
  }

  async execute(req: Request, res: Response) {
    const { activityId } = req.params;
    const { user } = req;

    const resp = await this._activitiesReadRepository.findFullVersionById(
      activityId,
      VersionStatus.Draft
    );
    if (!resp) throw new InvalidStateError("Activity not found");

    if (user.id !== resp.authorId)
      throw new SilentInvalidStateError("User is not author");

    return res.status(200).json(resp);
  }
}
