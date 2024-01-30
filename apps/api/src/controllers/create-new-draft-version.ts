import {
  HTTPController,
  HttpMethod,
  Request as TypedRequest,
  Response as TypedResponse,
} from "@interfaces";
import {
  CreateNewActivityVersionParams,
  CreateNewActivityVersionResponseBody,
} from "@edu-platform/common";
import { ICreateNewDraftVersionUseCase } from "@use-cases";
import { parseNumberId } from "@infrastructure";

type Request = TypedRequest<CreateNewActivityVersionParams, {}, {}>;
type Response = TypedResponse<CreateNewActivityVersionResponseBody>;

export class CreateNewDraftVersionController
  implements HTTPController<Request, Response>
{
  method = HttpMethod.POST;
  path: string = "create-new-version/:activityId";
  middlewares: string[] = ["auth"];

  constructor(
    private createNewDraftVersionUseCase: ICreateNewDraftVersionUseCase
  ) {}

  async execute(req: Request, res: Response) {
    const { user } = req;
    const { activityId } = parseNumberId(req.params, ["activityId"]);

    const { versionId } = await this.createNewDraftVersionUseCase.execute({
      activityId,
      user,
    });

    res.status(200).json({ versionId });
  }
}
