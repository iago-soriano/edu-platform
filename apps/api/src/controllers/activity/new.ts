import {
  HTTPController,
  HttpMethod,
  Request as TypedRequest,
  Response as TypedResponse,
} from "@interfaces";
import {
  CreateNewActivityRequestBody,
  CreateNewActivityResponseBody,
} from "@edu-platform/common";
import { ICreateNewActivityUseCase } from "@use-cases";
import { parseNumberId } from "@infrastructure";

type Request = TypedRequest<{}, {}, CreateNewActivityRequestBody>;
type Response = TypedResponse<CreateNewActivityResponseBody>;

export class CreateNewActivityController
  implements HTTPController<Request, Response>
{
  method = HttpMethod.POST;
  path: string = "create-new-activity";
  middlewares: string[] = ["auth"];

  constructor(private createNewActivityUseCase: ICreateNewActivityUseCase) {}

  async execute(req: Request, res: Response) {
    const { user } = req;
    const { collectionId } = parseNumberId(req.body, ["collectionId"]); // TODO: use activity dto parser

    if (!collectionId) throw new Error("Please inform a collection");

    const { activityId, versionId } =
      await this.createNewActivityUseCase.execute({
        collectionId,
        user,
      });

    res.status(200).json({ activityId, versionId });
  }
}
