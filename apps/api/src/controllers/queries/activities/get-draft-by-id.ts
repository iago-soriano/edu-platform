import {
  // TODO: split into get published, get draft, get archived by version
  HTTPController,
  HttpMethod,
  Request as TypedRequest,
  Response as TypedResponse,
  IActivitiesReadRepository,
} from "@interfaces";
import {
  GetDraftVersionParams,
  GetDraftVersionResponseBody,
  ActivityVersionNotFound,
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

    if (!resp) throw new ActivityVersionNotFound();

    return res.status(200).json(resp);
  }
}
