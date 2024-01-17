import {
  HTTPController,
  HttpMethod,
  Request as TypedRequest,
  Response as TypedResponse,
} from "@interfaces";
import { IDeleteVersionUseCase } from "@use-cases";
import { DeleteDraftVersionParams } from "@edu-platform/common/api";
import { parseNumberId } from "@infrastructure";

type Request = TypedRequest<DeleteDraftVersionParams, {}, {}>;
type Response = TypedResponse<{}>;

export class DeleteVersionController
  implements HTTPController<Request, Response>
{
  method = HttpMethod.DELETE;
  path: string = "activity/:activityId/version/:versionId/";
  middlewares: string[] = ["auth"];

  constructor(private deleteVersionUseCase: IDeleteVersionUseCase) {}

  async execute(req: Request, res: Response) {
    const { activityId, versionId } = parseNumberId(req.params, [
      "activityId",
      "versionId",
    ]);
    const { user } = req;

    await this.deleteVersionUseCase.execute({
      activityId,
      versionId,
      user,
    });

    res.status(200).json();
  }
}
