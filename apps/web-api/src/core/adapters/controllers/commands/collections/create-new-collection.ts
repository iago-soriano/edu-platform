import {
  Request as TypedRequest,
  Response as TypedResponse,
} from "@edu-platform/common/platform/interfaces";
import {
  CreateNewCollectionParams,
  CreateNewCollectionRequestBody,
  CreateNewCollectionResponseBody,
} from "@edu-platform/common";
import { ICreateNewCollectionUseCase } from "@core/application/use-cases";
import { Middlewares, Post } from "@edu-platform/common/platform";

type Request = TypedRequest<
  CreateNewCollectionParams,
  {},
  CreateNewCollectionRequestBody
>;
type Response = TypedResponse<CreateNewCollectionResponseBody>;

interface Deps {
  createNewCollectionUseCase: ICreateNewCollectionUseCase;
}

@Post("collections")
@Middlewares(["auth"])
export class CreateNewCollectionController {
  private _createNewCollectionUseCase: ICreateNewCollectionUseCase;

  constructor(deps: Deps) {
    this._createNewCollectionUseCase = deps.createNewCollectionUseCase;
  }

  async execute(req: Request, res: Response) {
    const { user } = req;

    const resp = await this._createNewCollectionUseCase.execute({
      user,
    });

    res.status(200).json(resp);
  }
}
