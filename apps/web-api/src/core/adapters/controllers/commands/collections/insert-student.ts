import {
  Middlewares,
  Post,
  Request as TypedRequest,
  Response as TypedResponse,
  ValidateParameters,
} from "@edu-platform/common/platform";
import {
  InsertUserInCollectionParams,
  InsertUserInCollectionResponseBody,
  InsertUserInCollectionRequestBody,
  insertStudentParamsSchema as paramsSchema,
  insertStudentRequestBodySchema as bodySchema,
} from "@edu-platform/common";
import { IInsertUserInCollectionUseCase } from "@core/application/use-cases";

type Request = TypedRequest<
  InsertUserInCollectionParams,
  {},
  InsertUserInCollectionRequestBody
>;
type Response = TypedResponse<InsertUserInCollectionResponseBody>;

interface Deps {
  insertUserInCollectionUseCase: IInsertUserInCollectionUseCase;
}

@Post("collections/:collectionId/participation")
@ValidateParameters({
  paramsSchema,
  bodySchema,
})
@Middlewares(["auth"])
export class InsertUserInCollectionController {
  private _insertUserInCollectionUseCase: IInsertUserInCollectionUseCase;

  constructor(deps: Deps) {
    this._insertUserInCollectionUseCase = deps.insertUserInCollectionUseCase;
  }

  async execute(req: Request, res: Response) {
    const { studentEmail } = req.body;
    const { collectionId } = req.params;
    const { user } = req;

    await this._insertUserInCollectionUseCase.execute({
      user,
      collectionId,
      studentEmail,
    });

    res.status(200).json();
  }
}
