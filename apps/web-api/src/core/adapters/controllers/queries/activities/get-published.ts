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
  parseGetPublishedVersionRequest,
} from "@edu-platform/common";
import { VersionStatus } from "@core/domain/enums";

type Request = TypedRequest<
  GetActivityVersionParams,
  {},
  GetActivityVersionResponseBody
>;
type Response = TypedResponse<GetActivityVersionResponseBody>;

export class GetPublishedVersionController
  implements HTTPController<Request, Response>
{
  method = HttpMethod.GET;
  path = "activities/:activityId/versions/published";
  middlewares: string[] = ["auth"];

  constructor(private activitiesReadRepository: IActivitiesReadRepository) {}

  async execute(req: Request, res: Response) {
    const { activityId } = parseGetPublishedVersionRequest(req.params);

    const resp = await this.activitiesReadRepository.findFullVersionById(
      activityId,
      VersionStatus.Published
    );
    if (!resp) throw new InvalidStateError("Activity not found");

    return res.status(200).json(resp);
  }
}
