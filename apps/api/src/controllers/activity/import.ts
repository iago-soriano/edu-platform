import {
  HTTPController,
  HttpMethod,
  Request as TypedRequest,
  Response as TypedResponse,
} from "@interfaces";
import {
  ImportActivityParams,
  ImportActivityRequestBody,
  ImportActivityResponseBody,
} from "@edu-platform/common";
import { IImportActivityUseCase } from "@use-cases";
import { parseNumberId } from "@infrastructure";

type Request = TypedRequest<
  ImportActivityParams,
  {},
  ImportActivityRequestBody
>;
type Response = TypedResponse<ImportActivityResponseBody>;

export class ImportActivityController
  implements HTTPController<Request, Response>
{
  method = HttpMethod.POST;
  path: string = "activities/import/:activityId";
  middlewares: string[] = ["auth"];

  constructor(private importActivityUseCase: IImportActivityUseCase) {}

  async execute(req: Request, res: Response) {
    const { user } = req;
    const { activityId } = parseNumberId(req.params, ["activityId"]);
    const { destinationCollection } = req.body;

    await this.importActivityUseCase.execute({
      activityId,
      user,
      destinationCollection,
    });

    res.status(200).json();
  }
}
