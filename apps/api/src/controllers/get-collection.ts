import {
  HTTPController,
  HttpMethod,
  Request as TypedRequest,
  Response as TypedResponse,
} from "@interfaces";
import {
  GetCollectionParams,
  GetCollectionResponseBody,
} from "@edu-platform/common";
import { IGetCollectionUseCase } from "@use-cases";
import { parseNumberId } from "@infrastructure";
import { CollectionDtoMapper } from "@dto-mappers";

type Request = TypedRequest<GetCollectionParams, {}, {}>;
type Response = TypedResponse<GetCollectionResponseBody>;

export class GetCollectionController
  implements HTTPController<Request, Response>
{
  method = HttpMethod.GET;
  path = "collection/:collectionId";
  middlewares: string[] = ["auth"];

  constructor(private getCollectionUseCase: IGetCollectionUseCase) {}

  async execute(req: Request, res: Response) {
    const { user } = req;

    const { collectionId } = parseNumberId(req.params, ["collectionId"]);

    const collection = await this.getCollectionUseCase.execute({
      user,
      collectionId,
    });

    const collectionDto = CollectionDtoMapper.mapToDto(collection);

    return res.status(200).json(collectionDto);
  }
}
