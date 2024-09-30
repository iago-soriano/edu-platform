import {
  Request as TypedRequest,
  Response as TypedResponse,
} from "@edu-platform/common/platform/interfaces";
import {
  UpdateCollectionMetadataParams,
  UpdateCollectionMetadataRequestBody,
  UpdateCollectionMetadataResponseBody,
  updateCollectionParamsSchema as paramsSchema,
  updateCollectionRequestSchema as bodySchema,
} from "@edu-platform/common";
import { IUpdateCollectionMetadataUseCase } from "@core/application/use-cases";
import {
  Middlewares,
  Patch,
  ValidateParameters,
} from "@edu-platform/common/platform";

type Request = TypedRequest<
  UpdateCollectionMetadataParams,
  {},
  UpdateCollectionMetadataRequestBody
>;
type Response = TypedResponse<UpdateCollectionMetadataResponseBody>;

interface Deps {
  updateCollectionMetadataUseCase: IUpdateCollectionMetadataUseCase;
}

@Patch("collections/:id")
@ValidateParameters({
  paramsSchema,
  bodySchema,
})
@Middlewares(["auth"])
export class UpdateCollectionMetadataController {
  private _updateCollectionMetadataUseCase: IUpdateCollectionMetadataUseCase;

  constructor(deps: Deps) {
    this._updateCollectionMetadataUseCase =
      deps.updateCollectionMetadataUseCase;
  }

  async execute(req: Request, res: Response) {
    const collectionDto = {
      ...req.body,
      ...req.params,
    };
    const { user } = req;

    await this._updateCollectionMetadataUseCase.execute({
      user,
      collectionDto,
    });

    res.status(200).json();
  }
}
