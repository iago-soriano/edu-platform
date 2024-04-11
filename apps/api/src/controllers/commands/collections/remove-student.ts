import {
  HTTPController,
  HttpMethod,
  Request as TypedRequest,
  Response as TypedResponse,
} from "../../interfaces";
import {
  RemoveUserFromCollectionParams,
  RemoveUserFromCollectionRequestBody,
  RemoveUserFromCollectionResponseBody,
} from "@edu-platform/common";
import {
  IInsertUserInCollectionUseCase,
  IRemoveStudentFromCollectionUseCase,
} from "@application/use-cases";
import { parseNumberId } from "@infrastructure/utils";

type Request = TypedRequest<
  RemoveUserFromCollectionParams,
  {},
  RemoveUserFromCollectionRequestBody
>;
type Response = TypedResponse<RemoveUserFromCollectionResponseBody>;

export class RemoveStudentFromCollectionController
  implements HTTPController<Request, Response>
{
  method = HttpMethod.DELETE;
  path: string = "collections/:collectionId/participation/:participationId";
  middlewares: string[] = ["auth"];

  constructor(
    private removeStudentFromCollectionUseCase: IRemoveStudentFromCollectionUseCase
  ) {}

  async execute(req: Request, res: Response) {
    const { collectionId, participationId } = parseNumberId(req.params, [
      "collectionId",
      "participationId",
    ]);
    const { user } = req;

    await this.removeStudentFromCollectionUseCase.execute({
      user,
      collectionId,
      participationId,
    });

    res.status(200);
  }
}
