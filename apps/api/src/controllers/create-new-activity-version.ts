import {
  HTTPController,
  HttpMethod,
  Request as TypedRequest,
  Response as TypedResponse,
} from "@interfaces";
import {
  CreateNewActivityVersionParams,
  CreateNewActivityVersionResponseBody,
} from "@edu-platform/common/api";
import { ICreateNewActivityVersionUseCase } from "@use-cases";

type Request = TypedRequest<CreateNewActivityVersionParams, {}, {}>;
type Response = TypedResponse<CreateNewActivityVersionResponseBody>;

export class CreateNewActivityVersionController
  implements HTTPController<Request, Response>
{
  method = HttpMethod.POST;
  path: string = "create-new-version/:activityId";
  middlewares: string[] = ["auth"];

  constructor(
    private createNewActivityVersionUseCase: ICreateNewActivityVersionUseCase
  ) {}

  async execute(req: Request, res: Response) {
    const { user } = req;
    const { activityId } = req.params;

    const { versionId } = await this.createNewActivityVersionUseCase.execute({
      activityId,
    });

    res.status(200).json({ versionId });
  }
}
