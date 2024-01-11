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

type Request = TypedRequest<
  UpdateActivityVersionMetadataRequestParams,
  {},
  UpdateActivityVersionMetadataRequestBody
>;
type Response = TypedResponse<UpdateActivityVersionMetadataResponseBody>;

export class UpdateActivityMetadataController implements HTTPController {
  method = HttpMethod.POST;
  path = "activity/:activityId/update-activity-metadata/:versionId";
  middlewares: string[] = ["auth"];

  constructor(
    private updateActivityMetadataUseCase: IUpdateActivityMetadataUseCase
  ) {}

  async execute(req: Request, res: Response) {
    const { activityId, versionId } = req.params;
    const { title, description, topics } = req.body;
    const { user } = req;

    await this.updateActivityMetadataUseCase.execute({
      user,
      activityId: parseInt(activityId),
      versionId: parseInt(versionId),
      title,
      description,
      topics,
    });

    res.status(200).json();
  }
}
