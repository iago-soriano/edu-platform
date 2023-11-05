import {
  HTTPController,
  HttpMethod,
  Request as TypedRequest,
  Response as TypedResponse,
} from "@interfaces";
import {
  SaveActivityRequestBody,
  SaveActivityResponseBody,
} from "@edu-platform/common/api";
import { ISaveActivityUseCase } from "@use-cases";

type Request = TypedRequest<{}, {}, SaveActivityRequestBody>;
type Response = TypedResponse<SaveActivityResponseBody>;

export class SaveActivityController implements HTTPController {
  method = HttpMethod.POST;
  path: string = "activities";
  middlewares: string[] = ["auth"];

  constructor(private saveActivityUseCase: ISaveActivityUseCase) {}

  async execute(req: Request, res: Response) {
    const {
      title,
      description,
      topicIds,
      activityId: requestActivityId,
    } = req.body;
    const { user } = req;

    const { activityId, versionId } = await this.saveActivityUseCase.execute({
      title,
      description,
      activityId: requestActivityId,
      topicIds,
      user,
    });

    res.status(200).json({ activityId, versionId });
  }
}
