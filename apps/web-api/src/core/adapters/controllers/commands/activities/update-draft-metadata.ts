import {
  HTTPController,
  HttpMethod,
  Request as TypedRequest,
  Response as TypedResponse,
} from "@edu-platform/common/platform/interfaces";
import {
  UpdateVersionMetadataParams,
  UpdateVersionMetadataRequestBody,
  UpdateVersionMetadataResponseBody,
} from "@edu-platform/common";
import { IUpdateActivityMetadataUseCase } from "@core/application/use-cases";
import { parseToVersionRequestDto } from "@edu-platform/common";

type Request = TypedRequest<
  UpdateVersionMetadataParams,
  {},
  UpdateVersionMetadataRequestBody
>;
type Response = TypedResponse<UpdateVersionMetadataResponseBody>;

export class UpdateActivityMetadataController
  implements HTTPController<Request, Response>
{
  method = HttpMethod.PATCH;
  path = "activities/:activityId/versions/draft/metadata";
  middlewares: string[] = ["auth"];

  constructor(
    private updateActivityMetadataUseCase: IUpdateActivityMetadataUseCase
  ) {}

  async execute(req: Request, res: Response) {
    const newValues = parseToVersionRequestDto(req.body);

    const { activityId } = req.params;
    const { user } = req;

    await this.updateActivityMetadataUseCase.execute({
      user,
      activityId,
      newValues,
    });

    res.status(200).json();
  }
}
