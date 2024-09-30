import {
  Request as TypedRequest,
  Response as TypedResponse,
} from "@edu-platform/common/platform/interfaces";
import {
  UpdateVersionMetadataParams,
  UpdateVersionMetadataRequestBody,
  UpdateVersionMetadataResponseBody,
  updateDraftMetadataParamsSchema as paramsSchema,
  updateDraftMetadataRequestSchema as bodySchema,
} from "@edu-platform/common";
import { IUpdateActivityMetadataUseCase } from "@core/application/use-cases";
import {
  Middlewares,
  Patch,
  ValidateParameters,
} from "@edu-platform/common/platform";

type Request = TypedRequest<
  UpdateVersionMetadataParams,
  {},
  UpdateVersionMetadataRequestBody
>;
type Response = TypedResponse<UpdateVersionMetadataResponseBody>;

interface Deps {
  updateActivityMetadataUseCase: IUpdateActivityMetadataUseCase;
}

@Patch("activities/:activityId/versions/draft/metadata")
@ValidateParameters({
  paramsSchema,
  bodySchema,
})
@Middlewares(["auth"])
export class UpdateActivityMetadataController {
  private _updateActivityMetadataUseCase: IUpdateActivityMetadataUseCase;

  constructor(deps: Deps) {
    this._updateActivityMetadataUseCase = deps.updateActivityMetadataUseCase;
  }

  async execute(req: Request, res: Response) {
    const newValues = req.body;

    const { activityId } = req.params;
    const { user } = req;

    await this._updateActivityMetadataUseCase.execute({
      user,
      activityId,
      newValues,
    });

    res.status(200).json();
  }
}
