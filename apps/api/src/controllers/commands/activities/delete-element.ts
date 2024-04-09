import {
  HTTPController,
  HttpMethod,
  Request as TypedRequest,
  Response as TypedResponse,
} from "@interfaces";
import { IDeleteElementUseCase } from "@use-cases";
import {
  DeleteElementParams,
  DeleteElementRequestBody,
  DeleteElementResponseBody,
} from "@edu-platform/common/api";

type Request = TypedRequest<DeleteElementParams, {}, DeleteElementRequestBody>;
type Response = TypedResponse<DeleteElementResponseBody>;

export class DeleteElementController
  implements HTTPController<Request, Response>
{
  method = HttpMethod.DELETE;
  path: string = "activities/:activityId/versions/draft/elements/:elementId";
  middlewares: string[] = ["auth"];

  constructor(private deleteElementUseCase: IDeleteElementUseCase) {}

  async execute(req: Request, res: Response) {
    const { activityId, elementId } = req.params;
    const { user } = req;

    await this.deleteElementUseCase.execute({
      activityId,
      elementId,
      user,
    });

    res.sendStatus(200);
  }
}
