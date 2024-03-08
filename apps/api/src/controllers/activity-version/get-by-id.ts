import {
  HTTPController,
  HttpMethod,
  Request as TypedRequest,
  Response as TypedResponse,
  IActivitiesReadRepository,
} from "@interfaces";
import {
  GetActivityVersionParams,
  GetActivityVersionRequestBody,
  GetActivityVersionResponseBody,
  ActivityVersionNotFound,
} from "@edu-platform/common";
import { parseNumberId } from "@infrastructure";

type Request = TypedRequest<
  GetActivityVersionParams,
  {},
  GetActivityVersionRequestBody
>;
type Response = TypedResponse<GetActivityVersionResponseBody>;

export class GetActivityVersionController
  implements HTTPController<Request, Response>
{
  method = HttpMethod.GET;
  path = "activity/:activityId/version/:versionId/";
  middlewares: string[] = ["auth"];

  constructor(private activitiesReadRepository: IActivitiesReadRepository) {}

  async execute(req: Request, res: Response) {
    const { user } = req;

    const { activityId, versionId } = parseNumberId(req.params, [
      "activityId",
      "versionId",
    ]);

    const resp = await this.activitiesReadRepository.Versions.findFullViewById(
      versionId,
      activityId
    );

    if (!resp) throw new ActivityVersionNotFound();

    if (resp.status == "Draft" && resp.authorId !== user.id)
      throw new ActivityVersionNotFound();

    return res.status(200).json(resp);
  }
}
