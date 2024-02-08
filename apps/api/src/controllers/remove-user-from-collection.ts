import {
  HTTPController,
  HttpMethod,
  Request as TypedRequest,
  Response as TypedResponse,
} from "@interfaces";
import {
  RemoveUserFromCollectionParams,
  RemoveUserFromCollectionRequestBody,
  RemoveUserFromCollectionResponseBody,
} from "@edu-platform/common";
import {
  IInsertUserInCollectionUseCase,
  IRemoveUserFromCollectionUseCase,
} from "@use-cases";
import { parseNumberId } from "@infrastructure";

type Request = TypedRequest<
  RemoveUserFromCollectionParams,
  {},
  RemoveUserFromCollectionRequestBody
>;
type Response = TypedResponse<RemoveUserFromCollectionResponseBody>;

export class RemoveUserFromCollectionController
  implements HTTPController<Request, Response>
{
  method = HttpMethod.DELETE;
  path: string = "collection/:collectionId/student/:studentId";
  middlewares: string[] = ["auth", "file"];

  constructor(
    private removeUserFromCollectionUseCase: IRemoveUserFromCollectionUseCase
  ) {}

  async execute(req: Request, res: Response) {
    const { collectionId, studentId } = parseNumberId(req.params, [
      "collectionId",
      "studentId",
    ]);

    const { user } = req;

    const { alreadyRemoved } =
      await this.removeUserFromCollectionUseCase.execute({
        user,
        collectionId,
        studentId,
      });

    if (!alreadyRemoved) {
      res.status(200).json();
    } else {
      res.status(202).json();
    }
  }
}
