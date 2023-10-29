import {
  HTTPController,
  HttpMethod,
  Request as TypedRequest,
  Response as TypedResponse,
} from "@interfaces";
import {
  InsertActivityRequestBody,
  InsertActivityResponseBody,
} from "@edu-platform/common/api";
import { IInsertActivityUseCase } from "application/use-cases/insert-activity";

type Request = TypedRequest<{}, {}, InsertActivityRequestBody>;
type Response = TypedResponse<InsertActivityResponseBody>;

export class InsertActivityController implements HTTPController {
  method = HttpMethod.POST;
  path: string = "activities";
  middlewares: string[] = ["auth"];

  constructor(private insertActivityUseCase: IInsertActivityUseCase) {}

  async execute(req: Request, res: Response) {
    const { title, description, topics } = req.body;
    const { user } = req;

    const { activityId } = await this.insertActivityUseCase.execute({
      title,
      description,
      topics,
      user,
    });

    res.status(200).json({ activityId });
  }
}
