import {
  HTTPController,
  HttpMethod,
  Request as TypedRequest,
  Response as TypedResponse,
} from "@edu-platform/common/platform/interfaces";
import { IDeleteElementUseCase } from "@core/application/use-cases";
import {
  DeleteElementParams,
  DeleteElementRequestBody,
  DeleteElementResponseBody,
  deleteElementParamsSchema as paramsSchema,
} from "@edu-platform/common/api";
import {
  Delete,
  Middlewares,
  ValidateParameters,
} from "@edu-platform/common/platform";

type Request = TypedRequest<DeleteElementParams, {}, DeleteElementRequestBody>;
type Response = TypedResponse<DeleteElementResponseBody>;

interface Deps {
  deleteElementUseCase: IDeleteElementUseCase;
}

@Delete("activities/:activityId/versions/draft/elements/:elementId")
@ValidateParameters({ paramsSchema })
@Middlewares(["auth"])
export class DeleteElementController {
  private _deleteElementUseCase: IDeleteElementUseCase;
  constructor(deps: Deps) {
    this._deleteElementUseCase = deps.deleteElementUseCase;
  }

  async execute(req: Request, res: Response) {
    const { activityId, elementId } = req.params;
    const { user } = req;

    await this._deleteElementUseCase.execute({
      activityId,
      elementId,
      user,
    });

    res.sendStatus(200);
  }
}
