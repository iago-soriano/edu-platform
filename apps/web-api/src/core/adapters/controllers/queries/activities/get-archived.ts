import {
  Request as TypedRequest,
  Response as TypedResponse,
} from "@edu-platform/common/platform/interfaces";
import { IActivitiesReadRepository } from "@core/application/interfaces";
import {
  GetArchivedParams,
  GetArchivedResponseBody,
  InvalidStateError,
  SilentInvalidStateError,
  getArchivedParamsSchema as paramsSchema,
} from "@edu-platform/common";
import { VersionStatus } from "@core/domain/enums";
import {
  Get,
  Middlewares,
  ValidateParameters,
} from "@edu-platform/common/platform";

type Request = TypedRequest<GetArchivedParams, {}, {}>;
type Response = TypedResponse<GetArchivedResponseBody>;

interface Deps {
  activitiesReadRepository: IActivitiesReadRepository;
}

@Get("activities/:activityId/versions/archived/:versionNumber")
@ValidateParameters({ paramsSchema })
@Middlewares(["auth"])
export class GetArchivedVersionController {
  private _activitiesReadRepository: IActivitiesReadRepository;

  constructor(deps: Deps) {
    this._activitiesReadRepository = deps.activitiesReadRepository;
  }

  async execute(req: Request, res: Response) {
    // const { versionNumber, activityId } = parseGetArchivedVersionRequest(
    //   req.params
    // );

    const { user } = req;

    const resp = await this._activitiesReadRepository.findFullVersionById(
      // activityId,
      "9",
      VersionStatus.Archived,
      // versionNumber
      9
    );
    if (!resp) throw new InvalidStateError("Activity not found");

    if (user.id !== resp.authorId)
      throw new SilentInvalidStateError("User is not author");

    return res.status(200).json(resp);
  }
}
