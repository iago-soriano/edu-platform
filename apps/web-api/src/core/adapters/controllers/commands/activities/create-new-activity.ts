import {
  Request as TypedRequest,
  Response as TypedResponse,
} from "@edu-platform/common/platform/interfaces";
import {
  ValidateParameters,
  Post,
  Middlewares,
} from "@edu-platform/common/platform/http-server/decorators";
import {
  createNewActivityRrequestSchema,
  CreateNewActivityRequestBody,
  CreateNewActivityResponseBody,
} from "@edu-platform/common/api";
import { ICreateNewActivityUseCase } from "@core/application/use-cases";

type Request = TypedRequest<{}, {}, CreateNewActivityRequestBody>;
type Response = TypedResponse<CreateNewActivityResponseBody>;

interface Deps {
  createNewActivityUseCase: ICreateNewActivityUseCase;
}

@Post("activities")
@ValidateParameters({ bodySchema: createNewActivityRrequestSchema })
@Middlewares(["auth"])
export class CreateNewActivityController {
  private _createNewActivityUseCase: ICreateNewActivityUseCase;

  constructor(deps: Deps) {
    this._createNewActivityUseCase = deps.createNewActivityUseCase;
  }

  async execute(req: Request, res: Response) {
    const { collectionId } = req.body;
    const { user } = req;

    const resp = await this._createNewActivityUseCase.execute({
      collectionId,
      user,
    });

    res.status(200).json(resp);
  }
}
