import {
  HTTPController,
  HttpMethod,
  Request as TypedRequest,
  Response as TypedResponse,
} from "@edu-platform/common/platform/interfaces";
import {
  parseToCollectionRequestDTO,
  SaveCollectionParams,
  SaveCollectionRequestBody,
  SaveCollectionResponseBody,
} from "@edu-platform/common";
import { ISaveCollectionUseCase } from "@application/use-cases";

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
  path: string = "collections";
  middlewares: string[] = ["auth"];

  constructor(private saveCollectionUseCase: ISaveCollectionUseCase) {}

  async execute(req: Request, res: Response) {
    const collectionDto = parseToCollectionRequestDTO(req.body);
    const { user } = req;

    const resp = await this.saveCollectionUseCase.execute({
      user,
      collectionDto,
    });

    res.status(200).json(resp);
  }
}
