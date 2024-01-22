import {
  HTTPController,
  HttpMethod,
  IActivitiesRepository,
  Request as TypedRequest,
  Response as TypedResponse,
} from "@interfaces";
// import {
//   GetActivityVersionParams,
//   GetActivityVersionResponseBody,
// } from "@edu-platform/common/api";
import { IGetActivityVersionUseCase } from "@use-cases";
import { VersionDTO, ElementDTO, parseVersionStatus } from "@dto";
import { parseNumberId } from "@infrastructure";

// get activity version full view
export type GetActivityVersionParams = {
  activityId: string;
  versionId: string;
};
export type GetActivityVersionResponseBody = VersionDTO & {
  elements: ElementDTO[];
};

type Request = TypedRequest<GetActivityVersionParams, {}, {}>;
type Response = TypedResponse<GetActivityVersionResponseBody>;

export class GetActivityVersionController
  implements HTTPController<Request, Response>
{
  method = HttpMethod.GET;
  path = "activity/:activityId/version/:versionId/";
  middlewares: string[] = ["auth"];

  constructor(private getActivityVersionUseCase: IGetActivityVersionUseCase) {}

  async execute(req: Request, res: Response) {
    // const { activityId, versionId } = req.params;
    const { user } = req;

    const { activityId, versionId } = parseNumberId(req.params, [
      "activityId",
      "versionId",
    ]);

    const { title, description, elements, status, topics } =
      await this.getActivityVersionUseCase.execute({
        user,
        activityId,
        versionId,
      });

    return res.status(200).json({
      title,
      description,
      status,
      elements: elements || [],
      topics,
    });
  }
}
