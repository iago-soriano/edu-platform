import {
  HTTPController,
  HttpMethod,
  Request as TypedRequest,
  Response as TypedResponse,
} from "@interfaces";
import {
  UpdateActivityVersionMetadataRequestParams,
  UpdateActivityVersionMetadataRequestBody,
  UpdateActivityVersionMetadataResponseBody,
} from "@edu-platform/common/api";
import { IUpdateActivityMetadataUseCase } from "@use-cases";
import { parseToVersionDTO } from "@dto";
import { parseNumberId } from "@infrastructure";

type Request = TypedRequest<
  UpdateActivityVersionMetadataRequestParams,
  {},
  UpdateActivityVersionMetadataRequestBody
>;
type Response = TypedResponse<UpdateActivityVersionMetadataResponseBody>;

export class UpdateActivityMetadataController
  implements HTTPController<Request, Response>
{
  method = HttpMethod.POST;
  path = "activity/:activityId/update-activity-metadata/:versionId";
  middlewares: string[] = ["auth"];

  constructor(
    private updateActivityMetadataUseCase: IUpdateActivityMetadataUseCase
  ) {}

  async execute(req: Request, res: Response) {
    const { title, description, topics } = req.body;
    const versionDto = parseToVersionDTO({
      title,
      description,
      topics,
    });
    const { activityId, versionId } = parseNumberId(req.params, [
      "activityId",
      "versionId",
    ]);
    const { user } = req;

    await this.updateActivityMetadataUseCase.execute({
      user,
      activityId,
      versionId,
      versionDto,
    });

    res.status(200).json();
  }
}
