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
import { ICreateNewActivityUseCase } from "application/use-cases/create-new-activity";

type Request = TypedRequest<{}, {}, CreateNewActivityRequestBody>;
type Response = TypedResponse<CreateNewActivityResponseBody>;

export class CreateNewActivityController implements HTTPController {
  method = HttpMethod.POST;
  path = "activities";
  middlewares: string[] = ["auth"];

  constructor(private createNewActivityUseCase: ICreateNewActivityUseCase) {}

  async execute(req: Request, res: Response) {
    const { title, description, topics } = req.body;
    const { user } = req;

    const { activityId } = await this.createNewActivityUseCase.execute({
      title,
      description,
      topics,
      user,
    });

    res.status(200).json({ activityId });
  }
}
