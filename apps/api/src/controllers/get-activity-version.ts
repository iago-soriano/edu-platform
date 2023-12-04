import {
  HTTPController,
  HttpMethod,
  Request as TypedRequest,
  Response as TypedResponse,
} from "@interfaces";
import {
  GetActivityVersionParams,
  GetActivityVersionResponseBody,
} from "@edu-platform/common/api";
import { IGetActivityVersionUseCase } from "@use-cases";

type Request = TypedRequest<GetActivityVersionParams, {}, {}>;
type Response = TypedResponse<GetActivityVersionResponseBody>;

export class GetActivityVersionController implements HTTPController {
  method = HttpMethod.GET;
  path = "activity/:activityId/version/:versionId/";
  middlewares: string[] = ["auth"];

  constructor(private getActivityVersionUseCase: IGetActivityVersionUseCase) {}

  async execute(req: Request, res: Response) {
    // const { activityId, versionId } = req.params;
    const { user } = req;

    const activityId = req.params.activityId as unknown as number;
    const versionId = req.params.versionId as unknown as number;

    if (!activityId || !versionId)
      throw new Error("activityId and versionId must be numbers");

    const resp = await this.getActivityVersionUseCase.execute({
      user,
      activityId,
      versionId,
    });

    return res.status(200).json(resp);
  }
}
