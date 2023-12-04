import {
  HTTPController,
  HttpMethod,
  Request as TypedRequest,
  Response as TypedResponse,
} from "@interfaces";
import {
  CreateNewActivityRequestBody,
  CreateNewActivityResponseBody,
} from "@edu-platform/common/api";
import { ICreateNewActivityUseCase } from "@use-cases";

type Request = TypedRequest<{}, {}, CreateNewActivityRequestBody>;
type Response = TypedResponse<CreateNewActivityResponseBody>;

export class CreateNewActivityController implements HTTPController {
  method = HttpMethod.POST;
  path: string = "create-new-activity";
  middlewares: string[] = ["auth"];

  constructor(private createNewActivityUseCase: ICreateNewActivityUseCase) {}

  async execute(req: Request, res: Response) {
    const { user } = req;

    const { activityId, versionId } =
      await this.createNewActivityUseCase.execute({
        user,
      });

    res.status(200).json({ activityId, versionId });
  }
}
