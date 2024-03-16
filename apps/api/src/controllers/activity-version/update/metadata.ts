import {
  HTTPController,
  HttpMethod,
  Request as TypedRequest,
  Response as TypedResponse,
} from "@interfaces";
import {
  UpdateVersionMetadataParams,
  UpdateVersionMetadataRequestBody,
  UpdateVersionMetadataResponseBody,
} from "@edu-platform/common";
import { IUpdateActivityMetadataUseCase } from "@use-cases";
import { pareToVersionRequestDto } from "@edu-platform/common";
import { ActivityVersionDtoMapper } from "@dto-mappers";
import { parseNumberId } from "@infrastructure";

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
  path = "activity/:activityId/version/:versionId/metadata";
  middlewares: string[] = ["auth"];

  constructor(
    private updateActivityMetadataUseCase: IUpdateActivityMetadataUseCase
  ) {}

  async execute(req: Request, res: Response) {
    const versionDto = pareToVersionRequestDto(req.body);
    const newVersion = ActivityVersionDtoMapper.mapFromDto(versionDto);

    const { activityId, versionId } = parseNumberId(req.params, [
      "activityId",
      "versionId",
    ]);
    const { user } = req;

    await this.updateActivityMetadataUseCase.execute({
      user,
      activityId,
      versionId,
      newVersion,
    });

    res.status(200).json();
  }
}