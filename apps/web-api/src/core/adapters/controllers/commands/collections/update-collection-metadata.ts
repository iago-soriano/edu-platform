import {
  HTTPController,
  HttpMethod,
  Request as TypedRequest,
  Response as TypedResponse,
} from "@edu-platform/common/platform/interfaces";
import {
  parseToCollectionRequestDTO,
  UpdateCollectionMetadataParams,
  UpdateCollectionMetadataRequestBody,
  UpdateCollectionMetadataResponseBody,
} from "@edu-platform/common";
import { IUpdateCollectionMetadataUseCase } from "@core/application/use-cases";

type Request = TypedRequest<
  UpdateCollectionMetadataParams,
  {},
  UpdateCollectionMetadataRequestBody
>;
type Response = TypedResponse<UpdateCollectionMetadataResponseBody>;

export class UpdateCollectionMetadataController
  implements HTTPController<Request, Response>
{
  method = HttpMethod.PATCH;
  path: string = "core/collections/:id";
  middlewares: string[] = ["auth"];

  constructor(
    private updateCollectionMetadataUseCase: IUpdateCollectionMetadataUseCase
  ) {}

  async execute(req: Request, res: Response) {
    const collectionDto = parseToCollectionRequestDTO({
      ...req.body,
      ...req.params,
    });
    const { user } = req;

    await this.updateCollectionMetadataUseCase.execute({
      user,
      collectionDto,
    });

    res.status(200).json();
  }
}
