import {
  HTTPController,
  HttpMethod,
  Request as TypedRequest,
  Response as TypedResponse,
} from "@interfaces";
import {
  InsertUserInCollectionParams,
  InsertUserInCollectionResponseBody,
  InsertUserInCollectionRequestBody,
} from "@edu-platform/common";
import { IInsertUserInCollectionUseCase } from "@use-cases";
import { parseNumberId } from "@infrastructure";

type Request = TypedRequest<
  InsertUserInCollectionParams,
  {},
  InsertUserInCollectionRequestBody
>;
type Response = TypedResponse<InsertUserInCollectionResponseBody>;

export class InsertUserInCollectionController
  implements HTTPController<Request, Response>
{
  method = HttpMethod.POST;
  path: string = "collection/:collectionId/student";
  middlewares: string[] = ["auth", "file"];

  constructor(
    private insertUserInCollectionUseCase: IInsertUserInCollectionUseCase
  ) {}

  async execute(req: Request, res: Response) {
    const { studentEmail } = req.body;

    const { collectionId } = parseNumberId(req.params, ["collectionId"]);

    const { user } = req;

    await this.insertUserInCollectionUseCase.execute({
      user,
      collectionId,
      studentEmail,
    });

    res.status(200).json();
  }
}
