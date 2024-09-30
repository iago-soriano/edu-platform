import {
  HTTPController,
  HttpMethod,
  Request as TypedRequest,
  Response as TypedResponse,
} from "@edu-platform/common/platform/interfaces";
import {
  CreateNewDraftVersionParams,
  CreateNewDraftVersionRequestBody,
  CreateNewDraftVersionResponseBody,
  createNewDraftParamsSchema as paramsSchema,
} from "@edu-platform/common";
import { ICreateNewDraftVersionUseCase } from "@core/application/use-cases";
import {
  Middlewares,
  Post,
  ValidateParameters,
} from "@edu-platform/common/platform";

type Request = TypedRequest<
  CreateNewDraftVersionParams,
  {},
  CreateNewDraftVersionRequestBody
>;
type Response = TypedResponse<CreateNewDraftVersionResponseBody>;

interface Deps {
  createNewDraftVersionUseCase: ICreateNewDraftVersionUseCase;
}

@Post("activities/:activityId/versions/draft")
@ValidateParameters({ paramsSchema })
@Middlewares(["auth"])
export class CreateNewDraftVersionController {
  private _createNewDraftVersionUseCase: ICreateNewDraftVersionUseCase;
  constructor(deps: Deps) {
    this._createNewDraftVersionUseCase = deps.createNewDraftVersionUseCase;
  }

  async execute(req: Request, res: Response) {
    const { activityId } = req.params;
    const { user } = req;

    await this._createNewDraftVersionUseCase.execute({
      activityId,
      user,
    });

    res.sendStatus(200);
  }
}
