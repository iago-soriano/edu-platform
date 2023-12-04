import {
  HTTPController,
  HttpMethod,
  Request as TypedRequest,
  Response as TypedResponse,
} from "@interfaces";
import {
  UpdateActivityMetadataRequestBody,
  UpdateActivityMetadataResponseBody,
} from "@edu-platform/common/api";
import { IUpdateActivityMetadataUseCase } from "@use-cases";

type Request = TypedRequest<
  { activityId; versionId },
  {},
  UpdateActivityMetadataRequestBody
>;
type Response = TypedResponse<UpdateActivityMetadataResponseBody>;

export class UpdateActivityMetadataController implements HTTPController {
  method = HttpMethod.POST;
  path = "activity/:activityId/update-activity-metadata/:versionId";
  middlewares: string[] = ["auth"];

  constructor(
    private updateActivityMetadataUseCase: IUpdateActivityMetadataUseCase
  ) {}

  async execute(req: Request, res: Response) {
    const { activityId, versionId } = req.params;
    const { title, description } = req.body;
    const { user } = req;

    await this.updateActivityMetadataUseCase.execute({
      user,
      activityId,
      versionId,
      title,
      description,
    });

    res.status(200).json();
  }
}
