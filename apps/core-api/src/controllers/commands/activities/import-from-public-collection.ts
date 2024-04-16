import {
  HTTPController,
  HttpMethod,
  Request as TypedRequest,
  Response as TypedResponse,
  parseNumberId,
} from "@edu-platform/common/platform";
import {
  ImportActivityParams,
  ImportActivityRequestBody,
  ImportActivityResponseBody,
} from "@edu-platform/common/api";
import { IImportActivityUseCase } from "@application/use-cases";

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
  path: string = "activities/:activityId/import";
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
