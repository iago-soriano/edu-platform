import { Response as TypedResponse } from "@edu-platform/common/platform/interfaces";
import { Request as TypedRequest } from "../interfaces";
import {
  Middlewares,
  Put,
  ValidateParameters,
} from "@edu-platform/common/platform/http-server/decorators";
import {
  updateMyActivityParamsSchema as paramsSchema,
  updateMyActivityRequestBodySchema as bodySchema,
  UpdateMyActivityResponseBody,
  UpdateMyActivityRequestBody,
  UpdateMyActivityParams,
} from "@edu-platform/common/api";
import {
  IUpdateMyActivityUseCase,
  IUpdateStudentOutputAnswerUseCase,
} from "application/use-cases";

type Request = TypedRequest<
  UpdateMyActivityParams,
  {},
  UpdateMyActivityRequestBody
>;
type Response = TypedResponse<UpdateMyActivityResponseBody>;

interface Deps {
  updateMyActivityUseCase: IUpdateMyActivityUseCase;
}

@Put("my-activities/:id")
@ValidateParameters({ bodySchema, paramsSchema })
@Middlewares(["auth"])
export class UpdateMyActivityController {
  private _updateMyActivityUseCase: IUpdateMyActivityUseCase;

  constructor(deps: Deps) {
    this._updateMyActivityUseCase = deps.updateMyActivityUseCase;
  }

  async execute(req: Request, res: Response) {
    res.sendStatus(200);
  }
}
