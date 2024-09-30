import {
  Delete,
  Middlewares,
  Request as TypedRequest,
  Response as TypedResponse,
  ValidateParameters,
} from "@edu-platform/common/platform";
import {
  RemoveUserFromCollectionParams,
  RemoveUserFromCollectionRequestBody,
  RemoveUserFromCollectionResponseBody,
  removeUserParamsSchema as paramsSchema,
} from "@edu-platform/common";
import { IRemoveStudentFromCollectionUseCase } from "@core/application/use-cases";

type Request = TypedRequest<
  RemoveUserFromCollectionParams,
  {},
  RemoveUserFromCollectionRequestBody
>;
type Response = TypedResponse<RemoveUserFromCollectionResponseBody>;

interface Deps {
  removeStudentFromCollectionUseCase: IRemoveStudentFromCollectionUseCase;
}

@Delete("collections/:collectionId/participation/:participationId/student")
@ValidateParameters({
  paramsSchema,
})
@Middlewares(["auth"])
export class RemoveStudentFromCollectionController {
  private _removeStudentFromCollectionUseCase: IRemoveStudentFromCollectionUseCase;

  constructor(deps: Deps) {
    this._removeStudentFromCollectionUseCase =
      deps.removeStudentFromCollectionUseCase;
  }

  async execute(req: Request, res: Response) {
    const { collectionId, participationId } = req.params;
    const { user } = req;

    await this._removeStudentFromCollectionUseCase.execute({
      user,
      collectionId,
      participationId,
    });

    res.status(200);
  }
}
