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
  IRemoveStudentFromCollectionUseCase,
} from "@use-cases";
import { parseNumberId } from "@infrastructure";

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
  path: string =
    "collection/:collectionId/participating-student/:participationId";
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

    const { alreadyRemoved } =
      await this.removeStudentFromCollectionUseCase.execute({
        user,
        collectionId,
        participationId,
      });

    if (!alreadyRemoved) {
      res.status(200).json();
    } else {
      res.status(202).json();
    }
  }
}
