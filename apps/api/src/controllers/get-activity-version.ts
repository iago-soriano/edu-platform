import {
  HTTPController,
  HttpMethod,
  Request as TypedRequest,
  Response as TypedResponse,
} from "@interfaces";
import {
  GetActivityVersionParams,
  GetActivityVersionRequestBody,
  GetActivityVersionResponseBody,
} from "@edu-platform/common";
import { IGetActivityVersionUseCase } from "@use-cases";
import { parseNumberId } from "@infrastructure";
import { ActivityVersionDtoMapper } from "@dto-mappers";

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

  constructor(private getActivityVersionUseCase: IGetActivityVersionUseCase) {}

  async execute(req: Request, res: Response) {
    // const { activityId, versionId } = req.params;
    const { user } = req;

    const { activityId, versionId } = parseNumberId(req.params, [
      "activityId",
      "versionId",
    ]);

    const completeVersion = await this.getActivityVersionUseCase.execute({
      user,
      activityId,
      versionId,
    });

    const versionDto = ActivityVersionDtoMapper.mapToDto(completeVersion);

    return res.status(200).json(versionDto);
  }
}
