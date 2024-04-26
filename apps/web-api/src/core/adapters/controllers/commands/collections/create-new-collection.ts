import {
  HTTPController,
  HttpMethod,
  Request as TypedRequest,
  Response as TypedResponse,
} from "@edu-platform/common/platform/interfaces";
import {
  CreateNewCollectionParams,
  CreateNewCollectionRequestBody,
  CreateNewCollectionResponseBody,
} from "@edu-platform/common";
import { ICreateNewCollectionUseCase } from "@core/application/use-cases";

type Request = TypedRequest<
  CreateNewCollectionParams,
  {},
  CreateNewCollectionRequestBody
>;
type Response = TypedResponse<CreateNewCollectionResponseBody>;

export class CreateNewCollectionController
  implements HTTPController<Request, Response>
{
  method = HttpMethod.POST;
  path: string = "collections";
  middlewares: string[] = ["auth"];

  constructor(
    private createNewCollectionUseCase: ICreateNewCollectionUseCase
  ) {}

  async execute(req: Request, res: Response) {
    const { user } = req;

    const resp = await this.createNewCollectionUseCase.execute({
      user,
    });

    res.status(200).json(resp);
  }
}
