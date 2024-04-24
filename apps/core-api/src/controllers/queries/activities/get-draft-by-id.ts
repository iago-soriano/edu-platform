import {
  HTTPController,
  HttpMethod,
  Request as TypedRequest,
  Response as TypedResponse,
} from "@edu-platform/common/platform/interfaces";
import { IActivitiesReadRepository } from "@application/interfaces";
import {
  GetDraftVersionParams,
  GetDraftVersionResponseBody,
  InvalidStateError,
} from "@edu-platform/common";

type Request = TypedRequest<
  GetDraftVersionParams,
  {},
  GetDraftVersionResponseBody
>;
type Response = TypedResponse<GetDraftVersionResponseBody>;

export class GetActivityVersionController
  implements HTTPController<Request, Response>
{
  method = HttpMethod.GET;
  path = "activities/:activityId/versions/draft";
  middlewares: string[] = ["auth"];

  constructor(private activitiesReadRepository: IActivitiesReadRepository) {}

  async execute(req: Request, res: Response) {
    const { activityId } = req.params;
    const { user } = req;

    const resp = await this.activitiesReadRepository.findFullDraftViewById(
      activityId,
      user
    );
    if (!resp) throw new InvalidStateError("Activity not found");

    return res.status(200).json(resp);
  }
}
