import {
  Request as TypedRequest,
  Response as TypedResponse,
} from '@edu-platform/common/platform/interfaces';
import {
  ValidateParameters,
  Post,
  Middlewares,
} from '@edu-platform/common/platform/http-server/decorators';
import {
  createNewActivityRequestSchema as bodySchema,
  CreateNewActivityRequestBody,
  CreateNewActivityResponseBody,
} from '@edu-platform/common/api';
import { ICreateNewActivityUseCase } from 'application/use-cases';

type Request = TypedRequest<{}, {}, CreateNewActivityRequestBody>;
type Response = TypedResponse<CreateNewActivityResponseBody>;

interface Deps {
  createNewActivityUseCase: ICreateNewActivityUseCase;
}

@Post('activities')
@ValidateParameters({ bodySchema })
@Middlewares(['auth'])
export class CreateNewActivityController {
  private _createNewActivityUseCase: ICreateNewActivityUseCase;

  constructor(deps: Deps) {
    this._createNewActivityUseCase = deps.createNewActivityUseCase;
  }

  async execute(req: Request, res: Response) {
    const { language, topics, format, level, userEmail } = req.body;
    const { user } = req;

    res.status(200).json();
  }
}
