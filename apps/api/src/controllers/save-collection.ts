import {
  HTTPController,
  HttpMethod,
  Request as TypedRequest,
  Response as TypedResponse,
} from "@interfaces";
import {
  parseToCollectionDTO,
  SaveCollectionParams,
  SaveCollectionRequestBody,
  SaveCollectionResponseBody,
} from "@edu-platform/common";
import { CollectionDtoMapper } from "@dto-mappers";
import { ISaveCollectionUseCase } from "application/use-cases/save-collection";

type Request = TypedRequest<
  SaveCollectionParams,
  {},
  SaveCollectionRequestBody
>;
type Response = TypedResponse<SaveCollectionResponseBody>;

export class SaveCollectionController
  implements HTTPController<Request, Response>
{
  method = HttpMethod.POST;
  path: string = "collection";
  middlewares: string[] = ["auth", "file"];

  constructor(private saveCollectionUseCase: ISaveCollectionUseCase) {}

  async execute(req: Request, res: Response) {
    const collectionDto = parseToCollectionDTO(req.body);

    const collection = CollectionDtoMapper.mapFromDto(collectionDto);

    const { user } = req;

    const collectionId = await this.saveCollectionUseCase.execute({
      user,
      collection,
    });

    res.status(200).json(collectionId);
  }
}
