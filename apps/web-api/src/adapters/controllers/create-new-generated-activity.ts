import { Response as TypedResponse } from "@edu-platform/common/platform/interfaces";
import { Request as TypedRequest } from "../interfaces";
import {
  Post,
  Middlewares,
  ValidateParameters,
} from "@edu-platform/common/platform/http-server/decorators";
import {
  createNewGeneratedActivityRequestSchema as bodySchema,
  CreateNewGeneratedActivityRequestBody,
  CreateNewGeneratedActivityResponseBody,
} from "@edu-platform/common/api";
import { ICreateNewGeneratedActivityUseCase } from "application/use-cases";

type Request = TypedRequest<{}, {}, CreateNewGeneratedActivityRequestBody>;
type Response = TypedResponse<CreateNewGeneratedActivityResponseBody>;

interface Deps {
  createNewGeneratedActivityUseCase: ICreateNewGeneratedActivityUseCase;
}

@Post("activities")
@ValidateParameters({ bodySchema })
@Middlewares(["auth"])
export class CreateNewGeneratedActivityController {
  private _createNewGeneratedActivityUseCase: ICreateNewGeneratedActivityUseCase;

  constructor(deps: Deps) {
    this._createNewGeneratedActivityUseCase =
      deps.createNewGeneratedActivityUseCase;
  }

  async execute(req: Request, res: Response) {
    const { language, topics, type, level } = req.body;

    const userId = req.user.id;

    const resp = await this._createNewGeneratedActivityUseCase.execute({
      language,
      topics,
      type,
      level,
      userId,
    });

    res.status(200).json(resp);
  }
}
