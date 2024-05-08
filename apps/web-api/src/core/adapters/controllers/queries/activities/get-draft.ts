import {
  HTTPController,
  HttpMethod,
  Request as TypedRequest,
  Response as TypedResponse,
} from "@edu-platform/common/platform/interfaces";
import { IActivitiesReadRepository } from "@core/application/interfaces";
import {
  GetActivityVersionParams,
  GetActivityVersionResponseBody,
  InvalidStateError,
  SilentInvalidStateError,
  parseGetDraftVersionRequest,
} from "@edu-platform/common";
import { VersionStatus } from "@core/domain/enums";

type Request = TypedRequest<
  GetActivityVersionParams,
  {},
  GetActivityVersionResponseBody
>;
type Response = TypedResponse<GetActivityVersionResponseBody>;

export class GetDraftVersionController
  implements HTTPController<Request, Response>
{
  method = HttpMethod.GET;
  path = "core/activities/:activityId/versions/draft";
  middlewares: string[] = ["auth"];

  constructor(private activitiesReadRepository: IActivitiesReadRepository) {}

  async execute(req: Request, res: Response) {
    const { activityId } = parseGetDraftVersionRequest(req.params);
    const { user } = req;

    const resp = await this.activitiesReadRepository.findFullVersionById(
      activityId,
      VersionStatus.Draft
    );
    if (!resp) throw new InvalidStateError("Activity not found");

    if (user.id !== resp.authorId)
      throw new SilentInvalidStateError("User is not author");

    return res.status(200).json(resp);
  }
}
