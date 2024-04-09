import {
  HTTPController,
  HttpMethod,
  Request as TypedRequest,
  Response as TypedResponse,
} from "@interfaces";
import {
  CreateNewDraftVersionParams,
  CreateNewDraftVersionRequestBody,
  CreateNewDraftVersionResponseBody,
} from "@edu-platform/common";
import { ICreateNewDraftVersionUseCase } from "@use-cases";

type Request = TypedRequest<
  CreateNewDraftVersionParams,
  {},
  CreateNewDraftVersionRequestBody
>;
type Response = TypedResponse<CreateNewDraftVersionResponseBody>;

export class CreateNewDraftVersionController
  implements HTTPController<Request, Response>
{
  method = HttpMethod.POST;
  path: string = "activities/:activityId/versions/draft";
  middlewares: string[] = ["auth"];

  constructor(
    private createNewDraftVersionUseCase: ICreateNewDraftVersionUseCase
  ) {}

  async execute(req: Request, res: Response) {
    const { activityId } = req.params;
    const { user } = req;

    await this.createNewDraftVersionUseCase.execute({
      activityId,
      user,
    });

    res.sendStatus(200);
  }
}