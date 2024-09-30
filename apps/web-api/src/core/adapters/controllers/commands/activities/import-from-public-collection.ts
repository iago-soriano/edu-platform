import {
  Middlewares,
  Post,
  Request as TypedRequest,
  Response as TypedResponse,
  ValidateParameters,
} from "@edu-platform/common/platform";
import {
  ImportActivityParams,
  ImportActivityRequestBody,
  ImportActivityResponseBody,
  importFromPublicCollectionParamsSchema as paramsSchema,
  importFromPublicCollectionRequestSchema as bodySchema,
} from "@edu-platform/common/api";
import { IImportActivityUseCase } from "@core/application/use-cases";

type Request = TypedRequest<
  ImportActivityParams,
  {},
  ImportActivityRequestBody
>;
type Response = TypedResponse<ImportActivityResponseBody>;

interface Deps {
  importActivityUseCase: IImportActivityUseCase;
}

@Post("activities/:activityId/import")
@ValidateParameters({
  paramsSchema,
  bodySchema,
})
@Middlewares(["auth"])
export class ImportActivityController {
  private _importActivityUseCase: IImportActivityUseCase;

  constructor(deps: Deps) {
    this._importActivityUseCase = deps.importActivityUseCase;
  }

  async execute(req: Request, res: Response) {
    const { user } = req;
    const { activityId } = req.params;
    const { destinationCollection } = req.body;

    await this._importActivityUseCase.execute({
      activityId,
      user,
      destinationCollection,
    });

    res.status(200).json();
  }
}
