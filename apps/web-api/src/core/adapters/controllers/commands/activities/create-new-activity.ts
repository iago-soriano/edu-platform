import {
  HTTPController,
  HttpMethod,
  Request as TypedRequest,
  Response as TypedResponse,
} from "@edu-platform/common/platform/interfaces";
import {
  parseCreateNewActivityRequestBody,
  CreateNewActivityRequestBody,
  CreateNewActivityResponseBody,
} from "@edu-platform/common/api";
import { ICreateNewActivityUseCase } from "@core/application/use-cases";

type Request = TypedRequest<{}, {}, CreateNewActivityRequestBody>;
type Response = TypedResponse<CreateNewActivityResponseBody>;

export class CreateNewActivityController
  implements HTTPController<Request, Response>
{
  method = HttpMethod.POST;
  path: string = "activities";
  middlewares: string[] = ["auth"];

  constructor(private createNewActivityUseCase: ICreateNewActivityUseCase) {}

  async execute(req: Request, res: Response) {
    const { collectionId } = parseCreateNewActivityRequestBody(req.body);
    const { user } = req;

    const resp = await this.createNewActivityUseCase.execute({
      collectionId,
      user,
    });

    res.status(200).json(resp);
  }
}
