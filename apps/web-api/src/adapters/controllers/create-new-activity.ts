import { Response as TypedResponse } from "@edu-platform/common/platform/interfaces";
import { Request as TypedRequest } from "../interfaces";
import {
  Post,
  Middlewares,
  ValidateParameters,
} from "@edu-platform/common/platform/http-server/decorators";
import {
  createNewActivityRequestSchema as bodySchema,
  CreateNewActivityRequestBody,
  CreateNewActivityResponseBody,
} from "@edu-platform/common/api";
import { ICreateNewActivityUseCase } from "application/use-cases";

type Request = TypedRequest<{}, {}, CreateNewActivityRequestBody>;
type Response = TypedResponse<CreateNewActivityResponseBody>;

interface Deps {
  createNewActivityUseCase: ICreateNewActivityUseCase;
}

@Post("activities/new")
@ValidateParameters({ bodySchema })
@Middlewares(["auth"])
export class CreateNewActivityController {
  private _createNewActivityUseCase: ICreateNewActivityUseCase;

  constructor(deps: Deps) {
    this._createNewActivityUseCase = deps.createNewActivityUseCase;
  }

  async execute(req: Request, res: Response) {
    const { generatedActivityId, blocks, title } = req.body;

    const user = req.user;

    const resp = await this._createNewActivityUseCase.execute({
      generatedActivityId,
      blocks,
      title,
      user,
    });

    res.status(200).json(resp);
  }
}
